import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { Plus, Trash2, Edit } from 'lucide-react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Modal from '@/Components/Modal';

export default function LeadStages({ auth, stages }) {
    const [showModal, setShowModal] = useState(false);
    const [editingStage, setEditingStage] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        color: '',
        order: '',
    });

    const openCreateModal = () => {
        setEditingStage(null);
        reset();
        setShowModal(true);
    };

    const openEditModal = (stage) => {
        setEditingStage(stage);
        setData({
            name: stage.name,
            color: stage.color || '',
            order: stage.order || 0,
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        reset();
    };

    const submit = (e) => {
        e.preventDefault();
        if (editingStage) {
            put(route('lead-stages.update', editingStage.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('lead-stages.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this stage?')) {
            destroy(route('lead-stages.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Lead Stages</h2>}
        >
            <Head title="Lead Stages" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">

                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-medium text-gray-900">Manage Stages</h3>
                            <PrimaryButton onClick={openCreateModal}>
                                <Plus className="w-4 h-4 mr-2" />
                                Add Stage
                            </PrimaryButton>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {stages.map((stage) => (
                                        <tr key={stage.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{stage.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="flex items-center">
                                                    <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: stage.color || '#ccc' }}></div>
                                                    {stage.color}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stage.order}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => openEditModal(stage)} className="text-indigo-600 hover:text-indigo-900 mr-3">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(stage.id)} className="text-red-600 hover:text-red-900">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {stages.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No stages defined.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onClose={closeModal}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                        {editingStage ? 'Edit Stage' : 'Create Stage'}
                    </h2>
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel forInput="name" value="Name" />
                            <TextInput
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel forInput="color" value="Color (Hex or Class)" />
                            <TextInput
                                id="color"
                                className="mt-1 block w-full"
                                value={data.color}
                                onChange={(e) => setData('color', e.target.value)}
                                placeholder="#3B82F6"
                            />
                            <InputError message={errors.color} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel forInput="order" value="Order" />
                            <TextInput
                                id="order"
                                type="number"
                                className="mt-1 block w-full"
                                value={data.order}
                                onChange={(e) => setData('order', e.target.value)}
                            />
                            <InputError message={errors.order} className="mt-2" />
                        </div>

                        <div className="mt-6 flex justify-end">
                            <SecondaryButton onClick={closeModal} className="mr-3">Cancel</SecondaryButton>
                            <PrimaryButton disabled={processing}>
                                {editingStage ? 'Update' : 'Create'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
