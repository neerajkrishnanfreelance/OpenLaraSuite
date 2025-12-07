import { useForm } from '@inertiajs/react';
import Modal from './Modal';
import InputLabel from './InputLabel';
import TextInput from './TextInput';
import InputError from './InputError';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

export default function CreateTaskModal({ show, onClose, projectId, projects = [], users = [] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        project_id: projectId || '',
        assigned_to: '',
        title: '',
        description: '',
        priority: 'medium',
        status: 'todo',
        due_date: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('tasks.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Modal show={show} onClose={handleClose} maxWidth="2xl">
            <form onSubmit={submit} className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Create New Task</h2>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <InputLabel forInput="project_id" value="Project *" />
                            <select
                                id="project_id"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={data.project_id}
                                onChange={(e) => setData('project_id', e.target.value)}
                                disabled={projectId} // Disable if pre-filled
                            >
                                <option value="">Select Project</option>
                                {projects.map((project) => (
                                    <option key={project.id} value={project.id}>
                                        {project.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.project_id} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel forInput="assigned_to" value="Assign To" />
                            <select
                                id="assigned_to"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={data.assigned_to}
                                onChange={(e) => setData('assigned_to', e.target.value)}
                            >
                                <option value="">Unassigned</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.assigned_to} className="mt-2" />
                        </div>
                    </div>

                    <div>
                        <InputLabel forInput="title" value="Title *" />
                        <TextInput
                            id="title"
                            className="mt-1 block w-full"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Enter task title"
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel forInput="description" value="Description" />
                        <textarea
                            id="description"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            rows="3"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Describe the task..."
                        />
                        <InputError message={errors.description} className="mt-2" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <InputLabel forInput="priority" value="Priority *" />
                            <select
                                id="priority"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={data.priority}
                                onChange={(e) => setData('priority', e.target.value)}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            <InputError message={errors.priority} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel forInput="status" value="Status *" />
                            <select
                                id="status"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                            >
                                <option value="todo">To Do</option>
                                <option value="in_progress">In Progress</option>
                                <option value="review">Review</option>
                                <option value="done">Done</option>
                            </select>
                            <InputError message={errors.status} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel forInput="due_date" value="Due Date" />
                            <TextInput
                                id="due_date"
                                type="date"
                                className="mt-1 block w-full"
                                value={data.due_date}
                                onChange={(e) => setData('due_date', e.target.value)}
                            />
                            <InputError message={errors.due_date} className="mt-2" />
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                    <SecondaryButton type="button" onClick={handleClose}>
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton disabled={processing}>
                        {processing ? 'Creating...' : 'Create Task'}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
