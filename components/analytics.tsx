"use client"

import dynamic from "next/dynamic"

/** Vercel Analytics, loaded after hydration so it stays out of the initial bundle. */
export const Analytics = dynamic(
  () => import("@vercel/analytics/next").then((mod) => mod.Analytics),
  { ssr: false }
)
