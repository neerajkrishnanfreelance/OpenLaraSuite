import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import Checkbox from '@/Components/Checkbox';

export default function Chatter({ messages = [], chatterableId, chatterableType }) {
    const { auth } = usePage().props;
    const { data, setData, post, processing, reset, errors } = useForm({
        message: '',
        chatterable_id: chatterableId,
        chatterable_type: chatterableType,
        notify_email: false,
        documents: [],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('chatter.store'), {
            onSuccess: () => {
                reset('message', 'documents');
            },
            preserveScroll: true,
            forceFormData: true,
        });
    };

    const handleFileChange = (e) => {
        setData('documents', Array.from(e.target.files));
    };

    return (
        <div className="bg-white shadow sm:rounded-lg p-6 h-full flex flex-col">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Chatter</h3>

            <div className="flex-1 overflow-y-auto mb-4 space-y-4 max-h-[600px] pr-2">
                {messages.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">No messages yet.</p>
                ) : (
                    messages.map((msg) => (
                        <div key={msg.id} className="flex gap-3">
                            <div className="flex-shrink-0">
                                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-purple-100">
                                    <span className="text-xs font-medium leading-none text-purple-700">
                                        {msg.user.name.charAt(0)}
                                    </span>
                                </span>
                            </div>
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-gray-900">{msg.user.name}</h3>
                                    <p className="text-xs text-gray-500">{new Date(msg.created_at).toLocaleString()}</p>
                                </div>
                                <p className="text-sm text-gray-700 whitespace-pre-wrap">{msg.message}</p>
                                {msg.documents && msg.documents.length > 0 && (
                                    <div className="mt-2 text-xs flex flex-wrap gap-2">
                                        {msg.documents.map(doc => (
                                            <a
                                                key={doc.id}
                                                href={`/storage/${doc.path}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-purple-600 truncate max-w-xs transition-colors"
                                            >
                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                                                {doc.name}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            <form onSubmit={submit} className="mt-auto">
                <div>
                    <textarea
                        value={data.message}
                        onChange={(e) => setData('message', e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm"
                        rows="3"
                        placeholder="Type a message..."
                        required
                    />
                    <InputError message={errors.message} className="mt-1" />
                </div>

                {data.documents.length > 0 && (
                    <div className="mt-2 text-xs text-gray-600 flex flex-wrap gap-2">
                        {data.documents.map((f, i) => (
                            <span key={i} className="bg-gray-100 px-2 py-1 rounded flex items-center">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                                {f.name}
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                            <Checkbox
                                name="notify_email"
                                checked={data.notify_email}
                                onChange={(e) => setData('notify_email', e.target.checked)}
                            />
                            <span className="ml-2 text-sm text-gray-600">Notify via Email</span>
                        </label>
                        <label className="cursor-pointer text-gray-500 hover:text-purple-600 transition-colors" title="Attach Files">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                            <input type="file" multiple className="hidden" onChange={handleFileChange} />
                        </label>
                    </div>
                    <PrimaryButton disabled={processing} className="text-xs px-6 py-2 bg-purple-600 border border-transparent rounded-md font-bold text-white uppercase tracking-widest hover:bg-purple-500 active:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition ease-in-out duration-150">
                        POST
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
}
