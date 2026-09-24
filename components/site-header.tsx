"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { site } from "@/lib/content"
import { cn } from "@/lib/utils"

const nav = [{ label: "Projects", href: "/projects" }]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="flex items-center justify-between py-8">
      <Link
        href="/"
        className="rounded-sm font-mono text-sm font-medium focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        {site.name}
      </Link>
      <nav aria-label="Main">
        <ul className="flex gap-6 text-sm">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
                    active && "text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
