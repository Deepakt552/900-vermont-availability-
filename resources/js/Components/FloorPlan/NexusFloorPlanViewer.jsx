import React, { useState, useRef, useEffect, useCallback } from 'react';

const STATUS_COLORS = {
    available:   { fill: '#10b981', stroke: '#059669', fillOpacity: 0.55 },
    occupied:    { fill: '#ef4444', stroke: '#b91c1c', fillOpacity: 0.55 },
    maintenance: { fill: '#f59e0b', stroke: '#d97706', fillOpacity: 0.55 },
    reserved:    { fill: '#8b5cf6', stroke: '#6d28d9', fillOpacity: 0.55 },
    default:     { fill: '#93b4ab', stroke: '#6b7280', fillOpacity: 0.30 },
};

const BADGE = {
    available:   'bg-green-100 text-green-800',
    occupied:    'bg-red-100 text-red-800',
    maintenance: 'bg-yellow-100 text-yellow-800',
    reserved:    'bg-purple-100 text-purple-800',
};

export default function NexusFloorPlanViewer({
    selectedFloor = 1,
    units = [],
    onUnitClick,
    searchTerm = '',
    filters = {},
}) {
    const [svgContent, setSvgContent]   = useState('');
    const [isLoading, setIsLoading]     = useState(true);
    const [hoveredUnit, setHoveredUnit] = useState(null);
    const [tooltipPos, setTooltipPos]   = useState({ x: 0, y: 0, below: false });
    const [zoom, setZoom]               = useState(1);
    const [pan, setPan]                 = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging]   = useState(false);
    const [dragStart, setDragStart]     = useState({ x: 0, y: 0 });

    const containerRef = useRef(null);
    const svgWrapRef   = useRef(null);
    const leaveTimer   = useRef(null); // debounce timer for mouseleave

    // ── Floor unit map ────────────────────────────────────────────────────────
    const floorMap = React.useMemo(() => {
        const map = {};
        units.forEach(u => {
            if (u.floor?.floor_number === selectedFloor) map[u.unit_number] = u;
        });
        return map;
    }, [units, selectedFloor]);

    // ── Filter / search test ──────────────────────────────────────────────────
    const passes = useCallback((unit) => {
        if (!unit) return false;
        if (filters.status && filters.status !== 'all' && unit.status !== filters.status) return false;
        if (searchTerm) {
            const q = searchTerm.toLowerCase();
            if (!unit.unit_number?.toLowerCase().includes(q) &&
                !unit.unit_type?.name?.toLowerCase().includes(q)) return false;
        }
        return true;
    }, [filters, searchTerm]);

    // ── Load SVG ──────────────────────────────────────────────────────────────
    useEffect(() => {
        setIsLoading(true);
        setSvgContent('');
        setHoveredUnit(null);
        fetch(`/floorplan_level${selectedFloor}_nexus.svg`)
            .then(r => r.text())
            .then(text => { setSvgContent(text); setIsLoading(false); })
            .catch(() => setIsLoading(false));
    }, [selectedFloor]);

    // ── Dynamic CSS injected into the SVG ─────────────────────────────────────
    // Uses [data-unit="X"] { ... !important } to beat the SVG's embedded .room class
    const dynamicStyles = React.useMemo(() => {
        let css = `
/* Disable pointer events on all SVG text so labels don't block rect hover */
text, tspan { pointer-events: none !important; }
`;
        Object.entries(floorMap).forEach(([unitNum, unit]) => {
            const active = passes(unit);
            const c = STATUS_COLORS[unit.status] || STATUS_COLORS.default;
            if (active) {
                css += `
[data-unit="${unitNum}"] {
    fill: ${c.fill} !important;
    fill-opacity: ${c.fillOpacity} !important;
    stroke: ${c.stroke} !important;
    stroke-width: 1.8 !important;
    cursor: pointer !important;
}
[data-unit="${unitNum}"]:hover {
    fill-opacity: 0.82 !important;
    stroke-width: 3 !important;
}`;
            } else {
                css += `
[data-unit="${unitNum}"] {
    fill: #e5e7eb !important;
    fill-opacity: 0.5 !important;
    stroke: #d1d5db !important;
    stroke-width: 1 !important;
    cursor: default !important;
    opacity: 0.35 !important;
}`;
            }
        });
        return css;
    }, [floorMap, passes]);

    // ── Wire up hover/click events on data-unit elements ─────────────────────
    useEffect(() => {
        if (!svgContent || !svgWrapRef.current) return;
        const wrap = svgWrapRef.current;

        // Make SVG fluid
        const svgEl = wrap.querySelector('svg');
        if (svgEl) {
            svgEl.removeAttribute('width');
            svgEl.removeAttribute('height');
            svgEl.style.width  = '100%';
            svgEl.style.height = '100%';
        }

        // Clone nodes to remove old listeners, then attach fresh ones
        wrap.querySelectorAll('[data-unit]').forEach(el => {
            const unitNum = el.getAttribute('data-unit');
            const unit    = floorMap[unitNum];

            const fresh = el.cloneNode(true);
            el.parentNode.replaceChild(fresh, el);

            if (!unit || !passes(unit)) return;

            fresh.addEventListener('mouseenter', () => {
                // Cancel any pending hide
                clearTimeout(leaveTimer.current);

                // Position tooltip relative to container
                const elRect        = fresh.getBoundingClientRect();
                const cRect         = containerRef.current.getBoundingClientRect();

                const centerX = elRect.left - cRect.left + elRect.width / 2;
                const topY    = elRect.top  - cRect.top;
                const bottomY = elRect.bottom - cRect.top;

                // Flip below the unit if less than 160px from the top
                const below = topY < 160;

                setTooltipPos({ x: centerX, y: below ? bottomY : topY, below });
                setHoveredUnit(unit);
            });

            fresh.addEventListener('mouseleave', () => {
                // Small delay so moving to an adjacent element doesn't flicker
                leaveTimer.current = setTimeout(() => setHoveredUnit(null), 80);
            });

            fresh.addEventListener('click', e => {
                e.stopPropagation();
                if (onUnitClick) onUnitClick(unit);
            });
        });

        return () => clearTimeout(leaveTimer.current);
    }, [svgContent, floorMap, passes, onUnitClick]);

    // ── Inject dynamic style tag ──────────────────────────────────────────────
    useEffect(() => {
        if (!svgWrapRef.current) return;
        const svgEl = svgWrapRef.current.querySelector('svg');
        if (!svgEl) return;

        const old = svgEl.querySelector('#nexus-dynamic-style');
        if (old) old.remove();

        const styleEl = document.createElementNS('http://www.w3.org/2000/svg', 'style');
        styleEl.id          = 'nexus-dynamic-style';
        styleEl.textContent = dynamicStyles;
        svgEl.insertBefore(styleEl, svgEl.firstChild);
    }, [dynamicStyles, svgContent]);

    // ── Pan / Zoom ────────────────────────────────────────────────────────────
    const handleMouseDown = e => {
        if (e.button !== 0) return;
        setIsDragging(true);
        setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    };
    const handleMouseMove = e => {
        if (!isDragging) return;
        setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    };
    const handleMouseUp = () => setIsDragging(false);

    const zoomIn  = () => setZoom(z => Math.min(z + 0.25, 4));
    const zoomOut = () => setZoom(z => Math.max(z - 0.25, 0.4));
    const reset   = () => { setZoom(1); setPan({ x: 0, y: 0 }); };

    // ── Tooltip position: clamp so it never renders outside the container ─────
    const TOOLTIP_W = 230; // px — matches w-[230px] below
    const tooltipStyle = React.useMemo(() => {
        if (!containerRef.current) return {};
        const containerW = containerRef.current.offsetWidth;

        // Clamp X so tooltip never overflows left or right
        const half     = TOOLTIP_W / 2;
        const clampedX = Math.max(half + 8, Math.min(tooltipPos.x, containerW - half - 8));

        if (tooltipPos.below) {
            return { left: clampedX, top: tooltipPos.y + 10, transform: 'translateX(-50%)' };
        }
        return { left: clampedX, top: tooltipPos.y, transform: 'translate(-50%, calc(-100% - 10px))' };
    }, [tooltipPos]);

    return (
        <div
            className="w-full bg-white rounded-lg border border-gray-300 overflow-hidden shadow-sm flex flex-col"
            style={{ height: 650 }}
        >
            {/* ── Toolbar ── */}
            <div className="px-5 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">
                        Level {selectedFloor} — Interactive Blueprint
                    </span>
                </div>
                <div className="flex gap-1.5">
                    {[
                        { label: '+', action: zoomIn,  title: 'Zoom In'  },
                        { label: '−', action: zoomOut, title: 'Zoom Out' },
                        { label: '⟳', action: reset,   title: 'Reset View' },
                    ].map(({ label, action, title }) => (
                        <button
                            key={title}
                            onClick={action}
                            title={title}
                            className="w-8 h-8 bg-white border border-gray-300 rounded text-gray-700 font-bold text-sm hover:bg-gray-100 active:scale-95 transition-all select-none"
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Canvas ── */}
            <div
                ref={containerRef}
                className="flex-1 relative bg-[#f8f9fa]"
                style={{ cursor: isDragging ? 'grabbing' : 'grab', overflow: 'hidden' }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {/* Loading */}
                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-20">
                        <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
                        <p className="mt-3 text-sm font-medium text-gray-500">Loading blueprint…</p>
                    </div>
                )}

                {/* SVG — transformed for zoom/pan */}
                <div
                    ref={svgWrapRef}
                    style={{
                        transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                        transformOrigin: '0 0',
                        transition: isDragging ? 'none' : 'transform .15s ease-out',
                        width: '100%',
                        height: '100%',
                        userSelect: 'none',
                    }}
                    dangerouslySetInnerHTML={{ __html: svgContent }}
                />

                {/* ── Tooltip — rendered in the container (not inside the transformed SVG div) ── */}
                {hoveredUnit && (
                    <div
                        className="pointer-events-none absolute z-40 bg-white border border-gray-200 rounded-xl shadow-2xl p-4"
                        style={{ ...tooltipStyle, width: TOOLTIP_W }}
                        // Re-cancel the leave timer when mouse is over the tooltip area
                        onMouseEnter={() => clearTimeout(leaveTimer.current)}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                            <span className="font-bold text-black text-base">
                                APT {hoveredUnit.unit_number}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold capitalize ${BADGE[hoveredUnit.status] || 'bg-gray-100 text-gray-700'}`}>
                                {hoveredUnit.status}
                            </span>
                        </div>

                        {/* Details */}
                        <div className="space-y-1.5 text-xs">
                            <div className="flex justify-between text-gray-600">
                                <span className="text-gray-400 font-medium">Type</span>
                                <span className="font-semibold">{hoveredUnit.unit_type?.name || '—'}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span className="text-gray-400 font-medium">Beds / Baths</span>
                                <span className="font-semibold">
                                    {hoveredUnit.unit_type?.bedrooms ?? '—'}BR / {hoveredUnit.unit_type?.bathrooms ?? '—'}BA
                                </span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span className="text-gray-400 font-medium">Area</span>
                                <span className="font-semibold">
                                    {hoveredUnit.unit_type?.area_sqft
                                        ? `${hoveredUnit.unit_type.area_sqft.toLocaleString()} sq ft`
                                        : '—'}
                                </span>
                            </div>
                            <div className="flex justify-between text-gray-700 pt-1.5 mt-1 border-t border-gray-100">
                                <span className="font-semibold text-gray-500">Monthly Rent</span>
                                <span className="font-bold text-green-600">
                                    ${parseFloat(hoveredUnit.price || 0).toLocaleString()}/mo
                                </span>
                            </div>
                        </div>

                        {/* Hint */}
                        <p className="text-center text-[10px] text-gray-400 mt-2.5">Click to edit unit</p>

                        {/* Arrow caret */}
                        {!tooltipPos.below && (
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-[-6px] w-3 h-3 bg-white border-b border-r border-gray-200 rotate-45" />
                        )}
                        {tooltipPos.below && (
                            <div className="absolute left-1/2 -translate-x-1/2 top-[-6px] w-3 h-3 bg-white border-t border-l border-gray-200 rotate-45" />
                        )}
                    </div>
                )}
            </div>

            {/* ── Legend ── */}
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center gap-6 shrink-0">
                {[
                    { color: 'bg-green-500',  label: 'Available'    },
                    { color: 'bg-red-500',    label: 'Occupied'     },
                    { color: 'bg-yellow-400', label: 'Maintenance'  },
                    { color: 'bg-purple-500', label: 'Reserved'     },
                ].map(({ color, label }) => (
                    <div key={label} className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded ${color}`} />
                        <span className="text-sm text-gray-600">{label}</span>
                    </div>
                ))}
                <span className="ml-auto text-xs text-gray-400 hidden sm:block">
                    Drag to pan · +/− to zoom · Click unit to edit
                </span>
            </div>
        </div>
    );
}
