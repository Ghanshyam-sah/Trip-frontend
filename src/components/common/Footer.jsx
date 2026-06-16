import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-around items-center border-y-2   border-gray-300">
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
      <div className=" text-black">
        © 2026 Trip Sathi. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
