import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ProfileCard from '@/Components/Dashboard/ProfileCard';
import CalendarWidget from '@/Components/Dashboard/CalendarWidget';
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

            {/* Main Grid: 2 Columns on large screens, Calendar takes 2/3 approx logic but here we split differently */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* Left Column (Calendar) - Spans 3 cols */}
                <div className="lg:col-span-3">
                    <CalendarWidget events={calendar_events} />
                </div>

                {/* Right Column (Profile Card & Timer) - Spans 1 col */}
                <div className="lg:col-span-1 space-y-6">
                    <ProfileCard user={auth.user} stats={user_stats} />
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

                {/* Secondary Stats/Profile or another Widget - Reusing ProfileCard for another user mock from image or just another stat */}
                {/* The image shows another profile card "Sara Ahmed". We'll mock it or show another stat for now to avoid confusion */}
                <div className="lg:col-span-1">
                    <ProfileCard
                        user={{ name: 'Sara Ahmed', email: 'Project Coordinator', roles: [{ name: 'Coordinator' }] }}
                        stats={{ todays_completed: 9, todays_total: 11, pending_overall: 8, daily_progress: 80 }}
                    />
                </div>

                {/* Stat Card */}
                <div className="lg:col-span-1">
                    <StatCard
                        title="Delivery"
                        value={`${user_stats.on_time_percentage}%`}
                        valueLabel="On-Time Delivery"
                        subtitle="This Month • Excellent!"
                        color="purple"
                    />
                </div>

                {/* Row 3: Gantt Chart */}
                <div className="lg:col-span-4">
                    <GanttWidget tasks={tasks || []} />
                </div>

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
