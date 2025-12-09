import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import FormHeader from '@/Components/FormHeader';

export default function Edit({ auth, meeting, users }) {
    // Helper to format date for datetime-local
    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toISOString().slice(0, 16);
    };

    const { data, setData, put, processing, errors } = useForm({
        title: meeting.title || '',
        description: meeting.description || '',
        start_time: formatDate(meeting.start_time),
        end_time: formatDate(meeting.end_time),
        location_link: meeting.location_link || '',
        participant_ids: meeting.participants ? meeting.participants.map(p => p.id) : [],
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('meetings.update', meeting.id));
    };

    const handleParticipantSelect = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value));
        setData('participant_ids', selectedOptions);
    };

    return (
        <AuthenticatedLayout
            header={
                <FormHeader title="Edit Meeting" backRoute="meetings.index">
                    <PrimaryButton form="edit-meeting-form" disabled={processing}>
                        Save Changes
                    </PrimaryButton>
                </FormHeader>
            }
        >
            <Head title="Edit Meeting" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8 bg-white shadow-sm sm:rounded-lg p-6">
                    <form id="edit-meeting-form" onSubmit={submit}>
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
