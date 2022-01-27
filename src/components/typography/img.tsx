/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image'
import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomImage = ({ ...rest }: any) => <Image {...rest} />

export default CustomImage
