import React from 'react';
import { Link } from '@inertiajs/react';

export default function CallWidget({ calls }) {
    return (
        <Link href={route('meetings.index')} className="block bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full hover:shadow-md transition duration-200">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                    Follow-up Calls Today
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </h3>
            </div>

            <div className="space-y-4">
                {calls.map(call => (
                    <div key={call.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center">
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-white ${call.id % 2 === 0 ? 'bg-blue-600' : 'bg-gray-500'}`}>
                                {call.organizer ? call.organizer.name.substring(0, 2).toUpperCase() : 'ME'}
                            </div>
                            <div className="ml-3">
                                <h4 className="text-sm font-bold text-gray-800">{call.organizer ? call.organizer.name : 'Meeting'}</h4>
                                <p className="text-xs text-gray-500">{call.title}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm font-bold text-blue-600">{call.start_formatted}</div>
                            <button className="text-xs text-blue-500 hover:text-blue-700 font-medium">Call Now</button>
                        </div>
                    </div>
                ))}

                {calls.length === 0 && (
                    <div className="text-center py-10 text-gray-400 text-sm">
                        No calls scheduled.
                    </div>
                )}
            </div>
        </Link>
    );
}
