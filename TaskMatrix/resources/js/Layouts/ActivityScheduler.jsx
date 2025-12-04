import React, { useState, useMemo, useCallback } from 'react';

// --- Icons (Using Heroicons style for clarity) ---
const ClockIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const ArrowLeftIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
);
const ArrowRightIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
);
const PlusIcon = (props) => ( // Added Plus Icon for Create Button
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

// --- Placeholder for dummy data ---
const DUMMY_ACTIVITIES = [
  { id: 1, title: 'Project Meeting', start: '2025-12-04T10:00:00', end: '2025-12-04T11:30:00', color: 'bg-indigo-500' },
  { id: 2, title: 'Deep Work Session', start: '2025-12-04T13:00:00', end: '2025-12-04T15:00:00', color: 'bg-green-500' },
  { id: 3, title: 'Client Call', start: '2025-12-05T09:00:00', end: '2025-12-05T10:00:00', color: 'bg-red-500' },
  { id: 4, title: 'Review Documentation', start: '2025-12-05T14:00:00', end: '2025-12-05T16:00:00', color: 'bg-yellow-500' },
];

// --- Helper Functions ---

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
    });
};

const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', hour12: true
    });
};

const ActivitySchedule = ({ activities = DUMMY_ACTIVITIES }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('Day'); // Simplified to Day/Week for navigation

  // --- Grouping and Sorting Logic ---
  const groupedActivities = useMemo(() => {
    // 1. Sort activities by start time
    const sorted = [...activities].sort((a, b) => new Date(a.start) - new Date(b.start));

    // 2. Group activities by date
    const groups = sorted.reduce((acc, activity) => {
        const dateKey = formatDate(activity.start);
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(activity);
        return acc;
    }, {});
    
    // 3. Convert object to array for easy rendering
    return Object.keys(groups).map(date => ({
        date: date,
        activities: groups[date]
    }));
  }, [activities]);

  // --- Navigation Controls (Now only shifts the focused date for filtering) ---
  const handleNext = useCallback(() => setCurrentDate(prev => {
      const nextDate = new Date(prev);
      const step = view === 'Day' ? 1 : 7;
      nextDate.setDate(prev.getDate() + step);
      return nextDate;
  }), [view]);

  const handlePrev = useCallback(() => setCurrentDate(prev => {
      const prevDate = new Date(prev);
      const step = view === 'Day' ? 1 : 7;
      prevDate.setDate(prev.getDate() - step);
      return prevDate;
  }), [view]);
  
  // Filter activities based on the current date/view (simple date comparison)
  const filteredActivities = useMemo(() => {
      // For simplicity, we'll only show activities that match the current date's grouping.
      const currentFormattedDate = formatDate(currentDate);
      
      return groupedActivities.filter(group => {
          if (view === 'Day') {
              return group.date === currentFormattedDate;
          }
          // For 'Week' view, show all activities
          return true;
      });
  }, [groupedActivities, currentDate, view]);

  // --- Create New Handler ---
  const handleCreateNew = () => {
    alert("Opening modal to create a new activity!");
  };

  // --- Rendering the List View ---
  const renderListView = () => {
    if (filteredActivities.length === 0 && view === 'Day') {
        return (
            <div className="p-10 text-center text-gray-500 italic">
                No scheduled activities for this day.
            </div>
        );
    }
    if (groupedActivities.length === 0 && view === 'Week') {
        return (
            <div className="p-10 text-center text-gray-500 italic">
                No scheduled activities found.
            </div>
        );
    }

    // Use groupedActivities for Week view, and filteredActivities for Day view
    const activitiesToRender = view === 'Day' ? filteredActivities : groupedActivities;

    return (
      <div className="space-y-6">
        {activitiesToRender.map(dayGroup => (
          <div key={dayGroup.date}>
            {/* Date Separator */}
            <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-1 mb-4 sticky top-0 bg-white z-10">
              {dayGroup.date}
            </h3>
            
            {/* Activities for the Day */}
            <ul className="space-y-4">
              {dayGroup.activities.map(activity => (
                <li 
                  key={activity.id} 
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-100 transition-shadow hover:shadow-md cursor-pointer"
                  onClick={() => alert(`Details for: ${activity.title}`)}
                >
                  {/* Color Dot/Bar */}
                  <div className={`w-2 h-10 ${activity.color} rounded-full flex-shrink-0`}></div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-medium text-gray-800 truncate">{activity.title}</p>
                    <p className="flex items-center text-sm text-gray-500 mt-0.5">
                        <ClockIcon className="w-4 h-4 mr-1 text-gray-400" />
                        <span>{formatTime(activity.start)} - {formatTime(activity.end)}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };
  
  const headerTitle = useMemo(() => {
    if (view === 'Day') {
        return currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    }
    return `Scheduled Activities`;
  }, [currentDate, view]);

  return (
    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 m-4 lg:m-8 flex flex-col h-[80vh] min-h-[600px]">
      
      {/* 1. Header Bar (Top Row) */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
        <h2 className="text-2xl font-bold text-gray-800">Activity Schedule</h2>
        
        {/* Create New Button */}
        <button
            onClick={handleCreateNew}
            className="flex items-center space-x-1 px-4 py-2 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md"
        >
            <PlusIcon className="w-5 h-5" />
            <span>Create New</span>
        </button>
      </div>
      
      {/* 2. Secondary Bar (Navigation and View Selectors) */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-4">
            {/* View Selectors */}
            <div className="inline-flex rounded-md shadow-sm" role="group">
                {['Day', 'Week'].map(v => (
                    <button
                        key={v}
                        onClick={() => setView(v)}
                        className={`px-3 py-1.5 text-sm font-medium border transition-colors 
                            ${v === view ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}
                            ${v === 'Day' ? 'rounded-l-lg' : ''}
                            ${v === 'Week' ? 'rounded-r-lg' : ''}
                        `}
                    >
                        {v}
                    </button>
                ))}
            </div>
            {/* Current Date Title */}
            <span className="text-lg font-medium text-gray-700 hidden sm:block">
              {headerTitle}
            </span>
        </div>
        

        {/* Navigation Buttons */}
        <div className="flex space-x-1">
            <button
                onClick={handlePrev}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                title="Previous Period"
            >
                <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <button
                onClick={handleNext}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                title="Next Period"
            >
                <ArrowRightIcon className="w-5 h-5" />
            </button>
        </div>
      </div>

      {/* 3. Content Area - Simple scrollable list */}
      <div className="flex-1 overflow-y-auto p-4">
        {renderListView()}
      </div>
      
    </div>
  );
};

export default ActivitySchedule;