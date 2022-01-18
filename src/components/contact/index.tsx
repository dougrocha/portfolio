import ContactForm from './ContactForm'
import ContactInfo from './ContactInfo'

const Contact = () => {
  return (
    <div className="container p-6 mx-auto mt-52 lg:max-w-6xl">
      <h3 className="text-4xl font-bold text-center text-whitetext">
        contact me
      </h3>
      <div className="flex flex-wrap items-center justify-between md:flex-nowrap">
        {/* Left Side */}
        <ContactInfo />
        {/* Right Side - Form */}
        <ContactForm />
      </div>
    </div>
  )
}

export default Contact
