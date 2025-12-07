import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import DocumentUpload from '@/Components/DocumentUpload';
import StatusStepper from '@/Components/StatusStepper';

export default function TaskStepper({ data, setData, errors, projects, users, isCreate = false, submit, processing, existingDocuments = [], onDeleteDocument, onFilesChange }) {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    return (
        <div className="space-y-6">
            {/* Stepper Header */}
            <div className="flex justify-between items-center mb-8">
                {[1, 2, 3].map((step) => (
                    <div key={step} className={`flex items-center ${step < 3 ? 'w-full' : ''}`}>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${currentStep >= step ? 'bg-purple-600 border-purple-600 text-white' : 'border-gray-300 text-gray-500'}`}>
                            {step}
                        </div>
                        {step < 3 && <div className={`flex-1 h-1 mx-4 ${currentStep > step ? 'bg-purple-600' : 'bg-gray-200'}`} />}
                    </div>
                ))}
            </div>

            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
                    <div>
                        <InputLabel htmlFor="title" value="Title" />
                        <TextInput
                            id="title"
                            value={data.title}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('title', e.target.value)}
                            required
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
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
                        <div>
                            <InputLabel htmlFor="priority" value="Priority" />
                            <select
                                id="priority"
                                className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm"
                                value={data.priority}
                                onChange={(e) => setData('priority', e.target.value)}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            <InputError message={errors.priority} className="mt-2" />
                        </div>
                    </div>
                </div>
            )}

            {/* Step 2: Details */}
            {currentStep === 2 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Details & Status</h3>
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

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <InputLabel htmlFor="assigned_to" value="Assign To" />
                            <select
                                id="assigned_to"
                                className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm"
                                value={data.assigned_to}
                                onChange={(e) => setData('assigned_to', e.target.value)}
                            >
                                <option value="">Unassigned</option>
                                {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                            </select>
                            <InputError message={errors.assigned_to} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="status" value="Status" />
                            <StatusStepper
                                status={data.status}
                                onChange={(value) => setData('status', value)}
                            />
                            <div className="hidden">
                                {/* Hidden select for form submission validity if needed, but we typically use data state directly */}
                                <select value={data.status} onChange={() => { }} required>
                                    <option value="todo">To Do</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="review">Review</option>
                                    <option value="done">Done</option>
                                </select>
                            </div>
                            <InputError message={errors.status} className="mt-2" />
                        </div>
                    </div>

                    <div>
                        <InputLabel htmlFor="due_date" value="Due Date" />
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
            )}

            {/* Step 3: Attachments & Review */}
            {currentStep === 3 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Attachments & Review</h3>

                    <DocumentUpload
                        onFilesChange={onFilesChange}
                        existingDocuments={existingDocuments}
                        onDelete={onDeleteDocument}
                        isCreate={isCreate}
                    />

                    <div className="bg-gray-50 p-4 rounded-md mt-4">
                        <h4 className="font-semibold mb-2">Review Summary</h4>
                        <p><span className="font-medium">Title:</span> {data.title}</p>
                        <p><span className="font-medium">Priority:</span> {data.priority}</p>
                        <p><span className="font-medium">Status:</span> {data.status}</p>
                    </div>

                    {isCreate && (
                        <div className="space-y-6 mt-6 border-t pt-6">
                            <h4 className="text-lg font-medium text-gray-900">Start Collaboration</h4>

                            {/* Initial Chatter */}
                            <div>
                                <InputLabel htmlFor="initial_chatter" value="Initial Comment (Optional)" />
                                <textarea
                                    id="initial_chatter"
                                    className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm h-24"
                                    placeholder="Add a starting comment or instruction..."
                                    value={data.initial_chatter}
                                    onChange={(e) => setData('initial_chatter', e.target.value)}
                                />
                            </div>

                            {/* Schedule Meeting Toggle */}
                            <div className="flex items-center">
                                <input
                                    id="create_meeting"
                                    type="checkbox"
                                    className="rounded border-gray-300 text-purple-600 shadow-sm focus:ring-purple-500"
                                    checked={data.create_meeting}
                                    onChange={(e) => setData('create_meeting', e.target.checked)}
                                />
                                <label htmlFor="create_meeting" className="ml-2 block text-sm text-gray-900">
                                    Schedule an initial meeting for this task
                                </label>
                            </div>

                            {/* Meeting Details */}
                            {data.create_meeting && (
                                <div className="pl-6 border-l-2 border-purple-200 space-y-4">
                                    <div>
                                        <InputLabel htmlFor="meeting_title" value="Meeting Subject" />
                                        <TextInput
                                            id="meeting_title"
                                            className="mt-1 block w-full"
                                            value={data.meeting_details.title}
                                            onChange={(e) => setData('meeting_details', { ...data.meeting_details, title: e.target.value })}
                                            placeholder="e.g., Kickoff Meeting"
                                        />
                                        <InputError message={errors['meeting_details.title']} className="mt-2" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <InputLabel htmlFor="meeting_start" value="Start Time" />
                                            <TextInput
                                                id="meeting_start"
                                                type="datetime-local"
                                                className="mt-1 block w-full"
                                                value={data.meeting_details.start_time}
                                                onChange={(e) => setData('meeting_details', { ...data.meeting_details, start_time: e.target.value })}
                                            />
                                            <InputError message={errors['meeting_details.start_time']} className="mt-2" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="meeting_end" value="End Time" />
                                            <TextInput
                                                id="meeting_end"
                                                type="datetime-local"
                                                className="mt-1 block w-full"
                                                value={data.meeting_details.end_time}
                                                onChange={(e) => setData('meeting_details', { ...data.meeting_details, end_time: e.target.value })}
                                            />
                                            <InputError message={errors['meeting_details.end_time']} className="mt-2" />
                                        </div>
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="meeting_desc" value="Meeting Description" />
                                        <TextInput
                                            id="meeting_desc"
                                            className="mt-1 block w-full"
                                            value={data.meeting_details.description}
                                            onChange={(e) => setData('meeting_details', { ...data.meeting_details, description: e.target.value })}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-4 border-t">
                {currentStep > 1 ? (
                    <SecondaryButton onClick={prevStep} type="button">Previous</SecondaryButton>
                ) : (
                    <div />
                )}

                {currentStep < totalSteps ? (
                    <SecondaryButton onClick={nextStep} type="button">Next</SecondaryButton>
                ) : (
                    <PrimaryButton onClick={submit} disabled={processing} type="submit">
                        {isCreate ? 'Create Task' : 'Update Task'}
                    </PrimaryButton>
                )}
            </div>
        </div>
    );
}
