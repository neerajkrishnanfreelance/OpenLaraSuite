import { useForm } from '@inertiajs/react';
import Modal from './Modal';
import InputLabel from './InputLabel';
import TextInput from './TextInput';
import InputError from './InputError';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import { useState, useEffect } from 'react';
import { Play, Square } from 'lucide-react';

export default function CreateTimesheetModal({ show, onClose, taskId, users = [] }) {
    const [isTracking, setIsTracking] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);

    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: '',
        date: new Date().toISOString().split('T')[0],
        start_time: '',
        end_time: '',
        hours: '',
        description: '',
        is_overtime: false,
    });

    // Update elapsed time every second when tracking
    useEffect(() => {
        let interval;
        if (isTracking && startTime) {
            interval = setInterval(() => {
                const now = new Date();
                const diff = Math.floor((now - startTime) / 1000);
                setElapsedSeconds(diff);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTracking, startTime]);

    const formatElapsedTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleStart = () => {
        if (!data.user_id) {
            alert('Please select a user first');
            return;
        }
        const now = new Date();
        setStartTime(now);
        setIsTracking(true);
        setElapsedSeconds(0);
        setData('start_time', now.toTimeString().substring(0, 5));
    };

    const handleStop = () => {
        const now = new Date();
        const endTimeStr = now.toTimeString().substring(0, 5);
        const hours = ((now - startTime) / (1000 * 60 * 60)).toFixed(2);

        setData({
            ...data,
            end_time: endTimeStr,
            hours: hours,
        });
        setIsTracking(false);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('tasks.timesheets.store', taskId), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setIsTracking(false);
                setStartTime(null);
                setElapsedSeconds(0);
                onClose();
            },
        });
    };

    const handleClose = () => {
        if (isTracking) {
            if (!confirm('Timer is running. Are you sure you want to close without saving?')) {
                return;
            }
        }
        reset();
        setIsTracking(false);
        setStartTime(null);
        setElapsedSeconds(0);
        onClose();
    };

    return (
        <Modal show={show} onClose={handleClose} maxWidth="2xl">
            <form onSubmit={submit} className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Add Timesheet Entry</h2>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <InputLabel forInput="user_id" value="User *" />
                            <select
                                id="user_id"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={data.user_id}
                                onChange={(e) => setData('user_id', e.target.value)}
                                disabled={isTracking}
                            >
                                <option value="">Select User</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.user_id} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel forInput="date" value="Date *" />
                            <TextInput
                                id="date"
                                type="date"
                                className="mt-1 block w-full"
                                value={data.date}
                                onChange={(e) => setData('date', e.target.value)}
                                disabled={isTracking}
                            />
                            <InputError message={errors.date} className="mt-2" />
                        </div>
                    </div>

                    {/* Timer Section */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        {!isTracking && !data.hours ? (
                            <div className="text-center">
                                <p className="text-sm text-gray-600 mb-3">Click Start to begin tracking time</p>
                                <button
                                    type="button"
                                    onClick={handleStart}
                                    className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition font-medium"
                                >
                                    <Play className="w-5 h-5 mr-2" />
                                    Start Timer
                                </button>
                            </div>
                        ) : isTracking ? (
                            <div className="text-center">
                                <div className="text-4xl font-mono font-bold text-indigo-600 mb-2">
                                    {formatElapsedTime(elapsedSeconds)}
                                </div>
                                <p className="text-sm text-gray-600 mb-3">
                                    Started at {data.start_time}
                                </p>
                                <button
                                    type="button"
                                    onClick={handleStop}
                                    className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium"
                                >
                                    <Square className="w-5 h-5 mr-2" />
                                    Stop Timer
                                </button>
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-800 mb-1">
                                    {data.hours} hours
                                </div>
                                <p className="text-sm text-gray-600">
                                    {data.start_time} - {data.end_time}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setData({
                                            ...data,
                                            start_time: '',
                                            end_time: '',
                                            hours: '',
                                        });
                                    }}
                                    className="text-sm text-indigo-600 hover:text-indigo-800 mt-2"
                                >
                                    Reset Timer
                                </button>
                            </div>
                        )}
                    </div>

                    <div>
                        <InputLabel forInput="description" value="Description (Optional)" />
                        <textarea
                            id="description"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            rows="3"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="What did you work on?"
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
                    <SecondaryButton type="button" onClick={handleClose}>
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton disabled={processing || isTracking || !data.hours}>
                        {processing ? 'Saving...' : 'Save Entry'}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
