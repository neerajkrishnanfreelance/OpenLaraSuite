import React, { useRef, useEffect, forwardRef, useImperativeHandle, useState } from 'react';
import * as fabric from 'fabric';

const FabricCanvas = forwardRef(({ width = 800, height = 600, className = '', readOnly = false, onChange }, ref) => {
    const canvasRef = useRef(null);
    const fabricRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Initialize Fabric Canvas
    // Initialize Fabric Canvas
    useEffect(() => {
        if (!canvasRef.current) return;

        // Dispose previous instance if exists
        if (fabricRef.current) {
            fabricRef.current.dispose();
        }

        const canvas = new fabric.Canvas(canvasRef.current, {
            width: width,
            height: height,
            backgroundColor: 'white',
            isDrawingMode: !readOnly,
            selection: !readOnly,
        });

        // Set initial brush
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.freeDrawingBrush.width = 2;
        canvas.freeDrawingBrush.color = 'black';

        // Attach Event Listeners for Change Detection
        const handleChange = () => {
            if (onChange) onChange();
        };

        canvas.on('object:modified', handleChange);
        canvas.on('object:added', handleChange);
        canvas.on('object:removed', handleChange);
        canvas.on('path:created', handleChange);

        fabricRef.current = canvas;
        setIsLoaded(true);

        return () => {
            if (fabricRef.current) {
                // Remove listeners? Fabric dispose should handle it
                fabricRef.current.dispose();
                fabricRef.current = null;
            }
        };
    }, []);

    // Handle Resize (basic)
    useEffect(() => {
        if (fabricRef.current) {
            fabricRef.current.setDimensions({ width, height });
        }
    }, [width, height]);

    // Handle ReadOnly Toggle
    useEffect(() => {
        if (fabricRef.current) {
            fabricRef.current.isDrawingMode = !readOnly;
            fabricRef.current.selection = !readOnly;
            fabricRef.current.forEachObject(o => {
                o.selectable = !readOnly;
                o.evented = !readOnly;
            });
            fabricRef.current.requestRenderAll();
        }
    }, [readOnly]);

    useImperativeHandle(ref, () => ({
        // Data Management
        toJSON: () => {
            return fabricRef.current ? fabricRef.current.toJSON() : null;
        },
        loadFromJSON: (json, callback) => {
            if (!fabricRef.current || !json) {
                if (callback) callback();
                return;
            }
            fabricRef.current.loadFromJSON(json).then((canvas) => {
                fabricRef.current.requestRenderAll();
                // If readOnly, ensure loaded objects are locked
                if (readOnly) {
                    fabricRef.current.forEachObject(o => {
                        o.selectable = false;
                        o.evented = false;
                    });
                }
                if (callback) callback();
            });
        },
        toDataURL: (options) => {
            return fabricRef.current ? fabricRef.current.toDataURL(options || { format: 'png', quality: 1 }) : '';
        },
        clear: () => {
            if (fabricRef.current) {
                fabricRef.current.clear();
                fabricRef.current.backgroundColor = 'white';
                fabricRef.current.requestRenderAll();
            }
        },

        // Tools
        setDrawingMode: (isDrawing) => {
            if (fabricRef.current) {
                fabricRef.current.isDrawingMode = isDrawing;
            }
        },
        setBrushColor: (color) => {
            if (fabricRef.current) {
                fabricRef.current.freeDrawingBrush.color = color;
            }
        },
        setBrushWidth: (width) => {
            if (fabricRef.current) {
                fabricRef.current.freeDrawingBrush.width = parseInt(width, 10);
            }
        },
        setEraserMode: (enabled) => {
            if (fabricRef.current) {
                if (enabled) {
                    // Fabric.js Eraser Brush (requires specific handling in older versions or just white brush)
                    // For modern fabric, we could use EraserBrush if available, but standard practice for simple
                    // whiteboards is often just white color if background is white.
                    // However, 'destination-out' is better as it makes it transparent.
                    // Let's try attempting to set color to white first as it's safest for now without complex mixins.
                    // Actually, let's use globalCompositeOperation if possible, but Fabric brush color doesn't support that easily.
                    // We will use WHITE for now as canvas background is white.
                    fabricRef.current.freeDrawingBrush = new fabric.PencilBrush(fabricRef.current);
                    fabricRef.current.freeDrawingBrush.color = 'white';
                    fabricRef.current.freeDrawingBrush.width = 20; // Default eraser size
                } else {
                    // Restore pencil
                    fabricRef.current.freeDrawingBrush = new fabric.PencilBrush(fabricRef.current);
                    fabricRef.current.freeDrawingBrush.color = 'black'; // Should receive color from parent actually
                    fabricRef.current.freeDrawingBrush.width = 2; // Should receive width from parent
                }
            }
        },
        addShape: (type, options = {}) => {
            if (!fabricRef.current) return;

            let shape;
            const center = fabricRef.current.getCenter();
            const defaultOpts = {
                left: center.left,
                top: center.top,
                originX: 'center',
                originY: 'center',
                fill: 'transparent',
                stroke: 'black',
                strokeWidth: 2,
                ...options
            };

            if (type === 'rect') {
                shape = new fabric.Rect({ width: 100, height: 100, ...defaultOpts });
            } else if (type === 'circle') {
                shape = new fabric.Circle({ radius: 50, ...defaultOpts });
            } else if (type === 'triangle') {
                shape = new fabric.Triangle({ width: 100, height: 100, ...defaultOpts });
            } else if (type === 'line') {
                shape = new fabric.Line([50, 100, 200, 200], { ...defaultOpts });
            } else if (type === 'text') {
                shape = new fabric.IText('Double click to edit', {
                    ...defaultOpts,
                    fill: 'black',
                    strokeWidth: 0,
                    fontSize: 20
                });
            }

            if (shape) {
                fabricRef.current.isDrawingMode = false; // Auto-switch to selection to manipulate shape
                fabricRef.current.add(shape);
                fabricRef.current.setActiveObject(shape);
                fabricRef.current.requestRenderAll();
            }
        },
        deleteSelected: () => {
            if (fabricRef.current) {
                const activeObjects = fabricRef.current.getActiveObjects();
                if (activeObjects.length) {
                    fabricRef.current.discardActiveObject();
                    activeObjects.forEach(obj => {
                        fabricRef.current.remove(obj);
                    });
                }
            }
        }
    }));

    return (
        <div className={`border border-gray-300 shadow-sm bg-white ${className}`}>
            <canvas ref={canvasRef} />
        </div>
    );
});

export default FabricCanvas;
