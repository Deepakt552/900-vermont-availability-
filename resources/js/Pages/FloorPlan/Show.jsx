import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ModernFloorPlanViewer from '@/Components/FloorPlan/ModernFloorPlanViewer';

export default function Show({ auth, floor, units = [] }) {
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [filters, setFilters] = useState({
        priceRange: null,
        bedrooms: null,
        squareFootage: null
    });

    const handleUnitSelect = (unit) => {
        setSelectedUnit(unit);
        console.log('Selected unit:', unit);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const clearFilters = () => {
        setFilters({
            priceRange: null,
            bedrooms: null,
            squareFootage: null
        });
    };

    // Prepare floor data with units
    const floorData = {
        ...floor,
        units: units
    };

    const availableUnits = Array.isArray(units) ? units.filter(unit => unit.status === 'available') : [];
    const priceRange = availableUnits.length > 0 ? {
        min: Math.min(...availableUnits.map(u => u.price || 0)),
        max: Math.max(...availableUnits.map(u => u.price || 0))
    } : { min: 0, max: 0 };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Floor {floor.floor_number} - Interactive Floor Plan
                    </h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-medium">
                            {availableUnits.length} Available
                        </span>
                        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full font-medium">
                            {units.length} Total Units
                        </span>
                        {priceRange.min > 0 && (
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                                ${priceRange.min.toLocaleString()} - ${priceRange.max.toLocaleString()}
                            </span>
                        )}
                    </div>
                </div>
            }
        >
            <Head title={`Floor ${floor.floor_number} - Floor Plan`} />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Filters Section */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Filter Units</h3>
                            {(filters.priceRange || filters.bedrooms || filters.squareFootage) && (
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-gray-500 hover:text-gray-700 underline"
                                >
                                    Clear all filters
                                </button>
                            )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Price Range Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Price Range
                                </label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                        value={filters.priceRange?.[0] || ''}
                                        onChange={(e) => setFilters(prev => ({
                                            ...prev,
                                            priceRange: [parseInt(e.target.value) || 0, prev.priceRange?.[1] || priceRange.max]
                                        }))}
                                    />
                                    <span className="text-gray-500">-</span>
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                        value={filters.priceRange?.[1] || ''}
                                        onChange={(e) => setFilters(prev => ({
                                            ...prev,
                                            priceRange: [prev.priceRange?.[0] || priceRange.min, parseInt(e.target.value) || priceRange.max]
                                        }))}
                                    />
                                </div>
                            </div>

                            {/* Bedrooms Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Bedrooms
                                </label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                    value={filters.bedrooms || ''}
                                    onChange={(e) => setFilters(prev => ({
                                        ...prev,
                                        bedrooms: e.target.value || null
                                    }))}
                                >
                                    <option value="">Any</option>
                                    <option value="0">Studio</option>
                                    <option value="1">1 Bedroom</option>
                                    <option value="2">2 Bedrooms</option>
                                    <option value="3">3+ Bedrooms</option>
                                </select>
                            </div>

                            {/* Square Footage Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Square Footage
                                </label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                        value={filters.squareFootage?.[0] || ''}
                                        onChange={(e) => setFilters(prev => ({
                                            ...prev,
                                            squareFootage: [parseInt(e.target.value) || 0, prev.squareFootage?.[1] || 2000]
                                        }))}
                                    />
                                    <span className="text-gray-500">-</span>
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                        value={filters.squareFootage?.[1] || ''}
                                        onChange={(e) => setFilters(prev => ({
                                            ...prev,
                                            squareFootage: [prev.squareFootage?.[0] || 0, parseInt(e.target.value) || 2000]
                                        }))}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floor Plan Viewer */}
                    <ModernFloorPlanViewer
                        floor={floorData}
                        onUnitSelect={handleUnitSelect}
                        filters={filters}
                    />

                    {/* Unit Statistics */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center mr-3">
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{availableUnits.length}</p>
                                    <p className="text-sm text-gray-600">Available Units</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center mr-3">
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-2 0H7m5 0v-5a2 2 0 00-2-2H8a2 2 0 00-2 2v5m6 0V9a2 2 0 00-2-2H8a2 2 0 00-2 2v8" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{units.length - availableUnits.length}</p>
                                    <p className="text-sm text-gray-600">Occupied Units</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        ${priceRange.min > 0 ? priceRange.min.toLocaleString() : '0'}
                                    </p>
                                    <p className="text-sm text-gray-600">Starting Price</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {Math.round((availableUnits.length / units.length) * 100)}%
                                    </p>
                                    <p className="text-sm text-gray-600">Availability Rate</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}