import React, { useState, useRef, useCallback } from 'react';
// Assuming you have a custom hook for handling clicks outside
// import useClickOutside from '../hooks/useClickOutside'; 
// Search component import removed

// 💡 Using Heroicons for a cleaner look
const ChevronDownIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);
const SunIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" /></svg>
);
const MoonIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.614.745-3.804A9.775 9.775 0 008.25 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75zm-9.75 0l0 0" /></svg>
);
const BellIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.972 9.45c.105.074.22.14.341.195a.75.75 0 00.975-.028 3.502 3.502 0 00.32-3.14M5.558 17.514a3.342 3.342 0 01-.341-.195" /></svg>
);


// Removed searchValue and onSearchChange from props
const TopBar = ({ onToggle }) => { 
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Refs for click outside functionality
  const userMenuRef = useRef(null);

  // 💡 Use useCallback for stable function references
  const toggleUserMenu = useCallback(() => setUserMenuOpen(prev => !prev), []);
  const toggleDarkMode = useCallback(() => setDarkMode(prev => !prev), []);

  // 💡 Implement/Integrate useClickOutside if available
  // useClickOutside(userMenuRef, () => setUserMenuOpen(false));

  return (
    <header className="bg-white/95 backdrop-blur-lg shadow-md border-b border-gray-100 px-4 py-3 lg:px-8 flex items-center justify-between z-40 sticky top-0 transition-all duration-300">
      
      {/* 1. Left Side: Mobile Toggle & Logo */}
      <div className="flex items-center space-x-4 flex-shrink-0">
        <button
          className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-all"
          onClick={onToggle}
          aria-label="Toggle sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        
        {/* Logo/App Name (TaskMatrix) - Now the main identifying element on the left */}
        <h1 className="text-xl font-extrabold text-blue-600 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          TaskMatrix
        </h1>
      </div>
      
      {/* 2. Center: Empty Space (Flex-Grow) */}
      {/* The removal of the Search Bar makes this central area flexible and empty */}
      <div className="flex-1 max-w-lg mx-4">
        {/* Content removed */}
      </div>
      
      {/* 3. Right Side: Actions and User Menu */}
      <div className="flex items-center space-x-1 sm:space-x-3 flex-shrink-0">
        
        {/* Notifications */}
        <button 
          className="relative p-2 text-gray-500 hover:text-blue-600 rounded-xl hover:bg-gray-100 transition-all"
          aria-label="Notifications"
        >
          <BellIcon />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center ring-2 ring-white">3</span>
        </button>
        
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 text-gray-500 hover:text-blue-600 rounded-xl hover:bg-gray-100 transition-all"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </button>
        
        {/* User Dropdown */}
        <div className="relative" ref={userMenuRef}>
          <button
            className="flex items-center space-x-2 p-1.5 text-gray-500 rounded-full hover:bg-gray-100 transition-all"
            onClick={toggleUserMenu}
            aria-expanded={userMenuOpen}
            aria-controls="user-menu"
          >
            <img className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/50" src="https://picsum.photos/40" alt="User Avatar" /> 
            <span className="text-sm font-medium text-gray-700 hidden lg:block">Jane Doe</span>
            <ChevronDownIcon className="w-4 h-4 text-gray-500 hidden lg:block" />
          </button>
          
          {userMenuOpen && (
            <div id="user-menu" className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-1 z-50 border border-gray-100 transform origin-top-right animate-fade-in">
              <div className="px-4 py-2 text-sm font-medium text-gray-800 border-b border-gray-100 mb-1">Jane Doe</div>
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50/70 transition-colors">
                👤 Profile
              </button>
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50/70 transition-colors">
                ⚙️ Settings
              </button>
              <div className="border-t border-gray-100 my-1"></div>
              <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50/70 transition-colors">
                ➡️ Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;