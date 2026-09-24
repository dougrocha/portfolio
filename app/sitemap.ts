import type { MetadataRoute } from "next"

import { site } from "@/lib/content"

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/projects", "/projects/scuttle-db"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }))
}
