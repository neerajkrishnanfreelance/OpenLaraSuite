import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Printer } from 'lucide-react';

export default function View({ auth, resume }) {
    const { content } = resume;

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <Head title={resume.title} />

            <div className="max-w-4xl mx-auto">
                <div className="mb-8 flex justify-between items-center no-print">
                    <Link href={route('resumes.index')} className="text-gray-600 hover:text-gray-900 flex items-center">
                        <ArrowLeft className="w-5 h-5 mr-2" /> Back to List
                    </Link>
                    <div className="flex space-x-4">
                        <Link href={route('resumes.edit', resume.id)} className="text-indigo-600 hover:text-indigo-900 font-medium">
                            Edit Resume
                        </Link>
                        <button
                            onClick={() => window.print()}
                            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 flex items-center"
                        >
                            <Printer className="w-4 h-4 mr-2" /> Print PDF
                        </button>
                    </div>
                </div>

                <div className="bg-white shadow-xl rounded-lg overflow-hidden resume-print-container">
                    <div className="p-12">
                        {/* Header */}
                        <div className="border-b-2 border-gray-800 pb-8 mb-8 text-center sm:text-left">
                            <h1 className="text-4xl font-bold text-gray-900 uppercase tracking-widest">{auth.user.name}</h1>
                            <div className="mt-4 flex flex-col sm:flex-row sm:justify-between text-gray-600 text-sm">
                                <p>{auth.user.email}</p>
                                {/* Add phone number logic if user profile has it, or add to Resume model */}
                            </div>
                        </div>

                        {/* Summary */}
                        {resume.summary && (
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">Professional Profile</h3>
                                <p className="text-gray-700 leading-relaxed text-justify">{resume.summary}</p>
                            </div>
                        )}

                        {/* Experience */}
                        {(content.experience && content.experience.length > 0) && (
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wider mb-4 border-b border-gray-200 pb-1">Experience</h3>
                                <div className="space-y-6">
                                    {content.experience.map((job, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h4 className="text-xl font-bold text-gray-900">{job.company}</h4>
                                                <span className="text-gray-600 text-sm font-medium">{job.start} - {job.end}</span>
                                            </div>
                                            <p className="text-gray-800 font-semibold mb-2 italic">{job.role}</p>
                                            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{job.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Education */}
                        {(content.education && content.education.length > 0) && (
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wider mb-4 border-b border-gray-200 pb-1">Education</h3>
                                {content.education.map((edu, i) => (
                                    <div key={i} className="mb-4">
                                        <div className="flex justify-between items-baseline">
                                            <h4 className="text-lg font-bold text-gray-900">{edu.school}</h4>
                                            <span className="text-gray-600 text-sm">{edu.year}</span>
                                        </div>
                                        <p className="text-gray-700">{edu.degree}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Skills */}
                        {(content.skills && content.skills.length > 0) && (
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wider mb-4 border-b border-gray-200 pb-1">Skills</h3>
                                <div className="flex flex-wrap gap-x-6 gap-y-2">
                                    {content.skills.map((skill, i) => (
                                        <span key={i} className="text-gray-700 font-medium">
                                            • {skill.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            <style>
                {`
                @media print {
                    .no-print { display: none !important; }
                    body { background: white; }
                    .min-h-screen { min-height: auto; }
                    .shadow-xl { box-shadow: none !important; }
                    .resume-print-container { width: 100% !important; max-width: none !important; }
                }
                `}
            </style>
        </div>
    );
}
