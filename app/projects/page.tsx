import type { Metadata } from "next"

import { ProjectList } from "@/components/project-list"
import { projects } from "@/lib/content"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Rust tools, Neovim plugins and full-stack web apps by Doug Rocha.",
}

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-8 pt-8">
      <h1 className="text-2xl font-medium tracking-tight text-balance">
        Projects
      </h1>
      <ProjectList projects={projects} headingLevel="h2" />
    </div>
  )
}
