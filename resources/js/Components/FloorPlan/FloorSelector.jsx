import React from 'react';

export default function FloorSelector({ buildings, selectedFloor, onFloorSelect, filters, onFilterChange, compact = false }) {
    const allFloors = buildings.flatMap(building => building.floors);

    if (compact) {
        // Mobile/Top layout
        return (
            <div className="space-y-4">
                {/* Simple Floor Navigation */}
                <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Select Floor</h3>
                    <div className="flex flex-wrap gap-2">
                        {allFloors.map((floor) => {
                            const availableUnits = floor.units.filter(unit => unit.status === 'available').length;
                            return (
                                <button
                                    key={floor.id}
                                    onClick={() => onFloorSelect(floor)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        selectedFloor?.id === floor.id
                                            ? 'bg-black text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {floor.floor_number}
                                    <span className="ml-1 text-xs">({availableUnits})</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Compact Filters */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Price Range</label>
                        <select 
                            className="w-full text-sm border border-gray-300 rounded-md px-2 py-1"
                            onChange={(e) => {
                                const [min, max] = e.target.value.split('-').map(Number);
                                onFilterChange('priceRange', [min, max]);
                            }}
                        >
                            <option value="0-5000">All Prices</option>
                            <option value="0-2000">Under $2,000</option>
                            <option value="2000-3000">$2,000 - $3,000</option>
                            <option value="3000-5000">$3,000+</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Bedrooms</label>
                        <select 
                            className="w-full text-sm border border-gray-300 rounded-md px-2 py-1"
                            onChange={(e) => onFilterChange('bedrooms', e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="1">1 Bed</option>
                            <option value="2">2 Bed</option>
                            <option value="3">3+ Bed</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }

    // Desktop sidebar layout
    return (
        <div className="space-y-6">
            {/* Simple Floor Navigation */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Floor</h2>
                <div className="space-y-2">
                    {allFloors.map((floor) => {
                        const availableUnits = floor.units.filter(unit => unit.status === 'available').length;
                        return (
                            <button
                                key={floor.id}
                                onClick={() => onFloorSelect(floor)}
                                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                                    selectedFloor?.id === floor.id
                                        ? 'bg-black text-white'
                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <span className="font-medium">Floor {floor.floor_number}</span>
                                <span className="text-sm">
                                    {availableUnits} available
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Filters */}
            <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
                
                <div className="space-y-4">
                    {/* Price Range */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                        <select 
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            onChange={(e) => {
                                const [min, max] = e.target.value.split('-').map(Number);
                                onFilterChange('priceRange', [min, max]);
                            }}
                        >
                            <option value="0-5000">All Prices</option>
                            <option value="0-2000">Under $2,000</option>
                            <option value="2000-3000">$2,000 - $3,000</option>
                            <option value="3000-5000">$3,000+</option>
                        </select>
                    </div>

                    {/* Move In Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Move In Date</label>
                        <input
                            type="date"
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            onChange={(e) => onFilterChange('moveInDate', e.target.value)}
                        />
                    </div>

                    {/* Bedrooms */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                        <select 
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            onChange={(e) => onFilterChange('bedrooms', e.target.value)}
                        >
                            <option value="">All Bedrooms</option>
                            <option value="1">1 Bedroom</option>
                            <option value="2">2 Bedrooms</option>
                            <option value="3">3+ Bedrooms</option>
                        </select>
                    </div>

                    {/* Square Footage */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Square Footage</label>
                        <select 
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            onChange={(e) => {
                                const [min, max] = e.target.value.split('-').map(Number);
                                onFilterChange('squareFootage', [min, max]);
                            }}
                        >
                            <option value="0-2000">All Sizes</option>
                            <option value="0-600">Under 600 sq ft</option>
                            <option value="600-800">600 - 800 sq ft</option>
                            <option value="800-1000">800 - 1,000 sq ft</option>
                            <option value="1000-2000">1,000+ sq ft</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Available Units</h4>
                <div className="text-2xl font-bold text-green-600">
                    {allFloors.reduce((total, floor) => 
                        total + floor.units.filter(unit => unit.status === 'available').length, 0
                    )}
                </div>
                <div className="text-sm text-gray-500">
                    of {allFloors.reduce((total, floor) => total + floor.units.length, 0)} total units
                </div>
            </div>
        </div>
    );
}