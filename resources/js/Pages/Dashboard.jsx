import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ProfileCard from '@/Components/Dashboard/ProfileCard';
import TaskWidget from '@/Components/Dashboard/TaskWidget';
import CallWidget from '@/Components/Dashboard/CallWidget';
import StatCard from '@/Components/Dashboard/StatCard';
import GanttWidget from '@/Components/Dashboard/GanttWidget';
import CreateTaskModal from '@/Components/CreateTaskModal';
import TimesheetTimerWidget from '@/Components/Dashboard/TimesheetTimerWidget';
import { useState } from 'react';

export default function Dashboard({ auth, user_stats, todays_calls, todays_tasks, calendar_events, tasks, projects, users, activeTimer }) {
    const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);

    // Add custom CSS for calendar overrides if needed, or rely on global CSS
    // Ideally we would put this in a CSS file, but for now injecting style tag for specific overrides
    const styles = `
        .rbc-header { text-transform: uppercase; font-size: 0.75rem; color: #6b7280; font-weight: 500; border-bottom: none; padding: 10px 0; }
        .rbc-month-view { border: none; }
        .rbc-month-row { border: none; min-height: 80px; }
        .rbc-day-bg { border: none; }
        .rbc-off-range-bg { background: transparent; }
        .rbc-date-cell { text-align: center; padding: 5px; font-weight: 500; color: #374151; }
        .rbc-today { background-color: transparent; }
        .rbc-now { font-weight: bold; color: #2563eb; }
        .rbc-current .rbc-button-link { background-color: #f3f4f6; border-radius: 9999px; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; }
    `;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>
                    <button
                        onClick={() => setShowCreateTaskModal(true)}
                        className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        + Create Task
                    </button>
                </div>
            }
        >
            <Head title="Dashboard" />
            <style>{styles}</style>

            {/* Main Grid: 2 Columns on large screens */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* Left Column (Gantt Timetable) - Spans 3 cols */}
                <div className="lg:col-span-3">
                    <GanttWidget tasks={tasks || []} />
                </div>

                {/* Right Column (Profile Card & Timer) - Spans 1 col */}
                <div className="lg:col-span-1 space-y-6">

                    <TimesheetTimerWidget projects={projects} activeTimer={activeTimer} />
                </div>

                {/* Row 2: Widgets ... */}

                {/* Tasks Widget */}
                <div className="lg:col-span-1">
                    <TaskWidget tasks={todays_tasks} />
                </div>

                {/* Calls Widget */}
                <div className="lg:col-span-1">
                    <CallWidget calls={todays_calls} />
                </div>

                {/* Health Widget */}
                <div className="lg:col-span-1">
                    <a href="/health" className="block bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                        <div className="flex flex-col items-center text-center">
                            <div className="p-4 bg-red-100 rounded-full mb-3">
                                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-indigo-600 mb-1">Health</h3>
                            <p className="text-sm text-gray-600">Monitor wellness</p>
                        </div>
                    </a>
                </div>

                {/* Stock Widget */}
                <div className="lg:col-span-1">
                    <a href="/stocks" className="block bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                        <div className="flex flex-col items-center text-center">
                            <div className="p-4 bg-purple-100 rounded-full mb-3">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-indigo-600 mb-1">Stocks</h3>
                            <p className="text-sm text-gray-600">Track investments</p>
                        </div>
                    </a>
                </div>

                {/* Stat Card */}

            </div>

            <CreateTaskModal
                show={showCreateTaskModal}
                onClose={() => setShowCreateTaskModal(false)}
                projects={projects}
                users={users}
            />
        </AuthenticatedLayout>
    );
}
