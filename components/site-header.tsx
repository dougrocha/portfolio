import Link from "next/link"

import { NavLink } from "@/components/nav-link"
import { ResumeDialog } from "@/components/resume-dialog"
import { site } from "@/lib/content"

const nav = [{ label: "Projects", href: "/projects" }]

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between gap-4 py-8">
      <Link
        href="/"
        className="rounded-sm font-mono text-sm font-title focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-hidden"
      >
        {site.name}
      </Link>
      <nav aria-label="Main" className="shrink-0">
        <ul className="flex items-center gap-4 sm:gap-6">
          {nav.map((item) => (
            <li key={item.href}>
              <NavLink href={item.href}>{item.label}</NavLink>
            </li>
          ))}
          <li>
            <ResumeDialog />
          </li>
        </ul>
      </nav>
    </header>
  )
}
