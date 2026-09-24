import type { MetadataRoute } from "next"

import { isProduction, site } from "@/lib/content"

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } }
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  }
}
