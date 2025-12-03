import React from 'react';

// Row Component (no change, uses data prop)
const TimesheetRow = ({ entry, isRunning }) => {
  const statusClasses = {
    Running: "bg-yellow-100 text-yellow-800",
    Completed: "bg-green-100 text-green-800",
  };
  const statusIcon = {
    Running: "fas fa-play",
    Completed: "fas fa-check",
  };
  const bgClass = isRunning ? "bg-purple-50 running hover:bg-purple-50" : "hover:bg-gray-50 transition-colors";
  const nameInitial = entry.employee.split(' ').map(n => n[0]).join('');

  return (
    <tr className={bgClass}>
      {/* Date */}
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-800">
        <div>{entry.date}</div>
        {isRunning && <div className="text-xs text-purple-600">Today</div>}
      </td>
      {/* Employee */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {/* entry.initialBg must be passed in the prop data now */}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm mr-3 ${entry.initialBg}`}>{nameInitial}</div>
          <div>{entry.employee}</div>
        </div>
      </td>
      {/* Project / Task */}
      <td className="px-6 py-4 text-sm text-gray-900">
        <div className="font-medium">{entry.project}</div>
        <div className="text-sm text-gray-500">{entry.task}</div>
      </td>
      {/* Status */}
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusClasses[entry.status]}`}>
          <i className={`${statusIcon[entry.status]} mr-1`}></i> {entry.status}
        </span>
      </td>
      {/* Time Range */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{entry.timeRange}</td>
      {/* Hours */}
      <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold text-center ${isRunning ? 'text-purple-600' : 'text-green-600'}`}>{entry.hours}</td>
      {/* Overtime */}
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <span className={entry.overtime === '—' ? 'text-gray-500' : 'text-red-600 font-semibold'}>{entry.overtime}</span>
      </td>
    </tr>
  );
};

// Mobile Card Component (no change, uses data prop)
const MobileTimesheetCard = ({ entry, isRunning }) => {
  const statusClasses = {
    Running: "bg-yellow-100 text-yellow-800",
    Completed: "bg-green-100 text-green-800",
  };
  const statusIcon = {
    Running: "fas fa-play",
    Completed: "fas fa-check",
  };
  const cardClasses = isRunning 
    ? "bg-purple-50 running p-4 rounded-xl border border-purple-200"
    : "p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors";
  const nameInitial = entry.employee.split(' ').map(n => n[0]).join('');

  return (
    <div className={cardClasses}>
      <div className="flex justify-between items-start mb-2">
        <div className={`font-medium ${isRunning ? 'text-purple-800' : 'text-gray-900'}`}>
          {entry.date} {isRunning && <span className="text-xs block text-purple-600">Today</span>}
        </div>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusClasses[entry.status]}`}>
          <i className={`${statusIcon[entry.status]} mr-1`}></i> {entry.status}
        </span>
      </div>
      <div className="flex items-center mb-2">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm mr-3 flex-shrink-0 ${entry.initialBg}`}>{nameInitial}</div>
        <div className="font-medium">{entry.employee}</div>
      </div>
      <div className="mb-2">
        <div className="font-medium">{entry.project}</div>
        <div className="text-sm text-gray-500">{entry.task}</div>
      </div>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{entry.timeRange}</span>
        <span className={isRunning ? 'text-purple-600 font-semibold' : 'text-green-600 font-semibold'}>{entry.hours}</span>
        <span className={entry.overtime === '—' ? '' : 'text-red-600 font-semibold'}>{entry.overtime}</span>
      </div>
    </div>
  );
};

// Main component now requires 'timesheetData' prop
const TimesheetTable = ({ timesheetData, isC1Running }) => {
  // NOTE: The hardcoded 'timesheetData' array has been REMOVED.
  const data = timesheetData || []; // Use provided data or empty array

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 fade-in">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Desktop Table */}
        <div className="desktop-table overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Project / Task</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Time Range</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Hours</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Overtime</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {data.map((entry, index) => (
                <TimesheetRow key={index} entry={entry} isRunning={index === 0 && isC1Running} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="mobile-card space-y-4 px-4 py-6">
          {data.map((entry, index) => (
            <MobileTimesheetCard key={index} entry={entry} isRunning={index === 0 && isC1Running} />
          ))}
        </div>

        {/* Pagination (Should also use data props, but kept static for layout demonstration) */}
        <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex flex-1 justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Previous</button>
              <button className="relative ml-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Next</button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">Showing <span className="font-medium">1</span> to <span className="font-medium">{data.length}</span> of <span className="font-medium">{(data.length + 9)}</span> results</p>
              </div>
              <div>
                <nav className="isolate z-1 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span className="sr-only">Previous</span>
                    <i className="fas fa-chevron-left"></i>
                  </a>
                  <a href="#" aria-current="page" className="relative z-10 inline-flex items-center px-4 py-2 border border-indigo-500 bg-indigo-50 text-sm font-medium text-indigo-600 focus:z-20 focus:outline-offset-0">1</a>
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 z-0">2</span>
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 z-0">...</span>
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 z-0">10</span>
                  <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span className="sr-only">Next</span>
                    <i className="fas fa-chevron-right"></i>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimesheetTable;