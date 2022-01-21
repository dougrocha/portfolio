import Hero from 'components/hero'
import SpotlightProject from 'components/spotlight'
import HomeLayout from 'layouts/home'

const Home = () => {
  return (
    <HomeLayout>
      <Hero />
      <SpotlightProject />
    </HomeLayout>
  )
}

export default Home
