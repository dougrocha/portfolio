import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"
import { isProduction, site } from "@/lib/content"
import { cn } from "@/lib/utils"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
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
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "/",
  },
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
      className={cn("antialiased", geistSans.variable, geistMono.variable)}
    >
      <body>
        <ThemeProvider forcedTheme="light">
          <a
            href="#main"
            className="sr-only rounded-md bg-background px-3 py-2 text-sm font-medium focus-visible:not-sr-only focus-visible:fixed focus-visible:px-3 focus-visible:py-2 focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-hidden"
          >
            Skip to content
          </a>
          <div className="mx-auto flex min-h-svh max-w-2xl flex-col px-6">
            <SiteHeader />
            <main id="main" className="flex-1">
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
