import Head from 'next/head'
import { useState, useEffect } from 'react'

const Home = () => {
  const [state, setstate] = useState<string>('TESTING')

  useEffect(() => {
    setstate('HEY')
  }, [])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div>Testing</div>
        <div>{state}</div>
        <button
          className="bg-red-400 p-5 rounded-full text-2xl justify-center items-center"
          onClick={() => {
            setstate('changing')
          }}
        >
          Change
        </button>
      </div>
    </>
  )
}

export default Home
