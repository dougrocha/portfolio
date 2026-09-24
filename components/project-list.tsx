import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import type { Project } from "@/lib/content"

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <ul className="-mx-3 flex flex-col">
      {projects.map((project) => (
        <li key={project.name}>
          <ProjectLink
            href={project.href}
            className="group flex flex-col gap-1 rounded-lg px-3 py-3 transition-colors hover:bg-muted focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-medium">{project.name}</h3>
              {project.demo && <Badge variant="outline">Live demo</Badge>}
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{project.summary}</p>
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

  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
}
