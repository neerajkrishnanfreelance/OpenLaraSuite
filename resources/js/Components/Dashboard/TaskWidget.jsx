import React from 'react';
import { Link } from '@inertiajs/react';

export default function TaskWidget({ tasks }) {
    return (
        <Link href={route('tasks.index')} className="block bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full hover:shadow-md transition duration-200">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                    Today's Tasks ({tasks.length})
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </h3>
            </div>

            <div className="space-y-4">
                {tasks.length > 0 ? tasks.map(task => (
                    <div key={task.id} className={`flex items-start p-3 rounded-xl border ${task.priority === 'High' ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-100 shadow-sm'}`}>
                        <div className="flex-shrink-0 mt-1">
                            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" readOnly checked={task.status === 'done'} />
                        </div>
                        <div className="ml-3 flex-1">
                            <h4 className={`text-sm font-semibold ${task.priority === 'High' ? 'text-white' : 'text-gray-800'}`}>{task.title}</h4>
                            <p className={`text-xs mt-0.5 ${task.priority === 'High' ? 'text-blue-100' : 'text-gray-500'}`}>
                                {task.start_time ? new Date(task.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Today'}
                            </p>
                        </div>
                        <div className="flex-shrink-0 ml-2">
                            {task.priority === 'High' && (
                                <span className="text-[10px] font-bold bg-yellow-400 text-yellow-900 px-1.5 py-0.5 rounded">HIGH</span>
                            )}
                            {task.assigned_user && (
                                <img
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(task.assigned_user.name)}&background=random`}
                                    className="h-6 w-6 rounded-full border border-white mt-1"
                                    alt="Avatar"
                                />
                            )}
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-10 text-gray-400 text-sm">
                        No tasks for today.
                    </div>
                )}

                {tasks.length > 0 && (
                    <div className="flex items-center p-3 rounded-xl border border-gray-100 opacity-50">
                        <div className="flex-shrink-0 mt-1">
                            <input type="checkbox" className="h-4 w-4 rounded border-gray-300" disabled />
                        </div>
                        <div className="ml-3">
                            <h4 className="text-sm font-semibold text-gray-400">Send Proposal to Marcus Holt</h4>
                        </div>
                    </div>
                )}
            </div>
        </Link>
    );
}
