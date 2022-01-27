import Head from 'next/head'
import Contact from '../components/contact'
import NavBar from '../components/navbar'
import { LayoutProps } from '../utils/types'

const DefaultLayout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || 'Douglas Rocha | Portfolio'}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="My portfolio. Check out some of my projects and contact me if you like them."
        />
        <meta
          property="og:title"
          content={title || 'Douglas Rocha | Portfolio'}
        />
        <meta
          property="og:description"
          content="My portfolio. Check out some of my projects and contact me if you like them."
        />
        <meta property="og:url" content="https://dougrocha.com/" />
        <meta property="og:type" content="website" />
      </Head>

      <div className="block min-h-screen overflow-auto antialiased text-white bg-bg-600">
        <NavBar />
        {children}
        <Contact />
      </div>
    </>
  )
}

export default DefaultLayout
