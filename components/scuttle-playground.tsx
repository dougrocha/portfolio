"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {
  examples,
  seedStatements,
  splitStatements,
  tables,
} from "@/lib/scuttle-demo"

type Cell = string | number | boolean | null

type Change = { columns: string[]; before: Cell[][]; after: Cell[][] }

type Output =
  | { kind: "rows"; columns: string[]; rows: Cell[][] }
  | { kind: "affected"; count: number; change: Change | null }
  | { kind: "done" }
  | { kind: "error"; message: string }

/** The last statement's output, its plan, and time spent inside the database. */
type RunResult = { output: Output; plan: string | null; ms: number }

type Db = {
  run(sql: string): string
  explain(sql: string): string
  free(): void
}

async function createDatabase(): Promise<Db> {
  const scuttle = await import("@/lib/scuttle/scuttle_wasm")
  await scuttle.default()
  const db = new scuttle.Db()
  for (const statement of seedStatements) db.run(statement)
  return db
}

function formatCell(value: Cell) {
  return value === null ? "NULL" : String(value)
}

/** Browsers round `performance.now()`, so a zero reading means "too fast to measure". */
function formatDuration(ms: number) {
  if (ms === 0) return "under 1 ms"
  return `${ms < 1 ? ms.toFixed(2) : ms.toFixed(1)} ms`
}

function plural(count: number, noun: string) {
  return `${count} ${count === 1 ? noun : `${noun}s`}`
}

/** Rows in `a` that are not in `b`, counting duplicates. */
function missingFrom(a: Cell[][], b: Cell[][]) {
  const remaining = new Map<string, number>()
  for (const row of b) {
    const key = JSON.stringify(row)
    remaining.set(key, (remaining.get(key) ?? 0) + 1)
  }
  return a.filter((row) => {
    const key = JSON.stringify(row)
    const count = remaining.get(key) ?? 0
    if (count === 0) return true
    remaining.set(key, count - 1)
    return false
  })
}

/** The table an UPDATE or DELETE writes to, or `null` for other statements. */
function writeTarget(statement: string) {
  const match = /^\s*(?:update\s+(\w+)|delete\s+from\s+(\w+))/i.exec(statement)
  return match ? (match[1] ?? match[2]) : null
}

function selectAll(db: Db, table: string) {
  try {
    const { columns, rows } = JSON.parse(db.run(`SELECT * FROM ${table}`))
    return { columns: columns as string[], rows: rows as Cell[][] }
  } catch (error) {
    if (error instanceof WebAssembly.RuntimeError) throw error
    return null
  }
}

/** Thrown when a panic inside the database has left the instance unusable. */
class CrashedError extends Error {}

/** Runs each statement in `query` and returns the last result, stopping at the first error. */
function execute(db: Db, query: string): RunResult {
  let output: Output = { kind: "done" }
  let plan: string | null = null
  let ms = 0

  for (const statement of splitStatements(query)) {
    try {
      const target = writeTarget(statement)
      const before = target ? selectAll(db, target) : null

      const start = performance.now()
      const response = JSON.parse(db.run(statement))
      ms += performance.now() - start

      const after = target && before ? selectAll(db, target) : null
      plan = db.explain(statement)

      output =
        response.rowsAffected !== null
          ? {
              kind: "affected",
              count: response.rowsAffected,
              change:
                before && after
                  ? {
                      columns: before.columns,
                      before: missingFrom(before.rows, after.rows),
                      after: missingFrom(after.rows, before.rows),
                    }
                  : null,
            }
          : response.columns.length > 0
            ? { kind: "rows", columns: response.columns, rows: response.rows }
            : { kind: "done" }
    } catch (error) {
      if (error instanceof WebAssembly.RuntimeError) throw new CrashedError()
      return {
        output: {
          kind: "error",
          message: error instanceof Error ? error.message : String(error),
        },
        plan: null,
        ms,
      }
    }
  }

  return { output, plan, ms }
}

