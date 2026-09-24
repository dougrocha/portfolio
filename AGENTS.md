# Repository Instructions

## Project overview

- This is a private Next.js portfolio site.
- It uses the App Router under `app/`.
- Most site content lives in `lib/content.ts`.
- Shared UI lives in `components/`.
- shadcn/Base UI components live in `components/ui/`.
- The Scuttle DB browser demo uses generated WebAssembly files in `lib/scuttle/`.

## Tooling

- Use Bun for package scripts. The lockfile is `bun.lock`.
- Important scripts:
  - `bun run dev` starts local Next.js development.
  - `bun run build` builds the production app.
  - `bun run lint` runs ESLint.
  - `bun run typecheck` runs `tsc --noEmit`.
  - `bun run format` runs Prettier on `**/*.{ts,tsx}`.
  - `bun run build:scuttle` rebuilds `lib/scuttle/**` from `../scuttle-db` or `SCUTTLE_DB_DIR`.
  - `bun run preview` deploys a Vercel preview and assigns preview aliases.

## Validation

- For code changes, run the smallest relevant checks first.
- Prefer `bun run typecheck` and `bun run lint` before finishing TypeScript or React changes.
- Run `bun run build` when changes affect routing, metadata, WebAssembly loading, or build config.
- For shell script edits, run `bash -n scripts/<script>.sh`.

## Code style

- TypeScript is strict. Keep types explicit where they clarify data boundaries.
- Use the `@/` path alias for local imports.
- Follow the existing style:
  - No semicolons.
  - Double quotes.
  - Function components for React UI.
  - Small helper functions near the component that uses them.
- Prefer server components by default.
- Add `"use client"` only when a component uses client-only APIs, state, effects, or browser events.
- Keep accessibility behavior intact. Preserve labels, focus styles, `role` attributes, keyboard shortcuts, and status regions.

## Styling and UI

- Styling uses Tailwind CSS v4 in `app/globals.css`.
- Theme tokens are CSS variables. Prefer existing tokens such as `bg-background`, `text-muted-foreground`, `border-border`, and `ring-ring`.
- Use `cn` from `@/lib/utils` or `cn` when composing class names, matching the surrounding file.
- For reusable primitives, follow the existing shadcn/Base UI patterns in `components/ui/`.
- Do not add new UI dependencies unless necessary.

## Content and routes

- Update portfolio content in `lib/content.ts` when possible.
- Keep project links, metadata, sitemap, and robots behavior consistent with `site` and `isProduction`.
- External links in project cards are plain `<a>` elements. Internal links use `next/link`.

## Scuttle DB demo

- Treat `lib/scuttle/scuttle_wasm.js`, `lib/scuttle/scuttle_wasm.d.ts`, `lib/scuttle/scuttle_wasm_bg.wasm`, and `lib/scuttle/build.json` as generated files.
- Do not hand-edit generated Scuttle files unless explicitly asked.
- Use `bun run build:scuttle` to refresh them. That script requires the source repo to be on clean `main` and synced with `origin/main`.
- The demo runs fully in the browser. Be careful with WebAssembly initialization, cleanup via `free()`, and crash recovery paths.

## Deployment scripts

- `scripts/preview.sh` deploys to Vercel preview only. It can deploy uncommitted changes.
- Do not run deployment scripts unless explicitly asked.
