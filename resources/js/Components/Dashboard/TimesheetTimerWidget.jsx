import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import { Play, Square, Clock } from 'lucide-react';
import moment from 'moment';
import Select from '@/Components/Select';

export default function TimesheetTimerWidget({ projects, activeTimer }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        project_id: activeTimer ? activeTimer.project_id : '',
        task_id: activeTimer ? activeTimer.task_id : '',
        description: activeTimer ? activeTimer.description : '',
        is_overtime: activeTimer ? activeTimer.is_overtime : false,
    });

    const [elapsed, setElapsed] = useState('00:00:00');
    // Derived state for tasks based on selected project
    const availableTasks = data.project_id
        ? (projects.find(p => p.id == data.project_id)?.tasks || [])
        : [];

    useEffect(() => {
        let interval = null;
        if (activeTimer) {
            // Initial Set
            const start = moment(activeTimer.start_time);

            interval = setInterval(() => {
                const now = moment();
                const diff = now.diff(start);
                const duration = moment.duration(diff);
                setElapsed(
                    String(Math.floor(duration.asHours())).padStart(2, '0') + ':' +
                    String(duration.minutes()).padStart(2, '0') + ':' +
                    String(duration.seconds()).padStart(2, '0')
                );
            }, 1000);
        } else {
            setElapsed('00:00:00');
        }
        return () => clearInterval(interval);
    }, [activeTimer]);

    const startTimer = (e) => {
        e.preventDefault();
        post(route('timesheets.timer.start'), {
            preserveScroll: true,
        });
    };

    const stopTimer = (e) => {
        e.preventDefault();
        post(route('timesheets.timer.stop'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setElapsed('00:00:00');
            }
        });
    };

    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-600" />
                Quick Timer
            </h3>

            {activeTimer ? (
                <div className="text-center">
                    <div className="text-4xl font-mono font-bold text-gray-800 mb-4">
                        {elapsed}
                    </div>
                    <div className="mb-4 text-sm text-gray-600 text-left bg-gray-50 p-3 rounded">
                        <p className="font-semibold text-gray-800">
                            {projects.find(p => p.id === activeTimer.project_id)?.name || 'Unknown Project'}
                        </p>
                        {/* We might not have the task name if it's not eager loaded in activeTimer or projects list properly, 
                             but assuming projects list has it now. */}
                        {activeTimer.task_id && (
                            <p className="text-xs text-indigo-600 font-medium mb-1">
                                Task: {projects.find(p => p.id === activeTimer.project_id)?.tasks?.find(t => t.id === activeTimer.task_id)?.name || 'Task #' + activeTimer.task_id}
                            </p>
                        )}
                        <p className="text-gray-500 italic">
                            {activeTimer.description || 'No description'}
                        </p>
                        {activeTimer.is_overtime && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 mt-1">
                                Overtime
                            </span>
                        )}
                    </div>
                    <form onSubmit={stopTimer}>
                        <button
                            disabled={processing}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded flex items-center justify-center gap-2"
                        >
                            <Square className="w-5 h-5 fill-current" />
                            Stop Timer & Capture
                        </button>
                    </form>
                </div>
            ) : (
                <form onSubmit={startTimer}>
                    <div className="mb-4">
                        <Select
                            label="Project"
                            options={projects.map(p => ({ value: p.id, label: p.name }))}
                            value={data.project_id}
                            onChange={(val) => {
                                setData(data => ({ ...data, project_id: val, task_id: '' }));
                            }}
                            placeholder="Search and select project..."
                        />
                        <InputError message={errors.project_id} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <Select
                            label="Task (Optional)"
                            options={availableTasks.map(t => ({ value: t.id, label: t.name }))}
                            value={data.task_id}
                            onChange={(val) => setData('task_id', val)}
                            disabled={!data.project_id}
                            placeholder={data.project_id ? "Search and select task..." : "Select project first"}
                        />
                        <InputError message={errors.task_id} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                        {/* ... rest of form ... */}
                        <input
                            type="text"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            placeholder="What are you working on?"
                        />
                        <InputError message={errors.description} className="mt-2" />
                    </div>
                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            checked={data.is_overtime}
                            onChange={(e) => setData('is_overtime', e.target.checked)}
                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                            id="overtime_check"
                        />
                        <label htmlFor="overtime_check" className="ml-2 block text-sm text-gray-900">
                            Is Overtime?
                        </label>
                    </div>

                    <button
                        disabled={processing}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded flex items-center justify-center gap-2"
                    >
                        <Play className="w-5 h-5 fill-current" />
                        Start Timer
                    </button>
                </form>
            )}
        </div>
    );
}
