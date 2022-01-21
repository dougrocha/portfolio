import { motion } from 'framer-motion'

interface IBackdrop {
  children: React.ReactNode
  closeModal: () => void
}

const Backdrop = ({ children, closeModal }: IBackdrop) => {
  return (
    <motion.div
      className="fixed top-0 left-0 flex items-center justify-center float-left w-screen h-screen bg-onyx-900/60"
      onClick={closeModal}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  )
}

export default Backdrop
