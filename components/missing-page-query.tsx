"use client"

import * as React from "react"

const subscribeNever = () => () => {}

/**
 * The 404 as a query that came back empty, naming the path that was asked for.
 * The server can't know that path, so it renders a placeholder until hydration.
 */
export function MissingPageQuery() {
  const pathname = React.useSyncExternalStore(
    subscribeNever,
    () => window.location.pathname,
    () => null
  )

  return (
    <div className="flex w-full flex-col gap-2">
      <p className="flex items-start gap-2 rounded-lg border px-3 py-2 font-mono text-sm break-words">
        <span aria-hidden="true" className="shrink-0 text-muted-foreground">
          scuttle&gt;
        </span>
        <span className="min-w-0">
          SELECT * FROM pages WHERE path ={" "}
          {pathname === null ? "?" : `'${pathname.replaceAll("'", "''")}'`}
          <span className="text-muted-foreground">;</span>
        </span>
      </p>
      <p className="text-sm text-muted-foreground">
        <span className="text-foreground">0 rows.</span> No page has this path.
      </p>
    </div>
  )
}
