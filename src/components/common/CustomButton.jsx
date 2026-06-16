import React from 'react'

const CustomButton = ({text}) => {
  return (
   <button className='bg-blue-600 text-white px-4 md:px-7 py-1 md:py-2 rounded-2xl hover:bg-blue-800 cursor-pointer shadow-2xl shadow-blue-300'>
    {text}
   </button>
  )
}

export default CustomButton