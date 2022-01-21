import NavBar from 'components/navbar'
import Head from 'next/head'
import { LayoutProps } from '../utils/types'

const BlogLayout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || 'Douglas Rocha | Blog'}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="My blog. Software engineering tips and tricks."
        />
        <meta property="og:title" content={title || 'Douglas Rocha | Blog'} />
        <meta
          property="og:description"
          content="My blog. Software engineering tips and tricks."
        />
        <meta property="og:url" content="https://dougrocha.com/" />
        <meta property="og:type" content="website" />
      </Head>

      <div className="block min-h-screen overflow-auto antialiased bg-bg">
        <NavBar />
        {children}
      </div>
    </>
  )
}

export default BlogLayout
