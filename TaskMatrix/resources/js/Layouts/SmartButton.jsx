import React from 'react';

const ButtonBar = ({ options, activeOption, onChange }) => {
  if (!options || options.length === 0) return null;

  return (
    <div className="inline-flex rounded-lg shadow-sm border border-gray-300 bg-white" role="group">
      {options.map((option, index) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`
            px-4 py-2 text-sm font-medium transition-colors duration-150 
            ${option.value === activeOption 
              ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' 
              : 'bg-white text-gray-700 hover:bg-gray-50'
            }
            ${index === 0 ? 'rounded-l-lg' : ''}
            ${index === options.length - 1 ? 'rounded-r-lg' : ''}
            ${index > 0 ? 'border-l border-gray-300' : ''}
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ButtonBar;