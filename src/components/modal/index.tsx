import { ClosedHamburgerIcon } from '@icons'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import Backdrop from './backdrop'

interface IModal {
  handleClose: () => void
  children: React.ReactNode
}

const Modal = ({ handleClose, children }: IModal) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const unMount = () => {
      document.body.style.overflow = 'auto'
    }

    return () => unMount()
  }, [])

  const dropIn = {
    hidden: {
      y: '-100vh',
      opacity: 0,
    },
    visible: {
      y: '0',
      opacity: 1,
      transition: {
        duration: 0.1,
        type: 'spring',
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: '100vh',
      opacity: 0,
    },
  }
  return (
    <Backdrop handleClose={handleClose}>
      <motion.div
        onClick={e => {
          e.stopPropagation()
        }}
        className="relative flex flex-col items-center max-w-2xl px-20 pt-16 pb-10 mx-2 bg-onyx rounded-xl"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <ClosedHamburgerIcon
          onClick={handleClose}
          className="absolute top-2 right-2 "
        />
        {children}
      </motion.div>
    </Backdrop>
  )
}

export default Modal
