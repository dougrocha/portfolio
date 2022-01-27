import { AnimatePresence } from 'framer-motion'
import React from 'react'

import Modal from 'components/modal'

import ContactModalForm from './contactModalForm'

const ContactModal = ({
  isModalOpen,
  closeModal,
}: {
  isModalOpen: boolean
  closeModal: () => void
}) => {
  return (
    <AnimatePresence
      initial={false}
      exitBeforeEnter={true}
      onExitComplete={() => null}
    >
      {isModalOpen && (
        <Modal handleModal={closeModal}>
          <ContactModalForm />
          <div className="flex flex-col items-center mt-10 space-y-2 primary-brightgray">
            <div className="text-2xl text-primary-white">
              You can also contact me here:
            </div>
            <div className="text-lg text-primary-brightgray">
              douglas_junior@icloud.com
            </div>
          </div>
        </Modal>
      )}
    </AnimatePresence>
  )
}

export default ContactModal
