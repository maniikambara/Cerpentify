import React from 'react';
import Logo from '../assets/Logo.png';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-5 bg-white/70 backdrop-blur-lg mx-auto max-w-7xl shadow-sm rounded-[50px] mt-6">
      {/* Logo */}
      <div className="flex items-center">
        <img src={Logo} alt="Logo" className="h-7 w-auto" />
      </div>

      {/* Navigation Links */}
      <div className="flex gap-8">
        <a
          href="/"
          className="text-gray-800 text-lg font-medium hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Home
        </a>
        <a
          href="/#fiturutama"
          className="text-gray-800 text-lg font-medium hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
        >
          About
        </a>
        <a
          href="/kontakbefore"
          className="text-gray-800 text-lg font-medium hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
        >
        Contact
        </a>
      </div>

      {/* Search and Account Section */}
      <div className="flex items-center gap-6">
        {/* Language and Account */}
        <div className="flex items-center gap-4">
          <span className="text-red-500 text-sm">IDN</span>
          <a href="/login" className="px-4 py-2 text-sm bg-gray-300 rounded-[100px] hover:bg-gray-400 transition duration-300 ease-in-out transform hover:scale-105">
            Login
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
