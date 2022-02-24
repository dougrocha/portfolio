import { motion } from 'framer-motion'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import components from './typography'

interface MDXProps {
  mdxSource: MDXRemoteSerializeResult
}

const MDXRenderer = ({ mdxSource }: MDXProps) => {
  return (
    <MDXRemote
      {...mdxSource}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      components={components as any}
      lazy
      scope={{ motion }}
    />
  )
}

export default MDXRenderer
