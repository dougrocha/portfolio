import type { Db } from "@/lib/scuttle/scuttle_wasm"

export type { Db }

type Scuttle = typeof import("@/lib/scuttle/scuttle_wasm")

/**
 * Concurrent wasm-bindgen inits each replace the module's instance, which
 * strands any `Db` made by an earlier one, so every database shares one init.
 */
let scuttlePromise: Promise<Scuttle> | null = null

function loadScuttle() {
  scuttlePromise ??= import("@/lib/scuttle/scuttle_wasm")
    .then(async (scuttle) => {
      await scuttle.default()
      return scuttle
    })
    .catch((error: unknown) => {
      scuttlePromise = null
      throw error
    })
  return scuttlePromise
}

export async function createDatabase(seedStatements: string[]) {
  const scuttle = await loadScuttle()
  const db = new scuttle.Db()
  for (const statement of seedStatements) db.run(statement)
  return db
}

/** A crashed instance can throw on `free()`; it's gone either way. */
export function dispose(db: Db | null) {
  try {
    db?.free()
  } catch {}
}

export function sqlText(value: string | null) {
  if (value !== null && /[^\x00-\x7F]/.test(value)) {
    throw new Error("Scuttle DB panics on non-ASCII text.")
  }
  return value === null ? "NULL" : `'${value.replaceAll("'", "''")}'`
}
