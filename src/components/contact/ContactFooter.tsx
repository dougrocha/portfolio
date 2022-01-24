import { GithubIcon, MailIcon, LinkedInIcon } from '@icons'
import Modal from 'components/modal'
import { AnimatePresence } from 'framer-motion'
import useModal from 'hooks/useModal'
import Link from 'next/link'
import { StaticLinks } from 'utils/staticLinks'
import ContactModal from './contactModal'

const ContactFooter = () => {
  const [isModalOpen, openModal, closeModal] = useModal(false)

  return (
    <>
      <div className="flex justify-center mt-20 space-x-4">
        <Link href={StaticLinks.GITHUB} passHref>
          <a>
            <GithubIcon />
          </a>
        </Link>
        <Link
          href="https://www.linkedin.com/in/douglas-rocha-450413210/"
          passHref
        >
          <a>
            <LinkedInIcon />
          </a>
        </Link>
        <MailIcon onClick={openModal} />
      </div>
      <p className="mt-5 text-sm text-center text-graytext">
        Douglas Rocha - 2022
      </p>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {isModalOpen && (
          <Modal handleModal={closeModal}>
            <ContactModal />
            <div className="flex flex-col items-center mt-10 space-y-2 text-graytext">
              <div className="text-2xl text-whitetext">
                You can also contact me here:{' '}
              </div>
              <div className="text-lg text-graytext">
                douglas_junior@icloud.com
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}

export default ContactFooter
