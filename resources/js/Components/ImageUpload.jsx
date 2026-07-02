import React, { useState, useRef } from 'react';
import { router } from '@inertiajs/react';
import toast from 'react-hot-toast';

export default function ImageUpload({ unit, onImagesUpdated }) {
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);

    const handleFiles = (files) => {
        if (files.length === 0) return;

        const formData = new FormData();
        Array.from(files).forEach((file, index) => {
            formData.append(`images[${index}]`, file);
        });
        formData.append('unit_id', unit.id);

        setUploading(true);
        const loadingToast = toast.loading(`Uploading ${files.length} image${files.length > 1 ? 's' : ''}...`);

        router.post('/admin/units/upload-images', formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: (response) => {
                toast.dismiss(loadingToast);
                toast.success(`Successfully uploaded ${files.length} image${files.length > 1 ? 's' : ''}!`, {
                    duration: 3000,
                    icon: '📸',
                });
                if (onImagesUpdated) {
                    onImagesUpdated();
                }
            },
            onError: (errors) => {
                toast.dismiss(loadingToast);
                toast.error('Failed to upload images. Please try again.', {
                    duration: 4000,
                    icon: '❌',
                });
                console.error('Upload errors:', errors);
            },
            onFinish: () => {
                setUploading(false);
            }
        });
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files);
        }
    };

    const removeImage = (imageIndex) => {
        const loadingToast = toast.loading('Removing image...');
        
        router.delete(`/admin/units/${unit.id}/images/${imageIndex}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.dismiss(loadingToast);
                toast.success('Image removed successfully!', {
                    duration: 3000,
                    icon: '🗑️',
                });
                if (onImagesUpdated) {
                    onImagesUpdated();
                }
            },
            onError: () => {
                toast.dismiss(loadingToast);
                toast.error('Failed to remove image. Please try again.', {
                    duration: 4000,
                    icon: '❌',
                });
            }
        });
    };

    return (
        <div className="space-y-4">
            {/* Upload Area */}
            <div
                className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 ${
                    dragActive
                        ? 'border-blue-500 bg-blue-50'
                        : uploading
                        ? 'border-gray-300 bg-gray-50'
                        : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={uploading}
                />

                {uploading ? (
                    <div className="flex flex-col items-center">
                        <svg className="animate-spin h-8 w-8 text-blue-500 mb-2" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="text-sm text-gray-600">Uploading images...</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <svg className="h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Unit Images</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Drag and drop images here, or click to select files
                        </p>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium"
                        >
                            Choose Images
                        </button>
                        <p className="text-xs text-gray-500 mt-2">
                            Supports: JPG, PNG, GIF (Max 10MB each)
                        </p>
                    </div>
                )}
            </div>

            {/* Current Images */}
            {unit.images && unit.images.length > 0 && (
                <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">
                        Current Images ({unit.images.length})
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {unit.images.map((image, index) => (
                            <div key={index} className="relative group">
                                <img
                                    src={image}
                                    alt={`Unit ${unit.unit_number} - Image ${index + 1}`}
                                    className="w-full h-24 object-cover rounded-lg border border-gray-200"
                                    onError={(e) => {
                                        e.target.src = '/images/placeholder-unit.svg';
                                    }}
                                />
                                <button
                                    onClick={() => removeImage(index)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                    title="Remove image"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}