import { ReactNode } from 'react-markdown/lib/ast-to-react'

import CustomLink from './a'
import CustomImage from './img'
import CustomCodeBlock from './pre'

const components: Record<string, ReactNode> = {
  pre: CustomCodeBlock,
  img: CustomImage,
  a: CustomLink,
}

export { CustomCodeBlock, CustomImage, CustomLink }
export default components
