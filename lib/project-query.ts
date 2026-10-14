import { projects } from "@/lib/content"

export type Cell = string | number | boolean | null

export type QueryResult = { columns: string[]; rows: Cell[][] }

type Clause = { column: "language"; value: string } | { column: "demo" }

type Filter = {
  id: string
  label: string
  clause?: Clause
  sql: string
}

type SeedRow = {
  name: string
  language: string | null
  kind: string
  summary: string
  demo: boolean
  position: number
}

const SELECT = "SELECT name, language, kind, summary FROM projects"
const ORDER = " ORDER BY position"

function whereSql(clause: Clause | undefined) {
  if (!clause) return ""
  if (clause.column === "demo") return " WHERE demo = true"
  return ` WHERE language = '${clause.value}'`
}

function describe(id: string, label: string, clause?: Clause): Filter {
  return { id, label, clause, sql: `${SELECT}${whereSql(clause)}${ORDER}` }
}

export const seedRows: SeedRow[] = projects.map((project, position) => ({
  name: project.name,
  language: project.language,
  kind: project.kind,
  summary: project.summary,
  demo: project.demo ?? false,
  position,
}))

export const filters: Filter[] = [
  describe("all", "All"),
  ...["Rust", "TypeScript", "Lua"].map((language) =>
    describe(language.toLowerCase(), language, {
      column: "language",
      value: language,
    })
  ),
  describe("demo", "Live demo", { column: "demo" }),
]

function matches(clause: Clause | undefined, row: SeedRow) {
  if (!clause) return true
  if (clause.column === "demo") return row.demo
  return row.language === clause.value
}

function text(value: string | null) {
  return value === null ? "NULL" : `'${value.replaceAll("'", "''")}'`
}

export const seedStatements = [
  "CREATE TABLE projects (name TEXT, language TEXT, kind TEXT, summary TEXT, demo BOOL, position INT)",
  `INSERT INTO projects VALUES ${seedRows
    .map(
      (row) =>
        `(${text(row.name)}, ${text(row.language)}, ${text(row.kind)}, ${text(row.summary)}, ${row.demo}, ${row.position})`
    )
    .join(", ")}`,
]

const columns = ["name", "language", "kind", "summary"] as const

export function filterResult(filter: Filter): QueryResult {
  return {
    columns: [...columns],
    rows: seedRows
      .filter((row) => matches(filter.clause, row))
      .map((row) => columns.map((column) => row[column])),
  }
}
