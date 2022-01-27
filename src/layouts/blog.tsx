import Head from 'next/head'

import ContactFooter from 'components/contact/ContactFooter'
import ContactModal from 'components/contact/contactModal'
import NavBar from 'components/navbar'
import useModal from 'hooks/useModal'

import { LayoutProps } from '../utils/types'

const BlogLayout = ({ children, title }: LayoutProps) => {
  const [isModalOpen, openModal, closeModal] = useModal(false)
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

      <div className="block min-h-screen overflow-auto antialiased bg-feldgray-400 dark:bg-bg-600">
        <NavBar />
        {children}
        <footer>
          <ContactFooter openModal={openModal} />
        </footer>
      </div>
      <ContactModal isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  )
}

export default BlogLayout
