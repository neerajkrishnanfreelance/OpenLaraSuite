import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import FormHeader from '@/Components/FormHeader';
import FormPageLayout from '@/Components/FormPageLayout';
import TaskStepper from '@/Components/TaskStepper';
import { useState } from 'react';
import SearchableSelect from '@/Components/SearchableSelect';
import TextInput from '@/Components/TextInput';

export default function Create({ auth, projects, users, contacts = [], lead_stages = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        project_id: '',
        assigned_to: '',
        title: '',
        description: '',
        priority: 'medium',
        status: 'todo',
        due_date: '',
        // Lead fields
        contact_id: '',
        lead_stage_id: '',
        contact_name: '', // specific override or legacy
        mobile: '',
        expected_revenue: '',
        stage: '', // legacy
        source: '',
        // Extras
        initial_chatter: '',
        create_meeting: false,
        meeting_details: {
            title: '',
            start_time: '',
            end_time: '',
            description: '',
        },
    });

    const [files, setFiles] = useState([]);

    const submit = (e) => {
        // We will submit logic here? 
        // Wait, TaskStepper calls this `submit`.
        // e might be an event or just call it directly.
        if (e && e.preventDefault) e.preventDefault();

        post(route('tasks.store'), {
            onSuccess: (page) => {
                // If we have files, uploads them?
                // For simplicity, we can't upload files here because we don't have the task ID yet unless we get it from response.
                // Inertia doesn't return the response easily in onSuccess unless we use visit.
                // But wait, the controller redirects to Index with flash message.
                // If we want to support upload on create, we probably should have uploaded to a temp location or allow upload AFTER create on the Edit page.
                // OR we can use FormData to send files WITH the task data if `tasks.store` supported it.
                // Let's modify `tasks.store` to support files? Actually `multipart/form-data`.
                // Inertia handles form data objects automatically.
                // Let's just append files to `data`?
                // But `data` is managed by `useForm`. 
                // We should add `files` to `data` in `useForm` or just update it before submit.
            }
        });
    };

    // We need to sync files to `data`?
    // Actually, `useForm` helper `setData` works.

    const handleFilesChange = (newFiles) => {
        setData('files', newFiles);
    }

    return (
        <AuthenticatedLayout
            header={
                <FormHeader title="Create Task" backRoute="tasks.index" />
            }
        >
            <Head title="Create Task" />

            <FormPageLayout isCreate={true}>
                <TaskStepper
                    data={data}
                    setData={setData}
                    errors={errors}
                    projects={projects}
                    users={users}
                    contacts={contacts} // Pass contacts to TaskStepper
                    lead_stages={lead_stages} // Pass lead_stages to TaskStepper
                    isCreate={true}
                    submit={submit}
                    processing={processing}
                    onFilesChange={handleFilesChange}
                />
            </FormPageLayout>
        </AuthenticatedLayout>
    );
}
