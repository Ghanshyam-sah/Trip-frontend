import React from 'react'
import CustomButton from '../common/CustomButton'


const Hero = () => {
  return (

    <section className='relative h-[35dvh] md:h-[88dvh]  overflow-hidden flex items-center justify-center'>
        <div>
            <img src="/hero.png" alt="GlobalTrip Bgimage" absolute w-full h-full object-cover />
        </div>

        <div className='h-[35dvh] md:h-[88dvh] w-full  bg-black absolute opacity-65 '>

        </div>

        {/* main content */}
        <div  className='absolute w-9/10 md:w-1/2 text-white text-center ' >
          
        
            <h1 className='text-2xl md:text-5xl font-bold  md:mb-6'><span className="text-8xl font-['Alex_Brush',cursive] text-amber-400">D</span>iscover Your Next Adventure</h1>
            <p className='text-sm md:text-2xl font-medium mb-2 md:mb-6'>
              <span className="">Uncover</span> the world's most breathtaking <span className=''>destinations</span> with our curated travel experiences. <span className=''>From</span> hidden gems to iconc landmarks, we bring you unforgetable journeys that inspire and capative. Start yor adventure <span className=''>today!!</span>
            </p>

            <a href="/register">
            <CustomButton text="Get Started" />
            </a>
        </div>

    </section>
  )
}

export default Hero