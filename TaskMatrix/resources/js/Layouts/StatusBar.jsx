import React, { useState } from 'react';

// --- Status Icon Components ---

// Used for completed steps - using a slightly smaller stroke for better fill look
const CheckCircle = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <path d="M22 4L12 14.01l-3-3"></path>
  </svg>
);

// Circle icon is kept but not used in the final stepper design for the Odoo style
const Circle = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
  </svg>
);

// -----------------------------------------------------------------------
// --- STEPPER COMPONENT (Odoo Ribbon Style UI) ---
// -----------------------------------------------------------------------

/**
 * Stepper component to visualize progress through a sequence of steps in a professional ribbon style.
 * @param {string[]} steps - An array of step labels.
 * @param {number} currentStep - The zero-based index of the currently active step.
 */
const StatusBar = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-between items-center w-full px-2 sm:px-0 bg-white rounded-lg p-4 shadow-inner">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const isLast = index === steps.length - 1;

        // Odoo-style color definitions
        const completedBg = 'bg-blue-700 text-white';
        const activeBg = 'bg-yellow-400 text-gray-900 font-extrabold shadow-md'; // High-visibility yellow for active
        const pendingBg = 'bg-gray-200 text-gray-700 font-semibold';

        const statusClasses = isCompleted
          ? completedBg
          : isActive
          ? activeBg
          : pendingBg;

        // Connector color relies on the status of the preceding step
        const connectorColor = isCompleted
          ? 'bg-blue-700'
          : 'bg-gray-400';

        return (
          <React.Fragment key={index}>
            {/* Step Item (The main ribbon block) */}
            <div 
              className={`
                flex items-center justify-center py-2 px-4 rounded-lg flex-1 min-w-0 z-10 
                text-sm sm:text-base cursor-default select-none
                transform transition-all duration-300 ease-in-out
                ${statusClasses}
              `}
              style={{ minWidth: 0, flexBasis: `${100 / steps.length}%` }} // Ensure even spacing
            >
              {/* Show checkmark only for completed steps */}
              {isCompleted && (
                  <CheckCircle className="w-4 h-4 mr-2" />
              )}
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                  {step}
              </span>
            </div>

            {/* Connector Line (Thin vertical divider between status blocks) */}
            {!isLast && (
              <div className="flex-none w-4 h-full flex items-center justify-center">
                <div className={`w-0.5 h-6 transition-colors duration-500 ${connectorColor} rounded-full`}></div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
export default StatusBar;

