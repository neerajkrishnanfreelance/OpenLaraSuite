import React, { useEffect, useState } from 'react';
import { useForm, usePage, Head, router } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import FormPageLayout from '@/Components/FormPageLayout';
import FormHeader from '@/Components/FormHeader';

export default function Edit({ auth, timesheet, projects, tasks, chatter_data, meetings_data }) {
    const { data, setData, put, processing, errors } = useForm({
        project_id: timesheet.project_id,
        task_id: timesheet.task_id || '',
        date: timesheet.date,

        start_time: timesheet.start_time ? timesheet.start_time.substring(0, 5) : '', // Trim seconds if any
        end_time: timesheet.end_time ? timesheet.end_time.substring(0, 5) : '',
        hours: timesheet.hours,
        description: timesheet.description,
        status: timesheet.status,
    });

    const [availableTasks, setAvailableTasks] = useState([]);

    useEffect(() => {
        if (data.project_id && tasks[data.project_id]) {
            setAvailableTasks(tasks[data.project_id]);
        } else {
            setAvailableTasks([]);
        }
    }, [data.project_id, tasks]);

    // Auto-calculate hours
    useEffect(() => {
        if (data.start_time && data.end_time) {
            const start = new Date(`2000-01-01T${data.start_time}`);
            const end = new Date(`2000-01-01T${data.end_time}`);

            if (end > start) {
                const diffMs = end - start;
                const diffHrs = (diffMs / (1000 * 60 * 60)).toFixed(2);
                setData(d => ({ ...d, hours: diffHrs }));
            }
        }
    }, [data.start_time, data.end_time]);

    const submit = (e) => {
        e.preventDefault();
        put(route('timesheets.update', timesheet.id));
    };

    const isApprovable = (auth.user.roles.some(r => ['admin', 'manager'].includes(r.name)));

    return (
        <FormPageLayout
            chatterData={chatter_data}
            meetingsData={meetings_data}
            chatterableId={timesheet.id}
            chatterableType="App\Models\Timesheet"
        >
            <FormHeader title="Edit Timesheet" backRoute="timesheets.index">
                <div className="flex space-x-2">
                    <button
                        type="button"
                        onClick={() => {
                            if (confirm('Are you sure you want to delete this timesheet?')) {
                                router.delete(route('timesheets.destroy', timesheet.id));
                            }
                        }}
                        className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        Delete
                    </button>
                    <PrimaryButton form="edit-timesheet-form" disabled={processing}>
                        Update Timesheet
                    </PrimaryButton>
                </div>
            </FormHeader>

            <Head title="Edit Timesheet" />

            <form id="edit-timesheet-form" onSubmit={submit} className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <InputLabel htmlFor="project_id" value="Project" />
                        <select
                            id="project_id"
                            className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm"
                            value={data.project_id}
                            onChange={(e) => {
                                setData(data => ({ ...data, project_id: e.target.value, task_id: '' }));
                            }}
                            required
                        >
                            <option value="">Select Project</option>
                            {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                        <InputError message={errors.project_id} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="task_id" value="Task (Optional)" />
                        <select
                            id="task_id"
                            className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm"
                            value={data.task_id}
                            onChange={(e) => setData('task_id', e.target.value)}
                            disabled={!data.project_id}
                        >
                            <option value="">Select Task</option>
                            {availableTasks.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                        </select>
                        <InputError message={errors.task_id} className="mt-2" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <InputLabel htmlFor="date" value="Date" />
                        <TextInput
                            id="date"
                            type="date"
                            className="mt-1 block w-full"
                            value={data.date}
                            onChange={(e) => setData('date', e.target.value)}
                            required
                        />
                        <InputError message={errors.date} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="hours" value="Duration (Hours)" />
                        <TextInput
                            id="hours"
                            type="number"
                            step="0.01"
                            min="0.01"
                            max="24"
                            className="mt-1 block w-full bg-gray-50"
                            value={data.hours}
                            onChange={(e) => setData('hours', e.target.value)}
                            readOnly={!!(data.start_time && data.end_time)}
                        />
                        <InputError message={errors.hours} className="mt-2" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <InputLabel htmlFor="start_time" value="Start Time (Optional)" />
                        <TextInput
                            id="start_time"
                            type="time"
                            className="mt-1 block w-full"
                            value={data.start_time}
                            onChange={(e) => setData('start_time', e.target.value)}
                        />
                        <InputError message={errors.start_time} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="end_time" value="End Time (Optional)" />
                        <TextInput
                            id="end_time"
                            type="time"
                            className="mt-1 block w-full"
                            value={data.end_time}
                            onChange={(e) => setData('end_time', e.target.value)}
                        />
                        <InputError message={errors.end_time} className="mt-2" />
                    </div>
                </div>

                <div>
                    <InputLabel htmlFor="description" value="Description" />
                    <textarea
                        id="description"
                        className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm h-32"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />
                    <InputError message={errors.description} className="mt-2" />
                </div>

                {/* Status / Approval Section for Admins/Managers */}
                {isApprovable && (
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <h3 className="text-sm font-medium text-purple-900 mb-2">Approval Action</h3>
                        <div className="flex gap-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="status"
                                    value="pending"
                                    checked={data.status === 'pending'}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="text-purple-600 focus:ring-purple-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">Pending</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="status"
                                    value="approved"
                                    checked={data.status === 'approved'}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="text-purple-600 focus:ring-purple-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">Approve</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="status"
                                    value="rejected"
                                    checked={data.status === 'rejected'}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="text-purple-600 focus:ring-purple-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">Reject</span>
                            </label>
                        </div>
                    </div>
                )}
            </form>
        </FormPageLayout>
    );
}
