import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Download, FileText } from 'lucide-react';

const DocumentEditor = forwardRef(({ initialData, onChange, className = '', height = '600px' }, ref) => {
    const quillRef = useRef(null);
    const [content, setContent] = useState(initialData || '');

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }, { 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'align': [] }],
            ['blockquote', 'code-block'],
            ['link', 'image', 'video'],
            ['clean']
        ],
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike',
        'color', 'background',
        'script',
        'list', 'bullet', 'check', 'indent',
        'align',
        'blockquote', 'code-block',
        'link', 'image', 'video'
    ];

    const handleChange = (value) => {
        setContent(value);
        if (onChange) onChange(value);
    };

    useImperativeHandle(ref, () => ({
        getContent: () => content,
        downloadHTML: () => {
            const blob = new Blob([content], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `document-${Date.now()}.html`;
            a.click();
            URL.revokeObjectURL(url);
        },
        downloadText: () => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = content;
            const text = tempDiv.textContent || tempDiv.innerText || '';
            const blob = new Blob([text], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `document-${Date.now()}.txt`;
            a.click();
            URL.revokeObjectURL(url);
        }
    }));

    return (
        <div className={`relative ${className}`} style={{ height }}>
            <ReactQuill
                ref={quillRef}
                theme="snow"
                value={content}
                onChange={handleChange}
                modules={modules}
                formats={formats}
                style={{ height: `calc(${height} - 42px)` }}
                className="bg-white"
            />
        </div>
    );
});

export default DocumentEditor;
