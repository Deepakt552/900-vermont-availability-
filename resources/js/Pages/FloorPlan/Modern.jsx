import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import InteractiveFloorPlan from '@/Components/InteractiveFloorPlan';

export default function Modern({ units = [] }) {
    const [selectedFloor, setSelectedFloor] = useState(2);
    
    // Available floors
    const floors = [2, 3, 4, 5, 6];
    return (
        <GuestLayout>
            <Head title="Modern Floor Plan - The 900 Apartments" />
            
            <div className="min-h-screen bg-gray-50">
               

                {/* Main Content */}
                <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Interactive Floor Plan</h2>
                            <p className="text-gray-600">Click on any green unit to view details. Select a floor to explore.</p>
                        </div>
                        
                        {/* Floor Selector */}
                        <div className="mt-4 sm:mt-0">
                            <div className="flex space-x-2">
                                {floors.map((floor) => (
                                    <button
                                        key={floor}
                                        onClick={() => setSelectedFloor(floor)}
                                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                                            selectedFloor === floor
                                                ? 'bg-black text-white shadow-lg'
                                                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        Floor {floor}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Current Floor Info */}
                    <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Floor {selectedFloor}</h3>
                                <p className="text-sm text-gray-600">
                                    Units {selectedFloor}01 - {selectedFloor}39 • 
                                    <span className="ml-1 font-medium text-green-600">
                                        {units.filter(u => u.unit_number && u.unit_number.startsWith(selectedFloor.toString()) && u.status === 'available').length} Available
                                    </span>
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-gray-500">Total Units on Floor</div>
                                <div className="text-2xl font-bold text-gray-900">39</div>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Floor Plan */}
                    <InteractiveFloorPlan 
                        units={units}
                        selectedFloor={selectedFloor}
                        showLegend={true}
                        className="w-full"
                    />

                    {/* Building Info */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-2 0H7m5 0v-5a2 2 0 00-2-2H8a2 2 0 00-2 2v5m6 0V9a2 2 0 00-2-2H8a2 2 0 00-2 2v8" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 ml-3">Total Units</h3>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{units.length}</p>
                            <p className="text-sm text-gray-500 mt-1">Across multiple floors</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 ml-3">Available</h3>
                            </div>
                            <p className="text-3xl font-bold text-green-600">{units.filter(u => u.status === 'available').length}</p>
                            <p className="text-sm text-gray-500 mt-1">Ready to move in</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 ml-3">Price Range</h3>
                            </div>
                            <p className="text-3xl font-bold text-blue-600">
                                {units.length > 0 ? (
                                    `$${Math.min(...units.map(u => u.price || 0)).toLocaleString()} - $${Math.max(...units.map(u => u.price || 0)).toLocaleString()}`
                                ) : (
                                    'N/A'
                                )}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">Monthly rent</p>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}