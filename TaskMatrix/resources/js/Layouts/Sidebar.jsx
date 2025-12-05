import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx'; // Optional: for conditional class names, install if needed

const INITIAL_ACTIVE_ITEM = 'dashboard';

const Sidebar = React.memo(
  ({
    isOpen,
    onToggle,
    menuItems = [],
    sections = [],
    activeItem: initialActiveItem = INITIAL_ACTIVE_ITEM,
    onItemClick,
    user = {}, // New prop for user info
  }) => {
    const [activeItem, setActiveItem] = useState(initialActiveItem);
    const [expandedSections, setExpandedSections] = useState({});

    // Sync activeItem with prop changes
    useEffect(() => {
      setActiveItem(initialActiveItem);
    }, [initialActiveItem]);

    // Initialize expanded sections for first section
    useEffect(() => {
      if (sections.length > 0 && !expandedSections[sections[0]?.id]) {
        setExpandedSections((prev) => ({
          ...prev,
          [sections[0].id]: true,
        }));
      }
    }, [sections, expandedSections]);

    const handleItemClick = useCallback(
      (id) => {
        setActiveItem(id);
        onItemClick?.(id);
        // Auto-close on mobile
        if (isOpen && window.innerWidth < 1024) {
          onToggle();
        }
      },
      [isOpen, onItemClick, onToggle]
    );

    const toggleSection = useCallback((sectionId) => {
      setExpandedSections((prev) => ({
        ...prev,
        [sectionId]: !prev[sectionId],
      }));
    }, []);

    const MenuItem = useCallback(
      ({ item, isSectioned = false }) => (
        <li
          role="menuitem"
          tabIndex={0}
          className={clsx(
            'flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 text-sm relative focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50',
            activeItem === item.id
              ? 'bg-blue-700 text-white font-medium border-l-4 border-blue-500 shadow-sm'
              : 'text-blue-200 hover:bg-blue-800 hover:text-blue-100 hover:border-l-4 hover:border-blue-600',
            isSectioned ? 'my-1 ml-3 pl-1 border-l border-blue-700' : 'my-2'
          )}
          onClick={() => handleItemClick(item.id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleItemClick(item.id);
            }
          }}
          aria-current={activeItem === item.id ? 'page' : undefined}
        >
          <span className="mr-3 text-base w-5 flex-shrink-0" aria-hidden="true">
            <i className={clsx('w-4 h-4', item.icon || 'fi-file')}></i> {/* Assume feather icons or similar; replace with actual icon lib */}
          </span>
          <span className="truncate flex-1 block">{item.label}</span>
          {item.badge && (
            <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
              {item.badge}
            </span>
          )}
        </li>
      ),
      [activeItem, handleItemClick]
    );

    const renderItems = useMemo(() => {
      if (sections.length > 0) {
        return sections.map((section) => {
          const isExpanded = expandedSections[section.id] ?? false;
          return (
            <div key={section.id} className="mb-4">
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                className={clsx(
                  'w-full flex items-center justify-between p-3 text-sm font-semibold',
                  'text-blue-200 uppercase tracking-wide border border-blue-700 rounded-lg',
                  'hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50',
                  'transition-colors duration-200 bg-blue-900'
                )}
                aria-expanded={isExpanded}
                aria-controls={`section-${section.id}`}
              >
                <span className="flex items-center">
                  <span
                    className="w-2 h-2 bg-blue-400 rounded-full mr-3"
                    aria-hidden="true"
                  />
                  {section.title}
                </span>
                <span
                  className={clsx(
                    'transition-transform duration-200 ml-2',
                    isExpanded && 'rotate-90'
                  )}
                  aria-hidden="true"
                >
                  →
                </span>
              </button>

              {isExpanded && (
                <ul
                  id={`section-${section.id}`}
                  role="menu"
                  className="space-y-1 mt-2 ml-4 border-l border-blue-700"
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

      return menuItems.map((item) => <MenuItem key={item.id} item={item} />);
    }, [sections, menuItems, expandedSections, toggleSection, MenuItem]);

    return (
    <div style={{ height: '200%' }}>

        {/* Mobile Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={onToggle}
            aria-hidden="true"
          />
        )}

        {/* Sidebar Navigation */}
        <nav
          className={clsx(
            'fixed top-0 left-0 w-64 h-screen',
            'bg-blue-900 text-blue-100 z-50 border-r border-blue-800 shadow-lg',
            'transform transition-transform duration-300 flex flex-col',
            isOpen ? 'translate-x-0' : '-translate-x-full',
            'lg:translate-x-0 lg:static'
          )}
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1" role="menu">
              {renderItems}
            </ul>
          </div>

          {/* User Footer */}
          <div className="p-4 border-t border-blue-800 bg-blue-950">
            <div className="flex items-center space-x-3 text-blue-200">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-semibold text-white text-sm flex-shrink-0">
                {user.initials || 'JD'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user.name || 'John Doe'}
                </p>
                <p className="text-xs text-blue-300 truncate">
                  {user.role || 'Administrator'}
                </p>
              </div>
              <button
                type="button"
                className="p-1.5 hover:bg-blue-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-colors duration-200"
                aria-label="Open user menu"
              >
                <span className="sr-only">More</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </div>
    );
  }
);

Sidebar.displayName = 'Sidebar';

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.string,
      badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
          icon: PropTypes.string,
          badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        })
      ).isRequired,
    })
  ),
  activeItem: PropTypes.string,
  onItemClick: PropTypes.func,
  user: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    initials: PropTypes.string,
  }),
};

Sidebar.defaultProps = {
  menuItems: [],
  sections: [],
  activeItem: INITIAL_ACTIVE_ITEM,
  onItemClick: null,
  user: {},
};

export default Sidebar;