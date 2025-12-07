import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import FormHeader from '@/Components/FormHeader';
import FormPageLayout from '@/Components/FormPageLayout';
import TaskStepper from '@/Components/TaskStepper';
import TimesheetEntry from '@/Components/TimesheetEntry';
import CreateMeetingModal from '@/Components/CreateMeetingModal';
import { useState } from 'react';

export default function Edit({ auth, task, projects, users, chatter_data, meetings_data, documents, timesheets_data }) {
    const [showMeetingModal, setShowMeetingModal] = useState(false);

    const { data, setData, put, processing, errors } = useForm({
        project_id: task.project_id || '',
        assigned_to: task.assigned_to || '',
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        status: task.status || 'todo',
        due_date: task.due_date || '',
    });

    const submit = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        put(route('tasks.update', task.id));
    };

    const handleDeleteDocument = (docId) => {
        if (confirm('Are you sure you want to delete this document?')) {
            router.delete(route('documents.destroy', docId), {
                preserveScroll: true,
            });
        }
    };

    const handleFilesChange = (newFiles) => {
        // For Edit, we might want to upload immediately?
        // Or standard flow: selected files are just needed to be passed to an upload endpoint.
        // But the previous implementation logic in TaskStepper was designed for create where files are part of form data?
        // Actually DocumentUpload for edit mode shows existing docs.
        // Ideally, we should have a separate upload button for Edit mode or modify put request.
        // Since `put` doesn't support files easily without _method spoofing, 
        // Let's implement immediate upload for Edit mode using DocumentController.
        if (newFiles.length > 0) {
            const formData = new FormData();
            newFiles.forEach(file => formData.append('files[]', file));
            formData.append('documentable_id', task.id);
            formData.append('documentable_type', 'App\\Models\\Task');

            router.post(route('documents.store'), formData, {
                onSuccess: () => {
                    // Clear local files after upload if desired, handled by component?
                    // But DocumentUpload state is local.
                    // We can reload the page which Inertia does.
                },
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <FormHeader title="Edit Task" backRoute="tasks.index" />
            }
        >
            <Head title="Edit Task" />

            <div className="py-12">
                <FormPageLayout
                    chatterData={chatter_data}
                    meetingsData={meetings_data}
                    chatterableId={task.id}
                    chatterableType="App\Models\Task"
                >
                    <TaskStepper
                        data={data}
                        setData={setData}
                        errors={errors}
                        projects={projects}
                        users={users}
                        isCreate={false}
                        submit={submit}
                        processing={processing}
                        existingDocuments={documents}
                        onDeleteDocument={handleDeleteDocument}
                        onFilesChange={handleFilesChange}
                    />

                    <div className="mt-6">
                        <TimesheetEntry
                            task={task}
                            timesheets={timesheets_data || []}
                            users={users}
                            auth={auth}
                        />
                    </div>
                </FormPageLayout>
            </div>

            {/* Meeting Modal */}
            <CreateMeetingModal
                show={showMeetingModal}
                onClose={() => setShowMeetingModal(false)}
                users={users}
                relatedId={task.id}
                relatedType="App\\Models\\Task"
            />
        </AuthenticatedLayout>
    );
}
