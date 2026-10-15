import { projects } from "@/lib/content"
import { sqlText } from "@/lib/scuttle-db"

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

export const seedStatements = [
  "CREATE TABLE projects (name TEXT, language TEXT, kind TEXT, active BOOL)",
  `INSERT INTO projects VALUES ${projects
    .map(({ name, language, kind }) => {
      return `(${sqlText(name)}, ${sqlText(language)}, ${sqlText(kind)}, ${ACTIVE_PROJECTS.has(name)})`
    })
    .join(", ")}`,
  "CREATE TABLE skills (name TEXT, kind TEXT, at_work BOOL)",
  `INSERT INTO skills VALUES ${skills
    .map(
      ([name, kind, atWork]) =>
        `(${sqlText(name)}, ${sqlText(kind)}, ${atWork})`
    )
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
