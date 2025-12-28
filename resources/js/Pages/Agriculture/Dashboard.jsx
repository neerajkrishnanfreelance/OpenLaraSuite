import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import StatCard from '@/Components/Dashboard/StatCard';

export default function Dashboard({ auth, activeCrops, rndCrops, recentLogs, upcomingSchedules }) {
    const markScheduleComplete = (scheduleId) => {
        if (confirm('Mark this schedule as done?')) {
            router.patch(route('agriculture.crops.schedules.complete', scheduleId), {}, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Agriculture Dashboard</h2>}
        >
            <Head title="Agriculture" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <StatCard title="Active Crops" value={activeCrops} icon="plant" color="green" />
                        <StatCard title="R&D Projects" value={rndCrops} icon="flask" color="blue" />
                        <Link href={route('agriculture.crops.create')}>
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 flex items-center justify-center h-full hover:bg-gray-50 cursor-pointer border-2 border-dashed border-gray-300">
                                <span className="text-gray-500 font-medium">Add New Crop</span>
                            </div>
                        </Link>
                    </div>

                    {/* Quick Access */}
                    <div className="mb-6">
                        <div className="flex gap-4">
                            <Link href={route('agriculture.crops.index')} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md">View All Crops</Link>
                        </div>
                    </div>

                    {/* Schedules Section */}
                    {upcomingSchedules && upcomingSchedules.length > 0 && (
                        <div className="mb-8 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r shadow-sm">
                            <div className="flex items-center mb-4">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-lg font-medium text-blue-800">Upcoming Schedules (7 Days)</h3>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="grid grid-cols-1 gap-4">
                                    {upcomingSchedules.filter(s => !s.completed_at).length === 0 && <p className="text-sm text-gray-500 italic">No pending schedules.</p>}
                                    {upcomingSchedules.filter(s => !s.completed_at).map((schedule) => (
                                        <div key={schedule.id} className="bg-white p-4 rounded-md shadow-sm border border-blue-100 flex justify-between items-center">
                                            <div>
                                                <p className="text-sm font-bold text-gray-800 capitalize">{schedule.activity_type} for {schedule.crop.name}</p>
                                                <p className="text-xs text-gray-500 mt-1">Scheduled for: {new Date(schedule.scheduled_date).toLocaleDateString()}</p>
                                                {schedule.notes && <p className="text-xs text-gray-600 mt-1 italic">{schedule.notes}</p>}
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <Link href={route('agriculture.crops.show', schedule.crop_id)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                    View Crop
                                                </Link>
                                                <button
                                                    onClick={() => markScheduleComplete(schedule.id)}
                                                    className="text-xs bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded shadow-sm"
                                                >
                                                    Mark Done
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Recent Logs Feed */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Monitoring Logs</h3>
                            <div className="flow-root">
                                <ul role="list" className="-mb-8">
                                    {recentLogs.map((log, logIdx) => (
                                        <li key={log.id}>
                                            <div className="relative pb-8">
                                                {logIdx !== recentLogs.length - 1 ? (
                                                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                                                ) : null}
                                                <div className="relative flex space-x-3">
                                                    <div>
                                                        <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                                                            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                                        <div>
                                                            <p className="text-sm text-gray-500">
                                                                Checked <span className="font-medium text-gray-900">{log.crop?.name}</span>
                                                            </p>
                                                            {log.notes && <p className="mt-1 text-sm text-gray-600">{log.notes}</p>}
                                                            {log.image_path && (
                                                                <div className="mt-2">
                                                                    <img src={`/storage/${log.image_path}`} alt="Log entry" className="h-32 w-auto rounded-md object-cover shadow-sm" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                                            <time dateTime={log.log_date}>{log.log_date}</time>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                    {recentLogs.length === 0 && <p className="text-gray-500 text-sm">No recent logs found.</p>}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
