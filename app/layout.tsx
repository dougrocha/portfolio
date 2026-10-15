import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Geist_Mono, Newsreader } from "next/font/google"

import "./globals.css"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"
import { isProduction, site } from "@/lib/content"
import { openGraph } from "@/lib/metadata"
import { cn } from "@/lib/utils"

// Body copy is 400. Buttons and the skip link use 500 (`font-medium`).
// Headings, including `font-title`, are Geist Mono.
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: "normal",
  variable: "--font-newsreader",
})

// One italic on the projects page ("Live demo"). Kept off the preload list.
const newsreaderItalic = Newsreader({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-newsreader-italic",
  preload: false,
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.title}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  robots: isProduction ? undefined : { index: false, follow: false },
  openGraph: openGraph("/"),
  twitter: { card: "summary_large_image", creator: "@dougcoded" },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        newsreader.variable,
        newsreaderItalic.variable,
        geistMono.variable
      )}
    >
      <head>
        {/* Marks Apple platforms before first paint, so shortcut hints never flip after hydration. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.dataset.platform=/Mac|iPhone|iPad|iPod/.test(navigator.userAgent)?"apple":"other"`,
          }}
        />
      </head>
      <body>
        <ThemeProvider forcedTheme="light">
          <a
            href="#main"
            className="sr-only rounded-md bg-background px-3 py-2 text-sm font-medium focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:px-3 focus-visible:py-2 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-hidden"
          >
            Skip to content
          </a>
          <div className="mx-auto flex min-h-svh max-w-2xl flex-col px-6">
            <SiteHeader />
            <main id="main" className="flex-1 pb-16">
              {children}
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
