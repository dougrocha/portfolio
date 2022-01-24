import ContactForm from './ContactForm'
import ContactInfo from './ContactInfo'

const Contact = () => {
  return (
    <footer className="container flex flex-col items-center px-6 mx-auto mt-52 lg:max-w-7xl">
      <h2 className="text-5xl font-bold text-center text-whitetext">
        Contact Me
      </h2>
      <section className="flex flex-col items-center justify-center w-full lg:items-center lg:justify-between lg:flex-row">
        {/* Left Side */}
        <ContactInfo />
        {/* Right Side - Form */}
        <ContactForm />
      </section>
    </footer>
  )
}

export default Contact
