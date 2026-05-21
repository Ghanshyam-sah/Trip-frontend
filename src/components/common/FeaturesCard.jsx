import { Heart } from 'lucide-react'
import React from 'react'

const FeaturesCard = ({feature}) => {
  return (
    <div className='border-2 border-gray-400 rounded-md p-4 bg-[#a0bcf96d]'>
        <feature.Icon size={40} className='mb-4 text-blue-800' />
        <h3 className='text-2xl font-medium mb-4'>{feature.title}</h3>
        <p className='text-gray-600'>{feature.description}</p>
    </div>
  )
}

export default FeaturesCard