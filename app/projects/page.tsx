import type { Metadata } from "next"
import dynamic from "next/dynamic"
import Link from "next/link"

import { alternates, openGraph } from "@/lib/metadata"

const ProjectQuery = dynamic(() =>
  import("@/components/project-query").then((mod) => mod.ProjectQuery)
)

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Rust tools, Odin graphics, Neovim plugins and full-stack web apps by Doug Rocha, including a relational database you can query in your browser.",
  alternates: alternates("/projects"),
  openGraph: openGraph("/projects"),
}

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-8 pt-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-title tracking-tight text-balance">
          Projects
        </h1>
        <p className="max-w-prose text-pretty text-muted-foreground">
          This list is a query.{" "}
          <Link
            href="/projects/scuttle-db"
            className="rounded-sm text-foreground underline underline-offset-4 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-hidden"
          >
            Scuttle DB
          </Link>
          , my own database engine, runs it in your browser. Pick a language or
          write some SQL.
        </p>
      </div>
      <ProjectQuery />
    </div>
  )
}
