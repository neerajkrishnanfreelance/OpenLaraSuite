import React from 'react';
import { Link } from '@inertiajs/react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Simple custom toolbar to match the design (Month Year   < >)
const CustomToolbar = (toolbar) => {
    const goToBack = () => {
        toolbar.onNavigate('PREV');
    };

    const goToNext = () => {
        toolbar.onNavigate('NEXT');
    };

    const label = () => {
        const date = toolbar.date;
        return (
            <span className="text-lg font-bold text-blue-900">
                {format(date, 'MMMM yyyy')}
            </span>
        );
    };

    return (
        <div className="flex justify-between items-center mb-6 pl-2 pr-2">
            <div>{label()}</div>
            <div className="flex gap-2">
                <button onClick={goToBack} className="p-1 hover:bg-gray-100 rounded text-gray-600 font-bold">
                    &lt;
                </button>
                <button onClick={goToNext} className="p-1 hover:bg-gray-100 rounded text-gray-600 font-bold">
                    &gt;
                </button>
            </div>
        </div>
    );
};

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

export default function CalendarWidget({ events }) {
    const parsedEvents = events.map(ev => ({
        ...ev,
        start: new Date(ev.start),
        end: new Date(ev.end),
    }));

    return (
        <Link href={route('calendar.index')} className="block bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full hover:shadow-md transition duration-200">
            <div style={{ height: '350px' }} className="custom-calendar-wrapper">
                <Calendar
                    localizer={localizer}
                    events={parsedEvents}
                    startAccessor="start"
                    endAccessor="end"
                    views={['month']}
                    defaultView='month'
                    components={{
                        toolbar: CustomToolbar
                    }}
                    eventPropGetter={(event) => {
                        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
                        const idx = event.id % colors.length;
                        return {
                            style: {
                                backgroundColor: colors[idx],
                                borderRadius: '4px',
                                opacity: 0.8,
                                color: 'white',
                                border: '0px',
                                display: 'block',
                                fontSize: '10px'
                            }
                        };
                    }}
                />
            </div>

            {/* Mock Event Cards at Bottom like in image */}
            <div className="flex gap-4 mt-6 overflow-x-auto pb-2">
                <div className="flex-shrink-0 w-24 h-24 bg-blue-600 rounded-xl p-3 flex flex-col justify-center items-center text-white relative shadow-lg">
                    <span className="text-2xl font-bold">2</span>
                    <div className="flex flex-col gap-1 mt-1 w-full">
                        <span className="text-[8px] bg-blue-500 rounded px-1 block text-center truncate">Call Sarah</span>
                        <span className="text-[8px] bg-yellow-500 rounded px-1 block text-center truncate text-black">Client Meet</span>
                        <span className="text-[8px] bg-green-500 rounded px-1 block text-center truncate">Team Sync</span>
                    </div>
                    <div className="absolute -bottom-1 w-1 h-1 bg-red-500 rounded-full"></div>
                </div>

                <div className="flex-shrink-0 w-24 h-24 bg-white border border-gray-200 rounded-xl p-3 flex flex-col justify-center items-center text-gray-400">
                    <span className="text-xl font-bold text-gray-800">3</span>
                    <span className="text-[10px]">Q4 Review</span>
                </div>

                <div className="flex-shrink-0 w-24 h-24 bg-white border border-gray-200 rounded-xl p-3 flex flex-col justify-center items-center text-gray-400">
                    <span className="text-xl font-bold text-gray-800">4</span>
                </div>

                <div className="flex-shrink-0 w-24 h-24 bg-white border border-gray-200 rounded-xl p-3 flex flex-col justify-center items-center text-gray-400">
                    <span className="text-xl font-bold text-gray-800">5</span>
                    <span className="text-[10px] text-blue-500">Follow-up x3</span>
                </div>
            </div>
        </Link>
    );
}
