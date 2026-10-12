"use client"

import * as React from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { Flip } from "gsap/Flip"

import { projects } from "@/lib/content"
import {
  filterResult,
  filters,
  seedStatements,
  toAscii,
  type Cell,
  type QueryResult,
} from "@/lib/project-query"
import build from "@/lib/scuttle/build.json"
import { Kbd } from "@/components/ui/kbd"

type Db = {
  run(sql: string): string
  free(): void
}

type Status =
  | { kind: "local"; count: number }
  | { kind: "scuttle"; count: number; ms: number }
  | { kind: "affected"; count: number; ms: number }
  | { kind: "error"; message: string }

async function createDatabase(): Promise<Db> {
  const scuttle = await import("@/lib/scuttle/scuttle_wasm")
  await scuttle.default()
  const db = new scuttle.Db()
  for (const statement of seedStatements) db.run(statement)
  return db
}

/** A crashed instance can throw on `free()`; it's gone either way. */
function dispose(db: Db | null) {
  try {
    db?.free()
  } catch {}
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/** Browsers round `performance.now()`, so a zero reading means "too fast to measure". */
function formatDuration(ms: number) {
  if (ms === 0) return "under 1 ms"
  return `${ms < 1 ? ms.toFixed(2) : ms.toFixed(1)} ms`
}

function plural(count: number, noun: string) {
  return `${count} ${count === 1 ? noun : `${noun}s`}`
}

function isTyping(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
  )
}

const projectByName = new Map(
  projects.map((project) => [project.name, project])
)

const initial = filters[0]

/**
 * The homepage project index. The list is the result of a SQL query that
 * Scuttle DB, compiled to WebAssembly, runs in the visitor's browser. The
 * server renders the same result so the list never waits on WebAssembly.
 */
