import { serialize } from 'next-mdx-remote/serialize'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

interface mdxSourceProps {
  content: string
  frontMatter: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
  }
}

const getMdxSource = async ({ content, frontMatter }: mdxSourceProps) => {
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, require('remark-code-titles')],
      rehypePlugins: [[rehypePrism, { ignoreMissing: true }], rehypeSlug],
    },
    scope: frontMatter,
  })

  return mdxSource
}

export default getMdxSource
