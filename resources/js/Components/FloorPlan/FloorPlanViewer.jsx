import React, { useState, useRef, useEffect } from 'react';
import UnitTooltip from './UnitTooltip';
import UnitModal from './UnitModal';

export default function FloorPlanViewer({ floor, onUnitSelect, filters }) {
    const [hoveredUnit, setHoveredUnit] = useState(null);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [highlightedUnit, setHighlightedUnit] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [svgContent, setSvgContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [searchTerm, setSearchTerm] = useState('');
    const [availableUnits, setAvailableUnits] = useState([]);
    const svgRef = useRef(null);
    const containerRef = useRef(null);

    // Load FloorPlan-Exact.svg file
    useEffect(() => {
        const loadFloorSVG = async () => {
            setIsLoading(true);
            try {
                // Use the exact floor plan that matches the provided image
                const response = await fetch('/FloorPlan-Exact.svg');

                if (response.ok) {
                    let svgText = await response.text();

                    // Remove existing text elements to prevent duplicates
                    svgText = svgText.replace(/<text[^>]*>.*?<\/text>/g, '');

                    setSvgContent(svgText);
                } else {
                    console.error('Failed to load FloorPlan-Exact.svg');
                    setSvgContent('');
                }
            } catch (error) {
                console.error('Error loading SVG:', error);
                setSvgContent('');
            } finally {
                setIsLoading(false);
            }
        };

        loadFloorSVG();
    }, []);

    // Process SVG and make units interactive
    useEffect(() => {
        if (svgContent && svgRef.current) {
            const svgElement = svgRef.current.querySelector('svg');
            if (!svgElement) return;

            // Create sample unit data if not provided
            const sampleUnits = floor?.units || generateSampleUnits();
            setAvailableUnits(sampleUnits.filter(u => u.status === 'available'));

            // Find all rectangle elements that represent units (our new SVG uses rectangles)
            const allRects = svgElement.querySelectorAll('rect[data-unit]');

            console.log('Found unit rectangles:', allRects.length);
            console.log('Sample units:', sampleUnits);

            // Clear existing labels
            const existingLabels = svgElement.querySelectorAll('.unit-number-label');
            existingLabels.forEach(label => label.remove());

            // Process each unit rectangle
            allRects.forEach((rect) => {
                const unitNumber = rect.getAttribute('data-unit');
                
                // Find or create unit data
                let unit = sampleUnits.find(u => u.unit_number === unitNumber);
                if (!unit) {
                    // Create a sample unit if not found
                    unit = createSampleUnit(unitNumber, parseInt(unitNumber));
                }

                // Remove existing event listeners
                const newRect = rect.cloneNode(true);
                rect.parentNode.replaceChild(newRect, rect);

                // Add data attributes for easier identification
                newRect.setAttribute('data-unit-number', unit.unit_number);
                newRect.setAttribute('data-unit-status', unit.status);
                newRect.setAttribute('data-unit-price', unit.price);

                // Check if unit matches search term
                const matchesSearch = !searchTerm || unit.unit_number.toLowerCase().includes(searchTerm.toLowerCase());

                // Style based on availability, filters, and search
                const isFiltered = filters && !passesFilters(unit, filters);
                const isHighlighted = searchTerm && matchesSearch;

                if (unit.status === 'available' && !isFiltered && matchesSearch) {
                    // Available units - green and interactive
                    const fillColor = isHighlighted ? '#F59E0B' : '#10B981'; // Orange for search highlight
                    const strokeColor = isHighlighted ? '#D97706' : '#059669';

                    newRect.setAttribute('fill', fillColor);
                    newRect.setAttribute('stroke', strokeColor);
                    newRect.setAttribute('stroke-width', isHighlighted ? '3' : '2');
                    newRect.style.cursor = 'pointer';
                    newRect.style.transition = 'all 0.3s ease';
                    newRect.style.opacity = '1';

                    // Add hover and click events
                    newRect.addEventListener('mouseenter', (e) => {
                        newRect.setAttribute('fill', isHighlighted ? '#FBBF24' : '#34D399');
                        newRect.style.transform = 'scale(1.02)';
                        newRect.style.transformOrigin = 'center';
                        handleUnitHover(unit, e);
                    });

                    newRect.addEventListener('mouseleave', () => {
                        newRect.setAttribute('fill', fillColor);
                        newRect.style.transform = 'scale(1)';
                        handleUnitLeave();
                    });

                    newRect.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleUnitClick(unit);
                    });

                    console.log('Made unit clickable:', unit.unit_number);
                } else if (unit.status === 'available' && (isFiltered || !matchesSearch)) {
                    // Filtered out or non-matching available units - dimmed green
                    newRect.setAttribute('fill', '#10B981');
                    newRect.setAttribute('stroke', '#059669');
                    newRect.setAttribute('stroke-width', '1');
                    newRect.style.cursor = 'default';
                    newRect.style.opacity = '0.3';
                } else {
                    // Occupied units - white and not interactive
                    newRect.setAttribute('fill', '#ffffff');
                    newRect.setAttribute('stroke', '#d1d5db');
                    newRect.setAttribute('stroke-width', '1');
                    newRect.style.cursor = 'default';
                    newRect.style.opacity = matchesSearch ? '1' : '0.7';
                }

                // Add unit number label
                addUnitLabel(svgElement, newRect, unit, isFiltered || !matchesSearch, isHighlighted);
            });
        }
    }, [svgContent, floor?.units, filters, searchTerm]);

    // Check if unit passes current filters
    const passesFilters = (unit, filters) => {
        if (!filters) return true;

        if (filters.priceRange && (unit.price < filters.priceRange[0] || unit.price > filters.priceRange[1])) {
            return false;
        }

        if (filters.bedrooms && unit.unit_type?.bedrooms.toString() !== filters.bedrooms) {
            return false;
        }

        if (filters.squareFootage && unit.unit_type &&
            (unit.unit_type.area_sqft < filters.squareFootage[0] || unit.unit_type.area_sqft > filters.squareFootage[1])) {
            return false;
        }

        return true;
    };

    // Add unit number label to SVG
    const addUnitLabel = (svgElement, unitElement, unit, isFiltered = false, isHighlighted = false) => {
        try {
            const bbox = unitElement.getBBox();
            const centerX = bbox.x + bbox.width / 2;
            const centerY = bbox.y + bbox.height / 2;

            // Create text element for unit number
            const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            textElement.setAttribute('x', centerX);
            textElement.setAttribute('y', centerY);
            textElement.setAttribute('text-anchor', 'middle');
            textElement.setAttribute('dominant-baseline', 'middle');
            textElement.setAttribute('class', 'unit-number-label');
            textElement.style.fontSize = isHighlighted ? '14px' : '12px';
            textElement.style.fontWeight = 'bold';
            textElement.style.fontFamily = 'Arial, sans-serif';

            // Adjust text color based on status, filter state, and highlight
            if (unit.status === 'available' && !isFiltered) {
                textElement.style.fill = isHighlighted ? '#1F2937' : '#ffffff'; // Dark text for highlighted (orange) units
            } else if (unit.status === 'available' && isFiltered) {
                textElement.style.fill = '#ffffff';
                textElement.style.opacity = '0.5';
            } else {
                textElement.style.fill = '#374151';
            }

            textElement.style.pointerEvents = 'none';
            textElement.style.userSelect = 'none';
            textElement.textContent = unit.unit_number;

            svgElement.appendChild(textElement);
        } catch (error) {
            console.warn('Could not add label for unit:', unit.unit_number, error);
        }
    };

    const handleUnitHover = (unit, event) => {
        console.log('Hovering unit:', unit.unit_number);
        setHoveredUnit(unit);
        const rect = containerRef.current.getBoundingClientRect();
        setTooltipPosition({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        });
    };

    const handleUnitLeave = () => {
        setHoveredUnit(null);
    };

    const handleUnitClick = (unit) => {
        console.log('Clicking unit:', unit.unit_number);
        if (unit.status === 'available') {
            setSelectedUnit(unit);
            if (onUnitSelect) {
                onUnitSelect(unit);
            }
        }
    };

    const handleCloseModal = () => {
        setSelectedUnit(null);
    };

    // Generate sample unit data for demonstration
    const generateSampleUnits = () => {
        const unitTypes = [
            {
                name: 'Studio',
                bedrooms: 0,
                bathrooms: 1,
                area_sqft: 450,
                amenities: ['In-unit laundry', 'Modern kitchen', 'City views', 'Hardwood floors', 'Stainless steel appliances']
            },
            {
                name: '1 Bedroom',
                bedrooms: 1,
                bathrooms: 1,
                area_sqft: 650,
                amenities: ['In-unit laundry', 'Modern kitchen', 'Balcony', 'City views', 'Walk-in closet', 'Hardwood floors']
            },
            {
                name: '2 Bedroom',
                bedrooms: 2,
                bathrooms: 2,
                area_sqft: 950,
                amenities: ['In-unit laundry', 'Modern kitchen', 'Balcony', 'City views', 'Walk-in closet', 'Master suite', 'Granite countertops']
            },
            {
                name: '3 Bedroom',
                bedrooms: 3,
                bathrooms: 2,
                area_sqft: 1200,
                amenities: ['In-unit laundry', 'Modern kitchen', 'Balcony', 'City views', 'Walk-in closet', 'Den', 'Master suite', 'Granite countertops', 'Private terrace']
            }
        ];

        const units = [];
        for (let i = 1; i <= 50; i++) {
            const unitNumber = String(i).padStart(3, '0');
            const unitType = unitTypes[Math.floor(Math.random() * unitTypes.length)];
            const basePrice = unitType.bedrooms === 0 ? 1800 :
                unitType.bedrooms === 1 ? 2400 :
                    unitType.bedrooms === 2 ? 3200 : 4000;
            const price = basePrice + Math.floor(Math.random() * 800); // More price variation
            const isAvailable = Math.random() > 0.35; // 65% chance of being available

            units.push({
                id: i,
                unit_number: unitNumber,
                status: isAvailable ? 'available' : 'occupied',
                price: price,
                available_date: isAvailable ? new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : null,
                unit_type: unitType,
                floor: { floor_number: Math.floor(Math.random() * 10) + 1 }, // Random floor 1-10
                lease_term: isAvailable ? (Math.random() > 0.5 ? '12 months' : '6 months') : null,
                move_in_cost: isAvailable ? price + (Math.random() > 0.5 ? price : price * 0.5) : null // First month + deposit
            });
        }
        return units;
    };

    // Create a sample unit for a specific unit number
    const createSampleUnit = (unitNumber, index) => {
        const unitTypes = [
            { name: 'Studio', bedrooms: 0, bathrooms: 1, area_sqft: 450, amenities: ['In-unit laundry', 'Modern kitchen', 'City views'] },
            { name: '1 Bedroom', bedrooms: 1, bathrooms: 1, area_sqft: 650, amenities: ['In-unit laundry', 'Modern kitchen', 'Balcony', 'City views'] },
            { name: '2 Bedroom', bedrooms: 2, bathrooms: 2, area_sqft: 950, amenities: ['In-unit laundry', 'Modern kitchen', 'Balcony', 'City views', 'Walk-in closet'] },
            { name: '3 Bedroom', bedrooms: 3, bathrooms: 2, area_sqft: 1200, amenities: ['In-unit laundry', 'Modern kitchen', 'Balcony', 'City views', 'Walk-in closet', 'Den'] }
        ];

        const unitType = unitTypes[index % unitTypes.length];
        const basePrice = unitType.bedrooms === 0 ? 1800 :
            unitType.bedrooms === 1 ? 2400 :
                unitType.bedrooms === 2 ? 3200 : 4000;
        const price = basePrice + (index * 50);
        const isAvailable = index % 3 !== 0; // Every 3rd unit is occupied

        return {
            id: parseInt(unitNumber),
            unit_number: unitNumber,
            status: isAvailable ? 'available' : 'occupied',
            price: price,
            available_date: isAvailable ? new Date().toISOString().split('T')[0] : null,
            unit_type: unitType,
            floor: { floor_number: 1 }
        };
    };

    // Zoom controls
    const handleZoomIn = () => {
        setZoom(prev => Math.min(prev * 1.2, 3));
    };

    const handleZoomOut = () => {
        setZoom(prev => Math.max(prev / 1.2, 0.5));
    };

    const handleZoomReset = () => {
        setZoom(1);
        setPan({ x: 0, y: 0 });
    };

    // Pan controls
    const handleMouseDown = (e) => {
        if (e.target.closest('.zoom-controls')) return;
        if (e.target.tagName === 'polygon' && e.target.style.cursor === 'pointer') return;

        setIsDragging(true);
        setDragStart({
            x: e.clientX - pan.x,
            y: e.clientY - pan.y
        });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        setPan({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Wheel zoom
    const handleWheel = (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        setZoom(prev => Math.max(0.5, Math.min(3, prev * delta)));
    };

    // Filter units based on filters
    const filterUnits = (units) => {
        if (!units) return [];

        return units.filter(unit => {
            if (filters.priceRange && (unit.price < filters.priceRange[0] || unit.price > filters.priceRange[1])) {
                return false;
            }

            if (filters.bedrooms && unit.unit_type?.bedrooms.toString() !== filters.bedrooms) {
                return false;
            }

            if (filters.squareFootage && unit.unit_type &&
                (unit.unit_type.area_sqft < filters.squareFootage[0] || unit.unit_type.area_sqft > filters.squareFootage[1])) {
                return false;
            }

            return true;
        });
    };

    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex items-center justify-center" style={{ minHeight: '600px' }}>
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                        <p className="text-gray-600 font-medium">Loading Floor Plan...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!svgContent) {
        return (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex items-center justify-center" style={{ minHeight: '600px' }}>
                    <div className="text-center">
                        <div className="text-4xl mb-4">🏢</div>
                        <p className="text-gray-600 font-medium">Floor plan not available</p>
                        <p className="text-gray-500 text-sm mt-2">Unable to load floor {floor?.floor_number} layout</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Search Bar */}
            <div className="absolute top-4 left-4 z-10">
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-3 min-w-64">
                    <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search unit number..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 text-sm border-none outline-none bg-transparent placeholder-gray-400"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Floor Plan Canvas with Zoom and Pan */}
            <div
                ref={containerRef}
                className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden"
                style={{
                    minHeight: '600px',
                    cursor: isDragging ? 'grabbing' : 'grab'
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
            >
                {/* Zoom Controls */}
                <div className="zoom-controls absolute top-4 right-4 z-10 flex flex-col space-y-2">
                    <button
                        onClick={handleZoomIn}
                        className="w-10 h-10 bg-white hover:bg-gray-50 rounded-lg shadow-md flex items-center justify-center transition-all border border-gray-200"
                        title="Zoom In"
                    >
                        <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </button>
                    <button
                        onClick={handleZoomOut}
                        className="w-10 h-10 bg-white hover:bg-gray-50 rounded-lg shadow-md flex items-center justify-center transition-all border border-gray-200"
                        title="Zoom Out"
                    >
                        <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                        </svg>
                    </button>
                    <button
                        onClick={handleZoomReset}
                        className="w-10 h-10 bg-white hover:bg-gray-50 rounded-lg shadow-md flex items-center justify-center transition-all border border-gray-200"
                        title="Reset View"
                    >
                        <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>
                </div>

                {/* SVG Container */}
                <div
                    ref={svgRef}
                    className="w-full h-full flex items-center justify-center p-4"
                    style={{
                        transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                        transformOrigin: 'center center',
                        transition: isDragging ? 'none' : 'transform 0.2s ease-out',
                        minHeight: '600px'
                    }}
                    dangerouslySetInnerHTML={{ __html: svgContent }}
                />

                {/* Tooltip */}
                {hoveredUnit && (
                    <UnitTooltip
                        unit={hoveredUnit}
                        position={tooltipPosition}
                    />
                )}
            </div>

            {/* Modern Legend */}
            <div className="bg-gradient-to-r from-gray-50 to-white border-t border-gray-200 p-6">
                <div className="flex items-center justify-center space-x-12">
                    <div className="flex items-center group">
                        <div className="w-5 h-5 bg-emerald-500 border border-emerald-600 rounded-sm mr-3 shadow-sm"></div>
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-emerald-600 transition-colors">Available Units</span>
                    </div>
                    <div className="flex items-center group">
                        <div className="w-5 h-5 bg-white border border-gray-300 rounded-sm mr-3 shadow-sm"></div>
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">Occupied Units</span>
                    </div>
                    <div className="flex items-center group">
                        <div className="w-5 h-5 bg-gray-200 border border-gray-400 rounded-sm mr-3 shadow-sm flex items-center justify-center">
                            <span className="text-xs font-bold text-gray-600">E</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">Elevators</span>
                    </div>
                </div>

                {/* Floor info */}
                <div className="text-center mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 font-medium">
                        Floor {floor?.floor_number} • {filterUnits(floor?.units).filter(u => u.status === 'available').length || 0} Available • {floor?.units?.length || 0} Total Units
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        Use mouse wheel to zoom • Click and drag to pan • Click green units for details
                    </p>
                </div>
            </div>

            {/* Unit Details Modal */}
            {selectedUnit && (
                <UnitModal
                    unit={selectedUnit}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}