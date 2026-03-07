import React from 'react'
import Banner from '../Banner/Banner'
import ServicesSection from './Services/ServicesSection'
import HowItWorks from './HowIWork/HowItWorks'
import ClientMarquee from './ClientMarquee/ClientMarquee'
import TrackingSection from './TrackingSection/TrackingSection'
import Divider from './divider/Divider'
import Marchent from './Marchant/Marchent'


const Home = () => {
  return (
      <div className=''>
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <ServicesSection></ServicesSection>
      <ClientMarquee></ClientMarquee>
      {/* <Divider></Divider> */}
      <TrackingSection></TrackingSection>
      {/* <Divider></Divider> */}
      <Marchent></Marchent>
    </div>
  )
}

export default Home