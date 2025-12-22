import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import { Plus, Trash2, ChevronDown, ChevronUp, Save, Eye } from 'lucide-react';

export default function Builder({ auth, resume }) {
    const { data, setData, put, processing, isDirty } = useForm({
        title: resume.title,
        summary: resume.summary || '',
        content: resume.content || {
            education: [],
            experience: [],
            skills: []
        },
    });

    const [activeSection, setActiveSection] = useState('summary');

    // Helper to update nested content state
    const updateContent = (section, index, field, value) => {
        const newSectionData = [...(data.content[section] || [])];
        newSectionData[index] = { ...newSectionData[index], [field]: value };
        setData('content', { ...data.content, [section]: newSectionData });
    };

    const addItem = (section, template) => {
        setData('content', {
            ...data.content,
            [section]: [...(data.content[section] || []), template]
        });
    };

    const removeItem = (section, index) => {
        const newSectionData = [...(data.content[section] || [])];
        newSectionData.splice(index, 1);
        setData('content', { ...data.content, [section]: newSectionData });
    };

    const submit = (e) => {
        e.preventDefault();
        put(route('resumes.update', resume.id), {
            preserveScroll: true,
            onSuccess: () => alert('Resume Saved!')
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Resume Builder: {data.title}
                    </h2>
                    <div className="flex space-x-3">
                        <Link
                            href={route('resumes.show', resume.id)}
                            target="_blank"
                            className="inline-flex items-center px-4 py-2 bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-300 transition"
                        >
                            <Eye className="w-4 h-4 mr-2" /> Preview
                        </Link>
                        <PrimaryButton onClick={submit} disabled={processing || !isDirty}>
                            <Save className="w-4 h-4 mr-2" /> Save Changes
                        </PrimaryButton>
                    </div>
                </div>
            }
        >
            <Head title={`Edit ${data.title}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Editor Column */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Personal Summary */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Professional Summary</h3>
                                <textarea
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    rows="4"
                                    value={data.summary}
                                    onChange={(e) => setData('summary', e.target.value)}
                                    placeholder="Write a compelling summary of your career..."
                                />
                            </div>

                            {/* Experience Section */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium text-gray-900">Work Experience</h3>
                                    <button
                                        type="button"
                                        onClick={() => addItem('experience', { company: '', role: '', start: '', end: '', description: '' })}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
                                    >
                                        <Plus className="w-4 h-4 mr-1" /> Add Job
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {data.content.experience?.map((job, index) => (
                                        <div key={index} className="border border-gray-200 rounded-md p-4 bg-gray-50">
                                            <div className="grid grid-cols-2 gap-4 mb-3">
                                                <div>
                                                    <InputLabel value="Company" />
                                                    <TextInput
                                                        value={job.company || ''}
                                                        onChange={(e) => updateContent('experience', index, 'company', e.target.value)}
                                                        className="w-full mt-1"
                                                    />
                                                </div>
                                                <div>
                                                    <InputLabel value="Role/Title" />
                                                    <TextInput
                                                        value={job.role || ''}
                                                        onChange={(e) => updateContent('experience', index, 'role', e.target.value)}
                                                        className="w-full mt-1"
                                                    />
                                                </div>
                                                <div>
                                                    <InputLabel value="Start Date" />
                                                    <TextInput
                                                        type="text"
                                                        value={job.start || ''}
                                                        onChange={(e) => updateContent('experience', index, 'start', e.target.value)}
                                                        className="w-full mt-1"
                                                        placeholder="e.g. Jan 2020"
                                                    />
                                                </div>
                                                <div>
                                                    <InputLabel value="End Date" />
                                                    <TextInput
                                                        type="text"
                                                        value={job.end || ''}
                                                        onChange={(e) => updateContent('experience', index, 'end', e.target.value)}
                                                        className="w-full mt-1"
                                                        placeholder="Present"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <InputLabel value="Description / Responsibilities" />
                                                <textarea
                                                    className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    rows="3"
                                                    value={job.description || ''}
                                                    onChange={(e) => updateContent('experience', index, 'description', e.target.value)}
                                                />
                                            </div>
                                            <div className="flex justify-end mt-2">
                                                <button onClick={() => removeItem('experience', index)} className="text-red-500 hover:text-red-700 text-xs flex items-center">
                                                    <Trash2 className="w-3 h-3 mr-1" /> Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    {(!data.content.experience || data.content.experience.length === 0) && (
                                        <p className="text-gray-400 italic text-sm">No work experience added.</p>
                                    )}
                                </div>
                            </div>

                            {/* Education Section */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium text-gray-900">Education</h3>
                                    <button
                                        type="button"
                                        onClick={() => addItem('education', { school: '', degree: '', year: '' })}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
                                    >
                                        <Plus className="w-4 h-4 mr-1" /> Add Education
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {data.content.education?.map((edu, index) => (
                                        <div key={index} className="border border-gray-200 rounded-md p-4 bg-gray-50">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="md:col-span-2">
                                                    <InputLabel value="School / University" />
                                                    <TextInput
                                                        value={edu.school || ''}
                                                        onChange={(e) => updateContent('education', index, 'school', e.target.value)}
                                                        className="w-full mt-1"
                                                    />
                                                </div>
                                                <div>
                                                    <InputLabel value="Degree" />
                                                    <TextInput
                                                        value={edu.degree || ''}
                                                        onChange={(e) => updateContent('education', index, 'degree', e.target.value)}
                                                        className="w-full mt-1"
                                                    />
                                                </div>
                                                <div>
                                                    <InputLabel value="Graduation Year" />
                                                    <TextInput
                                                        value={edu.year || ''}
                                                        onChange={(e) => updateContent('education', index, 'year', e.target.value)}
                                                        className="w-full mt-1"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex justify-end mt-2">
                                                <button onClick={() => removeItem('education', index)} className="text-red-500 hover:text-red-700 text-xs flex items-center">
                                                    <Trash2 className="w-3 h-3 mr-1" /> Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    {(!data.content.education || data.content.education.length === 0) && (
                                        <p className="text-gray-400 italic text-sm">No educational background added.</p>
                                    )}
                                </div>
                            </div>

                            {/* Skills Section */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium text-gray-900">Skills</h3>
                                    <button
                                        type="button"
                                        onClick={() => addItem('skills', { name: '', level: 'Intermediate' })}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
                                    >
                                        <Plus className="w-4 h-4 mr-1" /> Add Skill
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {data.content.skills?.map((skill, index) => (
                                        <div key={index} className="border border-gray-200 rounded-md p-3 bg-gray-50 flex items-center justify-between">
                                            <div className="flex-1 mr-2">
                                                <TextInput
                                                    value={skill.name || ''}
                                                    onChange={(e) => updateContent('skills', index, 'name', e.target.value)}
                                                    className="w-full"
                                                    placeholder="Skill Name"
                                                />
                                            </div>
                                            <button onClick={() => removeItem('skills', index)} className="text-red-500 hover:text-red-700">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Live Preview Column (Sticky) */}
                        <div className="hidden lg:block">
                            <div className="sticky top-24 bg-white shadow-lg rounded-lg border border-gray-200 p-8 min-h-[600px] overflow-hidden">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 text-center">Live Preview</h4>
                                <div className="prose prose-sm max-w-none">
                                    <h1 className="text-2xl font-bold text-gray-900 mb-1 leading-tight">{auth.user.name}</h1>
                                    <p className="text-sm text-gray-600 mb-4">{auth.user.email}</p>

                                    <hr className="my-4 border-gray-300" />

                                    {data.summary && (
                                        <div className="mb-6">
                                            <h3 className="text-lg font-bold text-gray-800 uppercase border-b-2 border-indigo-500 pb-1 mb-2">Summary</h3>
                                            <p className="text-gray-700 whitespace-pre-wrap">{data.summary}</p>
                                        </div>
                                    )}

                                    {(data.content.experience && data.content.experience.length > 0) && (
                                        <div className="mb-6">
                                            <h3 className="text-lg font-bold text-gray-800 uppercase border-b-2 border-indigo-500 pb-1 mb-2">Experience</h3>
                                            {data.content.experience.map((job, i) => (
                                                <div key={i} className="mb-3">
                                                    <div className="flex justify-between items-baseline">
                                                        <h4 className="font-bold text-gray-800">{job.company}</h4>
                                                        <span className="text-xs text-gray-500">{job.start} - {job.end}</span>
                                                    </div>
                                                    <p className="text-sm font-medium text-gray-700 italic">{job.role}</p>
                                                    <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{job.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {(data.content.education && data.content.education.length > 0) && (
                                        <div className="mb-6">
                                            <h3 className="text-lg font-bold text-gray-800 uppercase border-b-2 border-indigo-500 pb-1 mb-2">Education</h3>
                                            {data.content.education.map((edu, i) => (
                                                <div key={i} className="mb-2">
                                                    <div className="flex justify-between">
                                                        <h4 className="font-bold text-gray-800">{edu.school}</h4>
                                                        <span className="text-xs text-gray-500">{edu.year}</span>
                                                    </div>
                                                    <p className="text-sm text-gray-700">{edu.degree}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {(data.content.skills && data.content.skills.length > 0) && (
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800 uppercase border-b-2 border-indigo-500 pb-1 mb-2">Skills</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {data.content.skills.map((skill, i) => (
                                                    <span key={i} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                                        {skill.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
