import { LinkedIn, MainIcon, GithubIcon } from '../icons'

const ContactInfo = () => {
  return (
    <div className="flex justify-center w-full md:w-80 md:flex-col md:items-center">
      <div className="my-10 lg:mt-0 md:mb-0 lg:pl-10">
        <h6 className="text-xl text-graytext md:text-center lg:text-left md:text-whitetext lg:text-2xl lg:font-medium">
          Any questions or remarks? Feel free to shoot me a message.
        </h6>
      </div>
      <div className="hidden w-0 md:w-64 lg:block">
        <div className="flex justify-center mt-20 space-x-4">
          <GithubIcon height="35" />
          <MainIcon height="35" />
          <LinkedIn height="35" />
        </div>
        <p className="mt-5 text-sm text-center text-graytext">
          Douglas Rocha - 2022
        </p>
      </div>
    </div>
  )
}

export default ContactInfo
