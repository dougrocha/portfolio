import Link from 'next/link'

const Custom404 = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-bg">
      <div className="flex flex-col items-center justify-center p-20 mx-5 border bg-bg brightness-125 border-bg-light rounded-3xl shadow-form">
        <p className="text-2xl text-whitetext">
          Sorry, you are at the wrong page.
        </p>
        <Link href="/" passHref>
          <button className="px-3 py-1 mt-5 text-xl border rounded-md text-whitetext bg-windowred border-bg-light">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Custom404