export function ProjectQuery() {
  const [sql, setSql] = React.useState(initial.sql)
  const [active, setActive] = React.useState<string | null>(initial.id)
  const [result, setResult] = React.useState<QueryResult>(() =>
    filterResult(initial)
  )
  const [status, setStatus] = React.useState<Status>({
    kind: "local",
    count: result.rows.length,
  })
  const [engine, setEngine] = React.useState<
    "idle" | "loading" | "ready" | "failed"
  >("idle")

  const dbRef = React.useRef<Db | null>(null)
  const loadRef = React.useRef<Promise<Db | null> | null>(null)
  const generationRef = React.useRef(0)
  const disposedRef = React.useRef(false)
  const listRef = React.useRef<HTMLUListElement>(null)
  const editorRef = React.useRef<HTMLTextAreaElement>(null)
  const flipRef = React.useRef<Flip.FlipState | null>(null)
  const typingRef = React.useRef<gsap.core.Tween | null>(null)
  const runRef = React.useRef(0)
  const sqlRef = React.useRef(sql)
  /** The last query that drew rows, re-run after a write so the list shows the change. */
  const lastSelectRef = React.useRef(initial.sql)

  React.useEffect(() => {
    sqlRef.current = sql
  }, [sql])

  React.useEffect(() => {
    gsap.registerPlugin(Flip)
  }, [])

  const load = React.useCallback(() => {
    if (loadRef.current) return loadRef.current
    if (disposedRef.current) return Promise.resolve(null)
    const generation = generationRef.current
    setEngine("loading")
    loadRef.current = createDatabase().then(
      (db) => {
        if (generation !== generationRef.current) {
          dispose(db)
          return null
        }
        dbRef.current = db
        setEngine("ready")
        return db
      },
      () => {
        if (generation === generationRef.current) setEngine("failed")
        return null
      }
    )
    return loadRef.current
  }, [])

  /** Swaps the list. Leaving rows fade first, staying rows glide, new rows rise in. */
  const commit = React.useCallback(async (next: QueryResult, run: number) => {
    if (run !== runRef.current) return
    const list = listRef.current
    if (!list || prefersReducedMotion()) {
      setResult(next)
      return
    }
    const ids = new Set(rowIds(next))
    const items = [...list.children] as HTMLElement[]
    const leaving = items.filter((item) => !ids.has(item.dataset.flipId ?? ""))
    if (leaving.length) {
      await gsap.to(leaving, {
        autoAlpha: 0,
        x: 12,
        duration: 0.24,
        ease: "power2.in",
        stagger: 0.02,
      })
      // A newer query took over during the fade; put these rows back for it.
      if (run !== runRef.current) {
        gsap.set(leaving, { clearProps: "opacity,visibility,transform" })
        return
      }
    }
    flipRef.current = Flip.getState(
      items.filter((item) => !leaving.includes(item))
    )
    setResult(next)
  }, [])

  React.useLayoutEffect(() => {
    const state = flipRef.current
    const list = listRef.current
    if (!state || !list) return
    flipRef.current = null
    Flip.from(state, {
      targets: list.children,
      duration: 0.7,
      ease: "expo.out",
      stagger: 0.03,
      onEnter: (entering) =>
        gsap.fromTo(
          entering,
          { autoAlpha: 0, yPercent: 40 },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.8,
            ease: "expo.out",
            stagger: 0.04,
          }
        ),
    })
  }, [result])

  /** Runs `query` in Scuttle. Returns false if the engine isn't available. */
  const runInScuttle = React.useCallback(
    async (query: string, run: number) => {
      const db = await load()
      if (!db || run !== runRef.current) return Boolean(db)

      const statement = query.trim().replace(/;+\s*$/, "")
      // Scuttle DB panics on non-ASCII input, so stop it here instead of crashing.
      if (/[^\x00-\x7F]/.test(statement)) {
        setStatus({
          kind: "error",
          message:
            "Scuttle DB only reads plain ASCII for now. Try the query without accents or symbols.",
        })
        return true
      }
      try {
        const start = performance.now()
        const response = JSON.parse(db.run(statement))
        const ms = performance.now() - start

        if (response.rowsAffected !== null) {
          setStatus({ kind: "affected", count: response.rowsAffected, ms })
          const refreshed = JSON.parse(db.run(lastSelectRef.current))
          await commit(
            { columns: refreshed.columns, rows: refreshed.rows },
            run
          )
          return true
        }

        lastSelectRef.current = statement
        setStatus({ kind: "scuttle", count: response.rows.length, ms })
        await commit({ columns: response.columns, rows: response.rows }, run)
      } catch (error) {
        if (error instanceof WebAssembly.RuntimeError) {
          dbRef.current = null
          loadRef.current = null
          dispose(db)
          await load()
          setStatus({
            kind: "error",
            message:
              "That query crashed the database, so it restarted with the original rows.",
          })
          return true
        }
        setStatus({
          kind: "error",
          message: error instanceof Error ? error.message : String(error),
        })
      }
      return true
    },
    [commit, load]
  )

  // Loads the engine once the page is idle, then reruns the shown query in it,
  // so the count and time on screen come from Scuttle.
  React.useEffect(() => {
    disposedRef.current = false
    const start = () => {
      const run = runRef.current
      void runInScuttle(sqlRef.current, run)
    }
    // Safari has no requestIdleCallback.
    const idle = typeof window.requestIdleCallback === "function"
    const id = idle
      ? window.requestIdleCallback(start, { timeout: 2500 })
      : window.setTimeout(start, 1200)

    return () => {
      if (idle) window.cancelIdleCallback(id)
      else window.clearTimeout(id)
      // A load still in flight belongs to this mount; it frees itself on arrival.
      /* eslint-disable react-hooks/exhaustive-deps -- counters, not DOM nodes */
      generationRef.current++
      runRef.current++
      /* eslint-enable react-hooks/exhaustive-deps */
      disposedRef.current = true
      typingRef.current?.kill()
      loadRef.current = null
      dispose(dbRef.current)
      dbRef.current = null
    }
  }, [runInScuttle])

  // "/" jumps to the query from anywhere on the page.
  React.useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey)
        return
      if (isTyping(event.target)) return
      event.preventDefault()
      const editor = editorRef.current
      if (!editor) return
      editor.focus()
      editor.setSelectionRange(editor.value.length, editor.value.length)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  /** Retypes the prompt from its current text to `target`, keeping the shared prefix. */
  function typeQuery(target: string) {
    typingRef.current?.kill()
    const from = sqlRef.current
    if (prefersReducedMotion() || from === target) {
      setSql(target)
      return Promise.resolve()
    }
    let shared = 0
    while (shared < from.length && from[shared] === target[shared]) shared++
    const deletes = from.length - shared
    const adds = target.length - shared
    const steps = { i: 0 }
    const total = deletes + adds

    return new Promise<void>((resolve) => {
      typingRef.current = gsap.to(steps, {
        i: total,
        duration: Math.min(0.55, deletes * 0.006 + adds * 0.014),
        ease: "none",
        onUpdate: () => {
          const i = Math.round(steps.i)
          setSql(
            i <= deletes
              ? from.slice(0, from.length - i)
              : target.slice(0, shared + (i - deletes))
          )
        },
        onComplete: () => {
          setSql(target)
          resolve()
        },
        onInterrupt: () => resolve(),
      })
    })
  }

  async function choose(filter: (typeof filters)[number]) {
    const run = ++runRef.current
    setActive(filter.id)
    if (dbRef.current) {
      await typeQuery(filter.sql)
      if (run === runRef.current) await runInScuttle(filter.sql, run)
      return
    }

    // Scuttle isn't ready yet: show the same rows from JavaScript now, and let
    // Scuttle rerun the query once it loads so the count is its own.
    const ready = load()
    await typeQuery(filter.sql)
    if (run !== runRef.current) return
    const next = filterResult(filter)
    setStatus({ kind: "local", count: next.rows.length })
    await commit(next, run)
    if ((await ready) && run === runRef.current)
      await runInScuttle(filter.sql, run)
  }

  /** Appends `column` to the SELECT list, retypes the prompt, and runs it. */
  async function addColumn(column: string) {
    const match = SELECT_LIST.exec(sqlRef.current)
    if (!match) return
    const query = `${match[1]}${match[2]}, ${column}${match[3]}`
    const run = ++runRef.current
    setActive(null)
    await typeQuery(query)
    if (run !== runRef.current) return
    setActive(filters.find((filter) => filter.sql === query)?.id ?? null)
    await runInScuttle(query, run)
  }

  async function submit(event?: React.FormEvent) {
    event?.preventDefault()
    const run = ++runRef.current
    typingRef.current?.kill()
    const query = sqlRef.current
    setActive(filters.find((filter) => filter.sql === query.trim())?.id ?? null)
    const ran = await runInScuttle(query, run)
    if (!ran && run === runRef.current) {
      setStatus({
        kind: "error",
        message:
          "Scuttle DB couldn't load in this browser, so custom queries are off.",
      })
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={submit} className="flex flex-col gap-3">
        <label htmlFor="project-query" className="sr-only">
          SQL query for the project list
        </label>
        <div className="flex items-start gap-2 rounded-lg border px-3 py-2 font-mono text-sm transition-[box-shadow] focus-within:ring-[3px] focus-within:ring-ring/50">
          <span
            aria-hidden="true"
            className="shrink-0 text-muted-foreground select-none"
          >
            scuttle&gt;
          </span>
          {/* The textarea sits on a mirror that draws the text; both wrap identically. */}
          <div className="grid min-w-0 flex-1">
            <div
              aria-hidden="true"
              className="col-start-1 row-start-1 break-words whitespace-pre-wrap"
            >
              {sql}
              <span className="text-muted-foreground">;</span>
            </div>
            <textarea
              ref={editorRef}
              id="project-query"
              value={sql}
              rows={1}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              aria-describedby="project-query-hint"
              onChange={(event) => {
                // Typing takes over from any filter still animating or running.
                runRef.current++
                typingRef.current?.kill()
                setSql(event.target.value.replace(/\n/g, " "))
                setActive(null)
              }}
              onFocus={() => void load()}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault()
                  void submit()
                }
              }}
              className="col-start-1 row-start-1 h-full resize-none overflow-hidden bg-transparent break-words whitespace-pre-wrap text-transparent caret-foreground outline-hidden selection:bg-foreground/15 selection:text-transparent"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <div
            role="group"
            aria-label="Filter projects"
            className="flex flex-wrap gap-x-4 gap-y-1"
          >
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                aria-pressed={active === filter.id}
                onClick={() => void choose(filter)}
                className="rounded-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-hidden aria-pressed:text-foreground aria-pressed:underline"
              >
                {filter.label}
              </button>
            ))}
          </div>
          <p id="project-query-hint" className="text-sm text-muted-foreground">
            <span className="hidden pointer-fine:inline">
              Press <Kbd>/</Kbd> to edit, <Kbd>Enter</Kbd> to run
            </span>
            <span className="pointer-fine:hidden">
              Tap the query to edit it
            </span>
          </p>
        </div>
      </form>

      <p
        role="status"
        className="min-h-6 text-sm text-pretty text-muted-foreground"
      >
        <StatusText status={status} engine={engine} />
      </p>

      <MissingColumns columns={result.columns} onAdd={addColumn} />
      <ul ref={listRef} className="-mx-3 -mt-2 flex flex-col">
        {rowIds(result).map((id, index) => (
          <ResultItem
            key={id}
            id={id}
            columns={result.columns}
            row={result.rows[index]}
          />
        ))}
      </ul>
    </div>
  )
}

