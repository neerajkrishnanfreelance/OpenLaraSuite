import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import FormHeader from '@/Components/FormHeader';

export default function Create({ auth, users, meetingable_id, meetingable_type, meetingable_title }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        location_link: '',
        participant_ids: [],
        meetingable_id: meetingable_id || '',
        meetingable_type: meetingable_type || '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('meetings.store'));
    };

    const handleParticipantSelect = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value));
        setData('participant_ids', selectedOptions);
    };

    return (
        <AuthenticatedLayout
            header={
                <FormHeader title="Schedule Meeting" backRoute="meetings.index">
                    <PrimaryButton form="create-meeting-form" disabled={processing}>
                        Schedule
                    </PrimaryButton>
                </FormHeader>
            }
        >
            <Head title="Schedule Meeting" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8 bg-white shadow-sm sm:rounded-lg p-6">
                    {meetingable_title && (
                        <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-md flex items-start space-x-3">
                            <span className="text-purple-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                            </span>
                            <div>
                                <h3 className="text-sm font-medium text-purple-900">Linked to Context</h3>
                                <p className="text-sm text-purple-700 mt-1">
                                    Scheduling this meeting for <strong>{meetingable_title}</strong>.
                                </p>
                            </div>
                        </div>
                    )}

                    <form id="create-meeting-form" onSubmit={submit}>
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
                        {/* ... rest of form ... */}
                        <div className="mt-4">
                            <InputLabel htmlFor="description" value="Description" />
                            <textarea
                                id="description"
                                className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <InputLabel htmlFor="start_time" value="Start Time" />
                                <TextInput
                                    id="start_time"
                                    type="datetime-local"
                                    className="mt-1 block w-full"
                                    value={data.start_time}
                                    onChange={(e) => setData('start_time', e.target.value)}
                                    required
                                />
                                <InputError message={errors.start_time} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="end_time" value="End Time" />
                                <TextInput
                                    id="end_time"
                                    type="datetime-local"
                                    className="mt-1 block w-full"
                                    value={data.end_time}
                                    onChange={(e) => setData('end_time', e.target.value)}
                                    required
                                />
                                <InputError message={errors.end_time} className="mt-2" />
                            </div>
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="location_link" value="Location / Video Link" />
                            <TextInput
                                id="location_link"
                                value={data.location_link}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('location_link', e.target.value)}
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="participants" value="Participants (Ctrl/Cmd to select)" />
                            <select
                                id="participants"
                                multiple
                                className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm h-32"
                                value={data.participant_ids}
                                onChange={handleParticipantSelect}
                            >
                                {users.map(u => (
                                    <option key={u.id} value={u.id}>{u.name}</option>
                                ))}
                            </select>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
