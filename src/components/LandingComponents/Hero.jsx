import React from 'react'
import CustomButton from '../common/CustomButton'


const Hero = () => {
  return (
    <section className='relative h-[88dvh] overflow-hidden flex items-center justify-center'>
        <div>
            <img src="/bgimage.jpg" alt="GlobalTrip Bgimage" />
        </div>

        <div className='h-[88dvh] w-full  bg-black absolute opacity-65 '>

        </div>

        {/* main content */}
        <div  className='absolute w-1/2 text-white text-center' >
          
        
            <h1 className='text-5xl font-bold  mb-6'><span className='font-[Edwardian script itc] text-7xl text-amber-500
            '>D</span>iscover Your Next Adventure</h1>
            <p className='text-2xl font-medium  mb-6'>
              <span className='text-red-700'>Uncover</span> the world's most breathtaking <span className='text-red-700'>destinations</span> with our curated travel experiences. <span className='text-red-700'>From</span> hidden gems to iconc landmarks, we bring you unforgetable journeys that inspire and capative. Start yor adventure <span className='text-red-700'>today!!</span>
            </p>

            <a href="/register">
            <CustomButton text="Get Started" />
            </a>
        </div>

    </section>
  )
}

export default Hero