function StatusText({
  status,
  engine,
}: {
  status: Status
  engine: "idle" | "loading" | "ready" | "failed"
}) {
  switch (status.kind) {
    case "local":
      return (
        <>
          <span className="text-foreground">
            {plural(status.count, "row")}.{" "}
          </span>
          <span>
            {engine === "failed"
              ? "Filtered in JavaScript. Scuttle DB couldn't load here."
              : "Waking up Scuttle DB in your browser."}
          </span>
        </>
      )
    case "scuttle":
      return (
        <>
          <span className="text-foreground">
            {plural(status.count, "row")} in {formatDuration(status.ms)}.{" "}
          </span>
          <span>
            Run by{" "}
            <Link
              href="/projects/scuttle-db"
              className="rounded-sm text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-current focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-hidden"
            >
              Scuttle DB
            </Link>{" "}
            <span className="font-mono text-xs">{build.commit}</span>, my Rust
            database, compiled to WebAssembly and running on your device.
          </span>
        </>
      )
    case "affected":
      return (
        <span className="text-foreground">
          {plural(status.count, "row")} changed in {formatDuration(status.ms)}.
          Reload to undo.
        </span>
      )
    case "error":
      return <span className="text-foreground">{status.message}</span>
  }
}

/** Splits a query into `SELECT `, its column list, and everything from `FROM` on. */
const SELECT_LIST = /^(\s*select\s+)([\s\S]*?)(\s+from\s[\s\S]*)$/i

