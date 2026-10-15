import { projects } from "@/lib/content"
import { sqlText } from "@/lib/scuttle-db"

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
  languages: string[]
  kind: string
  summary: string
  demo: boolean
  position: number
}

function filterSql(clause: Clause | undefined) {
  if (clause?.column === "language") {
    return `SELECT p.name, p.language, p.kind, p.summary FROM projects p JOIN project_languages l ON l.project = p.name WHERE l.language = ${sqlText(clause.value)} ORDER BY p.position`
  }
  const where = clause?.column === "demo" ? " WHERE demo = true" : ""
  return `SELECT name, language, kind, summary FROM projects${where} ORDER BY position`
}

function describe(id: string, label: string, clause?: Clause): Filter {
  return { id, label, clause, sql: filterSql(clause) }
}

export const seedRows: SeedRow[] = projects.map((project, position) => ({
  name: project.name,
  language: project.languages[0] ?? null,
  languages: project.languages,
  kind: project.kind,
  summary: project.summary,
  demo: project.demo ?? false,
  position,
}))

export const filters: Filter[] = [
  describe("all", "All"),
  ...["Rust", "Odin", "TypeScript", "Lua"].map((language) =>
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
  return row.languages.includes(clause.value)
}

export const seedStatements = [
  "CREATE TABLE projects (name TEXT, language TEXT, kind TEXT, summary TEXT, demo BOOL, position INT)",
  `INSERT INTO projects VALUES ${seedRows
    .map(
      (row) =>
        `(${sqlText(row.name)}, ${sqlText(row.language)}, ${sqlText(row.kind)}, ${sqlText(row.summary)}, ${row.demo}, ${row.position})`
    )
    .join(", ")}`,
  "CREATE TABLE project_languages (project TEXT, language TEXT)",
  `INSERT INTO project_languages VALUES ${seedRows
    .flatMap((row) =>
      row.languages.map(
        (language) => `(${sqlText(row.name)}, ${sqlText(language)})`
      )
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
