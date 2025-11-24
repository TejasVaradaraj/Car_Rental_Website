import React, { useState } from 'react';
import { assets, menuLinks } from '../assets/assets.js';
import { useLocation, Link, useNavigate } from 'react-router-dom';

const Navigation_bar = ({ setShowLogin }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all ${location.pathname === "/" ? "bg-light" : ""}`}>
      <Link to="/">
        <img src={assets.logo} alt="logo" className="h-8" />
      </Link>

      <nav className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 transition-all duration-300 z-50 ${location.pathname === "/" ? "bg-light" : "bg-white"}`}>
        {menuLinks.map((link) => (
          <Link key={link.path} to={link.path} className="hover:text-primary transition-colors">
            {link.name}
          </Link>
        ))}

        <div className="hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full w-56">
          <input
            type="text"
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            placeholder="Search products"
            aria-label="Search products"
          />
          <img src={assets.search_icon} alt="search" />
        </div>

        <div className="flex max-sm:flex-col items-start sm:items-center gap-6">
          <button onClick={() => navigate('/owner')} className="cursor-pointer">Dashboard</button>
          <button
            onClick={() => setShowLogin && setShowLogin(true)}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg"
          >
            Login
          </button>
        </div>

        <button className="sm:hidden cursor-pointer" aria-label="Menu" onClick={() => setOpen(!open)}>
          <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
        </button>
      </nav>
    </div>
  );
};

export default Navigation_bar;