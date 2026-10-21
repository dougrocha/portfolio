export const isProduction = process.env.VERCEL_ENV === "production"

export const site = {
  name: "Doug Rocha",
  title: "Software Engineer",
  now: {
    job: "Software Engineer at Blue Cross Blue Shield of Arizona, working on the public portal.",
    learning: "Learning about game engines and inference engines with Odin.",
    // Project names, in the order the homepage shows them.
    projects: ["Veil", "Fala", "Scuttle DB"],
  },
  url: "https://dougrocha.com",
  description:
    "Doug Rocha is a software engineer. He builds his own database, renderer and tools in Rust and Odin, and the database runs in your browser.",
}

export const links = [
  { label: "Email", href: "mailto:dougsrocha3@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dougrocha/" },
  { label: "GitHub", href: "https://github.com/dougrocha" },
  { label: "X", href: "https://x.com/dougcoded" },
]

export type Project = {
  name: string
  /** Main language first. */
  languages: string[]
  kind: string
  summary: string
  href: string
  /** Links to an in-browser demo on this site instead of an external page. */
  demo?: boolean
}

export const projects: Project[] = [
  {
    name: "Scuttle DB",
    languages: ["Rust"],
    kind: "Systems",
    summary:
      "A relational database written from scratch, with its own SQL parser, planner, indexes and page-based storage.",
    href: "/projects/scuttle-db",
    demo: true,
  },
  {
    name: "Veil",
    languages: ["Odin", "Slang"],
    kind: "Graphics",
    summary:
      "Vulkan 1.4 renderer with clustered lighting, cascaded shadows and Slang shaders that hot-reload.",
    href: "https://github.com/dougrocha/veil",
  },
  {
    name: "Markdown Language Server",
    languages: ["Rust"],
    kind: "Tooling",
    summary: "Language server for Markdown notes with wiki links.",
    href: "https://github.com/dougrocha/rust_markdown_lsp_server",
  },
  {
    name: "keytrack.nvim",
    languages: ["Lua"],
    kind: "Neovim plugin",
    summary: "Find the keymaps you never use.",
    href: "https://github.com/dougrocha/keytrack.nvim",
  },
  {
    name: "Fala",
    languages: ["Odin"],
    kind: "Inference",
    summary:
      "LLM inference server on llama.cpp, built to learn batching, the KV cache and streaming.",
    href: "https://github.com/dougrocha/fala",
  },
  {
    name: "Quanty",
    languages: ["TypeScript"],
    kind: "Full stack",
    summary:
      "Discord bot with moderation and fun commands, configured from a web dashboard.",
    href: "https://github.com/dougrocha/quanty",
  },
  {
    name: "Forms",
    languages: ["TypeScript"],
    kind: "Full stack",
    summary: "Form builder with shareable links and response stats.",
    href: "https://github.com/dougrocha/form_builder",
  },
  {
    name: "Rust Text Editor",
    languages: ["Rust"],
    kind: "TUI",
    summary: "Vim-style modal editor for the terminal.",
    href: "https://github.com/dougrocha/rust_text_editor",
  },
  {
    name: "Kura",
    languages: ["Rust"],
    kind: "TUI",
    summary:
      "Tagged meme library for the terminal, built on my own TUI framework.",
    href: "https://github.com/dougrocha/kura",
  },
  {
    name: "Meka",
    languages: ["TypeScript"],
    kind: "Full stack",
    summary: "Track and share mechanical keyboard builds.",
    href: "https://github.com/dougrocha/KeyboardTracker",
  },
  {
    name: "Dotfiles",
    languages: [],
    kind: "Config",
    summary:
      "My Linux desktop setup, linked into place by a small Odin program.",
    href: "https://github.com/dougrocha/dotfiles",
  },
]

export type CraftEntry = {
  title: string
  /** Month and year, as shown. */
  date: string
  note: string
  image?: { src: string; alt: string; caption: string }
  links: { label: string; href: string }[]
  /** A writing post about the entry, once there is one. */
  post?: { label: string; href: string }
}

export const craft: { group: string; entries: CraftEntry[] }[] = [
  {
    group: "How I work",
    entries: [
      {
        title: "AI coding tools",
        date: "Oct 2026",
        note: "Learning two new tools. T3 Code runs my coding agents while I learn to trust them with more of the work. Rex is Superlogical's new terminal multiplexer.",
        links: [
          { label: "T3 Code", href: "https://github.com/pingdotgg/t3code" },
          { label: "Superlogical", href: "https://www.superlogical.com/" },
        ],
      },
      {
        title: "Dotfiles",
        date: "Sep 2026",
        note: "My Linux desktop setup, linked into place by a small Odin program.",
        links: [
          { label: "GitHub", href: "https://github.com/dougrocha/dotfiles" },
        ],
      },
    ],
  },
]

export const setup = [
  { label: "OS", value: "Arch Linux, Hyprland" },
  { label: "Terminal", value: "Ghostty, tmux, fish" },
  { label: "Editor", value: "Neovim" },
  { label: "Git", value: "lazygit" },
]

export const experience = [
  {
    role: "Software Engineer",
    org: "Blue Cross Blue Shield of Arizona",
    period: "Jun 2026 to now",
    summary:
      "Restored a third-party lead integration that had been down for months, which brought in hundreds of leads in the first two weeks, ahead of open enrollment. Rebuilt the site header for desktop and mobile after navigation broke on iPhones, with WAI-ARIA keyboard support and Jest tests. Traced a Sitecore Edge publishing bug to an item path being resolved as a query instead of a direct ID, and designed the fix. Created a Sitecore component for storing multi-environment scripts, with customizable settings to filter by page and a key-value store for the values.",
  },
  {
    role: "Software Engineer Intern",
    org: "Blue Cross Blue Shield of Arizona",
    period: "May to Nov 2025",
    summary:
      "Replaced search logic copied across many search boxes with one shared hook that tags each search, so Coveo analytics show which box it came from. Built the Blue Card medical-policy router, which sends out-of-state members to the right page by their ID prefix. Fixed up the Prior Authorization Lookup page, with autocomplete fixes and results that print cleanly to PDF.",
  },
  {
    role: "Software Engineer Intern",
    org: "Blue Cross Blue Shield of Arizona",
    period: "May to Nov 2023",
    summary:
      "Built the forgot-password flow with text and email codes and magic links, and kept sign-in in sync when a magic link opened in a new tab.",
  },
]

export const education = [
  {
    degree: "BS Computer Science",
    school: "Arizona State University",
    period: "2026",
  },
]
