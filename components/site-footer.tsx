import { links, site } from "@/lib/content"

export function SiteFooter() {
  return (
    <footer className="mt-24 flex flex-col gap-4 border-t py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
      <p>
        © {new Date().getFullYear()} {site.name}
      </p>
      <ul className="flex gap-6">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="rounded-sm transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
              {...(link.href.startsWith("http") && {
                target: "_blank",
                rel: "noopener noreferrer",
              })}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  )
}
