"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const active = pathname.startsWith(href)

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-hidden",
        active && "text-foreground"
      )}
    >
      {children}
    </Link>
  )
}
