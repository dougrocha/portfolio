import { ProjectList } from "@/components/project-list"
import { Section } from "@/components/section"
import { education, experience, projects, site } from "@/lib/content"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pt-8">
      <h1 className="sr-only">{site.name}</h1>

      <Section title="Currently learning">
        <p>{site.currently}</p>
      </Section>

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
                <h3 className="font-medium">{item.role}</h3>
                <p className="shrink-0 text-sm text-muted-foreground tabular-nums">
                  {item.period}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">{item.org}</p>
              <p className="text-sm text-muted-foreground">{item.summary}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Education">
        <ul className="flex flex-col gap-6">
          {education.map((item) => (
            <li key={item.degree} className="flex flex-col gap-1">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-medium">{item.degree}</h3>
                <p className="shrink-0 text-sm text-muted-foreground tabular-nums">
                  {item.period}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">{item.school}</p>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  )
}
