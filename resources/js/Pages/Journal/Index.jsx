import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import FormHeader from '@/Components/FormHeader';
import PrimaryButton from '@/Components/PrimaryButton';
import { useState, useEffect } from 'react';
import { PenTool, Trash2, Edit2, Save, X, Smile, Meh, Frown, Sparkles, Search, Filter, Plus, Tag, Calendar } from 'lucide-react';
import moment from 'moment';

export default function Index({ auth, entries, categories, view, filters }) {
    const journalNav = [
        { name: 'Back to Hub', route: 'dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { name: 'My Journal', route: 'journal.index', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    ];

    // Selected entry state
    const [selectedEntryId, setSelectedEntryId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    // Search and filter state
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [categoryFilter, setCategoryFilter] = useState(filters.category || '');
    const [moodFilter, setMoodFilter] = useState(filters.mood || '');
    const [dateFromFilter, setDateFromFilter] = useState(filters.date_from || '');
    const [dateToFilter, setDateToFilter] = useState(filters.date_to || '');

    // Form state
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        content: '',
        date: moment().format('YYYY-MM-DD'),
        mood: '',
        improvement_list: '',
        journal_category_id: '',
    });

    // Masters State
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const { data: catData, setData: setCatData, post: postCat, reset: resetCat } = useForm({ name: '', color: 'bg-indigo-100 text-indigo-800' });

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            applyFilters();
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const applyFilters = () => {
        router.get(route('journal.index'), {
            search: searchQuery,
            category: categoryFilter,
            mood: moodFilter,
            date_from: dateFromFilter,
            date_to: dateToFilter,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setSearchQuery('');
        setCategoryFilter('');
        setMoodFilter('');
        setDateFromFilter('');
        setDateToFilter('');
        router.get(route('journal.index'));
    };

    const selectedEntry = selectedEntryId
        ? (entries.data || entries).find(e => e.id === selectedEntryId)
        : null;

    const handleSelectEntry = (entry) => {
        setSelectedEntryId(entry.id);
        setIsEditing(false);
        // Populate form with entry data
        setData({
            title: entry.title || '',
            content: entry.content,
            date: entry.date,
            mood: entry.mood || '',
            improvement_list: entry.improvement_list || '',
            journal_category_id: entry.journal_category_id || '',
        });
    };

    const handleNewEntry = () => {
        setSelectedEntryId(null);
        setIsEditing(true);
        reset();
        setData('date', moment().format('YYYY-MM-DD'));
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        if (selectedEntryId) {
            setIsEditing(false);
            // Restore original data
            if (selectedEntry) {
                setData({
                    title: selectedEntry.title || '',
                    content: selectedEntry.content,
                    date: selectedEntry.date,
                    mood: selectedEntry.mood || '',
                    improvement_list: selectedEntry.improvement_list || '',
                    journal_category_id: selectedEntry.journal_category_id || '',
                });
            }
        } else {
            setSelectedEntryId(null);
            setIsEditing(false);
            reset();
        }
    };

    const submit = (e) => {
        e.preventDefault();
        if (selectedEntryId) {
            // Update existing entry
            router.put(route('journal.update', selectedEntryId), data, {
                onSuccess: () => {
                    setIsEditing(false);
                },
            });
        } else {
            // Create new entry
            post(route('journal.store'), {
                onSuccess: () => {
                    reset();
                    setIsEditing(false);
                },
            });
        }
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this entry?')) {
            router.delete(route('journal.destroy', selectedEntryId), {
                onSuccess: () => {
                    setSelectedEntryId(null);
                    setIsEditing(false);
                    reset();
                },
            });
        }
    };

    // Category Management
    const submitCategory = (e) => {
        e.preventDefault();
        postCat(route('journal.categories.store'), {
            onSuccess: () => { setShowCategoryModal(false); resetCat(); }
        });
    };

    const deleteCategory = (category) => {
        if (confirm('Delete this category?')) {
            router.delete(route('journal.categories.destroy', category.id));
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

    const entriesList = entries.data || entries;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <FormHeader title="Journaling" />
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
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex gap-6 h-[calc(100vh-140px)]">

                        {/* LEFT SIDEBAR - List View */}
                        <div className="w-1/3 bg-white rounded-lg shadow-sm flex flex-col overflow-hidden">
                            {/* Search and Filter Header */}
                            <div className="p-4 border-b space-y-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search entries..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="flex gap-2 items-center">
                                    <button
                                        onClick={() => setShowFilters(!showFilters)}
                                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm ${showFilters ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'} hover:bg-indigo-100 hover:text-indigo-700`}
                                    >
                                        <Filter className="w-4 h-4" />
                                        Filters
                                    </button>
                                    {(categoryFilter || moodFilter || dateFromFilter || dateToFilter) && (
                                        <button
                                            onClick={clearFilters}
                                            className="text-xs text-red-600 hover:underline"
                                        >
                                            Clear
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setShowCategoryModal(true)}
                                        className="ml-auto text-xs text-indigo-600 hover:underline flex items-center gap-1"
                                    >
                                        <Tag className="w-3 h-3" /> Masters
                                    </button>
                                </div>

                                {/* Filter Controls */}
                                {showFilters && (
                                    <div className="space-y-2 pt-2 border-t">
                                        <select
                                            value={categoryFilter}
                                            onChange={(e) => { setCategoryFilter(e.target.value); applyFilters(); }}
                                            className="w-full text-sm border-gray-300 rounded-lg"
                                        >
                                            <option value="">All Categories</option>
                                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                        </select>

                                        <select
                                            value={moodFilter}
                                            onChange={(e) => { setMoodFilter(e.target.value); applyFilters(); }}
                                            className="w-full text-sm border-gray-300 rounded-lg"
                                        >
                                            <option value="">All Moods</option>
                                            <option value="positive">Positive</option>
                                            <option value="neutral">Neutral</option>
                                            <option value="negative">Negative</option>
                                        </select>

                                        <div className="grid grid-cols-2 gap-2">
                                            <input
                                                type="date"
                                                value={dateFromFilter}
                                                onChange={(e) => { setDateFromFilter(e.target.value); applyFilters(); }}
                                                placeholder="From"
                                                className="text-sm border-gray-300 rounded-lg"
                                            />
                                            <input
                                                type="date"
                                                value={dateToFilter}
                                                onChange={(e) => { setDateToFilter(e.target.value); applyFilters(); }}
                                                placeholder="To"
                                                className="text-sm border-gray-300 rounded-lg"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Entries List */}
                            <div className="flex-1 overflow-y-auto">
                                {entriesList.length === 0 ? (
                                    <div className="p-8 text-center text-gray-400">
                                        <PenTool className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                        <p className="text-sm">No entries found</p>
                                    </div>
                                ) : (
                                    <div className="divide-y">
                                        {entriesList.map((entry) => (
                                            <div
                                                key={entry.id}
                                                onClick={() => handleSelectEntry(entry)}
                                                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedEntryId === entry.id ? 'bg-indigo-50 border-l-4 border-indigo-600' : ''}`}
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">
                                                            {entry.title || moment(entry.date).format('MMMM Do, YYYY')}
                                                        </h4>
                                                        <p className="text-xs text-gray-500 mt-0.5">
                                                            {moment(entry.date).format('ddd, MMM Do')}
                                                        </p>
                                                    </div>
                                                    <MoodIcon mood={entry.mood} className="w-4 h-4 flex-shrink-0 ml-2" />
                                                </div>
                                                {entry.category && (
                                                    <span className={`text-xs px-2 py-0.5 rounded font-semibold ${entry.category.color}`}>
                                                        {entry.category.name}
                                                    </span>
                                                )}
                                                <p className="text-xs text-gray-600 mt-2 line-clamp-2">{entry.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* New Entry Button */}
                            <div className="p-4 border-t">
                                <button
                                    onClick={handleNewEntry}
                                    className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 font-medium"
                                >
                                    <Plus className="w-5 h-5" />
                                    New Entry
                                </button>
                            </div>
                        </div>

                        {/* RIGHT SIDE - Form View */}
                        <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden">
                            {selectedEntryId === null && !isEditing ? (
                                // Empty State
                                <div className="h-full flex items-center justify-center text-gray-400">
                                    <div className="text-center">
                                        <PenTool className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                        <p className="text-lg font-medium">Select an entry or create a new one</p>
                                        <p className="text-sm mt-2">Your journal entries will appear here</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full flex flex-col">
                                    {/* Header */}
                                    <div className="p-6 border-b flex justify-between items-center">
                                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                            <PenTool className="w-5 h-5 text-indigo-600" />
                                            {selectedEntryId ? (isEditing ? 'Edit Entry' : 'View Entry') : 'New Entry'}
                                        </h2>
                                        {selectedEntryId && !isEditing && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={handleEdit}
                                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={handleDelete}
                                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 overflow-y-auto p-6">
                                        {!isEditing && selectedEntry ? (
                                            // View Mode
                                            <div className="space-y-6">
                                                <div>
                                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                                        {selectedEntry.title || moment(selectedEntry.date).format('MMMM Do, YYYY')}
                                                    </h3>
                                                    <div className="flex gap-3 items-center text-sm text-gray-500">
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-4 h-4" />
                                                            {moment(selectedEntry.date).format('dddd, MMMM Do, YYYY')}
                                                        </span>
                                                        {selectedEntry.category && (
                                                            <span className={`px-2 py-1 rounded font-semibold ${selectedEntry.category.color}`}>
                                                                {selectedEntry.category.name}
                                                            </span>
                                                        )}
                                                        {selectedEntry.mood && (
                                                            <div className="flex items-center gap-1">
                                                                <MoodIcon mood={selectedEntry.mood} className="w-5 h-5" />
                                                                <span className="capitalize">{selectedEntry.mood}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="prose max-w-none">
                                                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                                                        {selectedEntry.content}
                                                    </div>
                                                </div>

                                                {selectedEntry.improvement_list && (
                                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <Sparkles className="w-5 h-5 text-yellow-600" />
                                                            <h4 className="font-semibold text-gray-900">Improvement List</h4>
                                                        </div>
                                                        <div className="text-gray-700 whitespace-pre-wrap">
                                                            {selectedEntry.improvement_list}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            // Edit/Create Mode
                                            <form onSubmit={submit} className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title (Optional)</label>
                                                    <input
                                                        type="text"
                                                        value={data.title}
                                                        onChange={(e) => setData('title', e.target.value)}
                                                        className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                        placeholder="Give your entry a title..."
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                                        <input
                                                            type="date"
                                                            value={data.date}
                                                            onChange={(e) => setData('date', e.target.value)}
                                                            className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                                        <select
                                                            value={data.journal_category_id}
                                                            onChange={(e) => setData('journal_category_id', e.target.value)}
                                                            className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                        >
                                                            <option value="">None</option>
                                                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mood</label>
                                                    <div className="flex gap-4">
                                                        {['positive', 'neutral', 'negative'].map(m => (
                                                            <button
                                                                key={m}
                                                                type="button"
                                                                onClick={() => setData('mood', m)}
                                                                className={`p-3 rounded-lg border ${data.mood === m ? (m === 'positive' ? 'border-green-500 bg-green-50' : m === 'neutral' ? 'border-gray-500 bg-gray-50' : 'border-red-500 bg-red-50') : 'border-gray-200 hover:bg-gray-50'}`}
                                                            >
                                                                <MoodIcon mood={m} className={`w-6 h-6 ${data.mood === m ? (m === 'positive' ? 'text-green-600' : m === 'neutral' ? 'text-gray-600' : 'text-red-600') : 'text-gray-400'}`} />
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Reflection</label>
                                                    <textarea
                                                        value={data.content}
                                                        onChange={(e) => setData('content', e.target.value)}
                                                        rows="10"
                                                        className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm resize-none"
                                                        placeholder="Write your thoughts..."
                                                        required
                                                    ></textarea>
                                                    <InputError message={errors.content} className="mt-2" />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                                        <Sparkles className="w-4 h-4 text-yellow-500" /> Improvement List
                                                    </label>
                                                    <textarea
                                                        value={data.improvement_list}
                                                        onChange={(e) => setData('improvement_list', e.target.value)}
                                                        rows="4"
                                                        className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm resize-none"
                                                        placeholder="What can you improve?"
                                                    ></textarea>
                                                </div>

                                                <div className="flex justify-end gap-3 pt-4 border-t">
                                                    <button
                                                        type="button"
                                                        onClick={handleCancelEdit}
                                                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <PrimaryButton disabled={processing}>
                                                        {selectedEntryId ? 'Update Entry' : 'Save Entry'}
                                                    </PrimaryButton>
                                                </div>
                                            </form>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
