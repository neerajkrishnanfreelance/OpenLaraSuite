import React, { useState, useRef, useEffect } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    )
}

export default function ImageCropper({ onCropComplete, onCancel }) {
    const [imgSrc, setImgSrc] = useState('');
    const [crop, setCrop] = useState();
    const [completedCrop, setCompletedCrop] = useState();
    const imgRef = useRef(null);
    const hiddenFileInput = useRef(null);

    function onSelectFile(e) {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined); // Makes crop preview update between images.
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                setImgSrc(reader.result?.toString() || ''),
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    function onImageLoad(e) {
        const { width, height } = e.currentTarget;
        setCrop(centerAspectCrop(width, height, 16 / 9)); // Default aspect 16:9
    }

    async function onDownloadCropClick() {
        const image = imgRef.current;
        const previewCanvas = document.createElement('canvas');

        if (!image || !completedCrop) {
            return;
        }

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        const ctx = previewCanvas.getContext('2d');
        const pixelRatio = window.devicePixelRatio;

        previewCanvas.width = completedCrop.width * pixelRatio * scaleX;
        previewCanvas.height = completedCrop.height * pixelRatio * scaleY;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            completedCrop.x * scaleX,
            completedCrop.y * scaleY,
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
            0,
            0,
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
        );

        previewCanvas.toBlob((blob) => {
            if (!blob) {
                console.error('Canvas is empty');
                return;
            }
            const previewUrl = window.URL.createObjectURL(blob);
            onCropComplete(previewUrl, blob);
        }, 'image/jpeg');
    }

    return (
        <div className="p-4 bg-gray-50 rounded-lg border">
            <div className="mb-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={onSelectFile}
                    ref={hiddenFileInput}
                    className="hidden"
                />
                <SecondaryButton disabled={false} onClick={() => hiddenFileInput.current.click()}>
                    Upload Image
                </SecondaryButton>
            </div>

            {imgSrc && (
                <div className="flex flex-col items-center">
                    <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={undefined} // Allow free cropping, or set aspect={16/9}
                    >
                        <img
                            ref={imgRef}
                            alt="Crop me"
                            src={imgSrc}
                            style={{ transform: `scale(1) rotate(0deg)` }}
                            onLoad={onImageLoad}
                            className="max-h-[500px]"
                        />
                    </ReactCrop>

                    <div className="mt-4 flex gap-2">
                        <PrimaryButton onClick={onDownloadCropClick} disabled={!completedCrop?.width || !completedCrop?.height}>
                            Crop & Save
                        </PrimaryButton>
                        <SecondaryButton onClick={onCancel}>
                            Cancel
                        </SecondaryButton>
                    </div>
                </div>
            )}
        </div>
    );
}
