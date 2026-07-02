import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import DynamicFloorPlan from '@/Components/FloorPlan/DynamicFloorPlan';

export default function Dynamic() {
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [filters, setFilters] = useState({
        priceRange: [0, 5000],
        moveInDate: '',
        bedrooms: '',
        squareFootage: [0, 2000]
    });

    const handleUnitSelect = (unit) => {
        setSelectedUnit(unit);
    };

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const resetFilters = () => {
        setFilters({
            priceRange: [0, 5000],
            moveInDate: '',
            bedrooms: '',
            squareFootage: [0, 2000]
        });
    };

    return (
        <>
            <Head title="Interactive Floor Plan - The 900 Apartments" />
            
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center font-bold text-lg">
                                    900
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">The 900 Apartments</h1>
                                    <p className="text-sm text-gray-500">Interactive Floor Plan - James M Wood Boulevard</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                                <button 
                                    onClick={resetFilters}
                                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                                >
                                    Reset Filters
                                </button>
                                <button className="px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
                                    Schedule Tour
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto">
                    <div className="lg:flex">
                        {/* Filters Sidebar */}
                        <div className="lg:w-80 xl:w-96 bg-white border-r border-gray-200">
                            <div className="p-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-6">Filter Units</h2>
                                
                                {/* Price Range Filter */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Monthly Rent
                                    </label>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-sm text-gray-600">
                                            <span>${filters.priceRange[0].toLocaleString()}</span>
                                            <span>${filters.priceRange[1].toLocaleString()}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="1000"
                                            max="5000"
                                            step="100"
                                            value={filters.priceRange[1]}
                                            onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                        />
                                        <div className="flex space-x-2">
                                            <input
                                                type="number"
                                                placeholder="Min"
                                                value={filters.priceRange[0]}
                                                onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value) || 0, filters.priceRange[1]])}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                            />
                                            <input
                                                type="number"
                                                placeholder="Max"
                                                value={filters.priceRange[1]}
                                                onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value) || 5000])}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Bedrooms Filter */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Bedrooms
                                    </label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {['', '0', '1', '2'].map((bedroom) => (
                                            <button
                                                key={bedroom}
                                                onClick={() => handleFilterChange('bedrooms', bedroom)}
                                                className={`px-3 py-2 text-sm font-medium rounded-lg border transition-all ${
                                                    filters.bedrooms === bedroom
                                                        ? 'bg-emerald-600 text-white border-emerald-600'
                                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                }`}
                                            >
                                                {bedroom === '' ? 'Any' : bedroom === '0' ? 'Studio' : `${bedroom}BR`}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Square Footage Filter */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Square Footage
                                    </label>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-sm text-gray-600">
                                            <span>{filters.squareFootage[0]} sq ft</span>
                                            <span>{filters.squareFootage[1]} sq ft</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="400"
                                            max="1500"
                                            step="50"
                                            value={filters.squareFootage[1]}
                                            onChange={(e) => handleFilterChange('squareFootage', [filters.squareFootage[0], parseInt(e.target.value)])}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                        />
                                    </div>
                                </div>

                                {/* Move-in Date Filter */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Move-in Date
                                    </label>
                                    <input
                                        type="date"
                                        value={filters.moveInDate}
                                        onChange={(e) => handleFilterChange('moveInDate', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>

                                {/* Quick Stats */}
                                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-4 border border-emerald-100">
                                    <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                                        <span className="mr-2">📊</span>
                                        Quick Stats
                                    </h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Total Units:</span>
                                            <span className="font-semibold text-gray-900">39</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Available:</span>
                                            <span className="font-semibold text-emerald-600">~27</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Price Range:</span>
                                            <span className="font-semibold text-gray-900">$1,800 - $3,600</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Floor Plan Area */}
                        <div className="flex-1">
                            <DynamicFloorPlan
                                onUnitSelect={handleUnitSelect}
                                filters={filters}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .slider::-webkit-slider-thumb {
                    appearance: none;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #10B981;
                    cursor: pointer;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                }

                .slider::-moz-range-thumb {
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #10B981;
                    cursor: pointer;
                    border: none;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                }
            `}</style>
        </>
    );
}