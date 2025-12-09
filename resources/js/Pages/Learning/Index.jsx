import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react'; // Add useForm, router
import { BookOpen, Calendar, Clock, ArrowRight, Plus, Trash2, CheckCircle, BarChart as BarChartIcon } from 'lucide-react';
import moment from 'moment';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';

export default function Index({ auth, subjects, timetable, recentLogs, kpis }) {
    // Get tab from URL or default
    const params = new URLSearchParams(window.location.search);
    const initialTab = params.get('tab') || 'dashboard';

    const [activeTab, setActiveTab] = useState(initialTab);
    const [showSubjectModal, setShowSubjectModal] = useState(false);
    const [showClassModal, setShowClassModal] = useState(false);

    // Update URL when tab changes
    const changeTab = (tab) => {
        setActiveTab(tab);
        const url = new URL(window.location);
        url.searchParams.set('tab', tab);
        window.history.pushState({}, '', url);
    };

    // Forms
    const { data: subjectData, setData: setSubjectData, post: postSubject, processing: processingSubject, errors: errorsSubject, reset: resetSubject } = useForm({
        name: '',
        description: '',
    });

    const { data: classData, setData: setClassData, post: postClass, processing: processingClass, errors: errorsClass, reset: resetClass } = useForm({
        project_id: '',
        day_of_week: 1, // Monday
        start_time: '09:00',
        end_time: '10:00',
        location: '',
        color: 'bg-blue-100 text-blue-800',
    });

    // Submit Handlers
    const submitSubject = (e) => {
        e.preventDefault();
        postSubject(route('learning.subjects.store'), {
            onSuccess: () => { setShowSubjectModal(false); resetSubject(); }
        });
    };

    const submitClass = (e) => {
        e.preventDefault();
        postClass(route('learning.timetable.store'), {
            onSuccess: () => { setShowClassModal(false); resetClass(); }
        });
    };

    const deleteClass = (id) => {
        if (confirm('Remove this class?')) {
            router.delete(route('learning.timetable.destroy', id));
        }
    };

    // Helper to get day name
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const colors = [
        { name: 'Blue', value: 'bg-blue-100 text-blue-800' },
        { name: 'Green', value: 'bg-green-100 text-green-800' },
        { name: 'Red', value: 'bg-red-100 text-red-800' },
        { name: 'Yellow', value: 'bg-yellow-100 text-yellow-800' },
        { name: 'Purple', value: 'bg-purple-100 text-purple-800' },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight flex items-center gap-2">
                        <BookOpen className="w-6 h-6 text-indigo-600" />
                        Self Learning
                    </h2>
                    <div className="flex bg-white rounded-lg p-1 border shadow-sm">
                        {['dashboard', 'timetable', 'subjects', 'log'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => changeTab(tab)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${activeTab === tab ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            }
        >
            <Head title="Self Learning" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* DASHBOARD TAB */}
                    {activeTab === 'dashboard' && (
                        <div className="space-y-6">
                            {/* Stats Row */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Hours This Week</p>
                                            <h3 className="text-3xl font-bold text-gray-900 mt-2">{kpis.hoursThisWeek} <span className="text-sm font-normal text-gray-400">hrs</span></h3>
                                        </div>
                                        <div className="p-3 bg-indigo-50 rounded-lg">
                                            <Clock className="w-6 h-6 text-indigo-600" />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Topics Completed</p>
                                            <h3 className="text-3xl font-bold text-gray-900 mt-2">{kpis.completedTasks}</h3>
                                        </div>
                                        <div className="p-3 bg-green-50 rounded-lg">
                                            <CheckCircle className="w-6 h-6 text-green-600" />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Next Class</p>
                                            {kpis.nextClass ? (
                                                <div className="mt-2">
                                                    <h3 className="text-xl font-bold text-gray-900">{kpis.nextClass.project.name}</h3>
                                                    <p className="text-sm text-gray-500">
                                                        {moment(kpis.nextClass.start_time, 'HH:mm:ss').format('h:mm A')} • {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][kpis.nextClass.day_of_week]}
                                                    </p>
                                                </div>
                                            ) : (
                                                <h3 className="text-lg font-medium text-gray-400 mt-2">No upcoming classes</h3>
                                            )}
                                        </div>
                                        <div className="p-3 bg-blue-50 rounded-lg">
                                            <Calendar className="w-6 h-6 text-blue-600" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Upcoming Schedule (Today) */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                                        <h3 className="font-bold text-gray-800">Today's Schedule</h3>
                                        <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded">{moment().format('dddd')}</span>
                                    </div>
                                    <div className="p-6">
                                        {/* Filter timetable for today (js day 0=Sun, php 0=Sun?) Laravel typically follows standard, let's assume parity or check */}
                                        {timetable.filter(t => t.day_of_week === moment().day()).length > 0 ? (
                                            <div className="space-y-4">
                                                {timetable.filter(t => t.day_of_week === moment().day()).map(entry => (
                                                    <div key={entry.id} className={`flex items-center p-3 rounded-lg border-l-4 ${entry.color.replace('bg-', 'border-').split(' ')[0]} bg-gray-50`}>
                                                        <div className="w-24 flex-shrink-0 text-sm font-bold text-gray-600">
                                                            {moment(entry.start_time, 'HH:mm:ss').format('h:mm A')}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-gray-900">{entry.project.name}</h4>
                                                            {entry.location && <p className="text-xs text-gray-500">{entry.location}</p>}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-400 text-center py-4">No classes scheduled for today.</p>
                                        )}
                                    </div>
                                </div>

                                {/* Recent Activity */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                                    <div className="px-6 py-4 border-b border-gray-100">
                                        <h3 className="font-bold text-gray-800">Recent Activity</h3>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        {recentLogs.map(log => (
                                            <div key={log.id} className="flex justify-between items-center border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                                                <div>
                                                    <h4 className="font-medium text-gray-900">{log.project.name}</h4>
                                                    <p className="text-xs text-gray-500">{log.task ? log.task.title : 'General Study'}</p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="font-bold text-indigo-600">{log.hours}h</span>
                                                    <p className="text-xs text-gray-400">{moment(log.date).fromNow()}</p>
                                                </div>
                                            </div>
                                        ))}
                                        {recentLogs.length === 0 && <p className="text-gray-400 text-center text-sm">No recent study logs.</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TIMETABLE TAB */}
                    {activeTab === 'timetable' && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="font-bold text-lg">Weekly Timetable</h3>
                                <PrimaryButton onClick={() => setShowClassModal(true)}>
                                    <Plus className="w-4 h-4 mr-2" /> Add Class
                                </PrimaryButton>
                            </div>
                            <div className="grid grid-cols-7 divide-x divide-gray-100 min-w-[800px] overflow-x-auto">
                                {days.map((day, index) => (
                                    <div key={day} className="min-h-[400px]">
                                        <div className="bg-gray-50 py-3 text-center text-sm font-bold text-gray-700 border-b border-gray-100">
                                            {day}
                                        </div>
                                        <div className="p-2 space-y-2">
                                            {timetable.filter(t => t.day_of_week === index).map(entry => (
                                                <div key={entry.id} className={`p-2 rounded text-xs shadow-sm relative group ${entry.color}`}>
                                                    <div className="font-bold">{moment(entry.start_time, 'HH:mm:ss').format('h:mm A')}</div>
                                                    <div className="truncate font-semibold">{entry.project.name}</div>
                                                    <button
                                                        onClick={() => deleteClass(entry.id)}
                                                        className="absolute top-1 right-1 text-red-500 opacity-0 group-hover:opacity-100 hover:text-red-700"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* SUBJECTS TAB */}
                    {activeTab === 'subjects' && (
                        <div>
                            <div className="flex justify-end mb-6">
                                <PrimaryButton onClick={() => setShowSubjectModal(true)}>
                                    <Plus className="w-4 h-4 mr-2" /> New Subject
                                </PrimaryButton>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {subjects.map(subject => (
                                    <div key={subject.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="bg-indigo-100 p-3 rounded-lg">
                                                <BookOpen className="w-6 h-6 text-indigo-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900">{subject.name}</h3>
                                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full uppercase">{subject.status}</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-6 h-10 line-clamp-2">{subject.description || 'No description.'}</p>
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                            <div className="text-xs text-gray-500">
                                                {subject.tasks.length} topics
                                            </div>
                                            <a href={route('projects.show', subject.id)} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center gap-1">
                                                View <ArrowRight className="w-3 h-3" />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* LOG TAB */}
                    {activeTab === 'log' && (
                        <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-indigo-600" />
                                Log Study Time
                            </h3>
                            <LogTimeForm subjects={subjects} />
                        </div>
                    )}
                </div>
            </div>

            {/* CREATE SUBJECT MODAL */}
            <Modal show={showSubjectModal} onClose={() => setShowSubjectModal(false)} maxWidth="sm">
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Add New Subject</h2>
                    <form onSubmit={submitSubject}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subject Name</label>
                            <input
                                type="text"
                                value={subjectData.name}
                                onChange={e => setSubjectData('name', e.target.value)}
                                className="w-full border-gray-300 rounded-md shadow-sm"
                                required
                            />
                            <InputError message={errorsSubject.name} />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                value={subjectData.description}
                                onChange={e => setSubjectData('description', e.target.value)}
                                className="w-full border-gray-300 rounded-md shadow-sm"
                                rows="3"
                            ></textarea>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button type="button" onClick={() => setShowSubjectModal(false)} className="text-gray-500 hover:text-gray-700">Cancel</button>
                            <PrimaryButton disabled={processingSubject}>Create Subject</PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* CREATE CLASS MODAL */}
            <Modal show={showClassModal} onClose={() => setShowClassModal(false)} maxWidth="sm">
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Add Scheduled Class</h2>
                    <form onSubmit={submitClass}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                            <select
                                value={classData.project_id}
                                onChange={e => setClassData('project_id', e.target.value)}
                                className="w-full border-gray-300 rounded-md shadow-sm"
                                required
                            >
                                <option value="">Select Subject</option>
                                {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                            <InputError message={errorsClass.project_id} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
                            <select
                                value={classData.day_of_week}
                                onChange={e => setClassData('day_of_week', parseInt(e.target.value))}
                                className="w-full border-gray-300 rounded-md shadow-sm"
                            >
                                {days.map((day, i) => <option key={day} value={i}>{day}</option>)}
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                                <input type="time" value={classData.start_time} onChange={e => setClassData('start_time', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                                <input type="time" value={classData.end_time} onChange={e => setClassData('end_time', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm" required />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Color Tag</label>
                            <div className="flex gap-2">
                                {colors.map(c => (
                                    <button
                                        key={c.name}
                                        type="button"
                                        onClick={() => setClassData('color', c.value)}
                                        className={`w-6 h-6 rounded-full border ${c.value.split(' ')[0]} ${classData.color === c.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                                    ></button>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button type="button" onClick={() => setShowClassModal(false)} className="text-gray-500 hover:text-gray-700">Cancel</button>
                            <PrimaryButton disabled={processingClass}>Schedule Class</PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}

function LogTimeForm({ subjects }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        project_id: '',
        date: moment().format('YYYY-MM-DD'),
        hours: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('timesheets.store'), {
            onSuccess: () => reset('hours', 'description', 'project_id'),
        });
    };

    return (
        <form onSubmit={submit}>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select
                    value={data.project_id}
                    onChange={e => setData('project_id', e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm"
                    required
                >
                    <option value="">Select Subject</option>
                    {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
                <InputError message={errors.project_id} />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input type="date" value={data.date} onChange={e => setData('date', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm" required />
                    <InputError message={errors.date} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hours</label>
                    <input type="number" step="0.1" min="0.1" value={data.hours} onChange={e => setData('hours', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm" required />
                    <InputError message={errors.hours} />
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">What did you study?</label>
                <textarea
                    value={data.description}
                    onChange={e => setData('description', e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm"
                    rows="3"
                    placeholder="Topics covered..."
                ></textarea>
                <InputError message={errors.description} />
            </div>

            <div className="flex justify-end">
                <PrimaryButton disabled={processing}>Log Time</PrimaryButton>
            </div>
        </form>
    );
}
