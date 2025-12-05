import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

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
const PlusIcon = (props) => (
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
const formatDate = (dateString, options = {}) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }).format(new Date(dateString));
};

const formatTime = (dateString) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(dateString));
};

const ActivityItem = React.memo(({ activity, onClick }) => (
  <li 
    role="button"
    tabIndex={0}
    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer"
    onClick={() => onClick(activity)}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick(activity);
      }
    }}
  >
    {/* Color Bar */}
    <div className={`w-2 h-10 ${activity.color} rounded-full flex-shrink-0`} aria-hidden="true"></div>
    
    <div className="flex-1 min-w-0">
      <p className="text-base font-medium text-gray-800 truncate" title={activity.title}>
        {activity.title}
      </p>
      <p className="flex items-center text-sm text-gray-500 mt-0.5">
        <ClockIcon className="w-4 h-4 mr-1 text-gray-400 flex-shrink-0" aria-hidden="true" />
        <span aria-label={`From ${formatTime(activity.start)} to ${formatTime(activity.end)}`}>
          {formatTime(activity.start)} - {formatTime(activity.end)}
        </span>
      </p>
    </div>
  </li>
));

ActivityItem.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

ActivityItem.displayName = 'ActivityItem';

const ActivitySchedule = React.memo(({ activities = DUMMY_ACTIVITIES, onActivityClick, onCreateNew }) => {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [view, setView] = useState('Day');

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
    
    // 3. Convert object to array for easy rendering, sorted by date
    return Object.keys(groups)
      .sort()
      .map(date => ({
        date,
        activities: groups[date],
      }));
  }, [activities]);

  // --- Navigation Controls ---
  const handleNext = useCallback(() => {
    setCurrentDate(prev => {
      const nextDate = new Date(prev);
      const step = view === 'Day' ? 1 : 7;
      nextDate.setDate(prev.getDate() + step);
      return nextDate;
    });
  }, [view]);

  const handlePrev = useCallback(() => {
    setCurrentDate(prev => {
      const prevDate = new Date(prev);
      const step = view === 'Day' ? 1 : 7;
      prevDate.setDate(prev.getDate() - step);
      return prevDate;
    });
  }, [view]);

  // --- Filter Logic ---
  const filteredActivities = useMemo(() => {
    const currentFormattedDate = formatDate(currentDate);

    if (view === 'Day') {
      const dayGroup = groupedActivities.find(group => group.date === currentFormattedDate);
      return dayGroup ? [dayGroup] : [];
    }

    // For Week view: Filter to activities within the current week
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Assuming week starts on Sunday
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return groupedActivities.filter(group => {
      const groupDate = new Date(group.date);
      return groupDate >= startOfWeek && groupDate <= endOfWeek;
    });
  }, [groupedActivities, currentDate, view]);

  // --- Create New Handler ---
  const handleCreateNewInternal = useCallback(() => {
    onCreateNew?.();
  }, [onCreateNew]);

  // --- Activity Click Handler ---
  const handleActivityClick = useCallback((activity) => {
    onActivityClick?.(activity);
  }, [onActivityClick]);

  // --- Header Title ---
  const headerTitle = useMemo(() => {
    if (view === 'Day') {
      return currentDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    // For Week: Show week range
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return `${formatDate(startOfWeek, { month: 'short', day: 'numeric' })} - ${formatDate(endOfWeek, { month: 'short', day: 'numeric' })}`;
  }, [currentDate, view]);

  // --- Empty State ---
  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center p-10 text-center text-gray-500">
      <ClockIcon className="w-12 h-12 text-gray-300 mb-4" aria-hidden="true" />
      <h3 className="text-lg font-medium text-gray-600 mb-2">
        {view === 'Day' ? 'No activities scheduled' : 'No activities this week'}
      </h3>
      <p className="text-sm text-gray-400">
        {view === 'Day' ? `for ${headerTitle.toLowerCase()}.` : 'Get started by creating a new activity.'}
      </p>
    </div>
  );

  // --- Rendering the List View ---
  const renderListView = () => {
    if (filteredActivities.length === 0) {
      return renderEmptyState();
    }

    return (
      <div className="space-y-6" role="list">
        {filteredActivities.map(dayGroup => (
          <section key={dayGroup.date} aria-labelledby={`date-${dayGroup.date}`}>
            {/* Date Separator */}
            <h3 
              id={`date-${dayGroup.date}`}
              className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-1 mb-4 sticky top-0 bg-white z-10"
            >
              {dayGroup.date}
            </h3>
            
            {/* Activities for the Day */}
            <ul className="space-y-4" role="list">
              {dayGroup.activities.map(activity => (
                <ActivityItem 
                  key={activity.id} 
                  activity={activity}
                  onClick={handleActivityClick}
                />
              ))}
            </ul>
          </section>
        ))}
      </div>
    );
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-xl border border-gray-200 mt-4 lg:m-8 flex flex-col min-h-[600px] overflow-hidden"
      role="main"
      aria-label="Activity Schedule"
    >
      
      {/* 1. Header Bar (Top Row) */}
      <header className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
        <h1 className="text-2xl font-bold text-gray-900">Activity Schedule</h1>
        
        {/* Create New Button */}
        <button
          type="button"
          onClick={handleCreateNewInternal}
          className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 shadow-sm"
          aria-label="Create a new activity"
        >
          <PlusIcon className="w-4 h-4" />
          <span>Create New</span>
        </button>
      </header>
      
      {/* 2. Secondary Bar (Navigation and View Selectors) */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-4">
          {/* View Selectors */}
          <div className="inline-flex rounded-md shadow-sm" role="radiogroup" aria-label="View selector">
            {['Day', 'Week'].map(v => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                className={`px-4 py-2 text-sm font-medium border transition-colors duration-200 
                  ${v === view 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                  }
                  ${v === 'Day' ? 'rounded-l-md' : 'rounded-r-md'}
                `}
                aria-checked={v === view}
                role="radio"
              >
                {v}
              </button>
            ))}
          </div>
          
          {/* Current Date Title */}
          <span className="text-lg font-medium text-gray-700 hidden sm:block" aria-live="polite">
            {headerTitle}
          </span>
        </div>

        {/* Navigation Buttons */}
        <div className="flex space-x-1" role="group" aria-label="Navigation">
          <button
            type="button"
            onClick={handlePrev}
            className="p-2 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-full transition-colors duration-200"
            aria-label="Previous period"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="p-2 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-full transition-colors duration-200"
            aria-label="Next period"
          >
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 3. Content Area - Scrollable list */}
      <div className="flex-1 overflow-y-auto p-4" role="region" aria-label="Activities list">
        {renderListView()}
      </div>
      
    </div>
  );
});

ActivitySchedule.displayName = 'ActivitySchedule';

ActivitySchedule.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ),
  onActivityClick: PropTypes.func,
  onCreateNew: PropTypes.func,
};

ActivitySchedule.defaultProps = {
  activities: [],
  onActivityClick: null,
  onCreateNew: null,
};

export default ActivitySchedule;