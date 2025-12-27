import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SecondaryButton from '@/Components/SecondaryButton';
import FormHeader from '@/Components/FormHeader';
import FormPageLayout from '@/Components/FormPageLayout';

import React from 'react';

export default function Create({ auth, projects, tasks }) {
    const { data, setData, post, processing, errors } = useForm({
        project_id: '',
        task_id: '',
        date: new Date().toISOString().split('T')[0],
        start_time: '',
        end_time: '',
        hours: '',
        description: '',
        is_overtime: false,
    });

    const [calcMode, setCalcMode] = React.useState('manual'); // 'manual' or 'time'

    // Auto-calculate hours
    React.useEffect(() => {
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
        post(route('timesheets.store'));
    };

    // Filter tasks based on selected project
    const availableTasks = data.project_id ? (tasks[data.project_id] || []) : [];

    return (
        <AuthenticatedLayout
            header={
                <FormHeader title="Log Time" backRoute="timesheets.index">
                    <PrimaryButton form="create-timesheet-form" disabled={processing}>
                        Submit
                    </PrimaryButton>
                </FormHeader>
            }
        >
            <Head title="Log Time" />

            <FormPageLayout isCreate={true}>
                <form id="create-timesheet-form" onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="project_id" value="Project" />
                        <select
                            id="project_id"
                            className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm"
                            value={data.project_id}
                            onChange={(e) => setData('project_id', e.target.value)}
                            required
                        >
                            <option value="">Select Project</option>
                            {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                        <InputError message={errors.project_id} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="task_id" value="Task (Optional)" />
                        <select
                            id="task_id"
                            className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm"
                            value={data.task_id}
                            onChange={(e) => setData('task_id', e.target.value)}
                            disabled={!data.project_id}
                        >
                            <option value="">General Work</option>
                            {availableTasks.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                        </select>
                        <InputError message={errors.task_id} className="mt-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
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
                                className="mt-1 block w-full bg-gray-50"
                                value={data.hours}
                                onChange={(e) => setData('hours', e.target.value)}
                                required={!data.start_time || !data.end_time}
                                readOnly={!!(data.start_time && data.end_time)}
                            />
                            <InputError message={errors.hours} className="mt-2" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
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

                    <div className="mt-4">
                        <InputLabel htmlFor="description" value="Description" />
                        <textarea
                            id="description"
                            className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        <InputError message={errors.description} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="rounded border-gray-300 text-purple-600 shadow-sm focus:ring-purple-500"
                                checked={data.is_overtime}
                                onChange={(e) => setData('is_overtime', e.target.checked)}
                            />
                            <span className="ml-2 text-sm text-gray-700 font-medium">Mark as Overtime</span>
                        </label>
                    </div>
                </form>
            </FormPageLayout>
        </AuthenticatedLayout>
    );
}
