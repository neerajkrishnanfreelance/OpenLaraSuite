import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import CreateRequirementModal from './CreateRequirementModal';
import ImportRequirementsModal from './ImportRequirementsModal';

export default function RequirementList({ requirements, projectId }) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [editingRequirement, setEditingRequirement] = useState(null);

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this requirement?')) {
            router.delete(route('requirements.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    const handleEdit = (requirement) => {
        setEditingRequirement(requirement);
        setShowCreateModal(true);
    };

    const closeCreateModal = () => {
        setShowCreateModal(false);
        setEditingRequirement(null);
    };

    const styles = {
        container: {
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            padding: '24px',
            marginBottom: '24px',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
        },
        title: {
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#111827',
        },
        actions: {
            display: 'flex',
            gap: '12px',
        },
        button: {
            padding: '8px 16px',
            borderRadius: '8px',
            fontWeight: '500',
            fontSize: '0.875rem',
            transition: 'all 0.2s',
            cursor: 'pointer',
            border: 'none',
        },
        primaryButton: {
            backgroundColor: '#4F46E5',
            color: '#ffffff',
        },
        secondaryButton: {
            backgroundColor: '#ffffff',
            border: '1px solid #E5E7EB',
            color: '#374151',
        },
        table: {
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: '0',
        },
        th: {
            textAlign: 'left',
            padding: '12px 16px',
            borderBottom: '1px solid #E5E7EB',
            color: '#6B7280',
            fontSize: '0.75rem',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
        },
        td: {
            padding: '16px',
            borderBottom: '1px solid #F3F4F6',
            fontSize: '0.875rem',
            color: '#111827',
        },
        statusBadge: (status) => {
            const colors = {
                'Pending': { bg: '#FEF3C7', text: '#92400E' },
                'In Progress': { bg: '#DBEAFE', text: '#1E40AF' },
                'Completed': { bg: '#D1FAE5', text: '#065F46' },
            };
            const style = colors[status] || { bg: '#F3F4F6', text: '#374151' };
            return {
                backgroundColor: style.bg,
                color: style.text,
                padding: '2px 10px',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '500',
            };
        },
        priorityBadge: (priority) => {
            const colors = {
                'Low': { bg: '#F3F4F6', text: '#374151' },
                'Medium': { bg: '#E0E7FF', text: '#3730A3' },
                'High': { bg: '#FEE2E2', text: '#991B1B' },
            };
            const style = colors[priority] || { bg: '#F3F4F6', text: '#374151' };
            return {
                backgroundColor: style.bg,
                color: style.text,
                padding: '2px 10px',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '500',
            };
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Project Requirements</h2>
                <div style={styles.actions}>
                    <a href={route('requirements.export', projectId)} target="_blank" style={{ ...styles.button, ...styles.secondaryButton, textDecoration: 'none', display: 'inline-block' }}>
                        Export
                    </a>
                    <button onClick={() => setShowImportModal(true)} style={{ ...styles.button, ...styles.secondaryButton }}>
                        Import
                    </button>
                    <button onClick={() => setShowCreateModal(true)} style={{ ...styles.button, ...styles.primaryButton }}>
                        + Add Requirement
                    </button>
                </div>
            </div>

            {requirements.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px', color: '#6B7280' }}>
                    No requirements found. Start by adding one!
                </div>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Title</th>
                                <th style={styles.th}>Priority</th>
                                <th style={styles.th}>Status</th>
                                <th style={styles.th}>Description</th>
                                <th style={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requirements.map((req) => (
                                <tr key={req.id}>
                                    <td style={styles.td}>
                                        <div style={{ fontWeight: '500' }}>{req.title}</div>
                                    </td>
                                    <td style={styles.td}>
                                        <span style={styles.priorityBadge(req.priority)}>{req.priority}</span>
                                    </td>
                                    <td style={styles.td}>
                                        <span style={styles.statusBadge(req.status)}>{req.status}</span>
                                    </td>
                                    <td style={styles.td} title={req.description}>
                                        {req.description ? (req.description.length > 50 ? req.description.substring(0, 50) + '...' : req.description) : '-'}
                                    </td>
                                    <td style={styles.td}>
                                        <button onClick={() => handleEdit(req)} style={{ color: '#4F46E5', marginRight: '12px', background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
                                        <button onClick={() => handleDelete(req.id)} style={{ color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer' }}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showCreateModal && (
                <CreateRequirementModal
                    show={showCreateModal}
                    onClose={closeCreateModal}
                    projectId={projectId}
                    requirement={editingRequirement}
                />
            )}

            {showImportModal && (
                <ImportRequirementsModal
                    show={showImportModal}
                    onClose={() => setShowImportModal(false)}
                    projectId={projectId}
                />
            )}
        </div>
    );
}
