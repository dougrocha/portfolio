<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project notes

- Stack: Next.js 16 (App Router), bun, Tailwind CSS 4, shadcn/ui on **Base UI** (`components.json` style `base-nova`). Do not add Radix.
- Before adding or changing shadcn components, check the current docs: https://ui.shadcn.com/llms.txt. Add components with `bunx --bun shadcn@latest add <name>`.
- Base UI uses a `render` prop instead of Radix's `asChild`. Style navigation links with `buttonVariants` on a `Link` rather than rendering a link through `Button`, so they keep link semantics.
- Site content (projects, experience, education) lives in `lib/content.ts`.
- `bun run build:scuttle` rebuilds the Scuttle DB WebAssembly package from `../scuttle-db` (clean `main` only). `bun run preview` deploys a Vercel preview and points `next.dougrocha.com` at it; it never deploys to production.
- Design and review skills are in `.claude/skills` (`frontend-design`, `apple-design`, `better-interface` and the `better-*` domain skills).
