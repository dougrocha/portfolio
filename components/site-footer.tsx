import { VimKeys } from "@/components/vim-keys"
import { site } from "@/lib/content"

export function SiteFooter() {
  return (
    <footer className="flex flex-col gap-3 border-t border-border py-8 text-sm text-muted-foreground">
      <p className="text-foreground">{site.signOff}</p>
      <p>Set in Newsreader and Geist Mono.</p>
      <VimKeys />
    </footer>
  )
}