export function ScuttlePlayground() {
  const dbRef = React.useRef<Db | null>(null)
  const editorRef = React.useRef<HTMLTextAreaElement>(null)
  const [status, setStatus] = React.useState<"loading" | "ready" | "failed">(
    "loading"
  )
  const [sql, setSql] = React.useState(examples[0].sql)
  const [result, setResult] = React.useState<RunResult | null>(null)
  const [notice, setNotice] = React.useState<string | null>(null)
  const [showPlan, setShowPlan] = React.useState(false)
  const output = result?.output

  React.useEffect(() => {
    let cancelled = false

    createDatabase().then(
      (db) => {
        if (cancelled) return db.free()
        dbRef.current = db
        setStatus("ready")
      },
      () => !cancelled && setStatus("failed")
    )

    return () => {
      cancelled = true
      dbRef.current?.free()
      dbRef.current = null
    }
  }, [])

  async function reset() {
    dbRef.current?.free()
    dbRef.current = await createDatabase()
  }

  async function run(query: string) {
    const db = dbRef.current
    if (!db) return

    setNotice(null)
    try {
      setResult(execute(db, query))
    } catch (error) {
      if (!(error instanceof CrashedError)) throw error
      await reset()
      setResult({
        output: {
          kind: "error",
          message:
            "That query crashed the database. It has been restarted with the sample data.",
        },
        plan: null,
        ms: 0,
      })
    }
  }

  async function resetData() {
    await reset()
    setResult(null)
    setNotice("Sample data restored.")
  }

  function loadExample(query: string) {
    setSql(query)
    editorRef.current?.focus()
  }

  if (status === "failed") {
    return (
      <p role="alert" className="text-sm text-destructive">
        The database couldn&apos;t start in this browser. WebAssembly may be
        turned off.
      </p>
    )
  }

  const ready = status === "ready"

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
        {tables.map((table) => (
          <p key={table.name}>
            <span className="font-mono text-foreground">{table.name}</span> (
            {table.columns.join(", ")})
          </p>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {examples.map((example) => (
          <Button
            key={example.label}
            variant="outline"
            size="sm"
            disabled={!ready}
            onClick={() => loadExample(example.sql)}
          >
            {example.label}
          </Button>
        ))}
      </div>

      <form
        className="flex flex-col gap-3"
        onSubmit={(event) => {
          event.preventDefault()
          run(sql)
        }}
      >
        <label htmlFor="scuttle-sql" className="sr-only">
          SQL query
        </label>
        <Textarea
          id="scuttle-sql"
          ref={editorRef}
          value={sql}
          onChange={(event) => setSql(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
              event.preventDefault()
              run(sql)
            }
          }}
          spellCheck={false}
          rows={4}
          className="font-mono text-sm"
        />
        <div className="flex items-center gap-2">
          <Button type="submit" disabled={!ready}>
            {ready ? "Run" : "Starting database…"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            aria-pressed={showPlan}
            onClick={() => setShowPlan((show) => !show)}
          >
            {showPlan ? "Hide plan" : "Show plan"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            disabled={!ready}
            onClick={resetData}
          >
            Reset data
          </Button>
          <span className="ml-auto hidden text-xs text-muted-foreground sm:inline">
            Ctrl + Enter to run
          </span>
        </div>
      </form>

      <div aria-live="polite" className="flex flex-col gap-2">
        {notice && <p className="text-sm text-muted-foreground">{notice}</p>}
        {output?.kind === "error" && (
          <p role="alert" className="font-mono text-sm text-destructive">
            {output.message}
          </p>
        )}
        {output?.kind === "affected" && (
          <>
            <p className="text-sm text-muted-foreground">
              {plural(output.count, "row")} affected in{" "}
              {formatDuration(result!.ms)}.
            </p>
            {output.change &&
              output.change.before.length === 0 &&
              output.change.after.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No values changed.
                </p>
              )}
            {output.change &&
              (output.change.before.length > 0 ||
                output.change.after.length > 0) && (
                <div className="flex flex-col gap-4">
                  {(["before", "after"] as const).map((when) => (
                    <div key={when} className="flex flex-col gap-2">
                      <h3 className="text-sm font-medium text-muted-foreground capitalize">
                        {when}
                      </h3>
                      {output.change![when].length > 0 ? (
                        <ResultTable
                          columns={output.change!.columns}
                          rows={output.change![when]}
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          {when === "after" ? "Removed." : "No rows."}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
          </>
        )}
        {output?.kind === "done" && (
          <p className="text-sm text-muted-foreground">
            Done in {formatDuration(result!.ms)}.
          </p>
        )}
        {output?.kind === "rows" && (
          <>
            <ResultTable columns={output.columns} rows={output.rows} />
            <p className="text-sm text-muted-foreground">
              {plural(output.rows.length, "row")} in{" "}
              {formatDuration(result!.ms)}
            </p>
          </>
        )}
        {showPlan && result?.plan && (
          <div className="mt-4 flex flex-col gap-2">
            <h3 className="text-sm font-medium text-muted-foreground">Plan</h3>
            <pre className="overflow-x-auto rounded-lg bg-muted p-3 font-mono text-sm">
              {result.plan}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

function ResultTable({ columns, rows }: { columns: string[]; rows: Cell[][] }) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, i) => (
              <TableHead key={i} className="font-mono">
                {column}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              {row.map((cell, j) => (
                <TableCell
                  key={j}
                  className={
                    cell === null ? "text-muted-foreground" : undefined
                  }
                >
                  {formatCell(cell)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
