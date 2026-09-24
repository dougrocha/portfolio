import type { Metadata } from "next"

import { ScuttlePlayground } from "@/components/scuttle-playground"
import build from "@/lib/scuttle/build.json"

const REPO = "https://github.com/dougrocha/scuttle-db"

export const metadata: Metadata = {
  title: "Scuttle DB",
  description:
    "A relational database written from scratch in Rust, running in your browser through WebAssembly.",
}

export default function ScuttleDbPage() {
  return (
    <div className="flex flex-col gap-8 pt-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-medium tracking-tight text-balance">
          Scuttle DB
        </h1>
        <p className="max-w-prose text-pretty text-muted-foreground">
          Relational database from scratch in Rust, running in your browser
          through WebAssembly. Nothing is saved.
        </p>
        <p className="max-w-prose text-sm text-pretty text-muted-foreground">
          No server: queries run on{" "}
          <a
            href={`${REPO}/tree/${build.branch}`}
            className="rounded-sm font-mono text-foreground underline underline-offset-4 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-hidden"
          >
            {build.branch}
          </a>{" "}
          (
          <a
            href={`${REPO}/commit/${build.commit}`}
            className="rounded-sm font-mono underline underline-offset-4 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-hidden"
          >
            {build.commit}
          </a>
          ), compiled to a {Math.round(build.bytes / 1024)} KB WebAssembly file.
        </p>
        <a
          href={REPO}
          className="w-fit rounded-sm text-sm underline underline-offset-4 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-hidden"
        >
          Source on GitHub
        </a>
      </div>
      <ScuttlePlayground />
    </div>
  )
}
