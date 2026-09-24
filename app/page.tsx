import { ProjectList } from "@/components/project-list"
import { Section } from "@/components/section"
import { education, experience, projects, site } from "@/lib/content"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pt-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-medium tracking-tight text-balance">
          {site.tagline}
        </h1>
        <p className="text-muted-foreground">{site.title}</p>
      </div>

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
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-medium">
                  {item.role}{" "}
                  <span className="font-normal text-muted-foreground">
                    at {item.org}
                  </span>
                </h3>
                <p className="text-sm text-muted-foreground tabular-nums">
                  {item.period}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">{item.summary}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Education">
        <ul className="flex flex-col gap-6">
          {education.map((item) => (
            <li
              key={item.degree}
              className="flex flex-wrap items-baseline justify-between gap-x-4"
            >
              <h3 className="font-medium">
                {item.degree}{" "}
                <span className="font-normal text-muted-foreground">
                  at {item.school}
                </span>
              </h3>
              <p className="text-sm text-muted-foreground tabular-nums">
                {item.period}
              </p>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  )
}
