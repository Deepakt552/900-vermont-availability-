import React, { useState, useRef, useEffect } from 'react';
import UnitTooltip from './UnitTooltip';
import ProfessionalUnitModal from './ProfessionalUnitModal';

export default function MultiFloorDynamicPlan({ onUnitSelect, filters }) {
    const [selectedFloor, setSelectedFloor] = useState(2);
    const [hoveredUnit, setHoveredUnit] = useState(null);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [svgContent, setSvgContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [availableUnits, setAvailableUnits] = useState([]);
    const svgRef = useRef(null);
    const containerRef = useRef(null);

    // Available floors
    const floors = [
        { number: 2, file: '2Floor.svg', name: 'Second Floor' },
        { number: 3, file: '3floor.svg', name: 'Third Floor' },
        { number: 4, file: '4floor.svg', name: 'Fourth Floor' },
        { number: 5, file: '5floor.svg', name: 'Fifth Floor' },
        { number: 6, file: '6floor.svg', name: 'Sixth Floor' }
    ];

    // Load SVG for selected floor
    useEffect(() => {
        const loadFloorSVG = async () => {
            setIsLoading(true);
            try {
                const currentFloor = floors.find(f => f.number === selectedFloor);
                if (!currentFloor) return;

                const response = await fetch(`/${currentFloor.file}`);
                
                if (response.ok) {
                    const svgText = await response.text();
                    console.log(`Floor ${selectedFloor} SVG loaded successfully, length:`, svgText.length);
                    setSvgContent(svgText);
                } else {
                    console.error(`Failed to load ${currentFloor.file}, status:`, response.status);
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
    }, [selectedFloor]);

    // Generate unit data based on floor
    const generateUnitsForFloor = (floorNumber) => {
        const startUnit = floorNumber * 100 + 1;
        const endUnit = floorNumber * 100 + 39;
        const unitNumbers = [];
        
        for (let i = startUnit; i <= endUnit; i++) {
            unitNumbers.push(i.toString());
        }

        const unitTypes = [
            {
                name: 'Studio',
                bedrooms: 0,
                bathrooms: 1,
                area_sqft: 450,
                amenities: ['In-unit laundry', 'Modern kitchen', 'City views', 'Hardwood floors']
            },
            {
                name: '1 Bedroom',
                bedrooms: 1,
                bathrooms: 1,
                area_sqft: 650,
                amenities: ['In-unit laundry', 'Modern kitchen', 'Balcony', 'City views', 'Walk-in closet']
            },
            {
                name: '2 Bedroom',
                bedrooms: 2,
                bathrooms: 2,
                area_sqft: 950,
                amenities: ['In-unit laundry', 'Modern kitchen', 'Balcony', 'City views', 'Walk-in closet', 'Master suite']
            }
        ];

        return unitNumbers.map((unitNumber, index) => {
            const unitType = unitTypes[index % unitTypes.length];
            const basePrice = floorNumber > 4 ? 200 : 0;
            const typePrice = unitType.bedrooms === 0 ? 1800 :
                unitType.bedrooms === 1 ? 2400 : 3200;
            const price = typePrice + basePrice + (index * 25) + Math.floor(Math.random() * 400);
            const isAvailable = Math.random() > 0.3;

            return {
                id: parseInt(unitNumber),
                unit_number: unitNumber,
                status: isAvailable ? 'available' : 'occupied',
                price: price,
                available_date: isAvailable ? new Date(Date.now() + Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : null,
                unit_type: unitType,
                floor: { floor_number: floorNumber },
                lease_term: isAvailable ? (Math.random() > 0.5 ? '12 months' : '6 months') : null,
                move_in_cost: isAvailable ? price + (Math.random() > 0.5 ? price : price * 0.5) : null
            };
        });
    };

    // Make SVG interactive
    useEffect(() => {
        if (svgContent && svgRef.current) {
            const svgElement = svgRef.current.querySelector('svg');
            if (!svgElement) return;

            const units = generateUnitsForFloor(selectedFloor);
            setAvailableUnits(units.filter(u => u.status === 'available'));

            const textElements = svgElement.querySelectorAll('text');
            console.log(`Floor ${selectedFloor} - Found text elements:`, textElements.length);
            
            // Clear existing interactive elements
            const existingClickAreas = svgElement.querySelectorAll('rect[data-unit-number]');
            existingClickAreas.forEach(area => area.remove());
            
            textElements.forEach((textElement) => {
                const unitNumber = textElement.textContent?.trim();
                const floorPrefix = selectedFloor.toString();
                const isUnitNumber = unitNumber && unitNumber.match(/^\d{3}$/) && unitNumber.startsWith(floorPrefix);
                
                if (isUnitNumber) {
                    const unit = units.find(u => u.unit_number === unitNumber);
                    
                    if (unit) {
                        try {
                            const bbox = textElement.getBBox();
                            const clickArea = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                            
                            const padding = 20;
                            clickArea.setAttribute('x', bbox.x - padding);
                            clickArea.setAttribute('y', bbox.y - padding);
                            clickArea.setAttribute('width', bbox.width + (padding * 2));
                            clickArea.setAttribute('height', bbox.height + (padding * 2));
                            clickArea.setAttribute('fill', 'transparent');
                            clickArea.setAttribute('data-unit-number', unit.unit_number);
                            clickArea.setAttribute('rx', '8');
                            
                            const matchesSearch = !searchTerm || unit.unit_number.toLowerCase().includes(searchTerm.toLowerCase());
                            const isFiltered = filters && !passesFilters(unit, filters);
                            
                            if (unit.status === 'available' && !isFiltered && matchesSearch) {
                                clickArea.setAttribute('fill', 'rgba(16, 185, 129, 0.3)');
                                clickArea.setAttribute('stroke', '#10B981');
                                clickArea.setAttribute('stroke-width', '2');
                                clickArea.style.cursor = 'pointer';
                                
                                textElement.style.fill = '#065F46';
                                textElement.style.fontWeight = 'bold';
                                textElement.style.fontSize = '30px';
                                
                                clickArea.addEventListener('mouseenter', (e) => {
                                    clickArea.setAttribute('fill', 'rgba(16, 185, 129, 0.5)');
                                    handleUnitHover(unit, e);
                                });

                                clickArea.addEventListener('mouseleave', () => {
                                    clickArea.setAttribute('fill', 'rgba(16, 185, 129, 0.3)');
                                    handleUnitLeave();
                                });

                                clickArea.addEventListener('click', (e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleUnitClick(unit);
                                });
                            } else {
                                clickArea.setAttribute('fill', 'rgba(107, 114, 128, 0.1)');
                                clickArea.setAttribute('stroke', '#9CA3AF');
                                clickArea.setAttribute('stroke-width', '1');
                                textElement.style.fill = '#6B7280';
                            }
                            
                            textElement.parentNode.insertBefore(clickArea, textElement);
                        } catch (error) {
                            console.warn('Error processing unit:', unitNumber, error);
                        }
                    }
                }
            });
        }
    }, [svgContent, filters, searchTerm, selectedFloor]);

    const passesFilters = (unit, filters) => {
        if (!filters) return true;
        if (filters.priceRange && (unit.price < filters.priceRange[0] || unit.price > filters.priceRange[1])) return false;
        if (filters.bedrooms && unit.unit_type?.bedrooms.toString() !== filters.bedrooms) return false;
        if (filters.squareFootage && unit.unit_type && (unit.unit_type.area_sqft < filters.squareFootage[0] || unit.unit_type.area_sqft > filters.squareFootage[1])) return false;
        return true;
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

    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex items-center justify-center" style={{ minHeight: '600px' }}>
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                        <p className="text-gray-600 font-medium">Loading Floor {selectedFloor} Plan...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Floor Selector */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Interactive Floor Plans</h2>
                        <p className="text-slate-300">Select a floor to explore available units</p>
                    </div>
                    <div className="flex space-x-2">
                        {floors.map((floor) => (
                            <button
                                key={floor.number}
                                onClick={() => setSelectedFloor(floor.number)}
                                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                                    selectedFloor === floor.number
                                        ? 'bg-emerald-500 text-white shadow-lg'
                                        : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
                                }`}
                            >
                                Floor {floor.number}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="absolute top-24 left-4 z-10">
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-3 min-w-64">
                    <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder={`Search units on floor ${selectedFloor}...`}
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

            {/* Floor Plan Canvas */}
            <div
                ref={containerRef}
                className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden"
                style={{ minHeight: '600px' }}
            >
                <div
                    ref={svgRef}
                    className="w-full h-full flex items-center justify-center p-4"
                    style={{ minHeight: '600px' }}
                    dangerouslySetInnerHTML={{ __html: svgContent }}
                />

                {hoveredUnit && (
                    <UnitTooltip
                        unit={hoveredUnit}
                        position={tooltipPosition}
                    />
                )}
            </div>

            {/* Legend */}
            <div className="bg-gradient-to-r from-gray-50 to-white border-t border-gray-200 p-6">
                <div className="flex items-center justify-center space-x-12">
                    <div className="flex items-center group">
                        <div className="w-5 h-5 bg-emerald-500 border border-emerald-600 rounded-sm mr-3 shadow-sm"></div>
                        <span className="text-sm font-semibold text-gray-700">Available Units</span>
                    </div>
                    <div className="flex items-center group">
                        <div className="w-5 h-5 bg-gray-300 border border-gray-400 rounded-sm mr-3 shadow-sm"></div>
                        <span className="text-sm font-semibold text-gray-700">Occupied Units</span>
                    </div>
                </div>

                <div className="text-center mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 font-medium">
                        Floor {selectedFloor} • James M Wood Boulevard • {availableUnits.length} Available Units
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        Click green units for details • Switch floors using buttons above
                    </p>
                </div>
            </div>

            {selectedUnit && (
                <ProfessionalUnitModal
                    unit={selectedUnit}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}