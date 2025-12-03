import React from 'react';

// Card component (no change)
const StatCard = ({ title, value, icon, iconColor, progressPercent, progressColor, footerText }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 card-hover">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-3xl font-bold mt-1 ${title === 'Overtime' ? 'text-red-600' : 'text-gray-900'}`}>{value}</p>
        </div>
        <i className={`${icon} text-3xl ${iconColor}`}></i>
      </div>
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`${progressColor} h-2 rounded-full`} 
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">{footerText}</p>
      </div>
    </div>
  );
};

// Main component now requires 'statsData' prop
const StatsCards = ({ statsData }) => {
  // NOTE: The hardcoded 'stats' array has been REMOVED.
  // We assume statsData is an array of objects passed from the Inertia page.

  // Use a fallback to an empty array if statsData is not provided
  const stats = statsData || [
    // This fallback is only for development/safety, 
    // in production statsData must be provided via Inertia props.
    { title: "Placeholder", value: "0h", icon: "fas fa-question-circle", iconColor: "text-gray-400", progressPercent: 0, progressColor: "bg-gray-400", footerText: "Loading data..." }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default StatsCards;