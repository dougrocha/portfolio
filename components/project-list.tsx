import Link from "next/link"

import type { Project } from "@/lib/content"

export function ProjectList({
  projects,
  headingLevel = "h3",
}: {
  projects: Project[]
  headingLevel?: "h2" | "h3"
}) {
  const Heading = headingLevel

  return (
    <ul className="-mx-3 -my-3 flex flex-col">
      {projects.map((project) => (
        <li key={project.name}>
          <ProjectLink
            href={project.href}
            className="group flex flex-col gap-1 rounded-lg px-3 py-3 focus-ring transition-colors hover:bg-muted"
          >
            <div className="flex flex-wrap items-baseline gap-x-3">
              <Heading className="font-title">{project.name}</Heading>
              <p className="text-muted-foreground">
                {project.demo && <DemoCue />}
                {[...project.languages, project.kind].join(", ")}
              </p>
              {!project.href.startsWith("/") && <ExternalCue />}
            </div>
            <p className="text-muted-foreground">{project.summary}</p>
          </ProjectLink>
        </li>
      ))}
    </ul>
  )
}

/** Projects that run on this site. The one place the brand color shows in a list. */
export function DemoCue() {
  return <span className="text-brand">Live demo, </span>
}

/**
 * Marks rows that leave the site, since the whole row is one link. Every
 * external row goes to GitHub, so the word only goes to screen readers.
 */
export function ExternalCue() {
  return (
    <span className="text-muted-foreground">
      <span
        aria-hidden="true"
        className="inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      >
        ↗
      </span>
      <span className="sr-only">(opens GitHub)</span>
    </span>
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
