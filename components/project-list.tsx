import Link from "next/link"

import type { Project } from "@/lib/content"

export function ProjectList({
  projects,
  headingLevel = "h3",
}: {
  projects: Project[]
  /** Heading element for project names, so the outline stays in order on each page. */
  headingLevel?: "h2" | "h3"
}) {
  const Heading = headingLevel

  return (
    <ul className="-mx-3 -my-3 flex flex-col">
      {projects.map((project) => (
        <li key={project.name}>
          <ProjectLink
            href={project.href}
            className="group flex flex-col gap-1 rounded-lg px-3 py-3 transition-colors hover:bg-muted focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-hidden"
          >
            <div className="flex flex-wrap items-baseline gap-x-3">
              <Heading className="font-title">{project.name}</Heading>
              <p className="text-muted-foreground">
                {project.demo && (
                  <span className="text-foreground italic">Live demo, </span>
                )}
                {project.tags.join(", ")}
              </p>
            </div>
            <p className="text-pretty text-muted-foreground">
              {project.summary}
            </p>
          </ProjectLink>
        </li>
      ))}
    </ul>
  )
}

function ProjectLink({
  href,
  ...props
}: {
  href: string
  className: string
  children: React.ReactNode
}) {
  if (href.startsWith("/")) return <Link href={href} {...props} />

  return <a href={href} {...props} />
}
