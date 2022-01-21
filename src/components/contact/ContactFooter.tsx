import { GithubIcon, MainIcon, LinkedIn } from '@icons'

const ContactFooter = () => {
  return (
    <>
      <div className="flex justify-center mt-20 space-x-4">
        <GithubIcon />
        <MainIcon />
        <LinkedIn />
      </div>
      <p className="mt-5 text-sm text-center text-graytext">
        Douglas Rocha - 2022
      </p>
    </>
  )
}

export default ContactFooter
