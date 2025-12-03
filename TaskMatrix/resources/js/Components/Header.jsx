import React from 'react';

const Header = ({ openModal }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 mb-4 text-sm text-gray-500 hidden sm:flex" aria-label="Breadcrumb">
          <a href="#" className="flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium transition">
            <i className="fas fa-home text-gray-400"></i>
            <span>Dashboard</span>
          </a>
          <span className="mx-2 text-gray-400">/</span>
          <a href="#" className="flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium transition">
            <i className="fas fa-clock text-purple-600"></i>
            <span>Timesheets</span>
          </a>
        </nav>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <i className="fas fa-clock text-2xl text-purple-600"></i>
            <h1 className="text-2xl font-bold text-gray-900">Timesheets</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <i className="fas fa-download mr-1"></i> Export
            </button>
            <button 
              onClick={openModal}
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl cursor-pointer flex items-center gap-2 transition transform hover:scale-105"
            >
              <i className="fas fa-plus"></i> New Entry
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;