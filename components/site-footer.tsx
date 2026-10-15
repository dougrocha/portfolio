import { VimKeys } from "@/components/vim-keys"
import { site } from "@/lib/content"

export function SiteFooter() {
  return (
    <footer className="flex flex-col gap-3 border-t border-border py-8 text-sm text-muted-foreground sm:flex-row sm:items-start sm:justify-between sm:gap-8">
      <p>{site.signOff}</p>
      <VimKeys />
    </footer>
  )
}
