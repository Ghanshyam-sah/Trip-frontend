import React from 'react'
import Navbar from '../components/common/Navbar'
import Hero from '../components/LandingComponents/Hero'
import Features from '../components/LandingComponents/Features'
import FAQ from '@/components/LandingComponents/FAQ'
import { Contact } from '@/components/LandingComponents/Contact'
import Footer from '@/components/common/Footer'

const Landing = () => {
  return (
    <div>
      
      <Navbar />
      <Hero />
      <Features />
      <Contact />
      <FAQ />
      <Footer/>
    </div>
  )
}

export default Landing