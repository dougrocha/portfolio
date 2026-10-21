import type { Metadata } from "next"

import { ProjectList } from "@/components/project-list"
import { Section } from "@/components/section"
import { education, experience, links, projects, site } from "@/lib/content"
import { alternates } from "@/lib/metadata"

export const metadata: Metadata = {
  alternates: alternates("/"),
}

const profile = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: site.name,
    alternateName: "Douglas Rocha",
    jobTitle: site.title,
    description: site.description,
    url: site.url,
    sameAs: links
      .filter((link) => link.href.startsWith("https://"))
      .map((link) => link.href),
    worksFor: { "@type": "Organization", name: experience[0].org },
    alumniOf: { "@type": "CollegeOrUniversity", name: education[0].school },
  },
}

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pt-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profile).replace(/</g, "\\u003c"),
        }}
      />
      <h1 className="sr-only">{site.name}</h1>

      <section aria-label="Introduction" className="flex flex-col gap-8">
        <p className="text-[clamp(1.6rem,1.2rem+1.6vw,2.25rem)] leading-[1.15] tracking-[-0.02em] text-balance">
          {site.intro}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                rel="me"
                className="rounded-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-current focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-hidden"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <Section title="Now">
        <div className="flex max-w-prose flex-col gap-4 text-pretty">
          {site.now.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section
        title="Projects"
        more={{ label: "All projects", href: "/projects" }}
      >
        <ProjectList
          projects={projects.filter((project) => project.featured)}
        />
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
