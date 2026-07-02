import React from 'react';

export default function UnitTooltip({ unit, position }) {
    return (
        <div
            className="absolute z-50 pointer-events-none"
            style={{
                left: position.x + 15,
                top: position.y - 15,
                transform: 'translateY(-100%)'
            }}
            role="tooltip"
            aria-live="polite"
        >
            {/* Clean Modern Tooltip */}
            <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 min-w-64">
                {/* Tooltip Arrow */}
                <div className="absolute -bottom-1 left-4 w-3 h-3 bg-white border-r border-b border-gray-200 rotate-45"></div>
                
                <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                                {unit.unit_number.slice(-2)}
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">
                                    Unit {unit.unit_number}
                                </h3>
                                <p className="text-xs text-gray-500">
                                    {unit.unit_type?.name}
                                </p>
                            </div>
                        </div>
                        
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            unit.status === 'available' 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                        }`}>
                            {unit.status === 'available' ? 'Available' : 'Occupied'}
                        </span>
                    </div>
                    
                    {unit.unit_type && (
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Bedrooms:</span>
                                <span className="font-medium text-gray-900">{unit.unit_type.bedrooms}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Bathrooms:</span>
                                <span className="font-medium text-gray-900">{unit.unit_type.bathrooms}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Area:</span>
                                <span className="font-medium text-gray-900">{unit.unit_type.area_sqft} sq ft</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Rent:</span>
                                <span className="font-semibold text-gray-900">
                                    ${unit.price?.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    )}
                    
                    {unit.status === 'available' && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                            <p className="text-xs text-blue-600 text-center">
                                Click to view details
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}