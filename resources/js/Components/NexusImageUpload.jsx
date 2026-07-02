import React, { useState, useRef } from 'react';
import { router } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { UploadCloud, Trash2, CheckCircle, XCircle } from 'lucide-react';

export default function NexusImageUpload({ unit, onImagesUpdated }) {
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

        router.post('/admin/nexus-units/upload-images', formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: (response) => {
                toast.dismiss(loadingToast);
                toast.success(`Successfully uploaded ${files.length} image${files.length > 1 ? 's' : ''}!`, {
                    duration: 3000,
                    icon: <CheckCircle className="w-5 h-5 text-emerald-500" />,
                });
                if (onImagesUpdated) {
                    onImagesUpdated();
                }
            },
            onError: (errors) => {
                toast.dismiss(loadingToast);
                toast.error('Failed to upload images. Please try again.', {
                    duration: 4000,
                    icon: <XCircle className="w-5 h-5 text-red-500" />,
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
        
        router.delete(`/admin/nexus-units/${unit.id}/images/${imageIndex}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.dismiss(loadingToast);
                toast.success('Image removed successfully!', {
                    duration: 3000,
                    icon: <CheckCircle className="w-5 h-5 text-emerald-500" />,
                });
                if (onImagesUpdated) {
                    onImagesUpdated();
                }
            },
            onError: () => {
                toast.dismiss(loadingToast);
                toast.error('Failed to remove image. Please try again.', {
                    duration: 4000,
                    icon: <XCircle className="w-5 h-5 text-red-500" />,
                });
            }
        });
    };

    return (
        <div className="space-y-6">
            {/* Drag & Drop Area */}
            <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                    dragActive
                        ? 'border-black bg-gray-50'
                        : 'border-gray-300 hover:border-gray-400 bg-gray-50/50'
                }`}
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
                
                <div className="flex flex-col items-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                        <UploadCloud className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-700">
                            {uploading ? 'Uploading images...' : 'Click to upload or drag & drop'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG, JPEG, GIF up to 10MB per image
                        </p>
                    </div>
                </div>
            </div>

            {/* Images Grid */}
            {unit.images && unit.images.length > 0 ? (
                <div className="space-y-3">
                    <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Current Images</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {unit.images.map((imgUrl, idx) => (
                            <div key={idx} className="relative group aspect-[4/3] rounded-lg overflow-hidden border border-gray-200">
                                <img
                                    src={imgUrl}
                                    alt={`Unit image ${idx + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeImage(idx);
                                        }}
                                        className="w-8 h-8 rounded-full bg-red-650 hover:bg-red-700 text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-150"
                                        title="Remove Image"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center py-6 text-gray-500 text-sm">
                    No images uploaded yet.
                </div>
            )}
        </div>
    );
}
