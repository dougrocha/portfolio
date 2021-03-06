import ContactFooter from './ContactFooter'

const ContactInfo = ({ openModal }: { openModal: () => void }) => {
  return (
    <div className="flex justify-center w-full md:w-80 md:flex-col md:items-center">
      <div className="my-10 lg:mt-0 md:mb-0 lg:pl-10">
        <h3 className="text-xl text-primary-brightgray md:text-center lg:text-left md:text-primary-white lg:text-2xl lg:font-medium">
          Any questions or remarks? Feel free to shoot me a message.
        </h3>
      </div>
      <div className="hidden w-0 md:w-64 lg:block">
        <ContactFooter openModal={openModal} />
      </div>
    </div>
  )
}

export default ContactInfo
