/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image'
import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomImage = ({ ...rest }: any) => (
  <Image
    {...rest}
    width="100%"
    height="100%"
    layout="responsive"
    objectFit="contain"
    quality={75}
    blurDataURL="/image-loading.jpg"
    placeholder="blur"
  />
)

export default CustomImage
