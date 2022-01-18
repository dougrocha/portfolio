import { LinkedIn, MainIcon, GithubIcon } from '../icons'

const ContactInfo = () => {
  return (
    <div className="flex w-full md:w-80 md:flex-col">
      <div className="p-10 mt-10">
        <p className="text-2xl font-medium">
          any questions or remarks? feel free to shoot me a message
        </p>
      </div>
      <div className="hidden w-0 md:w-64 md:block">
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
