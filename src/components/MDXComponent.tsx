import { motion } from 'framer-motion'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import components from './typography'

interface MDXProps {
  mdxSource: MDXRemoteSerializeResult
}

const MDXRenderer = ({ mdxSource }: MDXProps) => {
  return (
    <MDXRemote {...mdxSource} components={components} lazy scope={{ motion }} />
  )
}

export default MDXRenderer
