import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, meeting }) {
    // Helper to render a field in "form-like" style
    const Field = ({ label, value, fullWidth = false }) => (
        <div className={`mb-4 ${fullWidth ? 'col-span-2' : ''}`}>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</label>
            <div className="bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-md px-3 py-2">
                {value || '-'}
            </div>
        </div>
    );

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleString([], { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link href={route('meetings.index')} className="mr-4 text-gray-400 hover:text-gray-600 transition">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        </Link>
                        <h2 className="font-bold text-2xl text-gray-800 leading-tight">{meeting.title}</h2>
                        <span className="ml-4 bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded border border-indigo-200">Scheduled</span>
                    </div>
                </div>
            }
        >
            <Head title={`Meeting: ${meeting.title}`} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Meeting Details Form */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-6 border-b border-gray-100 pb-2">Meeting Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Field label="Organizer" value={meeting.organizer ? meeting.organizer.name : 'Unknown'} />
                            <Field label="Location/Link" value={meeting.location} />
                            <Field label="Start Time" value={formatDate(meeting.start_time)} />
                            <Field label="End Time" value={formatDate(meeting.end_time)} />
                            <Field label="Description" value={meeting.description} fullWidth />
                        </div>
                    </div>
                </div>

                {/* Right Column: Participants & Notes */}
                <div className="space-y-6">
                    <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-4">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center border-b border-gray-100 pb-2">
                            <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            Participants
                        </h3>
                        <div className="space-y-3">
                            {meeting.participants && meeting.participants.length > 0 ? meeting.participants.map(user => (
                                <div key={user.id} className="flex items-center px-3 py-2 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition">
                                    <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold mr-3 border border-indigo-200">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-800">{user.name}</p>
                                        <p className="text-xs text-gray-400">{user.email}</p>
                                    </div>
                                </div>
                            )) : <p className="text-sm text-gray-400 italic">No participants added.</p>}
                        </div>
                    </div>

                    <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-4">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center border-b border-gray-100 pb-2">
                            <svg className="w-5 h-5 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            Notes
                        </h3>
                        <textarea
                            className="w-full text-sm border-gray-200 rounded-md focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50 h-32"
                            placeholder="Add meeting notes here..."
                            disabled
                        ></textarea>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
