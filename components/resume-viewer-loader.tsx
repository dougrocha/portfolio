"use client"

import dynamic from "next/dynamic"

/**
 * Holds the space of one A4 page while the viewer and the PDF load, so the
 * page below doesn't jump when the resume appears.
 */
export function ResumePagePlaceholder({
  label,
  width,
}: {
  label: string
  /** Pixels, for a page inside react-pdf, whose wrapper does not stretch. */
  width?: number
}) {
  return (
    <div
      role="status"
      style={width ? { width } : undefined}
      className="aspect-[210/297] w-full bg-muted outline outline-border motion-safe:animate-pulse"
    >
      <span className="sr-only">{label}</span>
    </div>
  )
}

const ResumeViewer = dynamic(
  () => import("@/components/resume-viewer").then((mod) => mod.ResumeViewer),
  {
    ssr: false,
    loading: () => <ResumePagePlaceholder label="Loading resume…" />,
  }
)

export function ResumeViewerLoader() {
  return <ResumeViewer />
}
