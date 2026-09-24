import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-start gap-4 pt-8">
      <h1 className="text-2xl font-medium tracking-tight text-balance">
        Page not found
      </h1>
      <p className="text-muted-foreground">
        This page doesn’t exist. It may have moved when the site was rebuilt.
      </p>
      <Button asChild variant="outline">
        <Link href="/">Go to the home page</Link>
      </Button>
    </div>
  )
}
