import React, { useState, useRef, useEffect } from 'react';
import UnitTooltip from './UnitTooltip';
import UnitModal from './UnitModal';

export default function ModernFloorPlanViewer({ floor, onUnitSelect, filters }) {
    const [hoveredUnit, setHoveredUnit] = useState(null);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [svgContent, setSvgContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [searchTerm, setSearchTerm] = useState('');
    const svgRef = useRef(null);
    const containerRef = useRef(null);

    // Load Professional Floor Plan SVG
    useEffect(() => {
        const loadFloorSVG = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/FloorPlan-Professional.svg');
                
                if (response.ok) {
                    let svgText = await response.text();
                    setSvgContent(svgText);
                } else {
                    console.error('Failed to load FloorPlan-Professional.svg');
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
        if (svgContent && svgRef.current && floor?.units) {
            const svgElement = svgRef.current.querySelector('svg');
            if (!svgElement) return;

            // Find all unit rectangles
            const unitRects = svgElement.querySelectorAll('rect[data-unit]');
            
            console.log('Found unit rectangles:', unitRects.length);
            console.log('Floor units:', floor.units);

            // Process each unit rectangle
            unitRects.forEach((rect) => {
                const unitNumber = rect.getAttribute('data-unit');
                
                // Find unit data
                const unit = floor.units.find(u => u.unit_number === unitNumber);
                
                if (!unit) {
                    console.warn('No unit data found for:', unitNumber);
                    return;
                }

                // Remove existing event listeners by cloning
                const newRect = rect.cloneNode(true);
                rect.parentNode.replaceChild(newRect, rect);

                // Check if unit matches search term
                const matchesSearch = !searchTerm || unit.unit_number.toLowerCase().includes(searchTerm.toLowerCase());
                
                // Style based on availability, filters, and search
                const isFiltered = filters && !passesFilters(unit, filters);
                const isHighlighted = searchTerm && matchesSearch;
                
                if (unit.status === 'available' && !isFiltered && matchesSearch) {
                    // Available units - green and interactive
                    const fillColor = isHighlighted ? '#f59e0b' : '#10b981';
                    const strokeColor = isHighlighted ? '#d97706' : '#059669';
                    
                    newRect.setAttribute('fill', fillColor);
                    newRect.setAttribute('stroke', strokeColor);
                    newRect.setAttribute('stroke-width', isHighlighted ? '3' : '2');
                    newRect.style.cursor = 'pointer';
                    newRect.style.transition = 'all 0.3s ease';
                    newRect.style.opacity = '1';

                    // Add hover and click events
                    newRect.addEventListener('mouseenter', (e) => {
                        newRect.setAttribute('fill', isHighlighted ? '#fbbf24' : '#34d399');
                        newRect.style.filter = 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))';
                        handleUnitHover(unit, e);
                    });

                    newRect.addEventListener('mouseleave', () => {
                        newRect.setAttribute('fill', fillColor);
                        newRect.style.filter = 'none';
                        handleUnitLeave();
                    });

                    newRect.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleUnitClick(unit);
                    });

                    console.log('Made unit clickable:', unit.unit_number);
                } else if (unit.status === 'available' && (isFiltered || !matchesSearch)) {
                    // Filtered out available units
                    newRect.setAttribute('fill', '#10b981');
                    newRect.setAttribute('stroke', '#059669');
                    newRect.setAttribute('stroke-width', '1');
                    newRect.style.cursor = 'default';
                    newRect.style.opacity = '0.4';
                } else {
                    // Occupied units
                    newRect.setAttribute('fill', '#ffffff');
                    newRect.setAttribute('stroke', '#6b7280');
                    newRect.setAttribute('stroke-width', '1');
                    newRect.style.cursor = 'default';
                    newRect.style.opacity = matchesSearch ? '1' : '0.8';
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
            const x = parseFloat(unitElement.getAttribute('x'));
            const y = parseFloat(unitElement.getAttribute('y'));
            const width = parseFloat(unitElement.getAttribute('width'));
            const height = parseFloat(unitElement.getAttribute('height'));
            
            const centerX = x + width / 2;
            const centerY = y + height / 2;

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

            // Adjust text color based on status
            if (unit.status === 'available' && !isFiltered) {
                textElement.style.fill = isHighlighted ? '#1f2937' : '#ffffff';
            } else if (unit.status === 'available' && isFiltered) {
                textElement.style.fill = '#ffffff';
                textElement.style.opacity = '0.6';
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
        console.log('Unit clicked:', unit);
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
        if (e.target.classList.contains('unit-rect') && e.target.style.cursor === 'pointer') return;

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

    if (isLoading) {
        return (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex items-center justify-center" style={{ minHeight: '600px' }}>
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-600 mx-auto mb-6"></div>
                        <p className="text-gray-700 font-semibold text-lg">Loading Floor Plan...</p>
                        <p className="text-gray-500 text-sm mt-2">Please wait while we load the interactive floor plan</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!svgContent) {
        return (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex items-center justify-center" style={{ minHeight: '600px' }}>
                    <div className="text-center">
                        <div className="text-6xl mb-6">🏢</div>
                        <p className="text-gray-700 font-semibold text-lg mb-2">Floor plan not available</p>
                        <p className="text-gray-500 text-sm">Unable to load FloorPlan-Professional.svg</p>
                    </div>
                </div>
            </div>
        );
    }

    const units = floor?.units || [];
    const availableCount = units.filter(u => u.status === 'available').length;
    const totalCount = units.length;

    return (
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">
                            Floor {floor?.floor_number} - Interactive Floor Plan
                        </h2>
                        <p className="text-emerald-100">
                            {availableCount} available • {totalCount} total units
                        </p>
                    </div>
                    
                    {/* Search Bar */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 min-w-80">
                        <div className="flex items-center space-x-3">
                            <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search unit number (e.g., 204, 211)..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-1 text-sm border-none outline-none bg-transparent placeholder-white/70 text-white"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="text-white/70 hover:text-white transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Floor Plan Canvas */}
            <div
                ref={containerRef}
                className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden"
                style={{
                    minHeight: '700px',
                    cursor: isDragging ? 'grabbing' : 'grab'
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
            >
                {/* Zoom Controls */}
                <div className="zoom-controls absolute top-6 right-6 z-10 flex flex-col space-y-3">
                    <button
                        onClick={handleZoomIn}
                        className="w-12 h-12 bg-white hover:bg-gray-50 rounded-xl shadow-lg flex items-center justify-center transition-all border border-gray-200 hover:shadow-xl"
                        title="Zoom In"
                    >
                        <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </button>
                    <button
                        onClick={handleZoomOut}
                        className="w-12 h-12 bg-white hover:bg-gray-50 rounded-xl shadow-lg flex items-center justify-center transition-all border border-gray-200 hover:shadow-xl"
                        title="Zoom Out"
                    >
                        <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                        </svg>
                    </button>
                    <button
                        onClick={handleZoomReset}
                        className="w-12 h-12 bg-white hover:bg-gray-50 rounded-xl shadow-lg flex items-center justify-center transition-all border border-gray-200 hover:shadow-xl"
                        title="Reset View"
                    >
                        <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>
                </div>

                {/* SVG Container */}
                <div
                    ref={svgRef}
                    className="w-full h-full flex items-center justify-center p-8"
                    style={{
                        transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                        transformOrigin: 'center center',
                        transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                        minHeight: '700px'
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

            {/* Legend */}
            <div className="bg-gradient-to-r from-gray-50 to-white border-t border-gray-200 p-8">
                <div className="flex items-center justify-center space-x-16">
                    <div className="flex items-center group">
                        <div className="w-6 h-6 bg-emerald-500 border-2 border-emerald-600 rounded-md mr-4 shadow-sm"></div>
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-emerald-600 transition-colors">Available Units</span>
                    </div>
                    <div className="flex items-center group">
                        <div className="w-6 h-6 bg-white border-2 border-gray-400 rounded-md mr-4 shadow-sm"></div>
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">Occupied Units</span>
                    </div>
                    <div className="flex items-center group">
                        <div className="w-6 h-6 bg-orange-400 border-2 border-orange-500 rounded-md mr-4 shadow-sm"></div>
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-orange-600 transition-colors">Search Highlighted</span>
                    </div>
                    <div className="flex items-center group">
                        <div className="w-6 h-6 bg-gray-300 border-2 border-gray-400 rounded-md mr-4 shadow-sm flex items-center justify-center">
                            <span className="text-xs font-bold text-gray-600">E</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">Elevators</span>
                    </div>
                </div>

                <div className="text-center mt-6 pt-6 border-t border-gray-100">
                    <p className="text-sm text-gray-600 font-medium mb-2">
                        Interactive Floor Plan Controls
                    </p>
                    <p className="text-xs text-gray-500">
                        🖱️ Mouse wheel to zoom • ✋ Click and drag to pan • 🖱️ Click green units for details • 🔍 Search units by number
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