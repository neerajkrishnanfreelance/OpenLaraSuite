import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types'; // Recommended for type checking in modern React

// --- Constants (optional, but good practice for magic strings) ---
const INITIAL_ACTIVE_ITEM = 'dashboard';

/**
 * Sidebar Component
 * Renders a responsive, navigable sidebar with support for nested/collapsible sections.
 */
const Sidebar = ({
  isOpen,
  onToggle,
  menuItems = [],
  sections = [], // e.g., [{ id: 'sec-1', title: 'Channels', items: [...] }]
  activeItem: initialActiveItem = INITIAL_ACTIVE_ITEM,
  onItemClick,
}) => {
  const [activeItem, setActiveItem] = useState(initialActiveItem);
  const [expandedSections, setExpandedSections] = useState({});

  // 1. Initialize expandedSections: Open the first section if sections are present
  useEffect(() => {
    if (sections.length > 0) {
      // Use reduce to create a map where the first section is true, others false/undefined
      const initialExpansion = sections.reduce((acc, section, index) => {
        // Set the first section (index 0) to be expanded by default
        if (index === 0) {
          acc[section.id] = true;
        }
        return acc;
      }, {});
      setExpandedSections(initialExpansion);
    }
    // Only run on mount or when sections list changes
  }, [sections]);

  const handleItemClick = (id, customOnClick = onItemClick) => {
    setActiveItem(id);
    // Execute the custom callback if provided
    if (customOnClick) {
      customOnClick(id);
    }
    // On mobile, close the sidebar after clicking an item
    if (isOpen && window.innerWidth < 1024) { // 1024px is Tailwind's 'lg' breakpoint
      onToggle();
    }
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  /**
   * Helper component to render a single menu item (both flat and sectioned structure)
   */
  const MenuItem = ({ item, isSectioned = false }) => (
    <li
      key={item.id}
      role="menuitem"
      className={`
        flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200 text-sm relative
        ${activeItem === item.id 
          ? 'bg-blue-800/60 text-blue-200 font-semibold border-l-4 border-blue-400 shadow-lg shadow-blue-900/20' 
          : 'text-blue-300 hover:bg-blue-900/30 hover:border-l-4 hover:border-blue-700/50'
        }
        ${isSectioned ? 'my-1' : 'my-2'} 
      `}
      onClick={() => handleItemClick(item.id)}
      aria-current={activeItem === item.id ? 'page' : undefined}
    >
      <span className="mr-3 text-lg w-5 flex-shrink-0">{item.icon || '📄'}</span>
      <span 
        className={`truncate flex-1 ${!isSectioned && !isOpen ? 'hidden lg:block' : 'block'}`}
      >
        {item.label}
      </span>
      {item.badge && (
        <span className="ml-auto bg-blue-500/80 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
          {item.badge}
        </span>
      )}
    </li>
  );

  // 2. Use useMemo for the main rendering logic (Performance optimization)
  const renderItems = useMemo(() => {
    // Render Sectioned Structure
    if (sections.length > 0) {
      return sections.map((section) => {
        const isExpanded = expandedSections[section.id];
        return (
          <div key={section.id} className="mb-4">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-3 text-xs font-semibold text-blue-400 uppercase tracking-wider hover:text-blue-300 bg-blue-900/30 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              aria-expanded={isExpanded}
              aria-controls={`section-list-${section.id}`}
            >
              <span className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                {section.title}
              </span>
              {/* Chevron icon using Tailwind rotate */}
              <span className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-90' : 'rotate-0'} text-blue-400 text-base`}>
                &rsaquo;
              </span>
            </button>
            {isExpanded && (
              <ul 
                id={`section-list-${section.id}`}
                role="menu"
                className="space-y-1 ml-4 mt-2 border-l-2 border-blue-800/50"
              >
                {section.items.map((item) => (
                  <MenuItem key={item.id} item={item} isSectioned />
                ))}
              </ul>
            )}
          </div>
        );
      });
    }

    // Fallback to Flat Structure
    return menuItems.map((item) => <MenuItem key={item.id} item={item} />);
  }, [sections, menuItems, activeItem, expandedSections, isOpen, handleItemClick]); // Dependencies

  return (
    <>
      {/* Mobile Overlay (Backdrop) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
          role="presentation"
        />
      )}

      {/* Sidebar Container */}
      <nav
        className={`
          fixed top-0 left-0 h-screen w-64 flex flex-col bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 text-white transform transition-transform duration-300 ease-in-out z-50 shadow-2xl shadow-blue-950/50 border-r border-blue-800/30
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto lg:h-screen
        `}
        role="navigation"
        aria-label="Main Sidebar Navigation"
      >
        {/* Mobile Header/Toggle */}
        <div className="p-4 border-b border-blue-800/50 lg:hidden flex-shrink-0">
          <button
            className="w-full flex items-center justify-between text-white text-xl font-bold p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            onClick={onToggle}
            aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent text-2xl">
              TimeFlow Pro
            </span>
            <span className="text-blue-300 font-light text-2xl leading-none">
              {isOpen ? '×' : '≡'}
            </span>
          </button>
        </div>

        {/* Scrollable Navigation Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 lg:pb-0 custom-scrollbar">
          <ul role={sections.length > 0 ? 'group' : 'menu'} className="list-none p-0 m-0 space-y-2">
            {renderItems}
          </ul>
        </div>

        {/* Footer (User Profile/Logout) */}
        <div className="flex-shrink-0 p-4 border-t border-blue-800/50 bg-blue-900/50 mt-auto">
          <div className="flex items-center space-x-3 text-blue-300">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-lg">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-white">John Doe</p>
              <p className="text-xs text-blue-400 truncate">Administrator</p>
            </div>
            <button
              className="p-1 text-blue-400 hover:text-blue-300 rounded-full hover:bg-blue-800/20 transition-colors flex-shrink-0"
              aria-label="User settings menu"
            >
              <span className="transform rotate-90 text-sm">...</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

// 3. Add PropTypes for better development experience
Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.node,
    badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })),
  sections: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
  })),
  activeItem: PropTypes.string,
  onItemClick: PropTypes.func,
};

export default Sidebar;