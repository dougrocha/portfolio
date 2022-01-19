import Hero from 'components/hero'
import SpotlightProject from 'components/spotlight'
import DefaultLayout from '../layouts/default'

const Home = () => {
  return (
    <>
      <DefaultLayout>
        <Hero />
        <SpotlightProject />
      </DefaultLayout>
    </>
  )
}

export default Home
