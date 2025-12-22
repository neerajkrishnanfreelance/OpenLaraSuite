import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from 'react';

const DrawingCanvas = forwardRef(({ width = 800, height = 500, initialImage = null, className = '' }, ref) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [context, setContext] = useState(null);

    useImperativeHandle(ref, () => ({
        getDataUrl: () => {
            return canvasRef.current.toDataURL('image/png');
        },
        clear: () => {
            const ctx = canvasRef.current.getContext('2d');
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            // Fill white background again
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
    }));

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';

        // Fill white background to ensure transparent isn't saved
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        setContext(ctx);

        if (initialImage) {
            const img = new Image();
            img.src = initialImage;
            img.onload = () => {
                ctx.drawImage(img, 0, 0);
            };
        }
    }, [initialImage]);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        context.beginPath();
        context.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        context.closePath();
        setIsDrawing(false);
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = nativeEvent;
        context.lineTo(offsetX, offsetY);
        context.stroke();
    };

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className={`border border-gray-300 shadow-sm cursor-crosshair touch-none ${className}`}
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            onMouseLeave={finishDrawing}
            // Basic touch support (can be improved)
            onTouchStart={(e) => {
                const touch = e.touches[0];
                const rect = e.target.getBoundingClientRect();
                const x = touch.clientX - rect.left;
                const y = touch.clientY - rect.top;
                context.beginPath();
                context.moveTo(x, y);
                setIsDrawing(true);
            }}
            onTouchMove={(e) => {
                if (!isDrawing) return;
                e.preventDefault(); // Prevent scrolling
                const touch = e.touches[0];
                const rect = e.target.getBoundingClientRect();
                const x = touch.clientX - rect.left;
                const y = touch.clientY - rect.top;
                context.lineTo(x, y);
                context.stroke();
            }}
            onTouchEnd={finishDrawing}
        />
    );
});

export default DrawingCanvas;
