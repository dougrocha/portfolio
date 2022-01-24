export interface IconProps {
  height: string
}

export interface LayoutProps {
  children: React.ReactNode
  title?: string
}

export interface ISlugBlogPosts {
  slug: string
  frontMatter: IBlogPost
}

export interface IBlogPost {
  categories: string[]
  date: string
  description?: string
  title: string
  isPinned?: boolean
  isNew?: boolean
}
