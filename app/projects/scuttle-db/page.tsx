import type { Metadata } from "next"

import { ScuttlePlayground } from "@/components/scuttle-playground"

export const metadata: Metadata = {
  title: "Scuttle DB",
  description:
    "A relational database written from scratch in Rust, running in your browser through WebAssembly.",
}

export default function ScuttleDbPage() {
  return (
    <div className="flex flex-col gap-8 pt-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-medium tracking-tight">Scuttle DB</h1>
        <p className="text-muted-foreground">
          Relational database from scratch in Rust, running in your browser
          through WebAssembly. Nothing is saved.
        </p>
        <a
          href="https://github.com/dougrocha/scuttle-db"
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit rounded-sm text-sm underline underline-offset-4 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          Source on GitHub
        </a>
      </div>
      <ScuttlePlayground />
    </div>
  )
}
