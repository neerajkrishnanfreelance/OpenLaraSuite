import { useState, useEffect } from 'react';
import { Play, Square, Clock } from 'lucide-react';
import { router } from '@inertiajs/react';

export default function TimerWidget({ tasks = [], users = [], currentUser }) {
    const [isRunning, setIsRunning] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [selectedTask, setSelectedTask] = useState('');
    const [selectedUser, setSelectedUser] = useState(currentUser?.id || '');

    // Load timer state from localStorage
    useEffect(() => {
        const savedTimer = localStorage.getItem('activeTimer');
        if (savedTimer) {
            const timer = JSON.parse(savedTimer);
            setIsRunning(true);
            setStartTime(new Date(timer.startTime));
            setSelectedTask(timer.taskId);
            setSelectedUser(timer.userId);
        }
    }, []);

    // Update elapsed time every second
    useEffect(() => {
        let interval;
        if (isRunning && startTime) {
            interval = setInterval(() => {
                const now = new Date();
                const diff = Math.floor((now - new Date(startTime)) / 1000);
                setElapsedTime(diff);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, startTime]);

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleStart = () => {
        if (!selectedTask || !selectedUser) {
            alert('Please select a task and user before starting the timer');
            return;
        }

        const now = new Date();
        setStartTime(now);
        setIsRunning(true);
        setElapsedTime(0);

        // Save to localStorage
        localStorage.setItem('activeTimer', JSON.stringify({
            startTime: now.toISOString(),
            taskId: selectedTask,
            userId: selectedUser,
        }));
    };

    const handleStop = () => {
        if (!startTime) return;

        const endTime = new Date();
        const start = new Date(startTime);
        const hours = ((endTime - start) / (1000 * 60 * 60)).toFixed(2);

        // Create timesheet entry
        const task = tasks.find(t => t.id == selectedTask);
        if (task) {
            router.post(route('tasks.timesheets.store', task.id), {
                user_id: selectedUser,
                date: start.toISOString().split('T')[0],
                start_time: start.toTimeString().substring(0, 5),
                end_time: endTime.toTimeString().substring(0, 5),
                hours: hours,
                description: `Timer tracked work on ${task.title}`,
                is_overtime: false,
            }, {
                preserveScroll: true,
                onSuccess: () => {
                    // Reset timer
                    setIsRunning(false);
                    setStartTime(null);
                    setElapsedTime(0);
                    localStorage.removeItem('activeTimer');
                    alert('Timesheet entry created successfully!');
                },
            });
        }
    };

    return (
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-800 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-indigo-600" />
                    Time Tracker
                </h3>
                {isRunning && (
                    <span className="text-2xl font-mono font-bold text-indigo-600">
                        {formatTime(elapsedTime)}
                    </span>
                )}
            </div>

            {!isRunning ? (
                <div className="space-y-3">
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Task</label>
                        <select
                            className="w-full text-sm border-gray-300 rounded-md shadow-sm"
                            value={selectedTask}
                            onChange={(e) => setSelectedTask(e.target.value)}
                        >
                            <option value="">Select Task</option>
                            {tasks.map(task => (
                                <option key={task.id} value={task.id}>
                                    {task.title} ({task.project?.name})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">User</label>
                        <select
                            className="w-full text-sm border-gray-300 rounded-md shadow-sm"
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                        >
                            <option value="">Select User</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={handleStart}
                        className="w-full flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                    >
                        <Play className="w-4 h-4 mr-2" />
                        Start Timer
                    </button>
                </div>
            ) : (
                <div className="space-y-3">
                    <div className="text-sm text-gray-600">
                        <p><strong>Task:</strong> {tasks.find(t => t.id == selectedTask)?.title}</p>
                        <p><strong>Started:</strong> {startTime ? new Date(startTime).toLocaleTimeString() : '-'}</p>
                    </div>
                    <button
                        onClick={handleStop}
                        className="w-full flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                    >
                        <Square className="w-4 h-4 mr-2" />
                        Stop & Save
                    </button>
                </div>
            )}
        </div>
    );
}
