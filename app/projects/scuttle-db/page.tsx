import type { Metadata } from "next"
import Link from "next/link"

import { ScuttlePlayground } from "@/components/scuttle-playground"
import { alternates, openGraph } from "@/lib/metadata"
import build from "@/lib/scuttle/build.json"

const REPO = "https://github.com/dougrocha/scuttle-db"

export const metadata: Metadata = {
  title: "Scuttle DB",
  description:
    "A relational database written from scratch in Rust, with its own SQL parser, planner, indexes and page-based storage, running in your browser through WebAssembly.",
  alternates: alternates("/projects/scuttle-db"),
  openGraph: openGraph("/projects/scuttle-db"),
}

export default function ScuttleDbPage() {
  return (
    <div className="flex flex-col gap-10 pt-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-title tracking-tight">Scuttle DB</h1>
          <p className="max-w-prose text-lg">
            A relational database I wrote from scratch in Rust, running in your
            browser through WebAssembly. There is no server, and nothing is
            saved.
          </p>
        </div>
        <div className="flex max-w-prose flex-col gap-3 text-muted-foreground">
          <p>
            Primary keys are enforced. Selective lookups, UPDATEs and DELETEs
            find their rows through an index instead of scanning the table, and
            an <code className="font-mono text-foreground">ORDER BY</code> on an
            indexed column reads the index in order instead of sorting. Prefix a
            query with{" "}
            <code className="font-mono text-foreground">EXPLAIN</code> to see
            which plan the planner picked.
          </p>
          <p>
            It also runs the{" "}
            <Link href="/projects" className="text-link text-foreground">
              project list
            </Link>
            , where you can filter this site&apos;s projects with SQL.
          </p>
          <p>
            Queries run on{" "}
            <a
              href={`${REPO}/tree/${build.branch}`}
              className="text-link font-mono text-foreground"
            >
              {build.branch}
            </a>{" "}
            (
            <a
              href={`${REPO}/commit/${build.commit}`}
              className="text-link font-mono text-foreground"
            >
              {build.commit}
            </a>
            ), compiled to a{" "}
            <span className="tabular-nums">
              {Math.round(build.bytes / 1024)}
            </span>{" "}
            KB WebAssembly file.{" "}
            <a href={REPO} className="text-link text-foreground">
              Source on GitHub
            </a>
          </p>
        </div>
      </div>
      <ScuttlePlayground />
    </div>
  )
}
