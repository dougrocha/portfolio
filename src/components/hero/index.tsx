import { motion } from 'framer-motion'

const Hero = () => {
  const scrollDown = () => {
    window.scroll({
      top: 1000,
      behavior: 'smooth',
    })
  }
  const redirectToBlog = () => {
    window.location.assign('https://blogs.dougrocha.com/')
  }
  return (
    <div className="container max-w-6xl m-auto mt-20">
      <div className="flex justify-center mx-3 md:justify-between">
        <div className="flex flex-col text-whitetext">
          <h1 className="max-w-md text-5xl font-bold md:text-6xl lg:text-7xl">
            Closing the gap between products and people.
          </h1>
          <div className="mt-10 space-x-5 text-2xl text-white">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="px-6 py-1 rounded-md bg-windowred"
              onClick={() => {
                redirectToBlog()
              }}
            >
              Blog
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="px-6 py-1 rounded-md bg-windowred/80"
              onClick={() => {
                scrollDown()
              }}
            >
              Contact Me
            </motion.button>
          </div>
        </div>
        {/* <div className="hidden mr-10 md:block">
          KEYBOARD GOES HERE
          <motion.div
            className="bg-white rounded-3xl w-36 h-36"
            animate={{
              scale: [1, 2, 2, 1, 1],
              rotate: [0, 0, 270, 270, 0],
              borderRadius: ['20%', '20%', '50%', '50%', '20%'],
            }}
            transition={{
              duration: 2,
              ease: 'easeInOut',
              times: [0, 0.2, 0.5, 0.8, 1],
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />
        </div> */}
      </div>
    </div>
  )
}

export default Hero
