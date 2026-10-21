"use client"

import * as React from "react"
import Link from "next/link"

import { projects } from "@/lib/content"
import {
  filterResult,
  filters,
  seedStatements,
  type Cell,
  type QueryResult,
} from "@/lib/project-query"
import { createDatabase, dispose, type Db } from "@/lib/scuttle-db"
import build from "@/lib/scuttle/build.json"
import { ExternalCue } from "@/components/project-list"
import { cn } from "@/lib/utils"
import { Kbd } from "@/components/ui/kbd"

type Status =
  | { kind: "local"; count: number }
  | { kind: "scuttle"; count: number; ms: number }
  | { kind: "affected"; count: number; ms: number }
  | { kind: "error"; message: string }

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function placeCaret(editor: HTMLTextAreaElement) {
  const caret = editor.value.endsWith(";")
    ? editor.value.length - 1
    : editor.value.length
  editor.setSelectionRange(caret, caret)
}

function toStatement(sql: string) {
  return sql.trim().replace(/;$/, "").trimEnd()
}

type Motion = {
  gsap: typeof import("gsap").gsap
  Flip: typeof import("gsap/Flip").Flip
}

/** GSAP stays out of the first load. The list only animates after a visitor acts. */
let motionPromise: Promise<Motion> | null = null

function loadMotion() {
  motionPromise ??= Promise.all([import("gsap"), import("gsap/Flip")]).then(
    ([gsapMod, flipMod]) => {
      const gsap = gsapMod.gsap
      const Flip = flipMod.Flip
      gsap.registerPlugin(Flip)
      return { gsap, Flip }
    }
  )
  return motionPromise
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

/** The server renders the same result, so the list never waits on WebAssembly. */
export function ProjectQuery() {
  const [sql, setSql] = React.useState(`${initial.sql};`)
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
  const listRef = React.useRef<HTMLUListElement>(null)
  const editorRef = React.useRef<HTMLTextAreaElement>(null)
  const motionRef = React.useRef<Motion | null>(null)
  const flipRef = React.useRef<ReturnType<Motion["Flip"]["getState"]> | null>(
    null
  )
  const typingRef = React.useRef<ReturnType<Motion["gsap"]["to"]> | null>(null)
  const runRef = React.useRef(0)
  const sqlRef = React.useRef(sql)
  /** The last query that drew rows, re-run after a write so the list shows the change. */
  const lastSelectRef = React.useRef(initial.sql)

  React.useEffect(() => {
    sqlRef.current = sql
  }, [sql])

  const load = React.useCallback(() => {
    if (loadRef.current) return loadRef.current
    const generation = generationRef.current
    setEngine("loading")
    loadRef.current = createDatabase(seedStatements).then(
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

  /** Results commit immediately. Motion is a bonus, so a cold GSAP never delays them. */
  const commit = React.useCallback(
    (next: QueryResult, run: number, animate: boolean) => {
      if (run !== runRef.current) return
      const list = listRef.current
      const motion = motionRef.current
      if (animate && list && motion && !prefersReducedMotion()) {
        flipRef.current = motion.Flip.getState([...list.children])
      }
      setResult(next)
    },
    []
  )

  React.useLayoutEffect(() => {
    const state = flipRef.current
    const list = listRef.current
    const motion = motionRef.current
    if (!state || !list || !motion) return
    flipRef.current = null
    motion.Flip.from(state, {
      targets: list.children,
      duration: 0.3,
      ease: "power2.out",
      onEnter: (entering) =>
        motion.gsap.fromTo(
          entering,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.2, ease: "power1.out" }
        ),
    })
  }, [result])

  const runInScuttle = React.useCallback(
    async (query: string, run: number, animate: boolean) => {
      const db = await load()
      if (!db || run !== runRef.current) return Boolean(db)

      const statement = toStatement(query)
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
          commit(
            { columns: refreshed.columns, rows: refreshed.rows },
            run,
            animate
          )
          return true
        }

        lastSelectRef.current = statement
        setStatus({ kind: "scuttle", count: response.rows.length, ms })
        commit({ columns: response.columns, rows: response.rows }, run, animate)
      } catch (error) {
        if (error instanceof WebAssembly.RuntimeError) {
          dbRef.current = null
          loadRef.current = null
          dispose(db)
          await load()
          setStatus({
            kind: "error",
            message:
              "That query crashed the database, so it restarted with the sample data.",
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

  React.useEffect(() => {
    const start = () => {
      const run = runRef.current
      // The first run repeats the server result, so it skips the list animation
      // and does not download GSAP.
      void runInScuttle(sqlRef.current, run, false)
    }
    // Safari has no requestIdleCallback.
    const idle = typeof window.requestIdleCallback === "function"
    const id = idle
      ? window.requestIdleCallback(start, { timeout: 2500 })
      : window.setTimeout(start, 1200)

    return () => {
      if (idle) window.cancelIdleCallback(id)
      else window.clearTimeout(id)
      // A load still in flight captured an older generation and frees its database on arrival.
      /* eslint-disable react-hooks/exhaustive-deps -- counters, not DOM nodes */
      generationRef.current++
      runRef.current++
      /* eslint-enable react-hooks/exhaustive-deps */
      typingRef.current?.kill()
      loadRef.current = null
      dispose(dbRef.current)
      dbRef.current = null
    }
  }, [runInScuttle])

  React.useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey)
        return
      if (isTyping(event.target)) return
      event.preventDefault()
      const editor = editorRef.current
      if (!editor) return
      editor.focus()
      placeCaret(editor)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  async function typeQuery(target: string, run: number) {
    typingRef.current?.kill()
    const from = toStatement(sqlRef.current)
    if (prefersReducedMotion() || from === target) {
      setSql(`${target};`)
      return
    }
    let motion = motionRef.current
    if (!motion) {
      try {
        motion = await loadMotion()
        motionRef.current = motion
      } catch {
        setSql(`${target};`)
        return
      }
    }
    if (run !== runRef.current) return
    const gsap = motion.gsap
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
          const text =
            i <= deletes
              ? from.slice(0, from.length - i)
              : target.slice(0, shared + (i - deletes))
          setSql(`${text};`)
        },
        onComplete: () => {
          setSql(`${target};`)
          resolve()
        },
        onInterrupt: () => resolve(),
      })
    })
  }

  async function choose(filter: (typeof filters)[number]) {
    const run = ++runRef.current
    setActive(filter.id)
    // Typing is decoration, so the results never wait for it.
    void typeQuery(filter.sql, run)
    if (dbRef.current) {
      await runInScuttle(filter.sql, run, true)
      return
    }

    const ready = load()
    const next = filterResult(filter)
    setStatus({ kind: "local", count: next.rows.length })
    commit(next, run, true)
    if ((await ready) && run === runRef.current)
      await runInScuttle(filter.sql, run, true)
  }

  async function addColumn(column: string) {
    const match = SELECT_LIST.exec(toStatement(sqlRef.current))
    if (!match) return
    const query = `${match[1]}${match[2]}, ${qualify(column, match[3])}${match[3]}`
    const run = ++runRef.current
    setActive(null)
    void typeQuery(query, run)
    setActive(filters.find((filter) => filter.sql === query)?.id ?? null)
    await runInScuttle(query, run, true)
  }

  /** Starts the GSAP download before the click, so the first filter is not waiting on it. */
  function warmMotion() {
    if (prefersReducedMotion()) return
    void loadMotion()
      .then((motion) => {
        motionRef.current = motion
      })
      .catch(() => {})
  }

  function takeOverTyping() {
    runRef.current++
    typingRef.current?.kill()
  }

  async function submit(event?: React.FormEvent) {
    event?.preventDefault()
    takeOverTyping()
    const run = runRef.current
    const query = sqlRef.current
    setActive(
      filters.find((filter) => filter.sql === toStatement(query))?.id ?? null
    )
    const ran = await runInScuttle(query, run, true)
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
          {/* The hidden copy sets the field's height, so both must wrap identically. */}
          <div className="grid min-w-0 flex-1 grid-cols-1">
            <span
              aria-hidden="true"
              className="invisible col-start-1 row-start-1 break-words whitespace-pre-wrap"
            >
              {sql}
            </span>
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
                takeOverTyping()
                setSql(event.target.value.replace(/\n/g, " "))
                setActive(null)
              }}
              onFocus={() => void load()}
              onKeyDown={(event) => {
                if (event.nativeEvent.isComposing || event.key === "Process")
                  return
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault()
                  void submit()
                }
              }}
              className="col-start-1 row-start-1 h-full resize-none overflow-hidden bg-transparent break-words whitespace-pre-wrap outline-hidden"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <div
            role="group"
            aria-label="Filter projects"
            onPointerEnter={warmMotion}
            onFocus={warmMotion}
            onTouchStart={warmMotion}
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
              : "Starting Scuttle DB in your browser."}
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
            <span className="font-mono text-sm">{build.commit}</span>, my Rust
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

