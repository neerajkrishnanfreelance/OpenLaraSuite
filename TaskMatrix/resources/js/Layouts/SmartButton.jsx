import React from 'react';

// --- Icon Components (Matching the visual style of the reference image) ---

const CalendarIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const StarIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const ListIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <line x1="12" y1="12" x2="3" y2="12"></line>
    <line x1="12" y1="6" x2="3" y2="6"></line>
    <line x1="12" y1="18" x2="3" y2="18"></line>
    <path d="M16 12h5"></path>
    <path d="M16 18h5"></path>
    <path d="M16 6h5"></path>
  </svg>
);

// Reusable SVG for the drilldown indicator (small arrow)
const ChevronDown = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={3} // Made stroke thicker for visibility
    stroke="currentColor" 
    className={className || "w-3 h-3"}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);


// Map key strings to the actual icon components
const IconMap = {
  Meetings: CalendarIcon,
  Invoiced: StarIcon,
  CustomerStatement: ListIcon,
  Tasks: ListIcon,
};


// -----------------------------------------------------------------------
// --- THE MAIN COMPONENT: ButtonBar ---
// -----------------------------------------------------------------------

/* * ButtonBar: A reusable component to display professional metric filters 
 * in a dashboard context (mimicking Odoo/Zoho style).
 * * Props:
 * - options: Array of objects: [{ value, label, iconKey, metric, isDrillable }]
 * - activeOption: The value string of the currently selected option.
 * - onChange: Function (value) => void to handle selection changes.
 */
const ButtonBar = ({ options, activeOption, onChange }) => {
  if (!options || options.length === 0) return null;

  // Switched to a cleaner blue/gray palette typical of modern Zoho/SaaS dashboards
  const activeColorClasses = 'bg-blue-50 text-blue-700';
  const inactiveHoverClasses = 'hover:bg-gray-50'; // Clean hover on inactive

  return (
    // CONTAINER: Removed borders and shadow. Added large rounded corners, soft shadow, and border-gray-100.
    <div className="flex w-full max-w-7xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100"> 
      
      {options.map((option, index) => {
        const IconComponent = IconMap[option.iconKey] || ListIcon;
        const isActive = option.value === activeOption;

        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`
              // BUTTON BASE: Flex column layout, increased vertical spacing (py-4).
              flex-1 flex flex-col items-start px-5 py-4 min-w-[150px]
              relative overflow-hidden
              transition-all duration-300 ease-out 
              
              // New Modern Separation: Use a subtle vertical divider for inactive cards.
              ${index < options.length - 1 && !isActive && options[index + 1].value !== activeOption ? 'border-r border-gray-200' : ''}
              
              // Rounded corners only on the first/last item of the whole group
              ${index === 0 ? 'rounded-l-xl' : ''}
              ${index === options.length - 1 ? 'rounded-r-xl' : ''}

              // ACTIVE STATE: Cleaner, non-overlapping design. Border at the bottom for emphasis.
              ${isActive 
                ? `${activeColorClasses} border-b-4 border-blue-600 font-bold z-10` 
                : `bg-white text-gray-800 ${inactiveHoverClasses}`
              }
            `}
            // Removed inline style hack for overlapping borders
          >
            {/* Row 1: Icon and Label */}
            <div className="flex items-center text-sm font-semibold mb-1">
              <IconComponent 
                className={`w-5 h-5 mr-2 
                  ${isActive ? 'text-blue-600' : 'text-gray-500'}
                `} 
              />
              {option.label}
            </div>

            {/* Row 2: Metric/Value */}
            <div className={`text-xl font-extrabold ${isActive ? 'text-blue-800' : 'text-gray-900'}`}>
              {option.metric}
            </div>
            
            {/* Drill Symbol (Now a fixed element, uses an overlay/background effect) */}
            {option.isDrillable && (
                <div 
                  className={`absolute bottom-0 right-0 p-2 
                             ${isActive ? 'bg-blue-200/50' : 'bg-gray-100/50 hover:bg-gray-200/50'} 
                             transition-colors duration-200
                             flex items-center justify-center`}
                >
                    <ChevronDown className={`
                        w-4 h-4 
                        ${isActive ? 'text-blue-600' : 'text-gray-600'}
                    `} />
                </div>
            )}
            
          </button>
        );
      })}
    </div>
  );
};

export default ButtonBar;