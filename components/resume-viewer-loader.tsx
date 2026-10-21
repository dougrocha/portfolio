"use client"

import dynamic from "next/dynamic"

const ResumeViewer = dynamic(
  () => import("@/components/resume-viewer").then((mod) => mod.ResumeViewer),
  {
    ssr: false,
    loading: () => (
      <p role="status" className="text-muted-foreground">
        Loading resume…
      </p>
    ),
  }
)

export function ResumeViewerLoader() {
  return <ResumeViewer />
}
