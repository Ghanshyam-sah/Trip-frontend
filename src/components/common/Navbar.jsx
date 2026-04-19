import React from 'react'
import CustomButton from './CustomButton'

const Navbar = () => {
  return (
    <header className='px-20 py-6 flex items-center justify-between bg-transparent'>

      {/* left part */}

      <div>
        <h1 className='text-4xl font-semibold '>GlobalTour</h1>
      </div>

      {/* right part */}

      <div className='flex items-center gap-15'>
        <nav className='space-x-5 text-lg text-gray-600 font-medium [&>a]:hover:text-blue-600 [&>a]:hover:underline'>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/help">Help</a>
          <a href="/contact">Contact</a>
        </nav>
        <a href="/login">
        <CustomButton text="Login" /></a>
      </div>

    </header>
  )
}

export default Navbar