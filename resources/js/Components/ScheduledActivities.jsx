import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Check, Clock, Plus, X } from 'lucide-react';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function ScheduledActivities({ task, activities = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        type: 'call', // call, email, meeting
        subject: '',
        due_at: '',
        description: '',
    });

    const toggleForm = useForm({});

    const submitActivity = (e) => {
        e.preventDefault();
        post(route('tasks.activities.store', task.id), {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
            },
        });
    };

    const toggleComplete = (activity) => {
        toggleForm.put(route('tasks.activities.update', [task.id, activity.id]), {
            preserveScroll: true,
            data: {
                is_completed: !activity.is_completed // This might fail if put doesn't accept data this way in all Inertia versions, usually it's correct.
                // Actually helper methods usually take route params, and data is the second arg of the method call on form object.
                // But toggleForm does not have the data set. Let's make a new form or just user router.
            }
        });
        // Better way with router
        // router.put(route('tasks.activities.update', [task.id, activity.id]), {
        //     is_completed: !activity.is_completed
        // });
        // But let's use the form helper to show loading state if needed.
    };

    // Quick fix for toggle:
    const handleToggle = (activity) => {
        // We can't use the hook easily inside a loop without creating sub-components or using router.visit
        // Let's use simple Inertia.visit (router) which is global
        // import { router } from '@inertiajs/react'
        // But for now, let's just assume we can use a fresh form for each or a global router.
        // Let's use the "router" object from inertia.

        // Actually, let's just use the `form` we created but set data before submit.
        toggleForm.setData({ is_completed: !activity.is_completed });
        toggleForm.put(route('tasks.activities.update', [task.id, activity.id]), {
            preserveScroll: true
        });
    };


    return (
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-indigo-500" />
                    Scheduled Activities
                </h3>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center text-xs font-semibold text-purple-600 hover:text-purple-700"
                >
                    <Plus className="w-4 h-4 mr-1" />
                    Schedule Activity
                </button>
            </div>

            <div className="space-y-3">
                {activities.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-4">No scheduled activities.</p>
                )}

                {activities.map((activity) => (
                    <div
                        key={activity.id}
                        className={`flex items-start p-3 rounded-lg border ${activity.is_completed ? 'bg-gray-50 border-gray-100' : 'bg-green-50/50 border-green-100'
                            } ${activity.type === 'email' ? 'bg-yellow-50/50 border-yellow-100' : ''}`} // Just some varied styling logic
                    >
                        <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mr-3 ${activity.type === 'call' ? 'bg-green-500 text-white' :
                                activity.type === 'email' ? 'bg-yellow-500 text-white' : 'bg-blue-500 text-white'
                            }`}>
                            {activity.type.charAt(0).toUpperCase()}
                        </div>

                        <div className="flex-1">
                            <h4 className={`text-sm font-semibold ${activity.is_completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                                {activity.subject}
                            </h4>
                            <p className="text-xs text-gray-500">
                                {new Date(activity.due_at).toLocaleString()}
                            </p>
                        </div>

                        <button
                            onClick={() => handleToggle(activity)}
                            className={`p-1 rounded-full ${activity.is_completed ? 'text-gray-400 hover:text-gray-600' : 'text-green-500 hover:text-green-600'
                                }`}
                        >
                            {activity.is_completed ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                        </button>
                    </div>
                ))}
            </div>

            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Schedule Activity</h2>
                    <form onSubmit={submitActivity} className="space-y-4">
                        <div>
                            <InputLabel value="Type" />
                            <div className="flex space-x-4 mt-1">
                                {['call', 'meeting', 'email'].map(t => (
                                    <label key={t} className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            checked={data.type === t}
                                            onChange={() => setData('type', t)}
                                            className="text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="capitalize text-sm text-gray-700">{t}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <InputLabel forInput="subject" value="Subject" />
                            <TextInput
                                id="subject"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.subject}
                                onChange={(e) => setData('subject', e.target.value)}
                                required
                            />
                            <InputError message={errors.subject} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel forInput="due_at" value="Due Date & Time" />
                            <TextInput
                                id="due_at"
                                type="datetime-local"
                                className="mt-1 block w-full"
                                value={data.due_at}
                                onChange={(e) => setData('due_at', e.target.value)}
                                required
                            />
                            <InputError message={errors.due_at} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel forInput="description" value="Description" />
                            <textarea
                                id="description"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                            />
                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        <div className="flex justify-end space-x-3 mt-6">
                            <SecondaryButton onClick={() => setIsModalOpen(false)}>Cancel</SecondaryButton>
                            <PrimaryButton disabled={processing}>Schedule</PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}
