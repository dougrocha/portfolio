/** Only production is indexed; previews and local builds tell search engines to stay away. */
export const isProduction = process.env.VERCEL_ENV === "production"

export const site = {
  name: "Doug Rocha",
  title: "Software Engineer",
  intro: "I'm a software engineer with a grudge against bad tooling.",
  currently: "Odin, inference and graphics.",
  url: "https://dougrocha.com",
  description:
    "Doug Rocha is a software engineer building full-stack web apps and Rust tools, from a database that runs in your browser to a language server.",
}

export const links = [
  { label: "Email", href: "mailto:dougsrocha3@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dougrocha/" },
  { label: "GitHub", href: "https://github.com/dougrocha" },
  { label: "X", href: "https://x.com/dougcoded" },
]

export type Project = {
  name: string
  tags: string[]
  summary: string
  href: string
  /** Links to an in-browser demo on this site instead of an external page. */
  demo?: boolean
  featured?: boolean
}

export const projects: Project[] = [
  {
    name: "Scuttle DB",
    tags: ["Rust", "Systems"],
    summary:
      "A relational database written from scratch, with its own SQL parser and B\u2011tree storage.",
    href: "/projects/scuttle-db",
    demo: true,
    featured: true,
  },
  {
    name: "Markdown LSP",
    tags: ["Rust", "Tooling"],
    summary: "Language server for zettelkasten notes.",
    href: "https://github.com/dougrocha/rust_markdown_lsp_server",
    featured: true,
  },
  {
    name: "keytrack.nvim",
    tags: ["Lua", "Neovim plugin"],
    summary: "Find the keymaps you never use.",
    href: "https://github.com/dougrocha/keytrack.nvim",
    featured: true,
  },
  {
    name: "Quanty",
    tags: ["TypeScript", "Full stack"],
    summary:
      "Discord bot with moderation and fun commands, configured from a web dashboard.",
    href: "https://github.com/dougrocha/quanty",
  },
  {
    name: "Forms",
    tags: ["TypeScript", "Full stack"],
    summary: "Build forms, share them, see the stats.",
    href: "https://github.com/dougrocha/form_builder",
  },
  {
    name: "Rust Text Editor",
    tags: ["Rust", "Learning"],
    summary: "Vim-style modal editor for the terminal.",
    href: "https://github.com/dougrocha/rust_text_editor",
  },
  {
    name: "Kura",
    tags: ["Rust", "TUI"],
    summary:
      "Tagged meme library for the terminal, built on Hako, my own TUI framework.",
    href: "https://github.com/dougrocha/kura",
  },
  {
    name: "Meka",
    tags: ["TypeScript", "Full stack"],
    summary: "Track and share mechanical keyboard builds.",
    href: "https://github.com/dougrocha/KeyboardTracker",
  },
  {
    name: "Dotfiles",
    tags: ["Config"],
    summary: "My whole Linux desktop, one setup script.",
    href: "https://github.com/dougrocha/dotfiles",
  },
]

export const experience = [
  {
    role: "Software Engineer",
    org: "Blue Cross Blue Shield of Arizona",
    period: "Jun 2026 to now",
    summary:
      "Restored the HealthSherpa lead integration (no leads from December to September, then about 400 in the first two weeks back), rewrote the site header for desktop and mobile with W3C/WAI-ARIA accessibility and keyboard navigation, and fixed a root bug in the Sitecore publishing process.",
  },
  {
    role: "Software Engineer Intern",
    org: "Blue Cross Blue Shield of Arizona",
    period: "May to Nov 2025",
    summary:
      "Consolidated duplicated search logic into a shared hook and built the Blue Card medical policy router.",
  },
  {
    role: "Software Engineer Intern",
    org: "Blue Cross Blue Shield of Arizona",
    period: "May to Nov 2023",
    summary:
      "Built the forgot password flow with SMS and email codes and a magic link for recovery.",
  },
]

export const education = [
  {
    degree: "BS Computer Science",
    school: "Arizona State University",
    period: "2026",
  },
]
