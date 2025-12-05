import React, { useState, useEffect, useCallback } from "react";

// Layout Components
import Sidebar from "@/Layouts/Sidebar";
import TopBar from "@/Layouts/TopBar";
import SheetContainer from "@/Layouts/SheetContainer";
import ChatterBox from "@/Layouts/Chatter";
import ActivityScheduler from "@/Layouts/ActivityScheduler";
import ButtonBar from "@/Layouts/SmartButton";
import StatusBar from "@/Layouts/StatusBar";

// --- Demo Placeholder Components ---
const TimesheetList = () => (
  <SheetContainer title="Timesheet List">
    <p className="p-4 text-gray-500">List view content...</p>
  </SheetContainer>
);

const TimesheetKanban = () => (
  <SheetContainer title="Timesheet Kanban">
    <p className="p-4 text-gray-500">Kanban board content...</p>
  </SheetContainer>
);
// -----------------------------------------------------------

// Demo steps for StatusBar
const demoSteps = [
  "Account Creation",
  "Profile Details & Bio",
  "Upload Documents & Verification",
  "Review & Finalize",
  "Process Complete",
];

const App = () => {
  // ---------------------- STATE ----------------------
  const [currentStep, setCurrentStep] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sections, setSections] = useState([]);
  const [activeItem, setActiveItem] = useState("timesheets");
  const [searchValue, setSearchValue] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState("list");
  const [isSaving, setIsSaving] = useState(false);

  const viewOptions = [
    { label: "List View", value: "list" },
    { label: "Grid View", value: "grid" },
    { label: "Kanban", value: "kanban" },
  ];

  // ---------------------- HANDLERS ----------------------
  const handleCreate = useCallback(() => alert("Creating a new item!"), []);
  const handleEdit = useCallback(() => alert("Editing selected item..."), []);
  const handleDelete = useCallback(() => alert("Confirm deletion."), []);

  const toggleDarkMode = useCallback(() => setDarkMode((prev) => !prev), []);
  const toggleSidebar = useCallback(() => setIsSidebarOpen((prev) => !prev), []);

  const handleItemClick = useCallback((id) => {
    setActiveItem(id);
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  }, []);

  const handleSearchChange = useCallback((value) => setSearchValue(value), []);

  const handleViewChange = useCallback((view) => {
    alert(`Switched to ${view}`);
    setViewMode(view);
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Changes saved successfully!");
    }, 1500);
  };

  const handleReboot = () => {
    alert("Simulating system reboot...");
    console.log("System reboot initiated.");
  };

  // ---------------------- EFFECTS ----------------------
  useEffect(() => {
    setSections([
      {
        id: "project",
        title: "Project",
        items: [
          { id: "dashboard", label: "Dashboard", icon: "📊" },
          { id: "projects", label: "Projects", icon: "📁" },
          { id: "tasks", label: "Tasks", icon: "📝" },
          { id: "calendar", label: "Calendar", icon: "📅" },
          { id: "employees", label: "Employees", icon: "👥" },
        ],
      },
      {
        id: "timesheets",
        title: "Timesheets",
        items: [{ id: "timesheets", label: "Timesheets", icon: "⏱️" }],
      },
      {
        id: "reports",
        title: "Reports",
        items: [{ id: "reports", label: "Reports", icon: "📈" }],
      },
      {
        id: "settings",
        title: "Settings",
        items: [
          { id: "settings", label: "Settings", icon: "⚙️" },
          { id: "logout", label: "Logout", icon: "🚪" },
        ],
      },
    ]);
  }, []);

  // ---------------------- RENDERERS ----------------------
  const renderMainContent = () => {
    if (activeItem === "timesheets") {
      return (
        <div className="flex p-4 gap-4 h-full">
          {/* Left Column */}
          <div className="flex-2 w-full lg:w-2/3">
            <SheetContainer
              title="Time Entries"
              onCreate={handleCreate}
              onEdit={handleEdit}
              onDelete={handleDelete}
            >
              <ul className="space-y-3">
                <li className="p-3 rounded-lg border bg-gray-50 dark:bg-gray-800">
                  Task 1: Build Sidebar
                </li>
                <li className="p-3 rounded-lg border bg-gray-50 dark:bg-gray-800">
                  Task 2: Finish TopBar
                </li>
                <li className="p-3 rounded-lg border bg-gray-50 dark:bg-gray-800">
                  Task 3: Integrate SheetContainer
                </li>
              </ul>
              <p className="mt-4 text-sm text-gray-500">Showing 3 of 10 entries.</p>
            </SheetContainer>

            <ActivityScheduler />
          </div>

          {/* Right Column */}
          <div className="flex-1 w-full lg:w-1/3">
            <ChatterBox recordId="ENTRY-345" />
          </div>
        </div>
      );
    }

    // Default screen
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Content for {activeItem}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Placeholder content for the {activeItem} view.
        </p>
      </div>
    );
  };

  // ---------------------- RETURN ----------------------
  return (
    <div className={`min-h-screen ${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50"}`}>
      <TopBar
        onToggle={toggleSidebar}
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <div className="flex ">
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={toggleSidebar}
          sections={sections}
          activeItem={activeItem}
          onItemClick={handleItemClick}
        />

        <main className={`flex-1 pt-[60px] overflow-y-auto transition-all duration-300 ${isSidebarOpen ? "lg:pl-64" : ""}`}>
          <ButtonBar options={viewOptions} activeOption={viewMode} onChange={handleViewChange} />

          <div className="p-4 m-2">
            <StatusBar steps={demoSteps} currentStep={currentStep} />
          </div>

          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