const SELECT_LIST = /^(\s*select\s+)([\s\S]*?)(\s+from\s[\s\S]*)$/i

const PROJECTS_ALIAS =
  /\bfrom\s+projects\s+(?:as\s+)?(?!(?:join|inner|left|where|order|group|limit)\b)([a-z_]\w*)/i

/** A joined table can share a column name, which Scuttle rejects as ambiguous. */
function qualify(column: string, fromClause: string) {
  if (!/\bjoin\b/i.test(fromClause)) return column
  return `${PROJECTS_ALIAS.exec(fromClause)?.[1] ?? "projects"}.${column}`
}

const PROJECT_COLUMNS = ["name", "language", "kind", "summary"]

/**
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
            className="rounded-sm font-mono text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-current focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-hidden"
          >
            {column}
          </button>
        </React.Fragment>
      ))}{" "}
      to the SELECT to see {missing.length === 1 ? "it" : "them"}.
    </p>
  )
}

function leadColumn(columns: string[]) {
  return Math.max(columns.indexOf("name"), 0)
}

/** Repeated names are numbered, since an alias can make `name` repeat. */
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

const staticRowClass = "flex flex-col gap-1 rounded-lg px-3 py-3"
const rowClass = cn(
  staticRowClass,
  "group transition-colors hover:bg-muted focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-hidden"
)

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
  const external = project ? !project.href.startsWith("/") : false

  const cells = columns.map((column, i) => ({
    column,
    text: formatCell(row[i]),
    key: `${column}-${i}`,
    i,
  }))
  const short = cells.filter(
    (cell) => cell.i !== lead && cell.column !== "summary"
  )
  const summaries = cells.filter(
    (cell) => cell.i !== lead && cell.column === "summary"
  )

  const body = (
    <>
      <div className="flex flex-wrap items-baseline gap-x-3">
        <h2 className="font-title">
          <span className="sr-only">{cells[lead].column}: </span>
          {cells[lead].text}
        </h2>
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
        {external && <ExternalCue />}
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
        <div className={staticRowClass}>{body}</div>
      )}
    </li>
  )
}
