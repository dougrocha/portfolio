// @ts-check
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [
    mdx(),
    react({
      experimentalReactChildren: true,
    }),
  ],

  adapter: vercel({
    webAnalytics: { enabled: true },
  }),

  site: process.env.CI ? "https://dougrocha.com" : "http://localhost:4321",

  vite: {
    plugins: [tailwindcss()],
  },
});
