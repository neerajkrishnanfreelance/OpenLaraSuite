import React, { useRef } from 'react';
import { useForm } from '@inertiajs/react';

export default function ImportRequirementsModal({ show, onClose, projectId }) {
    const fileInput = useRef();
    const { data, setData, post, processing, errors, reset } = useForm({
        file: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('requirements.import', projectId), {
            onSuccess: () => {
                reset();
                onClose();
            },
            forceFormData: true,
        });
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
        error: {
            color: '#EF4444',
            fontSize: '0.75rem',
            marginTop: '0.25rem',
        },
        helpText: {
            fontSize: '0.75rem',
            color: '#6B7280',
            marginTop: '0.25rem',
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <h3 style={styles.title}>Import Requirements</h3>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem' }}>&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Select Excel File</label>
                        <input
                            type="file"
                            ref={fileInput}
                            onChange={e => setData('file', e.target.files[0])}
                            style={styles.input}
                            accept=".xlsx, .xls, .csv"
                        />
                        {errors.file && <div style={styles.error}>{errors.file}</div>}
                        <p style={styles.helpText}>Expected columns: Title, Priority, Status, Description</p>
                    </div>

                    <div style={styles.footer}>
                        <button type="button" onClick={onClose} style={{ ...styles.button, ...styles.cancelButton }}>
                            Cancel
                        </button>
                        <button type="submit" disabled={processing} style={{ ...styles.button, ...styles.submitButton, opacity: processing ? 0.7 : 1 }}>
                            {processing ? 'Importing...' : 'Import'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
