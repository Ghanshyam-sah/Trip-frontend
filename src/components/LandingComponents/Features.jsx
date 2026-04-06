import React from 'react'
import FeaturesCard from '../common/FeaturesCard'
import { Compass, Map, PhoneCall, Tag } from 'lucide-react'

const Features = () => {

  let featuresData = [
    {
      title: "24/7 Support",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam dolorem reiciendis quod nam, iste aliquam.",
      Icon: PhoneCall
    },
    {
      title: "Custom Trip Planning",
      description: "Plan your perfect journey with personalized itineraries tailored to your preferences, budget, and travel style.",
      Icon: Map
    },
    {
      title: "Best Travel Deals",
      description: "Get access to exclusive discounts on flights, hotels, and packages to make your trips more affordable.",
      Icon: Tag
    },
    {
      title: "Local Experience Guides",
      description: "Discover hidden gems, local cultures, and authentic experiences with expert guides at your destination.",
      Icon: Compass
    }
  ]
  return (
    <section className='px-20 py-16'>

        {/* headings */}
        <div>
            <h2 className='text-5xl font-bold text-center mb-10'>Our Features</h2>
        </div>

        {/* content  */}
        <div className='grid grid-cols-4 gap-4'>

          {
            featuresData.map((feature, index) =>{
              return(
                <FeaturesCard feature={feature} key={index} />
              )
            })
          }
        
        </div>

    </section>
  )
}

export default Features