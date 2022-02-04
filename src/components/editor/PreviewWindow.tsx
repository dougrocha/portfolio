import ReactMarkDown from 'react-markdown'
import rehypePrism from 'rehype-prism-plus'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import components from 'components/typography'

const PreviewWindow = ({ markDown }: { markDown: string }) => {
  return (
    <ReactMarkDown
      className="w-1/2 h-full overflow-auto p-4 ml-5 prose break-words rounded-md bg-bg-600 dark:prose-invert"
      remarkPlugins={[remarkGfm, require('remark-code-titles')]}
      rehypePlugins={[
        rehypeRaw,
        rehypeSlug,
        [rehypePrism, { ignoreMissing: true, showLineNumbers: true }],
      ]}
      components={components}
    >
      {markDown}
    </ReactMarkDown>
  )
}

export default PreviewWindow
