// Header.js
import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi'; // Import menu and close icons
import logo from './Assets/logo.jpg'; // Import the logo file

const Header = ({ setCurrentSection, currentSection, setIsModalOpen }) => { // Receive setIsModalOpen as a prop
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu

  const getNavItemClasses = (section) => {
    return currentSection === section 
      ? 'text-gray-600 font-bold' 
      : 'text-black hover:text-blue-600 transition-colors';
  };

  // Function to handle menu item clicks
  const handleMenuClick = (section) => {
    setIsMenuOpen(false);
    setCurrentSection(section);
  };

  return (
    <div className='bg-gray-100 p-4 z-50'>
      <header className="flex justify-between items-center px-4 md:px-36 relative">
        {/* Logo and Title */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="w-8 h-8 mr-2 rounded-full md:w-12 md:h-12 animate-pulse"
          />
          <h1 className="text-gray-700 text-xl md:text-2xl font-bold">
            <span className="block">UCSD Project Rishi</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          <a 
            href="#Home" 
            onClick={() => handleMenuClick('home')} 
            className={getNavItemClasses('home')}>
            Home
          </a>
          <a 
            href="#Map" 
            onClick={() => handleMenuClick('map')} 
            className={getNavItemClasses('map')}>
            Map
          </a>
          <a 
            href="#SurveyInformation" 
            onClick={() => handleMenuClick('survey')} 
            className={getNavItemClasses('survey')}>
            Survey Information
          </a>
          <a 
            href="#Projects" 
            onClick={() => handleMenuClick('projects')} 
            className={getNavItemClasses('projects')}>
            Projects
          </a>
          <a 
            href="#Contact" 
            onClick={() => handleMenuClick('contact')} 
            className={getNavItemClasses('contact')}>
            Contact Us
          </a>
          {/* Admin Login Button */}
          <button 
            onClick={() => setIsModalOpen(true)} // Open modal on button click
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors">
            Admin Login
          </button>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          {isMenuOpen ? (
            <FiX className="text-3xl cursor-pointer" onClick={() => setIsMenuOpen(false)} />
          ) : (
            <FiMenu className="text-3xl cursor-pointer" onClick={() => setIsMenuOpen(true)} />
          )}
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="absolute top-16 right-0 bg-white shadow-lg p-4 rounded-lg w-2/3 md:hidden z-10">
            <ul className="space-y-4">
              <li>
                <a 
                  href="#home" 
                  onClick={() => handleMenuClick('home')} 
                  className={getNavItemClasses('home')}>
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#map" 
                  onClick={() => handleMenuClick('map')} 
                  className={getNavItemClasses('map')}>
                  Map
                </a>
              </li>
              <li>
                <a 
                  href="#survey" 
                  onClick={() => handleMenuClick('survey')} 
                  className={getNavItemClasses('survey')}>
                  Survey Information
                </a>
              </li>
              <li>
                <a 
                  href="#projects" 
                  onClick={() => handleMenuClick('projects')} 
                  className={getNavItemClasses('projects')}>
                  Projects
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={() => handleMenuClick('contact')} 
                  className={getNavItemClasses('contact')}>
                  Contact Us
                </a>
              </li>
              {/* Admin Login Button in the mobile menu */}
              <li>
                <button 
                  onClick={() => { setIsModalOpen(true); setIsMenuOpen(false); }} 
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg w-full hover:bg-gray-600 transition-colors">
                  Admin Login
                </button>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </div>
  );
};

export default Header;