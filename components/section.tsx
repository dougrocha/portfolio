import Link from "next/link"

export function Section({
  title,
  more,
  children,
}: {
  title: string
  more?: { label: string; href: string }
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
        {more && (
          <Link
            href={more.href}
            className="rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-hidden"
          >
            {more.label}
          </Link>
        )}
      </div>
      {children}
    </section>
  )
}
