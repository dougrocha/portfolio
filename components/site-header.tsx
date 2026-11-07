import Link from "next/link"

import { NavLink } from "@/components/nav-link"
import { site } from "@/lib/content"

const nav = [
  { label: "Projects", href: "/projects" },
  { label: "Craft", href: "/craft" },
  { label: "Resume", href: "/resume" },
]

export function SiteHeader() {
  return (
    <header className="flex items-baseline justify-between gap-4 py-8">
      <Link
        href="/"
        className="rounded-sm font-mono text-sm font-title focus-ring"
      >
        {site.name}
      </Link>
      <nav aria-label="Main" className="shrink-0">
        <ul className="flex items-baseline gap-4 sm:gap-6">
          {nav.map((item) => (
            <li key={item.href}>
              <NavLink href={item.href}>{item.label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
