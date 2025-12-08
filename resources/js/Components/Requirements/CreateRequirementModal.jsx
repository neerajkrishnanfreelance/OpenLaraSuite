import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function CreateRequirementModal({ show, onClose, projectId, requirement = null }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        project_id: projectId,
        title: '',
        description: '',
        priority: 'Medium',
        status: 'Pending',
    });

    useEffect(() => {
        if (requirement) {
            setData({
                project_id: projectId,
                title: requirement.title,
                description: requirement.description || '',
                priority: requirement.priority,
                status: requirement.status,
            });
        } else {
            reset();
            setData('project_id', projectId);
        }
    }, [requirement, show]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (requirement) {
            put(route('requirements.update', requirement.id), {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        } else {
            post(route('requirements.store'), {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        }
    };

    if (!show) return null;

    const styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
        },
        modal: {
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            width: '100%',
            maxWidth: '500px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
        },
        title: {
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#111827',
        },
        formGroup: {
            marginBottom: '1rem',
        },
        label: {
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '0.25rem',
        },
        input: {
            width: '100%',
            padding: '0.5rem',
            borderRadius: '0.375rem',
            border: '1px solid #D1D5DB',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        },
        select: {
            width: '100%',
            padding: '0.5rem',
            borderRadius: '0.375rem',
            border: '1px solid #D1D5DB',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            backgroundColor: 'white',
        },
        textarea: {
            width: '100%',
            padding: '0.5rem',
            borderRadius: '0.375rem',
            border: '1px solid #D1D5DB',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            minHeight: '100px',
        },
        error: {
            color: '#EF4444',
            fontSize: '0.75rem',
            marginTop: '0.25rem',
        },
        footer: {
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.5rem',
            marginTop: '1.5rem',
        },
        button: {
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            fontWeight: '500',
            fontSize: '0.875rem',
            cursor: 'pointer',
            border: 'none',
        },
        cancelButton: {
            backgroundColor: 'white',
            border: '1px solid #D1D5DB',
            color: '#374151',
        },
        submitButton: {
            backgroundColor: '#4F46E5',
            color: 'white',
        },
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <h3 style={styles.title}>{requirement ? 'Edit Requirement' : 'New Requirement'}</h3>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem' }}>&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            style={styles.input}
                            required
                        />
                        {errors.title && <div style={styles.error}>{errors.title}</div>}
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Priority</label>
                        <select
                            value={data.priority}
                            onChange={e => setData('priority', e.target.value)}
                            style={styles.select}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                        {errors.priority && <div style={styles.error}>{errors.priority}</div>}
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Status</label>
                        <select
                            value={data.status}
                            onChange={e => setData('status', e.target.value)}
                            style={styles.select}
                        >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                        {errors.status && <div style={styles.error}>{errors.status}</div>}
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Description</label>
                        <textarea
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            style={styles.textarea}
                        />
                        {errors.description && <div style={styles.error}>{errors.description}</div>}
                    </div>

                    <div style={styles.footer}>
                        <button type="button" onClick={onClose} style={{ ...styles.button, ...styles.cancelButton }}>
                            Cancel
                        </button>
                        <button type="submit" disabled={processing} style={{ ...styles.button, ...styles.submitButton, opacity: processing ? 0.7 : 1 }}>
                            {processing ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
