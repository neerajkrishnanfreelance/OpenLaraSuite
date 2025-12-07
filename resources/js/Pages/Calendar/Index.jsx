import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import FormHeader from '@/Components/FormHeader';

const localizer = momentLocalizer(moment);

export default function Index({ auth, events }) {
    return (
        <AuthenticatedLayout
            header={
                <FormHeader title="Calendar" />
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
                                eventPropGetter={(event) => {
                                    const backgroundColor = event.type === 'meeting' ? '#9333ea' : '#16a34a';
                                    return { style: { backgroundColor } };
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
