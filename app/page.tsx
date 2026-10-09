import { ProjectList } from "@/components/project-list"
import { Section } from "@/components/section"
import { education, experience, links, projects, site } from "@/lib/content"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pt-8">
      <h1 className="sr-only">{site.name}</h1>

      <section
        aria-label="Introduction"
        className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between"
      >
        <p className="max-w-prose text-pretty sm:w-full">{site.intro}</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="rounded-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-current focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-hidden"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-pretty">
          <span className="text-muted-foreground">Learning </span>
          {site.currently}
        </p>
      </section>

      <Section
        title="Projects"
        more={{ label: "All projects", href: "/projects" }}
      >
        <ProjectList projects={projects.filter((p) => p.featured)} />
      </Section>

      <Section title="Experience">
        <ul className="flex flex-col gap-6">
          {experience.map((item) => (
            <li key={item.period} className="flex flex-col gap-1">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-title">{item.role}</h3>
                <p className="shrink-0 text-muted-foreground tabular-nums">
                  {item.period}
                </p>
              </div>
              <p className="text-muted-foreground">{item.org}</p>
              <p className="max-w-prose text-pretty text-muted-foreground">
                {item.summary}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Education">
        <ul className="flex flex-col gap-6">
          {education.map((item) => (
            <li key={item.degree} className="flex flex-col gap-1">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-title">{item.degree}</h3>
                <p className="shrink-0 text-muted-foreground tabular-nums">
                  {item.period}
                </p>
              </div>
              <p className="text-muted-foreground">{item.school}</p>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  )
}
