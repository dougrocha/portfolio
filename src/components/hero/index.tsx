import { motion, AnimatePresence } from 'framer-motion'
import useModal from 'hooks/useModal'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const ContactModal = dynamic(() => import('components/contact/contactModal'))
const Modal = dynamic(() => import('components/modal'))

const Hero = () => {
  const [isModalOpen, openModal, closeModal] = useModal(false)

  return (
    <section className="container flex justify-between px-6 mx-auto mt-20 xl:max-w-7xl">
      <div className="flex flex-col w-full text-whitetext">
        <span className="text-2xl lg:text-3xl text-graytext/60">Hey,</span>
        <h1 className="max-w-md text-5xl font-bold md:text-6xl lg:text-7xl">
          I&apos;m Douglas Rocha
        </h1>
        <p className="text-lg text-graytext/70">
          <span className="underline text-windowyellow underline-offset-2 ">
            Software developer
          </span>{' '}
          currently studying at Brookdale CC.
        </p>
        <div className="flex flex-col mt-10 text-2xl text-white sm:flex-row">
          <Link href="/blog" passHref>
            <a>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-full px-6 py-1 rounded-lg bg-windowred"
              >
                Blog
              </motion.button>
            </a>
          </Link>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-6 py-1 mt-6 rounded-lg sm:ml-5 sm:mt-0 bg-accent/70 "
            onClick={() => openModal()}
          >
            Contact Me
          </motion.button>

          <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}
          >
            {isModalOpen && (
              <Modal handleModal={closeModal}>
                <ContactModal />
              </Modal>
            )}
          </AnimatePresence>
          {/* <Link href="#contact-form" passHref scroll>
            </Link> */}
        </div>
      </div>
      <div className="hidden w-64 md:block">
        <motion.div
          className="bg-white rounded-3xl w-36 h-36"
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ['20%', '20%', '50%', '50%', '20%'],
          }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
        {/* <Island /> */}
      </div>
    </section>
  )
}

export default Hero