const PROJECT_COLUMNS = ["name", "language", "kind", "summary"]

/**
 * Names the project columns a query left out, as buttons that add them back.
 * Hidden for results with other columns (aggregates, aliases), where adding
 * one might not be valid SQL.
 */
function MissingColumns({
  columns,
  onAdd,
}: {
  columns: string[]
  onAdd: (column: string) => void
}) {
  const selected = columns.map((column) => column.toLowerCase())
  const missing = PROJECT_COLUMNS.filter((column) => !selected.includes(column))
  if (
    missing.length === 0 ||
    selected.some((column) => !PROJECT_COLUMNS.includes(column))
  ) {
    return null
  }

  return (
    <p className="text-sm text-muted-foreground">
      Add{" "}
      {missing.map((column, i) => (
        <React.Fragment key={column}>
          {i > 0 && (i === missing.length - 1 ? " and " : ", ")}
          <button
            type="button"
            onClick={() => onAdd(column)}
            className="rounded-sm font-mono text-xs text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-current focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-hidden"
          >
            {column}
          </button>
        </React.Fragment>
      ))}{" "}
      to the SELECT to see {missing.length === 1 ? "it" : "them"}.
    </p>
  )
}

/** The column set as the title: `name` when selected, otherwise the first one. */
function leadColumn(columns: string[]) {
  return Math.max(columns.indexOf("name"), 0)
}

/**
 * Identity for React keys and Flip: the project name when selected, numbered
 * on repeats (an alias can make `name` repeat), otherwise the row's position.
 */
function rowIds({ columns, rows }: QueryResult) {
  const name = columns.indexOf("name")
  const seen = new Map<string, number>()
  return rows.map((row, index) => {
    if (name < 0) return `row:${index}`
    const value = String(row[name])
    const count = seen.get(value) ?? 0
    seen.set(value, count + 1)
    return `name:${value}#${count}`
  })
}

function formatCell(value: Cell) {
  return value === null ? "NULL" : String(value)
}

const rowClass =
  "group flex flex-col gap-1 rounded-lg px-3 py-3 transition-colors hover:bg-muted focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-hidden"

/**
 * One result row in the project list style: the lead column as the title,
 * short columns beside it in query order, and `summary` underneath.
 */
function ResultItem({
  id,
  columns,
  row,
}: {
  id: string
  columns: string[]
  row: Cell[]
}) {
  const nameAt = columns.indexOf("name")
  const project =
    nameAt >= 0 ? projectByName.get(String(row[nameAt])) : undefined
  const lead = leadColumn(columns)

  const cells = columns.map((column, i) => {
    const value = row[i]
    // Stored text is ASCII; show the original when it matches.
    const text =
      column === "summary" && project && value === toAscii(project.summary)
        ? project.summary
        : formatCell(value)
    return { column, text, key: `${column}-${i}`, i }
  })
  const short = cells.filter(
    (cell) => cell.i !== lead && cell.column !== "summary"
  )
  const summaries = cells.filter(
    (cell) => cell.i !== lead && cell.column === "summary"
  )

  const body = (
    <>
      <div className="flex flex-wrap items-baseline gap-x-3">
        <h3 className="font-title">
          <span className="sr-only">{cells[lead].column}: </span>
          {cells[lead].text}
        </h3>
        {short.length > 0 && (
          <p className="text-muted-foreground">
            {short.map((cell, n) => (
              <React.Fragment key={cell.key}>
                {n > 0 && ", "}
                <span className="sr-only">{cell.column}: </span>
                {cell.text}
              </React.Fragment>
            ))}
          </p>
        )}
      </div>
      {summaries.map((cell) => (
        <p key={cell.key} className="text-pretty text-muted-foreground">
          <span className="sr-only">{cell.column}: </span>
          {cell.text}
        </p>
      ))}
    </>
  )

  return (
    <li data-flip-id={id}>
      {project ? (
        project.href.startsWith("/") ? (
          <Link href={project.href} className={rowClass}>
            {body}
          </Link>
        ) : (
          <a href={project.href} className={rowClass}>
            {body}
          </a>
        )
      ) : (
        <div className={rowClass}>{body}</div>
      )}
    </li>
  )
}
