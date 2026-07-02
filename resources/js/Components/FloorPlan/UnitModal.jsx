import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';

export default function UnitModal({ unit, onClose }) {
    const [activeTab, setActiveTab] = useState('details');
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    return (
        <Dialog open={true} onClose={onClose} className="relative z-50">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
            
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="mx-auto max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all animate-in slide-in-from-bottom-4 duration-300">
                    {/* Header - Compact and Modern */}
                    <div className="relative bg-gradient-to-r from-emerald-50 via-white to-emerald-50 p-5">
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-sm hover:shadow-md"
                        >
                            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="flex items-center space-x-4 pr-10">
                            <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-lg font-bold">{unit.unit_number}</span>
                            </div>
                            <div className="flex-1">
                                <Dialog.Title className="text-xl font-bold text-gray-900 mb-1">
                                    APT {unit.unit_number}
                                </Dialog.Title>
                                <div className="flex flex-wrap items-center gap-2 text-sm">
                                    <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md font-medium">{unit.unit_type?.name}</span>
                                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md">{unit.unit_type?.bedrooms}BR/{unit.unit_type?.bathrooms}BA</span>
                                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md">{unit.unit_type?.area_sqft} sq ft</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">
                                    ${unit.price?.toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-500">per month</div>
                            </div>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 shadow-sm">
                                ✓ Available Now
                            </span>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-gray-200 bg-gray-50">
                        <nav className="flex px-5">
                            {[
                                { id: 'details', label: 'Details', icon: '📋' },
                                { id: 'images', label: 'Images', icon: '📸' },
                                { id: 'amenities', label: 'Amenities', icon: '✨' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-2 py-3 px-4 border-b-2 font-medium text-sm transition-all ${
                                        activeTab === tab.id
                                            ? 'border-emerald-500 text-emerald-600 bg-white'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-white/50'
                                    }`}
                                >
                                    <span>{tab.icon}</span>
                                    <span>{tab.label}</span>
                                    {tab.id === 'images' && unit.images && unit.images.length > 0 && (
                                        <span className="ml-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                                            {unit.images.length}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Content */}
                    <div className="p-5 max-h-96 overflow-y-auto">
                        {activeTab === 'details' && (
                            <div className="space-y-5">
                                {/* Unit Details - Compact Grid */}
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { label: 'Unit Type', value: unit.unit_type?.name, icon: '🏠' },
                                        { label: 'Bedrooms', value: unit.unit_type?.bedrooms, icon: '🛏️' },
                                        { label: 'Bathrooms', value: unit.unit_type?.bathrooms, icon: '🚿' },
                                        { label: 'Square Feet', value: `${unit.unit_type?.area_sqft}`, icon: '📐' },
                                        { label: 'Monthly Rent', value: `$${unit.price?.toLocaleString()}`, icon: '💰' },
                                        { label: 'Available', value: unit.available_date ? new Date(unit.available_date).toLocaleDateString() : 'Now', icon: '📅' }
                                    ].map((item, index) => (
                                        <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3 text-center hover:shadow-sm transition-shadow">
                                            <div className="text-lg mb-1">{item.icon}</div>
                                            <div className="text-xs text-gray-500 mb-1 font-medium">{item.label}</div>
                                            <div className="font-bold text-gray-900 text-sm">{item.value}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Building Info - Compact */}
                                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-4 border border-emerald-100">
                                    <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                                        <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mr-2">
                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-2 0H7m5 0v-5a2 2 0 00-2-2H8a2 2 0 00-2 2v5m6 0V9a2 2 0 00-2-2H8a2 2 0 00-2 2v8" />
                                            </svg>
                                        </div>
                                        Building Information
                                    </h3>
                                    <div className="grid grid-cols-1 gap-2 text-sm">
                                        <div className="flex items-center text-gray-700">
                                            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                                            📍 James M Wood Boulevard
                                        </div>
                                        <div className="flex items-center text-gray-700">
                                            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                                            🏢 Floor {unit.floor?.floor_number}
                                        </div>
                                        <div className="flex items-center text-gray-700">
                                            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                                            🕐 24/7 Concierge Service
                                        </div>
                                        <div className="flex items-center text-gray-700">
                                            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                                            ⭐ Premium Amenities
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'images' && (
                            <div className="space-y-4">
                                <h3 className="font-bold text-gray-900 flex items-center">
                                    <span className="mr-2">📸</span>
                                    Unit Images
                                </h3>
                                
                                {unit.images && unit.images.length > 0 ? (
                                    <div className="space-y-4">
                                        {/* Main Image Display */}
                                        <div className="relative">
                                            <img
                                                src={unit.images[selectedImageIndex]}
                                                alt={`Unit ${unit.unit_number} - Image ${selectedImageIndex + 1}`}
                                                className="w-full h-64 object-cover rounded-xl shadow-lg"
                                                onError={(e) => {
                                                    e.target.src = '/images/placeholder-unit.svg';
                                                    e.target.alt = 'Image not available';
                                                }}
                                            />
                                            
                                            {/* Image Navigation Arrows */}
                                            {unit.images.length > 1 && (
                                                <>
                                                    <button
                                                        onClick={() => setSelectedImageIndex(
                                                            selectedImageIndex === 0 ? unit.images.length - 1 : selectedImageIndex - 1
                                                        )}
                                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => setSelectedImageIndex(
                                                            selectedImageIndex === unit.images.length - 1 ? 0 : selectedImageIndex + 1
                                                        )}
                                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </button>
                                                </>
                                            )}
                                            
                                            {/* Image Counter */}
                                            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                {selectedImageIndex + 1} / {unit.images.length}
                                            </div>
                                        </div>

                                        {/* Thumbnail Strip */}
                                        {unit.images.length > 1 && (
                                            <div className="flex space-x-2 overflow-x-auto pb-2">
                                                {unit.images.map((image, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => setSelectedImageIndex(index)}
                                                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                                                            selectedImageIndex === index
                                                                ? 'border-emerald-500 ring-2 ring-emerald-200'
                                                                : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                    >
                                                        <img
                                                            src={image}
                                                            alt={`Thumbnail ${index + 1}`}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                e.target.src = '/images/placeholder-unit.jpg';
                                                            }}
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        {/* Image Info */}
                                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <span className="text-sm font-medium text-blue-700">
                                                        {unit.images.length} {unit.images.length === 1 ? 'Image' : 'Images'} Available
                                                    </span>
                                                </div>
                                                <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                                                    View Full Size
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="text-gray-400 mb-4">
                                            <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                                            No Images Available
                                        </h3>
                                        <p className="text-gray-500 text-sm">
                                            Images for this unit haven't been uploaded yet.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'amenities' && (
                            <div className="space-y-4">
                                <h3 className="font-bold text-gray-900 flex items-center">
                                    <span className="mr-2">✨</span>
                                    Unit Amenities
                                </h3>
                                <div className="grid grid-cols-1 gap-3">
                                    {unit.unit_type?.amenities?.map((amenity, index) => (
                                        <div key={index} className="flex items-center p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-100 hover:shadow-sm transition-all">
                                            <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mr-3 shadow-sm">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-800 font-medium">{amenity}</span>
                                        </div>
                                    )) || (
                                        <div className="text-center py-8 text-gray-500">
                                            <div className="text-4xl mb-2">🏠</div>
                                            <p>No amenities listed for this unit type</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                   
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}