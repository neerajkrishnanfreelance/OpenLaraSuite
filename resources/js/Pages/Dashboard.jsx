import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import StatusBadge from '@/Components/StatusBadge';

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

export default function Dashboard({ auth, stats, charts, todays_tasks, calendar_events }) {
    const COLORS = ['#9333ea', '#10b981', '#f59e0b', '#ef4444']; // Purple, Emerald, Amber, Red

    const taskData = charts.task_status.map(item => ({
        name: item.status.replace('_', ' ').toUpperCase(),
        value: item.count
    }));

    const hoursData = charts.hours_trend.map(item => ({
        date: new Date(item.date).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' }),
        hours: parseFloat(item.total_hours)
    }));

    // Parse calendar events slightly to ensure Date objects
    const events = calendar_events.map(ev => ({
        ...ev,
        start: new Date(ev.start),
        end: new Date(ev.end),
    }));

    return (
        <AuthenticatedLayout header="Dashboard">
            <Head title="Dashboard" />

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white overflow-hidden shadow-sm rounded-xl p-5 border border-gray-100">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-purple-50 text-purple-600">
                            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                        </div>
                        <div className="ml-4">
                            <div className="text-sm font-medium text-gray-500">My Pending Tasks</div>
                            <div className="text-2xl font-bold text-gray-800">{stats.my_pending_tasks}</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow-sm rounded-xl p-5 border border-gray-100">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-emerald-50 text-emerald-600">
                            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <div className="ml-4">
                            <div className="text-sm font-medium text-gray-500">Hours (Month)</div>
                            <div className="text-2xl font-bold text-gray-800">{stats.my_hours_month}</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow-sm rounded-xl p-5 border border-gray-100">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                        </div>
                        <div className="ml-4">
                            <div className="text-sm font-medium text-gray-500">Active Projects</div>
                            <div className="text-2xl font-bold text-gray-800">{stats.active_projects}</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow-sm rounded-xl p-5 border border-gray-100">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-amber-50 text-amber-600">
                            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <div className="ml-4">
                            <div className="text-sm font-medium text-gray-500">Approvals</div>
                            <div className="text-2xl font-bold text-gray-800">{stats.pending_approvals || 0}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Main Content Column (2/3) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Meeting Calendar */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            Meeting Schedule
                        </h3>
                        <div style={{ height: 500 }}>
                            <Calendar
                                localizer={localizer}
                                events={events}
                                startAccessor="start"
                                endAccessor="end"
                                style={{ height: 500 }}
                                views={['month', 'week', 'day']}
                                defaultView='week' // Default to week view like Outlook/Slack
                            />
                        </div>
                    </div>

                    {/* Hours Chart */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Hours Logged Trend</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={hoursData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                                    <Tooltip
                                        cursor={{ fill: '#F3F4F6' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                    />
                                    <Bar dataKey="hours" fill="#10B981" radius={[4, 4, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Sidebar Column (1/3) */}
                <div className="space-y-8">
                    {/* Today's Tasks */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-96 overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800">Today's Tasks</h3>
                            <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{todays_tasks.length}</span>
                        </div>

                        <div className="space-y-3">
                            {todays_tasks.length > 0 ? todays_tasks.map(task => (
                                <div key={task.id} className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition duration-150 flex items-start justify-between">
                                    <div>
                                        <Link href={route('tasks.edit', task.id)} className="font-medium text-gray-900 hover:text-purple-600 block">{task.title}</Link>
                                        <p className="text-xs text-gray-500 mt-1">{task.project?.name}</p>
                                    </div>
                                    <StatusBadge status={task.status} />
                                </div>
                            )) : (
                                <div className="text-center py-8 text-gray-400 text-sm">
                                    No tasks due today. <br /> Great job! 🎉
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Task Status Pie Chart */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Task Distribution</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={taskData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60} // Donut chart for modern look
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {taskData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    {/* <Legend verticalAlign="bottom" height={36}/> */}
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="flex justify-center space-x-4 mt-2">
                                {taskData.map((entry, index) => (
                                    <div key={index} className="flex items-center">
                                        <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                        <span className="text-xs text-gray-600 capitalize">{entry.name.toLowerCase()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
