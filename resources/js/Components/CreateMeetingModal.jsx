import { useForm } from '@inertiajs/react';
import Modal from './Modal';
import InputLabel from './InputLabel';
import TextInput from './TextInput';
import InputError from './InputError';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

export default function CreateMeetingModal({ show, onClose, users = [], relatedId = null, relatedType = null }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        start_time: '',
        end_time: '',
        description: '',
        participants: [],
    });

    const submit = (e) => {
        e.preventDefault();

        const formData = {
            ...data,
            meetingable_id: relatedId,
            meetingable_type: relatedType,
        };

        post(route('meetings.store'), {
            data: formData,
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

    const handleParticipantToggle = (userId) => {
        const newParticipants = data.participants.includes(userId)
            ? data.participants.filter(id => id !== userId)
            : [...data.participants, userId];
        setData('participants', newParticipants);
    };

    return (
        <Modal show={show} onClose={handleClose} maxWidth="2xl">
            <form onSubmit={submit} className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Schedule Meeting</h2>

                <div className="space-y-4">
                    <div>
                        <InputLabel forInput="title" value="Meeting Title *" />
                        <TextInput
                            id="title"
                            className="mt-1 block w-full"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Enter meeting title"
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <InputLabel forInput="start_time" value="Start Time *" />
                            <TextInput
                                id="start_time"
                                type="datetime-local"
                                className="mt-1 block w-full"
                                value={data.start_time}
                                onChange={(e) => setData('start_time', e.target.value)}
                            />
                            <InputError message={errors.start_time} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel forInput="end_time" value="End Time *" />
                            <TextInput
                                id="end_time"
                                type="datetime-local"
                                className="mt-1 block w-full"
                                value={data.end_time}
                                onChange={(e) => setData('end_time', e.target.value)}
                            />
                            <InputError message={errors.end_time} className="mt-2" />
                        </div>
                    </div>

                    <div>
                        <InputLabel forInput="description" value="Description" />
                        <textarea
                            id="description"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            rows="3"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Meeting agenda or notes..."
                        />
                        <InputError message={errors.description} className="mt-2" />
                    </div>

                    {users.length > 0 && (
                        <div>
                            <InputLabel value="Participants" />
                            <div className="mt-2 max-h-40 overflow-y-auto border border-gray-300 rounded-md p-3 space-y-2">
                                {users.map((user) => (
                                    <label key={user.id} className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                            checked={data.participants.includes(user.id)}
                                            onChange={() => handleParticipantToggle(user.id)}
                                        />
                                        <span className="ml-2 text-sm text-gray-700">{user.name}</span>
                                    </label>
                                ))}
                            </div>
                            <InputError message={errors.participants} className="mt-2" />
                        </div>
                    )}
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                    <SecondaryButton type="button" onClick={handleClose}>
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton disabled={processing}>
                        {processing ? 'Scheduling...' : 'Schedule Meeting'}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
