import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Planning({ auth, projects }) {
    const handlePrint = () => {
        window.print();
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Project Planning</h2>
                    <button
                        onClick={handlePrint}
                        className="px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 print:hidden"
                    >
                        Print PDF
                    </button>
                </div>
            }
        >
            <Head title="Project Planning" />

            <div className="py-12 print:py-0 print:m-0">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 print:w-full print:max-w-none print:px-0">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg print:shadow-none">
                        <div className="p-6 text-gray-900 print:p-0">
                            {projects.map(project => (
                                <div key={project.id} className="mb-8 p-4 border rounded-lg print:border-none print:break-inside-avoid">
                                    <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                                    <div className="text-sm text-gray-600 mb-4">
                                        <p>Status: <span className="uppercase">{project.status}</span></p>
                                        <p>Duration: {project.start_date || 'N/A'} - {project.end_date || 'N/A'}</p>
                                    </div>

                                    <h4 className="font-semibold mt-4 mb-2 border-b pb-1">Tasks</h4>
                                    {project.tasks.length > 0 ? (
                                        <table className="min-w-full text-sm text-left text-gray-500">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                                <tr>
                                                    <th className="px-4 py-2">Task</th>
                                                    <th className="px-4 py-2">Assigned To</th>
                                                    <th className="px-4 py-2">Status</th>
                                                    <th className="px-4 py-2">Due Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {project.tasks.map(task => (
                                                    <tr key={task.id} className="bg-white border-b">
                                                        <td className="px-4 py-2 font-medium text-gray-900">{task.title}</td>
                                                        <td className="px-4 py-2">
                                                            {task.assigned_user ? task.assigned_user.name : '-'}
                                                        </td>
                                                        <td className="px-4 py-2">{task.status}</td>
                                                        <td className="px-4 py-2">{task.due_date || '-'}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p className="text-gray-500 italic">No tasks found.</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @media print {
                    @page { margin: 20px; }
                    body { margin: 0; padding: 0; }
                    nav { display: none; }
                    .print\\:hidden { display: none !important; }
                    .print\\:p-0 { padding: 0 !important; }
                    .print\\:shadow-none { box-shadow: none !important; }
                    .print\\:break-inside-avoid { break-inside: avoid; }
                }
            `}</style>
        </AuthenticatedLayout>
    );
}
