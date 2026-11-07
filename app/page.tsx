import type { Metadata } from "next"
import Link from "next/link"

import { DemoCue, ProjectList } from "@/components/project-list"
import { Section } from "@/components/section"
import { buttonVariants } from "@/components/ui/button"
import {
  education,
  experience,
  links,
  projects,
  site,
  type Project,
} from "@/lib/content"
import { alternates } from "@/lib/metadata"
import { examples } from "@/lib/scuttle-demo"
import build from "@/lib/scuttle/build.json"

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

const nowProjects = site.now.projects.map((name) =>
  projects.find((project) => project.name === name)!
)

/** The project with a live demo leads the homepage, larger than the rest. */
const featured = nowProjects.find((project) => project.demo)

/** A query the demo offers, shown as the prompt it runs at. */
const featuredQuery = examples.find(
  (example) => example.label === "Rust projects"
)!

/** Consecutive roles at one employer, so the employer is named once. */
function groupByOrg(items: typeof experience) {
  const groups: { org: string; roles: typeof experience }[] = []
  for (const item of items) {
    const last = groups.at(-1)
    if (last?.org === item.org) last.roles.push(item)
    else groups.push({ org: item.org, roles: [item] })
  }
  return groups
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
      <div className="flex flex-col gap-6">
        <h1 className="sr-only">{site.name}</h1>
        <p className="max-w-prose text-xl">
          I build my own database, renderer and tools in Rust and Odin. The
          database runs in your browser.
        </p>

        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                rel="me"
                className="text-link text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <Section title="Now">
        <div className="flex max-w-prose flex-col gap-1">
          <p>{site.now.job}</p>
          <p>{site.now.learning}</p>
        </div>
      </Section>

      <Section
        title="Projects"
        more={{ label: "All projects", href: "/projects" }}
      >
        <div className="flex flex-col gap-10">
          {featured && <FeaturedProject project={featured} />}
          <ProjectList
            projects={nowProjects.filter((project) => project !== featured)}
          />
        </div>
      </Section>

      <Section title="Experience">
        <ul className="flex flex-col gap-10">
          {groupByOrg(experience).map((group) => (
            <li key={group.org} className="flex flex-col gap-4">
              <h3 className="font-title">{group.org}</h3>
              <ul className="flex flex-col gap-6">
                {group.roles.map((item) => (
                  <li key={item.period} className="flex flex-col gap-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <h4>{item.role}</h4>
                      <p className="shrink-0 text-muted-foreground tabular-nums">
                        {item.period}
                      </p>
                    </div>
                    <p className="max-w-prose text-muted-foreground">
                      {item.summary}
                    </p>
                  </li>
                ))}
              </ul>
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

function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-title">{project.name}</h3>
        <p className="text-muted-foreground">
          <DemoCue />
          {[...project.languages, project.kind].join(", ")}
        </p>
      </div>
      <p className="max-w-prose">
        {project.summary} It runs on this site as a{" "}
        <span className="tabular-nums">{Math.round(build.bytes / 1024)}</span>{" "}
        KB WebAssembly file.
      </p>
      <p className="flex items-start gap-2 rounded-lg border px-3 py-2 font-mono text-sm break-words">
        <span aria-hidden="true" className="shrink-0 text-muted-foreground">
          scuttle&gt;
        </span>
        <code className="min-w-0">{featuredQuery.sql};</code>
      </p>
      <Link
        href={project.href}
        className={buttonVariants({ size: "lg", className: "w-fit" })}
      >
        Query it in your browser
      </Link>
    </article>
  )
}
