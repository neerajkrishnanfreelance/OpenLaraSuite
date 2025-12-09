import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router, usePage } from '@inertiajs/react'; // Added usePage
import InputError from '@/Components/InputError';
import FormHeader from '@/Components/FormHeader';
import PrimaryButton from '@/Components/PrimaryButton';
import { useState } from 'react';
import { PenTool, Trash2, Edit2, Save, X, Smile, Meh, Frown, Sparkles, Layout, List as ListIcon, Plus, Tag } from 'lucide-react';
import moment from 'moment';

export default function Index({ auth, entries, categories, view }) { // Added categories, view props
    const journalNav = [
        { name: 'Back to Hub', route: 'dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { name: 'My Journal', route: 'journal.index', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    ];

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        content: '',
        date: moment().format('YYYY-MM-DD'),
        mood: '',
        improvement_list: '',
        journal_category_id: '',
    });

    const [editingEntry, setEditingEntry] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [editMood, setEditMood] = useState('');
    const [editImprovement, setEditImprovement] = useState('');
    const [editCategoryId, setEditCategoryId] = useState('');

    // Masters State
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const { data: catData, setData: setCatData, post: postCat, reset: resetCat } = useForm({ name: '', color: 'bg-indigo-100 text-indigo-800' });

    const submit = (e) => {
        e.preventDefault();
        post(route('journal.store'), {
            onSuccess: () => reset(),
        });
    };

    const handleEdit = (entry) => {
        setEditingEntry(entry.id);
        setEditTitle(entry.title || '');
        setEditContent(entry.content);
        setEditMood(entry.mood);
        setEditImprovement(entry.improvement_list || '');
        setEditCategoryId(entry.journal_category_id || '');
    };

    const handleUpdate = (entry) => {
        router.put(route('journal.update', entry.id), {
            title: editTitle,
            content: editContent,
            mood: editMood,
            improvement_list: editImprovement,
            journal_category_id: editCategoryId,
        }, {
            onSuccess: () => setEditingEntry(null),
        });
    };

    const handleDelete = (entry) => {
        if (confirm('Are you sure you want to delete this entry?')) {
            router.delete(route('journal.destroy', entry.id));
        }
    };

    // Category Management
    const submitCategory = (e) => {
        e.preventDefault();
        postCat(route('journal.categories.store'), {
            onSuccess: () => { setShowCategoryModal(false); resetCat(); }
        });
    }

    const deleteCategory = (category) => {
        if (confirm('Delete this category?')) {
            router.delete(route('journal.categories.destroy', category.id));
        }
    }

    const MoodIcon = ({ mood, className }) => {
        switch (mood) {
            case 'positive': return <Smile className={`text-green-500 ${className}`} />;
            case 'neutral': return <Meh className={`text-gray-500 ${className}`} />;
            case 'negative': return <Frown className={`text-red-500 ${className}`} />;
            default: return null;
        }
    };

    // Kanban Columns Logic
    const kanbanColumns = categories.map(cat => ({
        ...cat,
        entries: entries.length ? entries.filter(e => e.journal_category_id === cat.id) : []
    }));
    // Add "Uncategorized" column
    kanbanColumns.push({
        id: 'uncategorized',
        name: 'Uncategorized',
        color: 'bg-gray-100 text-gray-800',
        entries: entries.length ? entries.filter(e => !e.journal_category_id) : []
    });

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <FormHeader title="Journaling" />
                    <div className="flex gap-2 bg-white p-1 rounded-lg border shadow-sm">
                        <button
                            onClick={() => router.get(route('journal.index', { view: 'list' }))}
                            className={`p-2 rounded ${view === 'list' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            <ListIcon className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => router.get(route('journal.index', { view: 'kanban' }))}
                            className={`p-2 rounded ${view === 'kanban' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            <Layout className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            }
            customNav={journalNav}
        >
            <Head title="Journaling" />

            {/* Masters Modal */}
            {showCategoryModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
                        <h3 className="text-lg font-bold mb-4">Manage Categories</h3>
                        <form onSubmit={submitCategory} className="mb-6">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={catData.name}
                                    onChange={e => setCatData('name', e.target.value)}
                                    placeholder="New Category..."
                                    className="flex-1 rounded border-gray-300 text-sm"
                                    required
                                />
                                <button type="submit" className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                        </form>
                        <div className="space-y-2">
                            {categories.map(cat => (
                                <div key={cat.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                                    <span className={`text-xs px-2 py-1 rounded font-bold ${cat.color}`}>{cat.name}</span>
                                    <button onClick={() => deleteCategory(cat)} className="text-red-400 hover:text-red-600">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button onClick={() => setShowCategoryModal(false)} className="text-gray-500 hover:text-gray-700 text-sm">Close</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="py-6">
                <div className={`max-w-7xl mx-auto sm:px-6 lg:px-8 ${view === 'kanban' ? 'h-[calc(100vh-140px)]' : ''}`}> {/* Full height for Kanban */}

                    {view === 'list' ? (
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* List View Layout - Same as before but with Category/Title fields */}
                            <div className="w-full lg:w-1/3">
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 sticky top-24">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                            <PenTool className="w-5 h-5 text-indigo-600" /> New Entry
                                        </h2>
                                        <button onClick={() => setShowCategoryModal(true)} className="text-xs text-indigo-600 hover:underline flex items-center gap-1">
                                            <Tag className="w-3 h-3" /> Masters
                                        </button>
                                    </div>
                                    <form onSubmit={submit}>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Title (Optional)</label>
                                            <input
                                                type="text"
                                                value={data.title}
                                                onChange={(e) => setData('title', e.target.value)}
                                                className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 mb-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                                <input
                                                    type="date"
                                                    value={data.date}
                                                    onChange={(e) => setData('date', e.target.value)}
                                                    className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                                <select
                                                    value={data.journal_category_id}
                                                    onChange={(e) => setData('journal_category_id', e.target.value)}
                                                    className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-sm"
                                                >
                                                    <option value="">None</option>
                                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Mood</label>
                                            <div className="flex gap-4">
                                                {['positive', 'neutral', 'negative'].map(m => (
                                                    <button
                                                        key={m}
                                                        type="button"
                                                        onClick={() => setData('mood', m)}
                                                        className={`p-2 rounded-lg border ${data.mood === m ? (m === 'positive' ? 'border-green-500 bg-green-50' : m === 'neutral' ? 'border-gray-500 bg-gray-50' : 'border-red-500 bg-red-50') : 'border-gray-200 hover:bg-gray-50'}`}
                                                    >
                                                        <MoodIcon mood={m} className={`w-6 h-6 ${data.mood === m ? (m === 'positive' ? 'text-green-600' : m === 'neutral' ? 'text-gray-600' : 'text-red-600') : 'text-gray-400'}`} />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Reflection</label>
                                            <textarea
                                                value={data.content}
                                                onChange={(e) => setData('content', e.target.value)}
                                                rows="8"
                                                className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm resize-none"
                                            ></textarea>
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                                <Sparkles className="w-4 h-4 text-yellow-500" /> Improvement List
                                            </label>
                                            <textarea
                                                value={data.improvement_list}
                                                onChange={(e) => setData('improvement_list', e.target.value)}
                                                rows="3"
                                                className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm resize-none"
                                            ></textarea>
                                        </div>
                                        <div className="flex justify-end">
                                            <PrimaryButton disabled={processing}>Save Entry</PrimaryButton>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Entries List */}
                            <div className="w-full lg:w-2/3 space-y-6">
                                {entries.data && entries.data.map((entry) => (
                                    <div key={entry.id} className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 relative group">
                                        <div className="absolute top-6 right-6 flex items-center gap-2">
                                            {editingEntry !== entry.id && <MoodIcon mood={entry.mood} className="w-6 h-6" />}
                                        </div>

                                        {/* View Mode */}
                                        {editingEntry !== entry.id && (
                                            <div className="mb-4 pr-10">
                                                <h3 className="text-xl font-bold text-gray-900 mb-1">{entry.title || moment(entry.date).format('MMMM Do, YYYY')}</h3>
                                                <div className="flex gap-2 text-xs text-gray-500 mb-3">
                                                    <span>{moment(entry.date).format('ddd, MMM Do')}</span>
                                                    {entry.category && (
                                                        <span className={`px-2 py-0.5 rounded font-semibold ${entry.category.color}`}>{entry.category.name}</span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity absolute top-6 right-16">
                                                    <button onClick={() => handleEdit(entry)} className="text-indigo-600 p-1"><Edit2 className="w-4 h-4" /></button>
                                                    <button onClick={() => handleDelete(entry)} className="text-red-600 p-1"><Trash2 className="w-4 h-4" /></button>
                                                </div>
                                                <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">{entry.content}</div>
                                                {entry.improvement_list && (
                                                    <div className="mt-4 p-3 bg-yellow-50 rounded-md border border-yellow-100 text-sm">{entry.improvement_list}</div>
                                                )}
                                            </div>
                                        )}

                                        {/* Edit Mode */}
                                        {editingEntry === entry.id && (
                                            <div className="space-y-3">
                                                <input
                                                    type="text"
                                                    value={editTitle}
                                                    onChange={e => setEditTitle(e.target.value)}
                                                    className="w-full text-lg font-bold border-gray-300 rounded"
                                                    placeholder="Title"
                                                />
                                                <div className="flex gap-2">
                                                    <select
                                                        value={editCategoryId}
                                                        onChange={e => setEditCategoryId(e.target.value)}
                                                        className="border-gray-300 rounded text-sm w-1/2"
                                                    >
                                                        <option value="">No Category</option>
                                                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                                    </select>
                                                    <div className="flex gap-2 items-center">
                                                        {['positive', 'neutral', 'negative'].map(m => (
                                                            <button key={m} onClick={() => setEditMood(m)} className={`p-1 rounded ${editMood === m ? 'bg-gray-200' : ''}`}><MoodIcon mood={m} className="w-5 h-5" /></button>
                                                        ))}
                                                    </div>
                                                </div>
                                                <textarea value={editContent} onChange={e => setEditContent(e.target.value)} rows="5" className="w-full border-gray-300 rounded"></textarea>
                                                <textarea value={editImprovement} onChange={e => setEditImprovement(e.target.value)} rows="2" className="w-full border-gray-300 rounded" placeholder="Improvements"></textarea>
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => setEditingEntry(null)} className="text-gray-500">Cancel</button>
                                                    <button onClick={() => handleUpdate(entry)} className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {entries.links && <div className="flex justify-center mt-6">...</div>} {/* Pagination placeholder for brevity if needed in real code */}
                            </div>
                        </div>
                    ) : (
                        /* Kanban View */
                        <div className="flex h-full overflow-x-auto pb-4 gap-6">
                            {kanbanColumns.map(column => (
                                <div key={column.id} className="min-w-[300px] bg-gray-100 rounded-lg p-4 flex flex-col h-full">
                                    <div className={`font-bold mb-4 flex justify-between items-center ${column.id === 'uncategorized' ? 'text-gray-600' : 'text-gray-800'}`}>
                                        <span className={`px-2 py-1 rounded ${column.color || 'bg-white'}`}>{column.name}</span>
                                        <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">{column.entries.length}</span>
                                    </div>
                                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                                        {column.entries.map(entry => (
                                            <div key={entry.id} className="bg-white p-3 rounded shadow-sm hover:shadow-md cursor-pointer group" onClick={() => handleEdit(entry)}>
                                                {/* For Kanban, click to edit usually opens modal, mimicking inline edit behavior here by switching view logic would be complex, assume read-only/modal trigger */}
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="text-xs font-bold text-gray-500">{moment(entry.date).format('MMM Do')}</span>
                                                    <MoodIcon mood={entry.mood} className="w-4 h-4" />
                                                </div>
                                                <h4 className="font-bold text-gray-900 text-sm mb-1">{entry.title || 'Journal Entry'}</h4>
                                                <p className="text-xs text-gray-600 line-clamp-3">{entry.content}</p>
                                            </div>
                                        ))}
                                        {column.id === 'uncategorized' && (
                                            <button onClick={() => setShowCategoryModal(true)} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 hover:border-gray-400 hover:text-gray-500 text-sm flex items-center justify-center gap-1">
                                                <Plus className="w-4 h-4" /> Manage Categories
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
