import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import StatCard from '@/Components/Dashboard/StatCard';

export default function Dashboard({ auth, activeCrops, rndCrops, recentLogs }) {
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
