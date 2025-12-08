import React, { useState } from 'react';
import { Gantt, ViewMode } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";

export default function GanttWidget({ tasks }) {
    const [viewMode, setViewMode] = useState(ViewMode.Week);

    // Transform tasks to Gantt format
    const ganttTasks = tasks.map(task => {
        const startDate = task.start_date ? new Date(task.start_date) : new Date(); // Fallback to today if no start
        let endDate = task.due_date ? new Date(task.due_date) : new Date(startDate.getTime() + 86400000); // Fallback to +1 day

        // Ensure end date is after start date
        if (endDate <= startDate) {
            endDate = new Date(startDate.getTime() + 86400000);
        }

        return {
            start: startDate,
            end: endDate,
            name: task.title,
            id: String(task.id),
            type: 'task',
            progress: task.status === 'done' ? 100 : (task.status === 'in_progress' ? 50 : 0),
            isDisabled: true, // Disable editing for now, just viewing
            styles: { progressColor: '#4f46e5', progressSelectedColor: '#3730a3' },
            project: task.project?.name || 'No Project',
        };
    });

    if (ganttTasks.length === 0) {
        return (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex items-center justify-center text-gray-400">
                No tasks available for Gantt chart.
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full overflow-hidden">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Project Timeline</h3>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setViewMode(ViewMode.Day)}
                        className={`px-3 py-1 text-xs rounded-md ${viewMode === ViewMode.Day ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                    >
                        Day
                    </button>
                    <button
                        onClick={() => setViewMode(ViewMode.Week)}
                        className={`px-3 py-1 text-xs rounded-md ${viewMode === ViewMode.Week ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                    >
                        Week
                    </button>
                    <button
                        onClick={() => setViewMode(ViewMode.Month)}
                        className={`px-3 py-1 text-xs rounded-md ${viewMode === ViewMode.Month ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                    >
                        Month
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                {/* Wrapper to ensure min width if needed, though Gantt handles it */}
                <Gantt
                    tasks={ganttTasks}
                    viewMode={viewMode}
                    columnWidth={viewMode === ViewMode.Month ? 150 : 60}
                    listCellWidth="155px"
                    barBackgroundColor="#e0e7ff"
                    barProgressColor="#4f46e5"
                    barProgressSelectedColor="#3730a3"
                    onDateChange={() => { }} // Read only
                    onTaskDelete={() => { }}
                    onProgressChange={() => { }}
                    onDoubleClick={() => { }}
                />
            </div>
        </div>
    );
}
