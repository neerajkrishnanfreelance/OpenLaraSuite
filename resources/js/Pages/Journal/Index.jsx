import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import FormHeader from '@/Components/FormHeader';
import PrimaryButton from '@/Components/PrimaryButton';
import { useState } from 'react';
import { PenTool, Trash2, Edit2, Save, X, Smile, Meh, Frown, Sparkles } from 'lucide-react';
import moment from 'moment';

export default function Index({ auth, entries }) {
    // Custom Navigation for Journal App
    const journalNav = [
        { name: 'Back to Hub', route: 'dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { name: 'My Journal', route: 'journal.index', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    ];

    const { data, setData, post, processing, errors, reset } = useForm({
        content: '',
        date: moment().format('YYYY-MM-DD'),
        mood: '',
        improvement_list: '',
    });

    const [editingEntry, setEditingEntry] = useState(null);
    const [editContent, setEditContent] = useState('');
    const [editMood, setEditMood] = useState('');
    const [editImprovement, setEditImprovement] = useState('');

    const submit = (e) => {
        e.preventDefault();
        post(route('journal.store'), {
            onSuccess: () => reset(),
        });
    };

    const handleEdit = (entry) => {
        setEditingEntry(entry.id);
        setEditContent(entry.content);
        setEditMood(entry.mood);
        setEditImprovement(entry.improvement_list || '');
    };

    const handleUpdate = (entry) => {
        router.put(route('journal.update', entry.id), {
            content: editContent,
            mood: editMood,
            improvement_list: editImprovement,
        }, {
            onSuccess: () => setEditingEntry(null),
        });
    };

    const handleDelete = (entry) => {
        if (confirm('Are you sure you want to delete this entry?')) {
            router.delete(route('journal.destroy', entry.id));
        }
    };

    const MoodIcon = ({ mood, className }) => {
        switch (mood) {
            case 'positive': return <Smile className={`text-green-500 ${className}`} />;
            case 'neutral': return <Meh className={`text-gray-500 ${className}`} />;
            case 'negative': return <Frown className={`text-red-500 ${className}`} />;
            default: return null;
        }
    };

    return (
        <AuthenticatedLayout
            header={<FormHeader title="Journaling" />}
            customNav={journalNav}
        >
            <Head title="Journaling" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6">

                    {/* Write Section */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 sticky top-24">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <PenTool className="w-5 h-5 text-indigo-600" />
                                New Entry
                            </h2>
                            <form onSubmit={submit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                    <input
                                        type="date"
                                        value={data.date}
                                        onChange={(e) => setData('date', e.target.value)}
                                        className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    />
                                    <InputError message={errors.date} className="mt-2" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mood</label>
                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setData('mood', 'positive')}
                                            className={`p-2 rounded-lg border ${data.mood === 'positive' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50'}`}
                                            title="Positive"
                                        >
                                            <Smile className={`w-6 h-6 ${data.mood === 'positive' ? 'text-green-600' : 'text-gray-400'}`} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setData('mood', 'neutral')}
                                            className={`p-2 rounded-lg border ${data.mood === 'neutral' ? 'border-gray-500 bg-gray-50' : 'border-gray-200 hover:bg-gray-50'}`}
                                            title="Neutral"
                                        >
                                            <Meh className={`w-6 h-6 ${data.mood === 'neutral' ? 'text-gray-600' : 'text-gray-400'}`} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setData('mood', 'negative')}
                                            className={`p-2 rounded-lg border ${data.mood === 'negative' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:bg-gray-50'}`}
                                            title="Negative"
                                        >
                                            <Frown className={`w-6 h-6 ${data.mood === 'negative' ? 'text-red-600' : 'text-gray-400'}`} />
                                        </button>
                                    </div>
                                    <InputError message={errors.mood} className="mt-2" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Reflection</label>
                                    <textarea
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        rows="8"
                                        placeholder="How was your day?"
                                        className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm resize-none"
                                    ></textarea>
                                    <InputError message={errors.content} className="mt-2" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-yellow-500" />
                                        Improvement List
                                    </label>
                                    <textarea
                                        value={data.improvement_list}
                                        onChange={(e) => setData('improvement_list', e.target.value)}
                                        rows="3"
                                        placeholder="What can go better?"
                                        className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm resize-none"
                                    ></textarea>
                                    <InputError message={errors.improvement_list} className="mt-2" />
                                </div>
                                <div className="flex justify-end">
                                    <PrimaryButton disabled={processing}>
                                        Save Entry
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Timeline Section */}
                    <div className="w-full lg:w-2/3">
                        <div className="space-y-6">
                            {entries.data.map((entry) => (
                                <div key={entry.id} className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 transition-all hover:shadow-md relative">
                                    <div className="absolute top-6 right-6 flex items-center gap-2">
                                        {editingEntry !== entry.id && <MoodIcon mood={entry.mood} className="w-6 h-6" />}
                                    </div>

                                    <div className="flex justify-between items-start mb-4 pr-10">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">
                                                {moment(entry.date).format('MMMM Do, YYYY')}
                                            </h3>
                                            <p className="text-xs text-gray-500">
                                                {moment(entry.created_at).format('h:mm A')}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {editingEntry === entry.id ? (
                                                <>
                                                    <button
                                                        onClick={() => handleUpdate(entry)}
                                                        className="text-green-600 hover:text-green-800 p-1"
                                                        title="Save"
                                                    >
                                                        <Save className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingEntry(null)}
                                                        className="text-gray-500 hover:text-gray-700 p-1"
                                                        title="Cancel"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => handleEdit(entry)}
                                                        className="text-indigo-600 hover:text-indigo-800 p-1"
                                                        title="Edit"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(entry)}
                                                        className="text-red-600 hover:text-red-800 p-1"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {editingEntry === entry.id ? (
                                        <div className="space-y-3">
                                            <div className="flex gap-4 mb-2">
                                                {['positive', 'neutral', 'negative'].map(m => (
                                                    <button
                                                        key={m}
                                                        type="button"
                                                        onClick={() => setEditMood(m)}
                                                        className={`p-1 rounded ${editMood === m ? 'bg-gray-100 ring-2 ring-indigo-500' : ''}`}
                                                    >
                                                        <MoodIcon mood={m} className="w-5 h-5" />
                                                    </button>
                                                ))}
                                            </div>
                                            <textarea
                                                value={editContent}
                                                onChange={(e) => setEditContent(e.target.value)}
                                                rows="5"
                                                className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            ></textarea>
                                            <textarea
                                                value={editImprovement}
                                                onChange={(e) => setEditImprovement(e.target.value)}
                                                rows="2"
                                                placeholder="Improvements..."
                                                className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            ></textarea>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="prose max-w-none text-gray-700 whitespace-pre-wrap mb-4">
                                                {entry.content}
                                            </div>
                                            {entry.improvement_list && (
                                                <div className="mt-4 p-3 bg-yellow-50 rounded-md border border-yellow-100">
                                                    <h4 className="text-xs font-bold text-yellow-800 uppercase tracking-wider mb-1 flex items-center gap-1">
                                                        <Sparkles className="w-3 h-3" />
                                                        Improvements
                                                    </h4>
                                                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                                        {entry.improvement_list}
                                                    </p>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            ))}

                            {entries.data.length === 0 && (
                                <div className="text-center py-12 text-gray-500">
                                    No entries yet. Start writing your first reflection!
                                </div>
                            )}

                            {/* Pagination */}
                            {entries.links && (
                                <div className="flex justify-center mt-6">
                                    {entries.links.map((link, key) => (
                                        link.url ? (
                                            <a
                                                key={key}
                                                href={link.url}
                                                className={`mx-1 px-3 py-1 rounded-md text-sm ${link.active ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span
                                                key={key}
                                                className="mx-1 px-3 py-1 text-gray-400 text-sm"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        )
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
