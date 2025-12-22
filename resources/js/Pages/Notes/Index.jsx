import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Plus, Edit, Trash2, FileText, Download, Mic, Paperclip, Youtube } from 'lucide-react';
import Pagination from '@/Components/Pagination';

export default function Index({ auth, notes }) {
    const { flash } = usePage().props;

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this note?')) {
            router.delete(route('notes.destroy', id));
        }
    };

    const handleDownload = (e, note) => {
        e.preventDefault();
        if (!note.drawing_data) return;

        const isJson = note.drawing_data.trim().startsWith('{');

        const link = document.createElement('a');
        if (isJson) {
            const blob = new Blob([note.drawing_data], { type: 'application/json' });
            link.href = URL.createObjectURL(blob);
            link.download = `drawing-${note.id}.json`;
        } else {
            link.href = note.drawing_data;
            link.download = `drawing-${note.id}.png`;
        }

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        if (isJson) {
            URL.revokeObjectURL(link.href);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Notes & Drawings</h2>}
        >
            <Head title="Notes" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">


                    <div className="flex justify-end mb-6">
                        <Link
                            href={route('notes.create')}
                            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150"
                        >
                            Create Note
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.length > 0 ? (
                            notes.map((note) => (
                                <div key={note.id} className="bg-white overflow-hidden shadow-sm rounded-lg flex flex-col h-full border border-gray-100">
                                    <div className="p-4 flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-lg text-gray-900 truncate pr-2">
                                                <Link href={route('notes.show', note.id)} className="hover:text-indigo-600 hover:underline">
                                                    {note.title || 'Untitled Note'}
                                                </Link>
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                {/* Voice */}
                                                {note.recordings && note.recordings.length > 0 && (
                                                    <Mic className="w-4 h-4 text-indigo-500" title="Has Voice Note" />
                                                )}
                                                {/* Files */}
                                                {note.attachments && note.attachments.some(a => a.type === 'file') && (
                                                    <Paperclip className="w-4 h-4 text-gray-500" title="Has Attachments" />
                                                )}
                                                {/* YouTube */}
                                                {note.attachments && note.attachments.some(a => a.type === 'youtube') && (
                                                    <Youtube className="w-4 h-4 text-red-500" title="Has Video" />
                                                )}
                                                <span className="text-xs text-gray-500 whitespace-nowrap">
                                                    {new Date(note.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>

                                        {(note.project || note.task) && (
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {note.project && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                                        {note.project.name}
                                                    </span>
                                                )}
                                                {note.task && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                        {note.task.title}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {note.drawing_data ? (
                                            (note.drawing_data.startsWith('data:') || note.drawing_data.startsWith('http')) ? (
                                                <div className="mb-4 bg-gray-50 rounded border border-gray-200 overflow-hidden h-40 flex items-center justify-center">
                                                    <img src={note.drawing_data} alt="Drawing" className="max-h-full max-w-full object-contain" />
                                                </div>
                                            ) : (
                                                <div className="mb-4 bg-yellow-50 rounded border border-yellow-200 h-40 flex flex-col items-center justify-center text-yellow-600">
                                                    <FileText className="w-12 h-12 mb-2" />
                                                    <span className="text-xs font-semibold">Drawing Attached</span>
                                                </div>
                                            )
                                        ) : (
                                            <div className="mb-4 bg-gray-50 rounded border border-gray-200 h-40 flex items-center justify-center text-gray-300">
                                                <FileText className="w-12 h-12" />
                                            </div>
                                        )}

                                        <p className="text-gray-600 text-sm line-clamp-3">
                                            {note.content || 'No text content.'}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 flex justify-between items-center border-t border-gray-100">
                                        <div>
                                            {note.drawing_data && (
                                                <button
                                                    onClick={(e) => handleDownload(e, note)}
                                                    className="text-gray-500 hover:text-gray-700 mr-3"
                                                    title="Download Drawing"
                                                >
                                                    <Download className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                        <div className="flex space-x-2">
                                            <Link href={route('notes.edit', note.id)} className="text-indigo-600 hover:text-indigo-900">
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button onClick={() => handleDelete(note.id)} className="text-red-600 hover:text-red-900">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
                                No notes found. Create one to get started!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
