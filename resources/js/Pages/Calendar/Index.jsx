import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import FormHeader from '@/Components/FormHeader';
import { useState } from 'react';
import CreateMeetingModal from '@/Components/CreateMeetingModal';
import CreateTaskModal from '@/Components/CreateTaskModal';
import Modal from '@/Components/Modal';

const localizer = momentLocalizer(moment);

export default function Index({ auth, events, projects, users }) {
    const [showMeetingModal, setShowMeetingModal] = useState(false);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [showTypeSelection, setShowTypeSelection] = useState(false);

    const handleSelectSlot = (slotInfo) => {
        setSelectedSlot(slotInfo);
        setShowTypeSelection(true);
    };

    const handleCreateMeeting = () => {
        setShowTypeSelection(false);
        setShowMeetingModal(true);
    };

    const handleCreateTask = () => {
        setShowTypeSelection(false);
        setShowTaskModal(true);
    };

    const handleSelectEvent = (event) => {
        // For now, redirect to show/edit page. Ideally would open a detailed modal.
        if (event.type === 'meeting') {
            window.location.href = route('meetings.edit', event.resource.id);
        } else if (event.type === 'task') {
            window.location.href = route('tasks.edit', event.resource.id);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <FormHeader title="Calendar" />
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setShowMeetingModal(true)}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                        >
                            + Meeting
                        </button>
                        <button
                            onClick={() => setShowTaskModal(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                        >
                            + Task
                        </button>
                    </div>
                </div>
            }
        >
            <Head title="Calendar" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div style={{ height: '700px' }}>
                            <Calendar
                                localizer={localizer}
                                events={events}
                                startAccessor="start"
                                endAccessor="end"
                                style={{ height: '100%' }}
                                selectable
                                onSelectSlot={handleSelectSlot}
                                onSelectEvent={handleSelectEvent}
                                eventPropGetter={(event) => {
                                    const backgroundColor = event.type === 'meeting' ? '#9333ea' : '#16a34a';
                                    return { style: { backgroundColor } };
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Type Selection Modal for Slot Click */}
            <Modal show={showTypeSelection} onClose={() => setShowTypeSelection(false)} maxWidth="sm">
                <div className="p-6">
                    <h2 className="text-lg font-bold mb-4">Create New</h2>
                    <div className="space-y-3">
                        <button
                            onClick={handleCreateMeeting}
                            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
                        >
                            Schedule Meeting
                        </button>
                        <button
                            onClick={handleCreateTask}
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                        >
                            Create Task
                        </button>
                        <button
                            onClick={() => setShowTypeSelection(false)}
                            className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>

            <CreateMeetingModal
                show={showMeetingModal}
                onClose={() => {
                    setShowMeetingModal(false);
                    setSelectedSlot(null);
                }}
                users={users}
                initialDate={selectedSlot?.start}
            />

            <CreateTaskModal
                show={showTaskModal}
                onClose={() => {
                    setShowTaskModal(false);
                    setSelectedSlot(null);
                }}
                projects={projects}
                users={users}
                initialDate={selectedSlot?.start}
            />
        </AuthenticatedLayout>
    );
}
