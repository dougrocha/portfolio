import { SpecialComponents } from 'react-markdown/lib/ast-to-react'
import { NormalComponents } from 'react-markdown/lib/complex-types'

import CustomLink from './a'
import CustomImage from './img'
import CustomCodeBlock from './pre'

const components: Partial<
  Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
> = {
  pre: CustomCodeBlock,
  img: CustomImage,
  a: CustomLink,
}

export { CustomCodeBlock, CustomImage, CustomLink }
export default components
