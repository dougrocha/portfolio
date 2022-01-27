import useModal from 'hooks/useModal'

import ContactForm from './ContactForm'
import ContactInfo from './ContactInfo'
import ContactModal from './contactModal'

const Contact = () => {
  const [isModalOpen, openModal, closeModal] = useModal(false)

  return (
    <footer className="container flex flex-col items-center px-6 mx-auto mb-10 sm:mb-20 mt-52 lg:max-w-7xl">
      <h2 className="text-5xl font-bold text-center text-primary-white">
        Contact Me
      </h2>
      <section className="flex flex-col items-center justify-center w-full lg:items-center lg:justify-between lg:flex-row">
        {/* Left Side */}
        <ContactInfo openModal={openModal} />
        {/* Right Side - Form */}
        <ContactForm />
      </section>
      <ContactModal isModalOpen={isModalOpen} closeModal={closeModal} />
    </footer>
  )
}

export default Contact
