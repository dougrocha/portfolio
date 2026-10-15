import { projects } from "@/lib/content"

export type Cell = string | number | boolean | null

export type QueryResult = { columns: string[]; rows: Cell[][] }

type Filter = {
  id: string
  label: string
  sql: string
  /** Same result as `sql`, for the server render and when WebAssembly is unavailable. */
  match: (row: SeedRow) => boolean
}

type SeedRow = {
  name: string
  language: string | null
  kind: string | null
  summary: string
  demo: boolean
}

const SELECT = "SELECT name, language, kind, summary FROM projects"

/** Projects in content order. A single tag is a kind with no language, like Dotfiles. */
export const seedRows: SeedRow[] = projects.map(
  ({ name, tags, summary, demo }) => {
    const [language, kind] = tags.length > 1 ? tags : [null, tags[0]]
    return { name, language, kind, summary, demo: demo ?? false }
  }
)

export const filters: Filter[] = [
  { id: "all", label: "All", sql: SELECT, match: () => true },
  ...["Rust", "TypeScript", "Lua"].map((language) => ({
    id: language.toLowerCase(),
    label: language,
    sql: `${SELECT} WHERE language = '${language}'`,
    match: (row: SeedRow) => row.language === language,
  })),
  {
    id: "demo",
    label: "Live demo",
    sql: `${SELECT} WHERE demo = true`,
    match: (row) => row.demo,
  },
]

/**
 * Scuttle DB panics on non-ASCII text, so rows are stored with plain hyphens.
 * The index swaps the original text back in when a stored value matches.
 */
export function toAscii(value: string) {
  return value.replace(/\u2011/g, "-")
}

function text(value: string | null) {
  return value === null ? "NULL" : `'${toAscii(value).replaceAll("'", "''")}'`
}

/** Creates and fills the `projects` table. Insert order is content order, so unordered scans match `seedRows`. */
export const seedStatements = [
  "CREATE TABLE projects (name TEXT, language TEXT, kind TEXT, summary TEXT, demo BOOL)",
  `INSERT INTO projects VALUES ${seedRows
    .map(
      (row) =>
        `(${text(row.name)}, ${text(row.language)}, ${text(row.kind)}, ${text(row.summary)}, ${row.demo})`
    )
    .join(", ")}`,
]

const columns = ["name", "language", "kind", "summary"] as const

export function filterResult(filter: Filter): QueryResult {
  return {
    columns: [...columns],
    rows: seedRows
      .filter(filter.match)
      .map((row) => columns.map((column) => row[column])),
  }
}
