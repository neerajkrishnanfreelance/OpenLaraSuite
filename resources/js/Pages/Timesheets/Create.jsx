import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SecondaryButton from '@/Components/SecondaryButton';
import FormHeader from '@/Components/FormHeader';
import FormPageLayout from '@/Components/FormPageLayout';

export default function Create({ auth, projects, tasks }) {
    const { data, setData, post, processing, errors } = useForm({
        project_id: '',
        task_id: '',
        date: new Date().toISOString().split('T')[0],
        hours: '',
        description: '',
    });

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
                            <InputLabel htmlFor="hours" value="Hours" />
                            <TextInput
                                id="hours"
                                type="number"
                                step="0.5"
                                className="mt-1 block w-full"
                                value={data.hours}
                                onChange={(e) => setData('hours', e.target.value)}
                                required
                            />
                            <InputError message={errors.hours} className="mt-2" />
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
                </form>
            </FormPageLayout>
        </AuthenticatedLayout>
    );
}
