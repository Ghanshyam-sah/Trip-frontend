import React from "react";
import CustomButton from "./CustomButton";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50  px-20 pt-4 pb-2 flex items-center justify-between bg-white">
      {/* left part */}

      <div className="flex justify-center items-center">
        <img
          src="/logo.png"
          alt="logo"
          className="w-25 h-20 rounded-full object-cover"
        />
        <h1 className="text-2xl font-bold">
          Trip <span className="text-orange-500">Sathi</span>
        </h1>
        {/* <h1 className='text-4xl font-semibold '>Trip Sathi</h1> */}
      </div>

      {/* right part */}

      <div className="flex items-center gap-15">
        <nav className="space-x-5 text-lg text-gray-600 font-medium [&>a]:hover:text-blue-600 [&>a]:hover:underline">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/help">Help</a>
          <a href="#contact">Contact</a>
        </nav>
        <a href="/login">
          <CustomButton text="Login" />
        </a>
      </div>
    </header>
  );
};

export default Navbar;
