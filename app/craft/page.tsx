import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { Section } from "@/components/section"
import { craft, setup, type CraftEntry } from "@/lib/content"
import { alternates, openGraph } from "@/lib/metadata"

export const metadata: Metadata = {
  title: "Craft",
  description: "How Doug Rocha builds things, and the setup behind them.",
  alternates: alternates("/craft"),
  openGraph: openGraph("/craft"),
}

const firstImage = craft
  .flatMap((group) => group.entries)
  .find((entry) => entry.image)?.image?.src

export default function CraftPage() {
  return (
    <div className="flex flex-col gap-16 pt-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-title tracking-tight text-balance">
          Craft
        </h1>
        <p className="max-w-prose text-pretty text-muted-foreground">
          Pieces of the projects, and how I check them.
        </p>
      </div>

      {craft.map((group) => (
        <Section key={group.group} title={group.group}>
          <ul className="flex flex-col gap-12">
            {group.entries.map((entry) => (
              <li key={entry.title}>
                <CraftItem
                  entry={entry}
                  eager={!!entry.image && entry.image.src === firstImage}
                />
              </li>
            ))}
          </ul>
        </Section>
      ))}

      <Section title="Setup">
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 font-mono text-sm">
          {setup.map((item) => (
            <div key={item.label} className="contents">
              <dt className="text-muted-foreground">{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </div>
  )
}

function CraftItem({
  entry,
  eager,
}: {
  entry: CraftEntry
  /** The first image on the page, likely the largest paint. */
  eager: boolean
}) {
  return (
    <article className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-title">{entry.title}</h3>
        <p className="shrink-0 text-muted-foreground tabular-nums">
          {entry.date}
        </p>
      </div>
      <p className="max-w-prose text-pretty text-muted-foreground">
        {entry.note}
      </p>
      {entry.image && (
        <figure className="flex flex-col gap-2">
          <Image
            src={entry.image.src}
            alt={entry.image.alt}
            width={1280}
            height={720}
            sizes="(min-width: 42rem) 40rem, 100vw"
            loading={eager ? "eager" : undefined}
            className="rounded-lg border border-border bg-muted"
          />
          <figcaption className="text-sm text-muted-foreground">
            {entry.image.caption}
          </figcaption>
        </figure>
      )}
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {[entry.link, entry.post].map(
          (link) =>
            link && (
              <CraftLink
                key={link.href}
                href={link.href}
                className="w-fit rounded-sm underline decoration-border underline-offset-4 transition-colors hover:decoration-current focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-hidden"
              >
                {link.label}
              </CraftLink>
            )
        )}
      </div>
    </article>
  )
}

function CraftLink({
  href,
  ...props
}: {
  href: string
  className: string
  children: React.ReactNode
}) {
  if (href.startsWith("/")) return <Link href={href} {...props} />

  return <a href={href} {...props} />
}
