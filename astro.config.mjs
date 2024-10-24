import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'

// https://astro.build/config
import mdx from '@astrojs/mdx'

// https://astro.build/config
import vercel from '@astrojs/vercel/static'

// https://astro.build/config
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), tailwind(), react()],
  adapter: vercel(),
  site: process.env.CI ? 'https://dougrocha.com' : 'http://localhost:4321',
})
