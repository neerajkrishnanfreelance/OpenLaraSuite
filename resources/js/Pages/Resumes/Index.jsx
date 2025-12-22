import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

export default function Index({ auth, resumes }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this resume?')) {
            router.delete(route('resumes.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Resumes</h2>}
        >
            <Head title="My Resumes" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-medium text-gray-900">Resume List</h3>
                        <Link
                            href={route('resumes.create')}
                            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150"
                        >
                            Create Resume
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resumes.length > 0 ? (
                            resumes.map((resume) => (
                                <div key={resume.id} className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-200 hover:shadow-md transition">
                                    <div className="p-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-xl font-bold text-gray-900 truncate" title={resume.title}>
                                                    {resume.title}
                                                </h4>
                                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                                    {resume.summary || 'No summary provided.'}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-2">
                                                    Last updated: {new Date(resume.updated_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-6 flex justify-end space-x-3">
                                            <Link
                                                href={route('resumes.show', resume.id)}
                                                className="text-gray-600 hover:text-gray-900 inline-flex items-center text-sm font-medium"
                                                title="View/Print"
                                            >
                                                <Eye className="w-4 h-4 mr-1" />
                                                View
                                            </Link>
                                            <Link
                                                href={route('resumes.edit', resume.id)}
                                                className="text-indigo-600 hover:text-indigo-900 inline-flex items-center text-sm font-medium"
                                                title="Edit in Builder"
                                            >
                                                <Edit className="w-4 h-4 mr-1" />
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(resume.id)}
                                                className="text-red-600 hover:text-red-900 inline-flex items-center text-sm font-medium"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                                <p className="text-gray-500">You haven't created any resumes yet.</p>
                                <Link
                                    href={route('resumes.create')}
                                    className="mt-4 inline-block text-indigo-600 hover:underline"
                                >
                                    Create your first resume
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
