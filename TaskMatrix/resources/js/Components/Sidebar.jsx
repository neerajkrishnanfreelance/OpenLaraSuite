import React from 'react';

const NavItem = ({ icon, text, isActive = false, isSpecial = false }) => {
  const baseClasses = "nav-item flex items-center gap-3 px-3 py-3 rounded-lg transition";
  const activeClasses = "text-white bg-purple-700/50 border-l-4 border-purple-400 font-semibold";
  const defaultClasses = "text-purple-200 font-medium";
  const specialClasses = isSpecial ? activeClasses : defaultClasses;

  return (
    <a href="#" className={`${baseClasses} ${isActive ? activeClasses : specialClasses}`}>
      <i className={`${icon} text-lg`}></i>
      <span className={isActive || isSpecial ? "font-semibold" : "font-medium"}>{text}</span>
    </a>
  );
};

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside className={`sidebar w-64 bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 text-white fixed h-full z-40 shadow-2xl flex flex-col ${isOpen ? '' : 'sidebar-collapsed'} lg:translate-x-0`}>
      {/* Logo */}
      <div className="p-6 border-b border-purple-800 flex items-center gap-3">
        <i className="fas fa-clock text-3xl text-yellow-400"></i>
        <h1 className="text-xl font-bold tracking-tight">TimeFlow Pro</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 mt-6 overflow-y-auto">
        <NavItem icon="fas fa-chart-line" text="Dashboard" />
        <NavItem icon="fas fa-folder-open" text="Projects" />
        <NavItem icon="fas fa-tasks" text="Tasks" />
        <NavItem icon="fas fa-calendar-alt" text="Calendar" isActive={true} />
        <NavItem icon="fas fa-users" text="Employees" />
        <NavItem icon="fas fa-clock" text="Timesheets" isSpecial={true} />
        <div className="mt-8 pt-4 border-t border-purple-800">
          <NavItem icon="fas fa-chart-bar" text="Reports" />
          <NavItem icon="fas fa-cog" text="Settings" />
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-purple-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">JD</div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-white truncate">John Doe</p>
            <p className="text-xs text-purple-300">Administrator</p>
          </div>
          <i className="fas fa-chevron-down text-purple-300 cursor-pointer"></i>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;