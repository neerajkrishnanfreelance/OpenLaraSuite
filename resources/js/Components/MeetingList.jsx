import React from 'react';
import { Link } from '@inertiajs/react';

export default function MeetingList({ meetings = [], meetingableId = null, meetingableType = null }) {
    return (
        <div className="bg-white shadow sm:rounded-lg p-6 mt-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Linked Meetings</h3>
                {meetingableId && (
                    <Link
                        href={route('meetings.create', {
                            meetingable_id: meetingableId,
                            meetingable_type: meetingableType
                        })}
                        className="inline-flex items-center px-3 py-1 bg-purple-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-purple-500 focus:bg-purple-500 active:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        Schedule Meeting
                    </Link>
                )}
            </div>

            {meetings.length === 0 ? (
                <p className="text-sm text-gray-500">No meetings scheduled.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organizer</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {meetings.map((meeting) => (
                                <tr key={meeting.id}>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{meeting.title}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{new Date(meeting.start_time).toLocaleString()}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{new Date(meeting.end_time).toLocaleString()}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{meeting.organizer.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
