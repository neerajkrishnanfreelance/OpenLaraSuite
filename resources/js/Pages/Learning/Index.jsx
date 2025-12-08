import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';
import moment from 'moment';

export default function Index({ auth, projects }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Learning Projects</h2>}
        >
            <Head title="Learning Projects" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {projects.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No learning projects</h3>
                            <p className="mt-1 text-sm text-gray-500">Get started by creating a new project marked as "Learning".</p>
                            <div className="mt-6">
                                <Link
                                    href={route('projects.create')}
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                                >
                                    Create Project
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {projects.map((project) => (
                                <div key={project.id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
                                    <div className="p-5">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <div className="rounded-md bg-indigo-50 p-3">
                                                    <BookOpen className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                                                </div>
                                            </div>
                                            <div className="ml-5 w-0 flex-1">
                                                <div className="text-sm font-medium text-gray-500 truncate">
                                                    {project.status.toUpperCase()}
                                                </div>
                                                <div className="text-lg font-medium text-gray-900 truncate">
                                                    {project.name}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <p className="text-sm text-gray-500 line-clamp-2">
                                                {project.description || 'No description provided.'}
                                            </p>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                                <p>
                                                    Due {project.end_date ? moment(project.end_date).format('MMM D') : 'N/A'}
                                                </p>
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                                <p>{project.tasks.length} recent tasks</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-5 py-3">
                                        <Link
                                            href={route('projects.show', project.id)}
                                            className="text-sm font-medium text-indigo-700 hover:text-indigo-900 flex items-center justify-center gap-2"
                                        >
                                            View Details <ArrowRight className="w-4 h-4" />
                                        </Link>
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
