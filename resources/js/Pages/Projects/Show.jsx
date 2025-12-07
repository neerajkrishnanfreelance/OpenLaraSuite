import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import StatusBadge from '@/Components/StatusBadge';


export default function Show({ auth, project }) {
    // Helper to render a field in "form-like" style
    const Field = ({ label, value, fullWidth = false }) => (
        <div className={`mb-4 ${fullWidth ? 'col-span-2' : ''}`}>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</label>
            <div className="bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-md px-3 py-2">
                {value || '-'}
            </div>
        </div>
    );

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link href={route('projects.index')} className="mr-4 text-gray-400 hover:text-gray-600 transition">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        </Link>
                        <h2 className="font-bold text-2xl text-gray-800 leading-tight">{project.name}</h2>
                        <span className="ml-4"><StatusBadge status={project.status} /></span>
                    </div>
                    <div className="flex space-x-3">
                        <Link href={route('projects.edit', project.id)} className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm">
                            Edit Project
                        </Link>
                        <button className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700 transition shadow-sm">
                            Mark Complete
                        </button>
                    </div>
                </div>
            }
        >
            <Head title={`Project: ${project.name}`} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Project Information Form */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-6 border-b border-gray-100 pb-2">Project Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Field label="Project Name" value={project.name} />
                            <Field label="Status" value={project.status === 'active' ? 'Active' : 'Archived'} />
                            <Field label="Start Date" value={project.start_date} />
                            <Field label="End Date" value={project.end_date} />
                            <Field label="Description" value={project.description} fullWidth />
                        </div>
                    </div>

                    {/* Team Section */}
                    <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Assigned Team</h3>
                        <div className="flex flex-wrap gap-3">
                            {project.users && project.users.length > 0 ? project.users.map(user => (
                                <div key={user.id} className="flex items-center px-3 py-2 bg-gray-50 rounded-full border border-gray-200">
                                    <div className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold mr-2">
                                        {user.name.charAt(0)}
                                    </div>
                                    <span className="text-sm text-gray-700">{user.name}</span>
                                </div>
                            )) : <p className="text-sm text-gray-400 italic">No members assigned.</p>}
                        </div>
                    </div>
                </div>

                {/* Right Column: Chatter/Activity (Tasks) */}
                <div className="space-y-6">
                    <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-4 h-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                                Tasks ({project.tasks ? project.tasks.length : 0})
                            </h3>
                            <Link href={route('tasks.create', { project_id: project.id })} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">+ Add</Link>
                        </div>

                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                            {/* Mock "Chatter" style inputs for tasks */}
                            {project.tasks && project.tasks.length > 0 ? project.tasks.map(task => (
                                <div key={task.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200 relative group hover:bg-gray-100 transition">
                                    <div className="flex justify-between items-start">
                                        <Link href={route('tasks.edit', task.id)} className="font-semibold text-gray-800 text-sm hover:text-indigo-600 block mb-1">
                                            {task.title}
                                        </Link>
                                        <StatusBadge status={task.status} />
                                    </div>
                                    <p className="text-xs text-gray-500 line-clamp-2 mb-2">{task.description || 'No description'}</p>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center text-xs text-gray-400">
                                            {task.assigned_user ? (
                                                <div className="flex items-center" title={`Assigned to ${task.assigned_user.name}`}>
                                                    <div className="h-5 w-5 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center text-[10px] font-bold mr-1">
                                                        {task.assigned_user.name.charAt(0)}
                                                    </div>
                                                    <span>{task.assigned_user.name.split(' ')[0]}</span>
                                                </div>
                                            ) : <span>Unassigned</span>}
                                        </div>
                                        <div className="text-[10px] text-gray-400">
                                            {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No Due Date'}
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-6">
                                    <p className="text-sm text-gray-400">No tasks yet.</p>
                                    <p className="text-xs text-gray-400 mt-1">Start by adding one!</p>
                                </div>
                            )}
                        </div>

                        {/* Quick Message Input (Mocking the 'Write a message' from image) */}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <input
                                type="text"
                                placeholder="Write a note or @mention..."
                                className="w-full text-sm border-gray-200 rounded-md focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50"
                                disabled // Disabled for now as backend logic isn't there
                            />
                            <div className="flex justify-end mt-2">
                                <button disabled className="px-3 py-1 bg-indigo-600 text-white text-xs rounded opacity-50 cursor-not-allowed">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
