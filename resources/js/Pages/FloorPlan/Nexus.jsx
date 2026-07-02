import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import NexusFloorPlanViewer from '@/Components/FloorPlan/NexusFloorPlanViewer';
import UnitModal from '@/Components/FloorPlan/UnitModal';

export default function Nexus({ units = [] }) {
    const [selectedFloor, setSelectedFloor] = useState(1);
    const [selectedUnit, setSelectedUnit] = useState(null);
    
    // Floors for Nexus: 1 to 4
    const floors = [1, 2, 3, 4];

    // Filter to only available units for the selected floor (for status badges)
    const floorUnits = units.filter(u => u.floor?.floor_number === selectedFloor);
    const availableCount = floorUnits.filter(u => u.status === 'available').length;

    return (
        <GuestLayout>
            <Head title="Nexus Interactive Floor Plan - Northridge Nexus" />
            
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Header Controls */}
                    <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h2 className="text-3xl font-black text-black tracking-tight mb-2">
                                Northridge Nexus Blueprint
                            </h2>
                            <p className="text-gray-600 text-sm">
                                Click on any green unit to view modern details. Select a floor to explore.
                            </p>
                        </div>
                        
                        {/* Floor Selector Tabs */}
                        <div className="flex bg-white p-1 rounded-xl border border-gray-300 shadow-sm self-start sm:self-center">
                            {floors.map((floor) => (
                                <button
                                    key={floor}
                                    onClick={() => setSelectedFloor(floor)}
                                    className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-150 ${
                                        selectedFloor === floor
                                            ? 'bg-black text-white shadow-md'
                                            : 'text-gray-600 hover:text-black hover:bg-gray-50'
                                    }`}
                                >
                                    Level {floor}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Floor Summary Panel */}
                    <div className="mb-6 bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Level {selectedFloor}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                                {floorUnits.length} premium tower units • 
                                <span className="ml-1 font-semibold text-green-600">
                                    {availableCount} Available Now
                                </span>
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Level Layouts</div>
                            <div className="text-3xl font-black text-gray-900 mt-1">{floorUnits.length}</div>
                        </div>
                    </div>

                    {/* SVG Floor Plan Viewer */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-2.5">
                        <NexusFloorPlanViewer
                            selectedFloor={selectedFloor}
                            units={units}
                            onUnitClick={(unit) => setSelectedUnit(unit)}
                        />
                    </div>

                    {/* Quick Specs Cards */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center text-lg">
                                    🏢
                                </div>
                                <h3 className="text-base font-bold text-gray-900">Total Nexus Units</h3>
                            </div>
                            <p className="text-4xl font-extrabold text-black">{units.length}</p>
                            <p className="text-xs text-gray-500 mt-1">Across 4 luxury tower levels</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center text-lg">
                                    ✓
                                </div>
                                <h3 className="text-base font-bold text-gray-900">Available Units</h3>
                            </div>
                            <p className="text-4xl font-extrabold text-green-600">
                                {units.filter(u => u.status === 'available').length}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Ready for leasing and moves</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-lg">
                                    💵
                                </div>
                                <h3 className="text-base font-bold text-gray-900">Price Spectrum</h3>
                            </div>
                            <p className="text-3xl font-extrabold text-blue-600">
                                {units.length > 0 ? (
                                    `$${Math.min(...units.map(u => parseFloat(u.price || 0))).toLocaleString()} - $${Math.max(...units.map(u => parseFloat(u.price || 0))).toLocaleString()}`
                                ) : (
                                    'N/A'
                                )}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Per month, custom layouts</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Public Unit Details Modal */}
            {selectedUnit && (
                <UnitModal
                    unit={selectedUnit}
                    onClose={() => setSelectedUnit(null)}
                />
            )}
        </GuestLayout>
    );
}
