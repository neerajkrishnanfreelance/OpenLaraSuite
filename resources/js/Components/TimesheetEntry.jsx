import { Clock, Square } from 'lucide-react';
import CreateTimesheetModal from './CreateTimesheetModal';
import { useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import Modal from './Modal';
import InputLabel from './InputLabel';
import InputError from './InputError';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

export default function TimesheetEntry({ task, timesheets = [], users = [], auth }) {
    const [showModal, setShowModal] = useState(false);
    const [showStartModal, setShowStartModal] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        description: '',
        is_overtime: false,
    });

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTimeOnly = (timeString) => {
        if (!timeString) return null;
        const time = timeString.includes('T') ? timeString.split('T')[1].substring(0, 5) : timeString.substring(0, 5);
        return time;
    };

    const handleStartTimer = (e) => {
        e.preventDefault();

        // Use authenticated user
        const currentUserId = auth?.user?.id;
        if (!currentUserId) {
            alert('User not authenticated. Please log in again.');
            return;
        }

        const now = new Date();

        post(route('tasks.timesheets.store', task.id), {
            user_id: currentUserId,
            date: now.toISOString().split('T')[0],
            start_time: now.toTimeString().substring(0, 5),
            end_time: null,
            hours: 0,
            description: data.description,
            is_overtime: data.is_overtime,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setShowStartModal(false);
            },
        });
    };

    const handleEndTimer = (timesheetId, startTime) => {
        const now = new Date();
        const start = new Date(`${new Date().toISOString().split('T')[0]}T${startTime}`);
        const end = new Date(`${new Date().toISOString().split('T')[0]}T${now.toTimeString().substring(0, 5)}`);
        const hours = ((end - start) / (1000 * 60 * 60)).toFixed(2);

        router.put(route('timesheets.update', timesheetId), {
            end_time: now.toTimeString().substring(0, 5),
            hours: hours,
        }, {
            preserveScroll: true,
        });
    };

    return (
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-indigo-600" />
                    Timesheet Entries
                </h3>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => setShowStartModal(true)}
                        className="flex items-center text-sm bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition font-medium"
                    >
                        Start Timer
                    </button>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center text-sm bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                    >
                        + Add Entry
                    </button>
                </div>
            </div>

            {/* Timesheet List */}
            {timesheets.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Time
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Hours
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Description
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {timesheets.map((timesheet) => (
                                <tr key={timesheet.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                        {formatDate(timesheet.date)}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                        {timesheet.user?.name || 'N/A'}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                                        {timesheet.start_time && timesheet.end_time ? (
                                            <span>{formatTimeOnly(timesheet.start_time)} - {formatTimeOnly(timesheet.end_time)}</span>
                                        ) : timesheet.start_time ? (
                                            <span className="text-green-600 font-medium">Started: {formatTimeOnly(timesheet.start_time)}</span>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                                        <div className="flex items-center">
                                            <span className="text-gray-900 font-medium">{timesheet.hours}h</span>
                                            {timesheet.is_overtime && (
                                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
                                                    OT
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600">
                                        {timesheet.description || '-'}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${timesheet.status === 'approved' ? 'bg-green-100 text-green-800' :
                                            timesheet.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {timesheet.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                                        <div className="flex items-center space-x-2">
                                            {timesheet.start_time && !timesheet.end_time && (
                                                <button
                                                    onClick={() => handleEndTimer(timesheet.id, timesheet.start_time)}
                                                    className="inline-flex items-center px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition text-xs font-medium"
                                                >
                                                    <Square className="w-3 h-3 mr-1" />
                                                    End
                                                </button>
                                            )}
                                            <button
                                                onClick={() => {
                                                    if (confirm('Are you sure you want to delete this timesheet entry?')) {
                                                        router.delete(route('timesheets.destroy', timesheet.id));
                                                    }
                                                }}
                                                className="text-red-600 hover:text-red-900 text-xs font-medium"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-gray-50 border-t-2 border-gray-300">
                            <tr>
                                <td colSpan="3" className="px-4 py-3 text-right text-sm font-bold text-gray-900">
                                    Total Hours:
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm">
                                    <span className="font-bold text-indigo-600 text-lg">
                                        {timesheets.reduce((sum, ts) => sum + parseFloat(ts.hours || 0), 0).toFixed(2)}h
                                    </span>
                                </td>
                                <td colSpan="3"></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500 text-sm italic text-center py-8">No timesheet entries yet.</p>
            )}

            {/* Start Timer Modal */}
            <Modal show={showStartModal} onClose={() => setShowStartModal(false)}>
                <form onSubmit={handleStartTimer} className="p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Start Timer</h2>

                    <div className="space-y-4">
                        <div>
                            <InputLabel forInput="description" value="Description" />
                            <textarea
                                id="description"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                rows="3"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="What will you work on?"
                            />
                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        <div className="flex items-center">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                    checked={data.is_overtime}
                                    onChange={(e) => setData('is_overtime', e.target.checked)}
                                />
                                <span className="ml-2 text-sm text-gray-700 font-medium">Mark as Overtime</span>
                            </label>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <SecondaryButton type="button" onClick={() => setShowStartModal(false)}>
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton disabled={processing}>
                            {processing ? 'Starting...' : 'Start Timer'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Add Entry Modal */}
            <CreateTimesheetModal
                show={showModal}
                onClose={() => setShowModal(false)}
                taskId={task.id}
                users={users}
            />
        </div>
    );
}
