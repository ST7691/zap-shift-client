import React from 'react'
import Banner from '../Banner/Banner'
import ServicesSection from './Services/ServicesSection'
import HowItWorks from './HowIWork/HowItWorks'


const Home = () => {
  return (
      <div className=''>
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <ServicesSection></ServicesSection>
    </div>
  )
}

export default Home