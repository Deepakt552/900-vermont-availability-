import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import FloorSelector from '@/Components/FloorPlan/FloorSelector';
import FloorPlanViewer from '@/Components/FloorPlan/FloorPlanViewer';
import UnitModal from '@/Components/FloorPlan/UnitModal';

export default function Index({ buildings }) {
    const [selectedFloor, setSelectedFloor] = useState(buildings[0]?.floors[0] || null);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [filters, setFilters] = useState({
        priceRange: [0, 5000],
        moveInDate: '',
        bedrooms: '',
        squareFootage: [0, 2000]
    });

    const handleFloorSelect = (floor) => {
        setSelectedFloor(floor);
    };

    const handleUnitSelect = (unit) => {
        setSelectedUnit(unit);
    };

    const closeModal = () => {
        setSelectedUnit(null);
    };

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    return (
        <>
            <Head title="Floor Plans - The 900 Apartments" />
            
            {/* Clean Modern Design */}
            <div className="min-h-screen bg-gray-50">
                {/* Simple Header */}
                <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center font-bold text-lg">
                                    900
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">The 900 Apartments</h1>
                                    <p className="text-sm text-gray-500">Interactive Floor Plans</p>
                                </div>
                            </div>
                            
                            <button className="px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
                                Schedule Tour
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto">
                    {/* Responsive Layout */}
                    <div className="lg:flex">
                        {/* Sidebar for Large Screens */}
                        <div className="hidden lg:block lg:w-80 xl:w-96 bg-white border-r border-gray-200">
                            <div className="p-6">
                                <FloorSelector
                                    buildings={buildings}
                                    selectedFloor={selectedFloor}
                                    onFloorSelect={handleFloorSelect}
                                    filters={filters}
                                    onFilterChange={handleFilterChange}
                                />
                            </div>
                        </div>

                        {/* Main Floor Plan Area */}
                        <div className="flex-1">
                            {/* Top Navigation for Small Screens */}
                            <div className="lg:hidden bg-white border-b border-gray-200 p-4">
                                <FloorSelector
                                    buildings={buildings}
                                    selectedFloor={selectedFloor}
                                    onFloorSelect={handleFloorSelect}
                                    filters={filters}
                                    onFilterChange={handleFilterChange}
                                    compact={true}
                                />
                            </div>

                            {/* Floor Plan Viewer */}
                            {selectedFloor ? (
                                <FloorPlanViewer
                                    floor={selectedFloor}
                                    onUnitSelect={handleUnitSelect}
                                    filters={filters}
                                />
                            ) : (
                                <div className="h-96 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-2 0H7m5 0v-5a2 2 0 00-2-2H8a2 2 0 00-2 2v5m6 0V9a2 2 0 00-2-2H8a2 2 0 00-2 2v8" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Floor</h3>
                                        <p className="text-gray-500">Choose a floor to view available units</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Unit Details Modal */}
                {selectedUnit && (
                    <UnitModal
                        unit={selectedUnit}
                        onClose={closeModal}
                    />
                )}
            </div>
        </>
    );
}