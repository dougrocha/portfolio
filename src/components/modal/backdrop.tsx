import { motion } from 'framer-motion'

interface IBackdrop {
  children: React.ReactNode
  handleClose: () => void
}

const Backdrop = ({ children, handleClose }: IBackdrop) => {
  return (
    <motion.div
      className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen bg-onyx-900/60"
      onClick={handleClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  )
}

export default Backdrop
