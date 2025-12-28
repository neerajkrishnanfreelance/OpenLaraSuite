import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ImageCropper from '@/Components/ImageCropper';
import { useState } from 'react';
import DangerButton from '@/Components/DangerButton';

export default function ImageCropperDemo({ auth }) {
    const [croppedImage, setCroppedImage] = useState(null);

    const handleCropComplete = (url, blob) => {
        setCroppedImage(url);
    };

    const handleClear = () => {
        setCroppedImage(null);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Image Cropper Demo</h2>}
        >
            <Head title="Image Cropper" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Upload and Crop Image</h3>

                            {!croppedImage ? (
                                <ImageCropper
                                    onCropComplete={handleCropComplete}
                                    onCancel={() => console.log('Cancelled')}
                                />
                            ) : (
                                <div className="mt-6">
                                    <h4 className="text-md font-medium text-gray-900 mb-2">Cropped Result:</h4>
                                    <div className="border p-2 inline-block rounded">
                                        <img src={croppedImage} alt="Cropped Result" className="max-h-[400px]" />
                                    </div>
                                    <div className="mt-4">
                                        <DangerButton onClick={handleClear}>
                                            Delete / Reset
                                        </DangerButton>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
