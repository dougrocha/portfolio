import type { Metadata } from "next"

import { ResumeViewerLoader } from "@/components/resume-viewer-loader"
import { buttonVariants } from "@/components/ui/button"
import { alternates } from "@/lib/metadata"

// No `openGraph` here: a page's value replaces the root layout's, and this
// route has no opengraph-image file, so it inherits the root image instead.
export const metadata: Metadata = {
  title: "Resume",
  description:
    "Doug Rocha's resume: software engineering experience across Rust, Odin, Neovim plugins and full-stack web apps.",
  alternates: alternates("/resume"),
}

export default function ResumePage() {
  return (
    <div className="flex flex-col gap-8 pt-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-title tracking-tight text-balance">
          Resume
        </h1>
        <a
          href="/resume.pdf"
          download="Doug-Rocha-Resume.pdf"
          className={buttonVariants()}
        >
          Download PDF
        </a>
      </div>
      <ResumeViewerLoader />
    </div>
  )
}
