import { projects } from "@/lib/content"

const ACTIVE_PROJECTS = new Set(["Scuttle DB", "Markdown LSP"])

const skills: [name: string, kind: string, atWork: boolean][] = [
  ["Rust", "language", false],
  ["Odin", "language", false],
  ["TypeScript", "language", true],
  ["Lua", "language", false],
  ["Next.js", "framework", true],
  [".NET", "framework", true],
  ["Sitecore", "platform", true],
  ["Coveo", "platform", true],
  ["Neovim", "tool", false],
]

function text(value: string | undefined) {
  return value === undefined ? "NULL" : `'${value.replaceAll("'", "''")}'`
}

/** Statements that create and fill the demo tables, run once per page load. */
export const seedStatements = [
  "CREATE TABLE projects (name TEXT, language TEXT, kind TEXT, active BOOL)",
  `INSERT INTO projects VALUES ${projects
    .map(({ name, tags }) => {
      const [language, kind] = tags.length > 1 ? tags : [undefined, tags[0]]
      return `(${text(name)}, ${text(language)}, ${text(kind)}, ${ACTIVE_PROJECTS.has(name)})`
    })
    .join(", ")}`,
  "CREATE TABLE skills (name TEXT, kind TEXT, at_work BOOL)",
  `INSERT INTO skills VALUES ${skills
    .map(([name, kind, atWork]) => `(${text(name)}, ${text(kind)}, ${atWork})`)
    .join(", ")}`,
]

export const tables = [
  { name: "projects", columns: ["name", "language", "kind", "active"] },
  { name: "skills", columns: ["name", "kind", "at_work"] },
]

export const examples = [
  { label: "All projects", sql: "SELECT * FROM projects" },
  {
    label: "Rust projects",
    sql: "SELECT name, kind FROM projects WHERE language = 'Rust'",
  },
  {
    label: "Count by language",
    sql: "SELECT language, COUNT(*) AS total FROM projects GROUP BY language",
  },
  {
    label: "Used at work",
    sql: "SELECT name, kind FROM skills WHERE at_work = true ORDER BY name",
  },
  {
    label: "Update a row",
    sql: "UPDATE projects SET active = true WHERE name = 'Kura'",
  },
]

/** Splits a script into statements on semicolons that are outside quotes. */
export function splitStatements(sql: string) {
  const statements: string[] = []
  let current = ""
  let quoted = false

  for (const char of sql) {
    if (char === "'") quoted = !quoted
    if (char === ";" && !quoted) {
      statements.push(current)
      current = ""
    } else {
      current += char
    }
  }
  statements.push(current)

  return statements.map((s) => s.trim()).filter(Boolean)
}
