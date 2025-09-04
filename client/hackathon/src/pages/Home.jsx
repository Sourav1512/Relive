import React from 'react'
import Navbar from '../components/Navbar/Navbar.jsx'
import Hero from '../components/Hero/Hero.jsx'
import Role from '../components/Role/Role.jsx'
import Work from '../components/Work/Work.jsx'
import Testimonal from '../components/Testimonals/Testimonal.jsx'
import Footer from '../components/Footer/Footer.jsx'

const Home = () => {
  return (
    <>
        <Navbar />
        <Hero />
        <Role />
        <Work />
        <Testimonal />
        <Footer />
    
    </>
  )
}

export default Home