import type { Metadata } from "next"

import { site } from "@/lib/content"

/**
 * Open Graph fields for one route. A page's `openGraph` replaces the root
 * layout's instead of merging with it, so each page passes its own path.
 */
export function openGraph(path: string): Metadata["openGraph"] {
  return { type: "website", siteName: site.name, url: path }
}

/** Canonical URL for one route, so preview and query-string variants don't compete with it. */
export function alternates(path: string): Metadata["alternates"] {
  return { canonical: path }
}
