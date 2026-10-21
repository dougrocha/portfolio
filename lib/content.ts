export const isProduction = process.env.VERCEL_ENV === "production"

export const site = {
  name: "Doug Rocha",
  title: "Software Engineer",
  intro: "I'm a software engineer with a grudge against bad tooling.",
  now: [
    "Software engineer at Blue Cross Blue Shield of Arizona. I work mostly on the public site: lead integrations, navigation and publishing.",
    "Outside work I'm learning Odin, inference and graphics by building the hard parts myself: a Vulkan renderer and an LLM inference server.",
  ],
  url: "https://dougrocha.com",
  description:
    "Doug Rocha is a software engineer who builds Rust and Odin projects, from a database that runs in your browser to a Vulkan renderer.",
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
  featured?: boolean
}

export const projects: Project[] = [
  {
    name: "Scuttle DB",
    languages: ["Rust"],
    kind: "Systems",
    summary:
      "A relational database written from scratch, with its own SQL parser, planner and page-based storage.",
    href: "/projects/scuttle-db",
    demo: true,
    featured: true,
  },
  {
    name: "Veil",
    languages: ["Odin", "Slang"],
    kind: "Graphics",
    summary:
      "Vulkan 1.4 renderer with clustered lighting, cascaded shadows and Slang shaders that hot-reload.",
    href: "https://github.com/dougrocha/veil",
    featured: true,
  },
  {
    name: "Markdown Language Server",
    languages: ["Rust"],
    kind: "Tooling",
    summary: "Language server for Markdown notes with wiki links.",
    href: "https://github.com/dougrocha/rust_markdown_lsp_server",
    featured: true,
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
    summary: "Build forms, share them, see the stats.",
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
  link: { label: string; href: string }
  /** A writing post about the entry, once there is one. */
  post?: { label: string; href: string }
}

export const craft: { group: string; entries: CraftEntry[] }[] = [
  {
    group: "How I work",
    entries: [
      {
        title: "Dotfiles",
        date: "Sep 2026",
        note: "My Linux desktop setup, linked into place by a small Odin program.",
        link: {
          label: "GitHub",
          href: "https://github.com/dougrocha/dotfiles",
        },
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
      "Restored a third-party lead integration that had been down for months, which brought in hundreds of leads in the first two weeks. Rebuilt the site header for desktop and mobile with WAI-ARIA accessibility and full keyboard navigation. Fixed the root cause of a Sitecore publishing bug.",
  },
  {
    role: "Software Engineer Intern",
    org: "Blue Cross Blue Shield of Arizona",
    period: "May to Nov 2025",
    summary:
      "Consolidated duplicated search logic into a shared hook and built the Blue Card medical-policy router.",
  },
  {
    role: "Software Engineer Intern",
    org: "Blue Cross Blue Shield of Arizona",
    period: "May to Nov 2023",
    summary:
      "Built the forgot password flow with SMS and email codes and a magic link.",
  },
]

export const education = [
  {
    degree: "BS Computer Science",
    school: "Arizona State University",
    period: "2026",
  },
]
