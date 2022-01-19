import ContactForm from './ContactForm'
import ContactInfo from './ContactInfo'

const Contact = () => {
  return (
    <div className="container p-6 mx-auto mt-52 lg:max-w-6xl">
      <h3 className="text-5xl font-bold text-center text-whitetext">
        Contact Me
      </h3>
      <div className="flex flex-col items-center justify-center lg:items-center lg:justify-between lg:flex-row">
        {/* Left Side */}
        <ContactInfo />
        {/* Right Side - Form */}
        <ContactForm />
      </div>
    </div>
  )
}

export default Contact
