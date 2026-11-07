import { VimKeys } from "@/components/vim-keys"

export function SiteFooter() {
  return (
    <footer className="flex py-8 text-sm text-muted-foreground sm:justify-end">
      <VimKeys />
    </footer>
  )
}
