import Link from "next/link"

import { VimKeys } from "@/components/vim-keys"
import { site } from "@/lib/content"

export function SiteFooter() {
  return (
    <footer className="flex flex-col gap-3 border-t border-border py-8 text-sm text-muted-foreground">
      <p className="text-foreground">{site.signOff}</p>
      <p className="max-w-prose text-pretty">
        Set in Newsreader and Geist Mono. The project list on the home page is a
        query against{" "}
        <Link
          href="/projects/scuttle-db"
          className="rounded-sm underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-current focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-hidden"
        >
          Scuttle DB
        </Link>
        , my own database, running in your browser.
      </p>
      <VimKeys />
    </footer>
  )
}
