/* tslint:disable */
/* eslint-disable */

/**
 * An in-memory Scuttle DB instance that JavaScript can query.
 *
 * A panic inside the database leaves the WebAssembly instance unusable, so
 * callers should create a new `Db` if [`Db::run`] throws a `RuntimeError`.
 */
export class Db {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Describes how a SQL statement would run, without running it.
     *
     * # Arguments
     *
     * * `sql` - A single SQL statement, without a trailing semicolon
     *
     * # Returns
     *
     * The logical plan as an indented tree, one node per line.
     *
     * # Errors
     *
     * Throws a JavaScript `Error` when the statement fails to parse or references a
     * missing table or column.
     *
     * # Example
     *
     * ```js
     * db.explain("SELECT name FROM users WHERE age > 30");
     * // "Projection: name\n  Filter: age > 30\n    Scan: users"
     * ```
     */
    explain(sql: string): string;
    /**
     * Creates an empty in-memory database.
     *
     * # Returns
     *
     * A database with no tables.
     *
     * # Example
     *
     * ```js
     * import init, { Db } from "./scuttle_wasm.js";
     *
     * await init();
     * const db = new Db();
     * ```
     */
    constructor();
    /**
     * Runs one SQL statement.
     *
     * # Arguments
     *
     * * `sql` - A single SQL statement, without a trailing semicolon
     *
     * # Returns
     *
     * The result as a JSON string with `columns`, `rows` and `rowsAffected`.
     *
     * # Errors
     *
     * Throws a JavaScript `Error` with the database's message when the statement
     * fails to parse, references a missing table or column, or cannot be executed.
     *
     * # Example
     *
     * ```js
     * db.run("CREATE TABLE users (name TEXT)");
     * const { rows } = JSON.parse(db.run("SELECT * FROM users"));
     * ```
     */
    run(sql: string): string;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_db_free: (a: number, b: number) => void;
    readonly db_explain: (a: number, b: number, c: number) => [number, number, number, number];
    readonly db_new: () => number;
    readonly db_run: (a: number, b: number, c: number) => [number, number, number, number];
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
