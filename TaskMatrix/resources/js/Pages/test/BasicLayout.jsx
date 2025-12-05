import React, { useState, useEffect, useCallback } from 'react';
// Assuming these paths are correct in your project structure
import Sidebar from '@/Layouts/Sidebar'; 
import TopBar from '@/Layouts/TopBar';
import SheetContainer from '@/Layouts/SheetContainer';
import ChatterBox from '@/Layouts/Chatter';
import ActivityScheduler from '@/Layouts/ActivityScheduler';
import  ButtonBar from '@/Layouts/SmartButton';
import  StatusBar from '@/Layouts/StatusBar';


// --- Placeholder Components (Required by renderMainContent) ---
const TimesheetList = () => <SheetContainer title="Timesheet List"><p className="p-4 text-gray-500">List view content...</p></SheetContainer>;
const TimesheetKanban = () => <SheetContainer title="Timesheet Kanban"><p className="p-4 text-gray-500">Kanban board content...</p></SheetContainer>;
// -----------------------------------------------------------






const demoSteps = [
  "Account Creation",
  "Profile Details & Bio",
  "Upload Documents & Verification",
  "Review & Finalize",
  "Process Complete"
];









const App = () => {

  const [currentStep, setCurrentStep] = useState(0);

  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sections, setSections] = useState([]); // Dynamic sections
  const [activeItem, setActiveItem] = useState('timesheets'); 
  const [searchValue, setSearchValue] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [activeView, setActiveView] = useState('List'); // Kanban or List

  // Action Handlers
  const handleCreate = useCallback(() => alert('Creating a new item!'), []);
  const handleEdit = useCallback(() => alert('Editing selected item...'), []);
  const handleDelete = useCallback(() => alert('Confirm deletion.'), []);
  
  // Theme Toggle (Added for TopBar functionality)
  const toggleDarkMode = useCallback(() => setDarkMode(prev => !prev), []);

const [viewMode, setViewMode] = useState('list');
  const [isSaving, setIsSaving] = useState(false);

  const viewOptions = [
    { label: 'List View', value: 'list' },
    { label: 'Grid View', value: 'grid' },
    { label: 'Kanban', value: 'kanban' },
  ];



  // 2. SMART LOGIC/SIDE EFFECTS: Function to handle the change and perform an action (e.g., fetching data).


 const handleReboot = () => {
        alert('Simulating system reboot...');
        console.log('System reboot initiated.');
    };
const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert('Changes saved successfully!');
    }, 1500);
  };
  useEffect(() => {
    // Dynamic sections setup
    const dynamicSections = [
      { id: 'project', title: 'Project', items: [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'projects', label: 'Projects', icon: '📁' },
        { id: 'tasks', label: 'Tasks', icon: '📝' },
        { id: 'calendar', label: 'Calendar', icon: '📅' },
        { id: 'employees', label: 'Employees', icon: '👥' },
      ]},
      { id: 'timesheets', title: 'Timesheets', items: [
        { id: 'timesheets', label: 'Timesheets', icon: '⏱️' }
      ]},
      { id: 'reports', title: 'Reports', items: [
        { id: 'reports', label: 'Reports', icon: '📈' }
      ]},
      { id: 'settings', title: 'Settings', items: [
        { id: 'settings', label: 'Settings', icon: '⚙️' },
        { id: 'logout', label: 'Logout', icon: '🚪' }
      ]}
    ];
    setSections(dynamicSections);
  }, []);

  const toggleSidebar = useCallback(() => setIsSidebarOpen(prev => !prev), []);

  const handleItemClick = useCallback((id) => {
    setActiveItem(id);
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  }, []);

  const handleSearchChange = useCallback((value) => setSearchValue(value), []);

  const handleViewChange = useCallback((view) => alert(view), []);


  const renderMainContent = () => {
    if (activeItem === 'timesheets') {
        // Corrected the two-column layout using Tailwind Flex utilities
      return (
        <div className="flex p-4 gap-4 h-full">
            {/* Left Column (Approx. 2/3 width) - Task/Sheet Data */}
            <div className="flex-2 w-full lg:w-2/3">
                <SheetContainer
                    title="Time Entries"
                    onCreate={handleCreate}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                >
                    <ul className="space-y-3">
                        <li className="p-3 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">Task 1: Build Sidebar</li>
                        <li className="p-3 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">Task 2: Finish TopBar</li>
                        <li className="p-3 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">Task 3: Integrate SheetContainer</li>
                    </ul>
                    <p className="mt-4 text-gray-500 text-sm">Showing 3 out of 10 entries.</p>
                </SheetContainer>

<ActivityScheduler></ActivityScheduler>


                {/* Fallback views based on activeView (if needed) */}
                {/* {activeView === 'List' ? <TimesheetList /> : <TimesheetKanban />} */}
            </div>

            {/* Right Column (Approx. 1/3 width) - Chatter/Activity */}
            <div className="flex-1 w-full lg:w-1/3">
                {/* Ensure ChatterBox fills the container */}
                <ChatterBox recordId="ENTRY-345" /> 
            </div>
        </div>
      );
    }

    // Default content for other menu items
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Content for {activeItem}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">Placeholder content for the {activeItem} view.</p>
      </div>
    );
  };


  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <TopBar 
        onToggle={toggleSidebar} 
        searchValue={searchValue} 
        onSearchChange={handleSearchChange}
        // Passed darkMode state and toggle function for the Moon/Sun icon
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
    
      <div className="flex">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onToggle={toggleSidebar}
          sections={sections}
          activeItem={activeItem}
          onItemClick={handleItemClick}
        />
 
        <main 
        
          className={`flex-1 transition-all duration-300 overflow-y-auto ${isSidebarOpen ? 'lg:pl-64' : ''} pt-[60px]`}
        >
  <ButtonBar 
        options={viewOptions}
        activeOption={viewMode} // Passes the current state down
        onChange={handleViewChange} // Passes the "smart" handler down
    />
    <br></br>    
      <div className='p-4 m-2'>
     <StatusBar steps={demoSteps} currentStep={currentStep} />
      </div>
         



            {/* Render the content based on the active sidebar item */}
            {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default App;