import React, { useState } from 'react';
// Assuming components are placed in the 'Components' directory
import Sidebar from '@/Components/Sidebar';
import Header from '@/Components/Header';
import StatsCards from '@/Components/StatsCards';
import TimesheetTable from '@/Components/TimesheetTable';
import NewEntryModal from '@/Components/NewEntryModal';

/**
 * Inertia Page Component for Timesheets.
 * Receives all data (stats, timesheets, employees) as props from the Laravel Controller.
 */
const Timesheets = ({ stats, timesheets, employees, currentEmployee, initialSidebarState }) => {
  
  // UI State (kept client-side as it is purely presentation)
  const [isSidebarOpen, setIsSidebarOpen] = useState(initialSidebarState || false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State for the 'running' row animation (client-side simulation)
  const [isC1Running, setIsC1Running] = useState(true); 

  return (
    <div className="bg-gray-50 min-h-screen flex overflow-hidden">
      
      {/* 1. Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        currentEmployee={currentEmployee}
      />

      {/* 2. Mobile Menu Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* 3. Main Content Area */}
      {/* The ml-64 class ensures the main content moves over when the sidebar is open on large screens */}
      <main className={`flex-1 ${isSidebarOpen ? 'ml-0' : 'ml-0 lg:ml-64'} transition-all duration-300 overflow-auto`}>
        
        {/* Mobile Sidebar Toggle (Floating button on top-left for small screens) */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <label 
            onClick={() => setIsSidebarOpen(true)}
            className="bg-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-gray-50"
          >
            <i className="fas fa-bars text-purple-600"></i>
          </label>
        </div>

        {/* Header with Breadcrumb and Actions */}
        <Header openModal={() => setIsModalOpen(true)} />

        {/* Search & Filters */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex-1 max-w-md w-full">
                <div className="relative">
                  <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input type="text" placeholder="Search timesheets..." className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
                </div>
              </div>
              <div className="flex items-center gap-3 flex-wrap w-full lg:w-auto">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <input type="date" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  <span className="text-sm text-gray-500 hidden sm:inline">to</span>
                  <input type="date" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-full lg:w-auto">
                  <option>All Employees</option>
                  {/* Mapping employees from Inertia props */}
                  {employees && employees.map(emp => <option key={emp.id}>{emp.name}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Cards - Receives data via props */}
        <StatsCards statsData={stats} />

        {/* List View (Table) - Receives data via props */}
        <TimesheetTable timesheetData={timesheets} isC1Running={isC1Running} />

        {/* New Entry Modal - Uses UI state and receives data for form options */}
        {/* <NewEntryModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} employees={employees} /> */}

      </main>
    </div>
  );
};

export default Timesheets;