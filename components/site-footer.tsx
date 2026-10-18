import { VimKeys } from "@/components/vim-keys"

export function SiteFooter() {
  return (
    <footer className="flex border-t border-border py-8 text-sm text-muted-foreground sm:justify-end">
      <VimKeys />
    </footer>
  )
}
