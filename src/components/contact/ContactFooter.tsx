import Link from 'next/link'

import { GithubIcon, MailIcon, LinkedInIcon } from '@icons'
import { StaticLinks } from 'utils/staticLinks'

const ContactFooter = ({ openModal }: { openModal: () => void }) => {
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
      <p className="mt-5 text-sm text-center text-primary-brightgray">
        Douglas Rocha - {new Date().getFullYear()}
      </p>
    </>
  )
}

export default ContactFooter
