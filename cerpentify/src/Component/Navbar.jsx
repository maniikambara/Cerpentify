import React, { useState } from 'react';
import Logo from '../assets/Logo.png';
import Profil from './Profil.jsx';

const Navbar = () => {
  const [showProfil, setShowProfil] = useState(false);
  
  const toggleProfil = () => {
    setShowProfil(!showProfil);
  };
  
  return (
    <>
      <nav className="flex justify-between items-center p-5 bg-white/70 backdrop-blur-lg mx-auto max-w-7xl shadow-sm rounded-[50px] mt-6">
        {/* Logo */}
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-7 w-auto" />
        </div>
        
        {/* Navigation Links */}
        <div className="flex gap-8">
          <a
            href="/dashboard"
            className="text-gray-800 text-lg font-medium hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Beranda
          </a>
          <a
            href="/koleksi"
            className="text-gray-800 text-lg font-medium hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Koleksi
          </a>
          <a
            href="/kontak"
            className="text-gray-800 text-lg font-medium hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Kontak
          </a>
          <a
            href="#myStories"
            className="text-gray-800 text-lg font-medium hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Cerpenku
          </a>
        </div>
        
        {/* Search and Account Section */}
        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Cari Cerpen"
            className="px-3 py-2 text-sm rounded-[100px] w-[200px] bg-gray-300 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 transform"
          />
          {/* Language and Account */}
          <div className="flex items-center gap-4">
            <span className="text-red-500 text-sm">IDN</span>
            <button 
              onClick={toggleProfil}
              className="px-4 py-2 text-sm bg-gray-300 rounded-[100px] hover:bg-gray-400 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Akun
            </button>
          </div>
        </div>
      </nav>
      
      {showProfil && (
        <Profil onClose={() => setShowProfil(false)} />
      )}
    </>
  );
};

export default Navbar;