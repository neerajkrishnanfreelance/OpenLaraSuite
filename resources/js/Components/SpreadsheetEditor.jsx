import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import Spreadsheet from "x-data-spreadsheet";
import 'x-data-spreadsheet/dist/xspreadsheet.css';

const SpreadsheetEditor = forwardRef(({ initialData, onChange, className = '', height = '600px' }, ref) => {
    const containerRef = useRef(null);
    const spreadsheetRef = useRef(null);
    const dataLoadedRef = useRef(false);

    useEffect(() => {
        if (containerRef.current && !spreadsheetRef.current) {
            const options = {
                mode: 'edit',
                showToolbar: true,
                showGrid: true,
                showContextmenu: true,
                view: {
                    height: () => containerRef.current ? containerRef.current.clientHeight : 600,
                    width: () => containerRef.current ? containerRef.current.clientWidth : 800,
                },
                row: {
                    len: 100,
                    height: 25,
                },
                col: {
                    len: 26,
                    width: 100,
                    indexWidth: 60,
                    minWidth: 60,
                },
            };

            spreadsheetRef.current = new Spreadsheet(containerRef.current, options)
                .change((data) => {
                    // This is called on every change
                    if (onChange) onChange(JSON.stringify(data));
                });

            if (initialData) {
                try {
                    const parsed = typeof initialData === 'string' ? JSON.parse(initialData) : initialData;
                    // x-data-spreadsheet expects an array of sheets if multiple, or just object?
                    // It usually works with the object structure it exports.
                    spreadsheetRef.current.loadData(parsed);
                } catch (e) {
                    console.error("Failed to load spreadsheet data", e);
                }
            } else {
                spreadsheetRef.current.loadData({});
            }
            dataLoadedRef.current = true;
        }
    }, []); // Run once on mount

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (spreadsheetRef.current) {
                // x-data-spreadsheet doesn't have a direct resize method document well, 
                // but re-invoking constructor or finding a resize method might be needed.
                // Actually it re-reads view.height/width on render.
                // We might need to force a re-render/resize of the canvas?
                // For now, let's just rely on initial size or reload if strictly needed.
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useImperativeHandle(ref, () => ({
        getData: () => {
            if (spreadsheetRef.current) {
                return JSON.stringify(spreadsheetRef.current.getData());
            }
            return null;
        }
    }));

    return (
        <div
            ref={containerRef}
            className={`w-full bg-white overflow-hidden ${className}`}
            style={{ height }}
        />
    );
});

export default SpreadsheetEditor;
