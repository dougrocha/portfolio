import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ClosedHamburgerIcon, GithubIcon, HamBurgerIcon } from '@icons'
import { motion } from 'framer-motion'

const NavBar = () => {
  const [isHamOpen, setHam] = useState(false)

  const iconVariants = {
    opened: {
      rotate: 90,
      scale: 1.5,
    },
    closed: {
      rotate: 0,
    },
  }

  return (
    <nav className="container px-6 mx-auto mb-2">
      <div className="mx-auto xl:max-w-7xl">
        <div className="flex items-center justify-between py-10">
          <div className="items-center justify-start hidden space-x-10 text-xl md:flex ">
            <NavItems />
          </div>
          <div className="flex items-center transition duration-100 hover:brightness-125">
            <Link href="https://github.com/slashtp3/portfolio" passHref>
              <GithubIcon />
            </Link>
          </div>
          <motion.button
            initial={false}
            whileTap={{ scale: 0.9 }}
            variants={iconVariants}
            animate={isHamOpen ? 'opened' : 'closed'}
            className="flex items-center md:hidden"
            onClick={() => {
              setHam(!isHamOpen)
            }}
          >
            {isHamOpen ? <ClosedHamburgerIcon /> : <HamBurgerIcon />}
          </motion.button>
        </div>
      </div>
      <Dropdown isOpen={isHamOpen} />
    </nav>
  )
}

const Dropdown = ({ isOpen }: { isOpen: boolean }) => {
  const menuVariants = {
    opened: {
      opacity: 1,
      height: '13rem',
      display: 'block',
    },
    closed: {
      opacity: 0,
      height: 0,
      transitionEnd: {
        display: 'none',
      },
    },
  }

  return (
    <motion.div
      initial={false}
      variants={menuVariants}
      animate={isOpen ? 'opened' : 'closed'}
      className={`items-center justify-center md:hidden`}
    >
      <div className="flex flex-col items-center p-[44px] space-y-10 text-lg font-medium md:hidden">
        <NavItems />
      </div>
      <div className="flex-grow border-t border-gray-400" />
    </motion.div>
  )
}

const NavItems = () => {
  const router = useRouter()
  const NavItems = [
    { href: '/', text: 'Home' },
    { href: '/contact', text: 'Contact Me' },
    { href: '/blog', text: 'Blog' },
  ]
  return (
    <>
      {NavItems.map(({ href, text }) => (
        <div
          className="transition duration-100 text-whitetext hover:text-graytext "
          key={text}
        >
          <Link href={href} passHref>
            <a className={router.pathname == href ? 'active-nav-link ' : ''}>
              {text}
            </a>
          </Link>
        </div>
      ))}
    </>
  )
}

export default NavBar