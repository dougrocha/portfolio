export const site = {
  name: "Doug Rocha",
  title: "Software Engineer",
  tagline:
    "Low-level programming in Rust and Odin. Tools, web dev and full stack.",
  currently: "Learning Odin, inference and graphics.",
  url: "https://dougrocha.com",
  description:
    "Doug Rocha is a software engineer building web apps and Rust tools.",
}

export const links = [
  { label: "Email", href: "mailto:dougsrocha3@gmail.com" },
  { label: "GitHub", href: "https://github.com/dougrocha" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dougrocha/" },
]

export type Project = {
  name: string
  tags: string[]
  summary: string
  href: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    name: "Scuttle DB",
    tags: ["Rust", "Systems"],
    summary: "Relational database from scratch. SQL parser to B\u2011trees.",
    href: "https://github.com/dougrocha/scuttle-db",
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
    tags: ["TypeScript", "Full Stack"],
    summary: "All-in-one Discord bot. 11★ on GitHub.",
    href: "https://github.com/dougrocha/quanty",
    featured: true,
  },
  {
    name: "Forms",
    tags: ["TypeScript", "Full Stack"],
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
    tags: ["Rust", "Early"],
    summary: "Store and find my memes from a TUI.",
    href: "https://github.com/dougrocha/kura",
  },
  {
    name: "Meka",
    tags: ["TypeScript", "Full Stack"],
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
    period: "Jun 2026 – now",
    summary: "Next.js, .NET, Sitecore.",
  },
  {
    role: "Software Engineer Intern",
    org: "Blue Cross Blue Shield of Arizona",
    period: "May – Nov 2025",
    summary:
      "Worked on the Prior Auth lookup form flow and built its print view. Built the Blue Card medical policy lookup and a shared search hook with Coveo analytics.",
  },
  {
    role: "Full-Stack Intern",
    org: "Blue Cross Blue Shield of Arizona",
    period: "May – Nov 2023",
    summary: "Shipped the forgot-password flow with SMS account recovery.",
  },
]

export const education = [
  {
    degree: "BS Computer Science",
    school: "Arizona State University",
    period: "2026",
  },
]
