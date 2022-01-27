import Link from 'next/link'

const Custom404 = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-bg-600">
      <div className="flex flex-col items-center justify-center p-20 mx-5 border bg-bg-600-600 brightness-125 border-bg-500 rounded-3xl shadow-form">
        <p className="text-2xl text-primary-white">
          Sorry, you are at the wrong page.
        </p>
        <Link href="/" passHref>
          <a>
            <button className="px-3 py-1 mt-5 text-xl border rounded-md text-primary-white bg-secondary-red border-bg-light">
              Go Home
            </button>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Custom404
