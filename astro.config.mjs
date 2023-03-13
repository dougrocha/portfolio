import { defineConfig } from "astro/config";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
import mdx from "@astrojs/mdx";

// https://astro.build/config
import vercel from "@astrojs/vercel/static";

// https://astro.build/config
import image from "@astrojs/image";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    react(),
    mdx(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    sitemap(),
  ],
  output: "static",
  adapter: vercel({
    analytics: true,
  }),
  site: "https://dougrocha.com",
});
