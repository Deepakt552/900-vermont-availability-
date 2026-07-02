import React, { useState, useEffect } from 'react';
import UnitModal from './FloorPlan/UnitModal';

const InteractiveFloorPlan = ({ units = [], selectedFloor = 2, showLegend = true, className = '' }) => {
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filter units for the selected floor
    const floorUnits = units.filter(unit =>
        unit.floor && unit.floor.floor_number === selectedFloor
    );

    // Create a map of unit numbers to unit data for quick lookup
    const unitMap = floorUnits.reduce((acc, unit) => {
        acc[unit.unit_number] = unit;
        return acc;
    }, {});

    // Function to get unit color based on status
    const getUnitColor = (unitNumber) => {
        const unit = unitMap[unitNumber];
        if (!unit) return '#93b4ab'; // Default gray-green for unknown units

        switch (unit.status) {
            case 'available':
                return '#10b981'; // Green for available units
            case 'occupied':
                return '#ef4444'; // Red for occupied units
            case 'maintenance':
                return '#f59e0b'; // Yellow for maintenance
            default:
                return '#6b7280'; // Gray for other statuses
        }
    };

    const handleUnitClick = (unitNumber) => {
        const unit = unitMap[unitNumber];
        if (unit) {
            setSelectedUnit(unit);
            setIsModalOpen(true);
        } else {
            // If no unit data available, create a basic unit object
            setSelectedUnit({ unit_number: unitNumber, status: 'available' });
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUnit(null);
    };

    // Helper function to generate structural elements (common areas only)
    const getStructuralElements = () => (
        <>
            {/* Stairs/Elevators */}
            <path className="cls-2" d="M437.14,424.35V524.71h46.7V424.35Zm27.5,74.47h-8.3V448.35h8.3Z" />
            <rect className="cls-2" x="437.14" y="448.35" width="19.2" height="6.31" />
            <rect className="cls-2" x="464.64" y="448.35" width="19.2" height="6.31" />
            <rect className="cls-2" x="437.14" y="454.66" width="19.2" height="6.31" />
            <rect className="cls-2" x="464.64" y="454.66" width="19.2" height="6.31" />
            <rect className="cls-2" x="437.14" y="460.97" width="19.2" height="6.31" />
            <rect className="cls-2" x="464.64" y="460.97" width="19.2" height="6.31" />
            <rect className="cls-2" x="437.14" y="467.28" width="19.2" height="6.31" />
            <rect className="cls-2" x="464.64" y="467.28" width="19.2" height="6.31" />
            <rect className="cls-2" x="437.14" y="473.59" width="19.2" height="6.31" />
            <rect className="cls-2" x="464.64" y="473.59" width="19.2" height="6.31" />
            <rect className="cls-2" x="437.14" y="479.9" width="19.2" height="6.31" />
            <rect className="cls-2" x="464.64" y="479.9" width="19.2" height="6.31" />
            <rect className="cls-2" x="437.14" y="486.21" width="19.2" height="6.3" />
            <rect className="cls-2" x="464.64" y="486.21" width="19.2" height="6.3" />
            <rect className="cls-2" x="437.14" y="492.51" width="19.2" height="6.31" />
            <rect className="cls-2" x="464.64" y="492.51" width="19.2" height="6.31" />
            <rect className="cls-2" x="456.34" y="448.35" width="8.3" height="50.47" />
            
            {/* Common areas and corridors */}
            <rect className="cls-3" x="459.75" y="365.88" width="24.09" height="58.47" />
            <rect className="cls-3" x="541.14" y="365.88" width="52" height="28.24" />
            <rect className="cls-2" x="890.78" y="459.53" width="46.47" height="38.12" />
            <rect className="cls-2" x="937.25" y="459.53" width="46.47" height="38.12" />
            <rect className="cls-2" x="827.08" y="584.06" width="30.35" height="44.41" />
            <rect className="cls-2" x="279.84" y="175.88" width="28.24" height="71.65" />
            <rect className="cls-2" x="1187.96" y="387.29" width="30.59" height="44.11" />
            <rect className="cls-2" x="827.08" y="700.47" width="30.35" height="46.03" />
            <rect className="cls-2" x="1615.72" y="389.06" width="29.29" height="42.23" />
            <rect className="cls-2" x="1614.14" y="172.71" width="30.88" height="44.29" />
            
            {/* Mechanical/Building systems */}
            <rect className="cls-6" x="890.78" y="365.88" width="23.77" height="53.18" />
            <rect className="cls-6" x="960.55" y="365.88" width="23.17" height="53.18" />
            <rect className="cls-6" x="914.55" y="389.06" width="46" height="7.65" />
            <rect className="cls-6" x="914.55" y="365.88" width="5.75" height="23.18" />
            <rect className="cls-6" x="914.55" y="396.71" width="5.75" height="22.35" />
            <rect className="cls-6" x="920.3" y="365.88" width="5.75" height="23.18" />
            <rect className="cls-6" x="920.3" y="396.71" width="5.75" height="22.35" />
            <rect className="cls-6" x="926.05" y="365.88" width="5.75" height="23.18" />
            <rect className="cls-6" x="926.05" y="396.71" width="5.75" height="22.35" />
            <rect className="cls-6" x="931.8" y="365.88" width="5.75" height="23.18" />
            <rect className="cls-6" x="931.8" y="396.71" width="5.75" height="22.35" />
            <rect className="cls-6" x="937.55" y="365.88" width="5.75" height="23.18" />
            <rect className="cls-6" x="937.55" y="396.71" width="5.75" height="22.35" />
            <rect className="cls-6" x="943.3" y="365.88" width="5.75" height="23.18" />
            <rect className="cls-6" x="943.3" y="396.71" width="5.75" height="22.35" />
            <rect className="cls-6" x="949.05" y="365.88" width="5.75" height="23.18" />
            <rect className="cls-6" x="949.05" y="396.71" width="5.75" height="22.35" />
            <rect className="cls-6" x="954.8" y="365.88" width="5.75" height="23.18" />
            <rect className="cls-6" x="954.8" y="396.71" width="5.75" height="22.35" />
            
            {/* Stairs elements */}
            <rect className="cls-2" x="1727.25" y="455.91" width="48.53" height="19.27" />
            <rect className="cls-2" x="1727.25" y="431.29" width="48.53" height="19.27" />
            <rect className="cls-2" x="1727.25" y="431.29" width="6.07" height="19.27" />
            <rect className="cls-2" x="1727.25" y="455.91" width="6.07" height="19.27" />
            <rect className="cls-2" x="1733.32" y="431.29" width="6.07" height="19.27" />
            <rect className="cls-2" x="1733.32" y="455.91" width="6.07" height="19.27" />
            <rect className="cls-2" x="1739.39" y="431.29" width="6.06" height="19.27" />
            <rect className="cls-2" x="1739.39" y="455.91" width="6.06" height="19.27" />
            <rect className="cls-2" x="1745.45" y="431.29" width="6.07" height="19.27" />
            <rect className="cls-2" x="1745.45" y="455.91" width="6.07" height="19.27" />
            <rect className="cls-2" x="1751.52" y="431.29" width="6.06" height="19.27" />
            <rect className="cls-2" x="1751.52" y="455.91" width="6.06" height="19.27" />
            <rect className="cls-2" x="1757.58" y="431.29" width="6.07" height="19.27" />
            <rect className="cls-2" x="1757.58" y="455.91" width="6.07" height="19.27" />
            <rect className="cls-2" x="1763.65" y="431.29" width="6.07" height="19.27" />
            <rect className="cls-2" x="1763.65" y="455.91" width="6.07" height="19.27" />
            <rect className="cls-2" x="1769.72" y="431.29" width="6.06" height="19.27" />
            <rect className="cls-2" x="1769.72" y="455.91" width="6.06" height="19.27" />
            <rect className="cls-2" x="1775.78" y="431.29" width="22.59" height="43.89" />
            <rect className="cls-2" x="1702.02" y="431.29" width="25.23" height="43.89" />
            <rect className="cls-2" x="1727.25" y="450.56" width="48.53" height="5.35" />
            
            {/* Direction indicator */}
            <path d="M2050.27,741.5v41.71l-19.11,22.09,19.11-63.8m1-6.7-22.35,74.61,22.35-25.84V734.8Z" />
            <polyline points="2051.25 783.57 2073.61 809.41 2051.25 734.8" />
        </>
    );

    // Common styles for all floor SVGs
    const commonSVGStyles = `
        .cls-4 { cursor: pointer; }
        .cls-4:hover { opacity: 0.8; }
        .cls-1{fill:#eaeaea;}
        .cls-1,.cls-2,.cls-3,.cls-4,.cls-5,.cls-6,.cls-7{stroke:#000;stroke-miterlimit:10;}
        .cls-2,.cls-6{fill:#fff;}
        .cls-3{fill:#d7d7d7;}
        .cls-4{fill:#93b4ab;}
        .cls-5{fill:none;}
        .cls-6{stroke-width:0.94px;}
        .cls-7{fill:#f4f4f4;}
        .cls-13,.cls-8{font-size:25px;}
        .cls-8{font-family:Calibri-Bold, Calibri;font-weight:700;}
        .cls-9{letter-spacing:-0.02em;}
        .cls-10{letter-spacing:-0.01em;}
        .cls-11{letter-spacing:-0.01em;}
        .cls-12{letter-spacing:-0.05em;}
        .cls-13,.cls-14,.cls-15{font-family:Calibri;}
        .cls-14{font-size:50.92px;}
        .cls-15{font-size:21.6px;}
        .cls-16{letter-spacing:-0.05em;}
        .cls-17{letter-spacing:-0.05em;}
        .cls-18{letter-spacing:0em;}
    `;

    // Function to create units for any floor - FIXED COORDINATES
    const createFloorUnits = (floorNumber) => {
        const unitPrefix = floorNumber.toString();
        
        return (
            <>
                {/* Unit X01 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}01`)} style={{ cursor: 'pointer' }}>
                    <polygon className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}01`) }} points="317.84 335.29 317.84 412.94 205.84 412.94 205.84 247.53 308.08 247.53 308.08 335.29 317.84 335.29" />
                </g>

                {/* Unit X02 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}02`)} style={{ cursor: 'pointer' }}>
                    <polygon className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}02`) }} points="346.72 365.88 346.72 436.88 342.31 436.88 342.31 549.88 205.84 549.88 205.84 412.94 317.84 412.94 317.84 365.88 346.72 365.88" />
                </g>

                {/* Unit X03 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}03`)} style={{ cursor: 'pointer' }}>
                    <polygon className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}03`) }} points="437.14 365.88 437.14 516.82 390.66 516.82 390.66 524.71 342.31 524.71 342.31 436.88 346.72 436.88 346.72 365.88 437.14 365.88" />
                    <rect className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}03`) }} x="390.66" y="516.82" width="46.48" height="27.53" />
                </g>

                {/* Unit X04 - FIXED: No overlap */}
                <g onClick={() => handleUnitClick(`${unitPrefix}04`)} style={{ cursor: 'pointer' }}>
                    <rect className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}04`) }} x="496.19" y="516.82" width="44" height="27.53" />
                </g>

                {/* Unit X05 - FIXED: Adjusted coordinates to not overlap with X04 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}04`)} style={{ cursor: 'pointer' }}>
                    <polygon className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}05`) }} points="593.14 394.12 593.14 536.47 540.19 536.47 540.19 516.82 540.19 544.35 483.84 544.35 483.84 365.88 541.14 365.88 541.14 394.12 593.14 394.12" />
                </g>

                {/* Unit X06 - FIXED: Adjusted coordinates */}
                <g onClick={() => handleUnitClick(`${unitPrefix}05`)} style={{ cursor: 'pointer' }}>
                    <polygon className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}06`) }} points="704.43 365.88 704.43 524.71 648.9 524.71 648.9 536.47 593.14 536.47 593.14 394.12 593.14 365.88 704.43 365.88" />
                </g>

                {/* Unit X07 - FIXED: Adjusted coordinates */}
                <g onClick={() => handleUnitClick(`${unitPrefix}06`)} style={{ cursor: 'pointer' }}>
                    <polygon className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}07`) }} points="796.19 365.88 796.19 514.35 751.96 514.35 751.96 543.53 704.43 543.53 704.43 524.71 704.43 365.88 796.19 365.88" />
                    <rect className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}07`) }} x="751.96" y="514.35" width="44.23" height="29.18" />
                </g>

                {/* Unit X08 - FIXED: Separated from mechanical systems */}
                <g onClick={() => handleUnitClick(`${unitPrefix}07`)} style={{ cursor: 'pointer' }}>
                    <polygon className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}08`) }} points="890.78 365.88 890.78 419.06 890.78 497.65 848.08 497.65 848.08 524.71 796.19 524.71 796.19 514.35 796.19 365.88 890.78 365.88" />
                </g>

                {/* Unit X09 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}08`)} style={{ cursor: 'pointer' }}>
                   
                    <polygon className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}09`) }} points="983.72 497.65 983.72 628.47 857.43 628.47 857.43 584.06 848.08 584.06 848.08 497.65 983.72 497.65" />
                </g>
                <g onClick={() => handleUnitClick(`${unitPrefix}09`)} style={{ cursor: 'pointer' }}>
                <polygon className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}09`) }} points="1023.96 628.47 1023.96 746.5 857.43 746.5 857.43 700.47 848.08 700.47 848.08 628.47 1023.96 628.47" />
                </g>

                {/* Unit X10 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}10`)} style={{ cursor: 'pointer' }}>
                    <rect className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}10`) }} x="1023.96" y="628.47" width="110.82" height="118.03" />
                </g>

                {/* Unit X11 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}11`)} style={{ cursor: 'pointer' }}>
                    <polygon className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}11`) }} points="1247.25 649.71 1247.25 772.94 1201.14 772.94 1201.14 746.5 1134.78 746.5 1134.78 628.47 1214.61 628.47 1214.61 649.71 1247.25 649.71" />
                    <polygon className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}11`) }} points="1263.84 628.47 1263.84 661.53 1247.25 661.53 1247.25 649.71 1214.61 649.71 1214.61 628.47 1263.84 628.47" />
                </g>

                {/* Unit X12 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}12`)} style={{ cursor: 'pointer' }}>
                    <polygon className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}12`) }} points="1363.72 646.82 1363.72 772.94 1247.25 772.94 1247.25 661.53 1263.84 661.53 1263.84 646.82 1363.72 646.82" />
                </g>

                {/* Unit X13 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}13`)} style={{ cursor: 'pointer' }}>
                    <rect className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}13`) }} x="1363.72" y="646.82" width="114.18" height="126.12" />
                </g>

                {/* Unit X14 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}14`)} style={{ cursor: 'pointer' }}>
                    <rect className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}14`) }} x="1477.9" y="646.82" width="115.24" height="126.12" />
                </g>

                {/* Unit X15 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}15`)} style={{ cursor: 'pointer' }}>
                    <rect className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}15`) }} x="1593.14" y="646.82" width="112.94" height="126.12" />
                </g>

                {/* Unit X16 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}16`)} style={{ cursor: 'pointer' }}>
                    <rect className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}16`) }} x="1706.08" y="646.82" width="116.64" height="126.12" />
                </g>

                {/* Unit X17 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}17`)} style={{ cursor: 'pointer' }}>
                    <rect className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}17`) }} x="1822.72" y="646.82" width="117.88" height="126.12" />
                    <polygon className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}17`) }} points="2002.72 683.41 2002.72 801.65 1820.96 801.65 1820.96 772.94 1822.72 772.94 1822.72 646.82 1855.02 646.82 1855.02 683.41 2002.72 683.41" />
                </g>

                {/* Unit X18 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}18`)} style={{ cursor: 'pointer' }}>
                    <polygon className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}18`) }} points="2002.72 568.71 2002.72 683.41 1855.02 683.41 1855.02 624.16 1820.96 624.16 1820.96 568.71 2002.72 568.71" />
                </g>

                {/* Unit X19 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}19`)} style={{ cursor: 'pointer' }}>
                    <rect className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}19`) }} x="1820.96" y="454.18" width="150.88" height="114.53" />
                    <rect className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}19`) }} x="1971.84" y="372.47" width="30.88" height="195.24" />
                    <polygon className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}19`) }} points="2002.72 272.24 2002.72 568.71 1971.84 568.71 1971.84 289.65 1902.75 289.65 1902.75 272.24 2002.72 272.24" />
                </g>

                {/* Unit X20 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}20`)} style={{ cursor: 'pointer' }}>
                    <rect className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}20`) }} x="1820.96" y="372.47" width="150.88" height="81.71" />
                </g>

                {/* Unit X21 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}21`)} style={{ cursor: 'pointer' }}>
                    <rect className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}21`) }} x="1820.96" y="289.65" width="150.88" height="82.82" />
                </g>

                {/* Unit X22 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}22`)} style={{ cursor: 'pointer' }}>
                    <rect className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}22`) }} x="1757.78" y="172.71" width="144.97" height="116.94" />
                    <polygon className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}22`) }} points="1798.37 289.65 1798.37 319.53 1645.02 319.53 1645.02 172.71 1757.78 172.71 1757.78 289.65 1798.37 289.65" />
                </g>

                {/* Unit X23 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}23`)} style={{ cursor: 'pointer' }}>
                    <rect className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}23`) }} x="1645.02" y="172.71" width="112.76" height="146.82" />
                </g>

                {/* Unit X24 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}24`)} style={{ cursor: 'pointer' }}>
                    <rect className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}24`) }} x="1645.02" y="319.53" width="153.35" height="111.76" />
                </g>

                {/* Unit X25 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}25`)} style={{ cursor: 'pointer' }}>
                    <rect className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}25`) }} x="1602.66" y="431.29" width="99.36" height="123.87" />
                    <rect className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}25`) }} x="1750.02" y="516.94" width="43.94" height="38.18" />
                    <rect className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}25`) }} x="1755.49" y="555.12" width="38.47" height="69.04" />
                    <polygon className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}25`) }} points="1755.49 555.12 1755.49 624.16 1488.66 624.16 1488.66 496 1602.66 496 1602.66 500.41 1634.08 500.41 1634.08 431.29 1702.02 431.29 1702.02 475.18 1750.02 475.18 1750.02 555.12 1755.49 555.12" />
                    <polyline className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}25`) }} points="1602.66 501.65 1602.66 551.41 1656.31 551.41 1656.31 624.16" />
                </g>

                {/* Unit X26 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}26`)} style={{ cursor: 'pointer' }}>
                    <rect className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}26`) }} x="1488.66" y="496" width="113.34" height="128.16" />
                    <rect className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}26`) }} x="1503.49" y="469.18" width="42.17" height="26.82" />
                </g>

                {/* Unit X27 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}27`)} style={{ cursor: 'pointer' }}>
                    <rect className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}27`) }} x="1373.78" y="496" width="114.88" height="128.16" />
                    <rect className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}27`) }} x="1426.9" y="469.18" width="42.18" height="26.82" />
                </g>

                {/* Unit X28 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}28`)} style={{ cursor: 'pointer' }}>
                    <polygon className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}28`) }} points="1373.78 496 1373.78 624.16 1287.14 624.16 1287.14 602.76 1258.55 602.76 1258.55 496 1373.78 496" />
                    <rect className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}28`) }} x="1281.37" y="469.18" width="42.18" height="26.82" />
                </g>

                {/* Unit X29 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}29`)} style={{ cursor: 'pointer' }}>
                    <polygon className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}29`) }} points="1258.55 496 1258.55 602.76 1100.19 602.76 1100.19 534.71 1134.31 500.2 1134.31 501.88 1215.02 501.88 1215.02 496 1258.55 496" />
                    <rect className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}29`) }} x="1215.02" y="469.65" width="43.53" height="26.35" />
                </g>

                {/* Unit X30 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}30`)} style={{ cursor: 'pointer' }}>
                    <polygon className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}30`) }} points="1134.78 431.41 1134.78 501.88 1134.31 501.88 1134.31 500.2 1100.19 534.71 1100.19 602.76 1010.08 602.76 1010.08 431.41 1134.78 431.41" />
                </g>

                {/* Unit X31 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}31`)} style={{ cursor: 'pointer' }}>
                    <polygon className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}31`) }} points="1218.55 343.18 1218.55 431.41 1010.08 431.41 1010.08 367.71 1126.55 367.71 1126.55 343.18 1218.55 343.18" />
                    <polygon className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}31`) }} points="1218.55 175.88 1218.55 343.18 1126.55 343.18 1126.55 367.71 1084.9 367.71 1084.9 175.88 1218.55 175.88" />
                    <rect className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}31`) }} x="1218.55" y="175.88" width="30.35" height="41.06" />
                </g>

                {/* Unit X32 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}32`)} style={{ cursor: 'pointer' }}>
                    <rect className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}32`) }} x="1084.9" y="175.88" width="133.65" height="167.3" />
                </g>

                {/* Unit X33 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}33`)} style={{ cursor: 'pointer' }}>
                    <rect className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}33`) }} x="970.31" y="175.88" width="114.59" height="167.3" />
                </g>

                {/* Unit X34 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}34`)} style={{ cursor: 'pointer' }}>
                    <rect className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}34`) }} x="855.49" y="175.88" width="114.82" height="167.3" />
                </g>

                {/* Unit X35 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}35`)} style={{ cursor: 'pointer' }}>
                    <rect className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}35`) }} x="741.96" y="175.88" width="113.53" height="167.3" />
                </g>

                {/* Unit X36 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}36`)} style={{ cursor: 'pointer' }}>
                    <rect className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}36`) }} x="626.08" y="175.88" width="115.88" height="167.3" />
                </g>

                {/* Unit X37 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}37`)} style={{ cursor: 'pointer' }}>
                    <rect className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}37`) }} x="538.49" y="175.88" width="87.59" height="167.3" />
                </g>

                {/* Unit X38 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}38`)} style={{ cursor: 'pointer' }}>
                    <polygon className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}38`) }} points="538.49 175.88 538.49 343.18 423.61 343.18 423.61 207.18 471.02 207.18 471.02 175.88 538.49 175.88" />
                    <rect className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}38`) }} x="423.61" y="175.88" width="47.41" height="31.3" />
                </g>

                {/* Unit X39 */}
                <g onClick={() => handleUnitClick(`${unitPrefix}39`)} style={{ cursor: 'pointer' }}>
                    <polygon className="cls-4" style={{ fill: getUnitColor(`${unitPrefix}39`) }} points="423.61 175.88 423.61 343.18 317.84 343.18 317.84 335.29 308.08 335.29 308.08 175.88 423.61 175.88" />
                </g>
            </>
        );
    };

    // Function to create unit labels for any floor
    const createFloorLabels = (floorNumber) => {
        const unitPrefix = floorNumber.toString();
        
        return (
            <>
                <text className="cls-13" transform="translate(237.37 339.88)">{unitPrefix}01</text>
                <text className="cls-13" transform="translate(255.02 495.67)">{unitPrefix}02</text>
                <text className="cls-13" transform="translate(373.61 464.13)">{unitPrefix}03</text>
                <text className="cls-13" transform="translate(518.19 457.81)">{unitPrefix}04</text>
                <text className="cls-13" transform="translate(632.07 451.18)">{unitPrefix}05</text>
                <text className="cls-13" transform="translate(733.25 451.18)">{unitPrefix}06</text>
                <text className="cls-13" transform="translate(825.01 451.18)">{unitPrefix}07</text>
                <text className="cls-13" transform="translate(899.13 572.65)">{unitPrefix}08</text>
                <text className="cls-13" transform="translate(920.3 696.41)">{unitPrefix}09</text>
                <text className="cls-13" transform="translate(1061.48 696.64)">{unitPrefix}10</text>
                <text className="cls-13" transform="translate(1171.59 704.05)">{unitPrefix}11</text>
                <text className="cls-13" transform="translate(1286.3 718.87)">{unitPrefix}12</text>
                <text className="cls-13" transform="translate(1402.77 718.87)">{unitPrefix}13</text>
                <text className="cls-13" transform="translate(1517.12 718.87)">{unitPrefix}14</text>
                <text className="cls-13" transform="translate(1632.18 718.87)">{unitPrefix}15</text>
                <text className="cls-13" transform="translate(1746.89 718.87)">{unitPrefix}16</text>
                <text className="cls-13" transform="translate(1895.2 750.82)">{unitPrefix}17</text>
                <text className="cls-13" transform="translate(1909.55 634.82)">{unitPrefix}18</text>
                <text className="cls-13" transform="translate(1882.73 520.82)">{unitPrefix}19</text>
                <text className="cls-13" transform="translate(1882.73 422.71)">{unitPrefix}20</text>
                <text className="cls-13" transform="translate(1882.73 341.88)">{unitPrefix}21</text>
                <text className="cls-13" transform="translate(1810.73 239.7)">{unitPrefix}22</text>
                <text className="cls-13" transform="translate(1680.84 255.73)">{unitPrefix}23</text>
                <text className="cls-13" transform="translate(1702.02 384.67)">{unitPrefix}24</text>
                <text className="cls-13" transform="translate(1672.06 527.73)">{unitPrefix}25</text>
                <text className="cls-13" transform="translate(1529.24 565.34)">{unitPrefix}26</text>
                <text className="cls-13" transform="translate(1413.83 565.34)">{unitPrefix}27</text>
                <text className="cls-13" transform="translate(1299.12 565.34)">{unitPrefix}28</text>
                <text className="cls-13" transform="translate(1165.01 565.34)">{unitPrefix}29</text>
                <text className="cls-13" transform="translate(1040.3 517.09)">{unitPrefix}30</text>
                <text className="cls-13" transform="translate(1087.83 409.35)">{unitPrefix}31</text>
                <text className="cls-13" transform="translate(1130.65 268.59)">{unitPrefix}32</text>
                <text className="cls-13" transform="translate(1010.08 268.59)">{unitPrefix}33</text>
                <text className="cls-13" transform="translate(895.11 268.59)">{unitPrefix}34</text>
                <text className="cls-13" transform="translate(782.98 268.59)">{unitPrefix}35</text>
                <text className="cls-13" transform="translate(668.74 268.59)">{unitPrefix}36</text>
                <text className="cls-13" transform="translate(563.67 268.59)">{unitPrefix}37</text>
                <text className="cls-13" transform="translate(460.49 268.59)">{unitPrefix}38</text>
                <text className="cls-13" transform="translate(346.72 268.59)">{unitPrefix}39</text>
            </>
        );
    };

    // Floor 2 SVG component
    const Floor2SVG = () => (
        <div style={{ width: '100%', height: 'auto' }}>
            <style>{commonSVGStyles}</style>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2234.55 1080" style={{ width: '100%', height: 'auto' }}>
                <g id="Layer_2" data-name="Layer 2">
                    <path className="cls-1" d="M2105.61,47.29v78.12H178.08s-30.59,2.35-30.59,33.88V846.82H66.08V143.76s2.82-23.52-18.83-34.35c-11-5.52-30.68-12-47.25-17.07V9.43C13.76,19.06,46.68,36.35,67.69,0h81.73c-2.4,11.68-4.95,38.88,20.66,47.29Z" />
                    {getStructuralElements()}
                    {createFloorUnits(2)}
                </g>
                <g id="Layer_3" data-name="Layer 3">
                    <text className="cls-8" transform="translate(902.66 99.53)">
                        <tspan className="cls-9">J</tspan>
                        <tspan x="7.73" y="0">AM</tspan>
                        <tspan className="cls-10" x="44.73" y="0">E</tspan>
                        <tspan x="56.68" y="0">S M </tspan>
                        <tspan className="cls-11" x="101.65" y="0">W</tspan>
                        <tspan x="124" y="0">OOD BOULE</tspan>
                        <tspan className="cls-12" x="249.23" y="0">V</tspan>
                        <tspan x="262.68" y="0">ARD</tspan>
                    </text>
                    {createFloorLabels(2)}
                    <text className="cls-14" transform="translate(2035.67 716.6)">N</text>
                    <text className="cls-8" transform="translate(115.74 661.53) rotate(-90)">
                        SOUTH VERMONT <tspan className="cls-16" x="193.15" y="0">A</tspan>
                        <tspan className="cls-17" x="207.02" y="0">V</tspan>
                        <tspan className="cls-18" x="220.47" y="0">ANUE</tspan>
                    </text>
                </g>
            </svg>
        </div>
    );

    // Floor 3 SVG component
    const Floor3SVG = () => (
        <div style={{ width: '100%', height: 'auto' }}>
            <style>{commonSVGStyles}</style>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2234.55 1080" style={{ width: '100%', height: 'auto' }}>
                <g id="Layer_2" data-name="Layer 2">
                    <path className="cls-1" d="M2105.61,47.29v78.12H178.08s-30.59,2.35-30.59,33.88V846.82H66.08V143.76s2.82-23.52-18.83-34.35c-11-5.52-30.68-12-47.25-17.07V9.43C13.76,19.06,46.68,36.35,67.69,0h81.73c-2.4,11.68-4.95,38.88,20.66,47.29Z" />
                    {getStructuralElements()}
                    {createFloorUnits(3)}
                </g>
                <g id="Layer_3" data-name="Layer 3">
                    <text className="cls-8" transform="translate(902.66 99.53)">Floor 3 - Units 301-339</text>
                    {createFloorLabels(3)}
                    <text className="cls-14" transform="translate(2035.67 716.6)">N</text>
                    <text className="cls-8" transform="translate(115.74 661.53) rotate(-90)">
                        SOUTH VERMONT <tspan className="cls-16" x="193.15" y="0">A</tspan>
                        <tspan className="cls-17" x="207.02" y="0">V</tspan>
                        <tspan className="cls-18" x="220.47" y="0">ANUE</tspan>
                    </text>
                </g>
            </svg>
        </div>
    );

    // Floor 4 SVG component
    const Floor4SVG = () => (
        <div style={{ width: '100%', height: 'auto' }}>
            <style>{commonSVGStyles}</style>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2234.55 1080" style={{ width: '100%', height: 'auto' }}>
                <g id="Layer_2" data-name="Layer 2">
                    <path className="cls-1" d="M2105.61,47.29v78.12H178.08s-30.59,2.35-30.59,33.88V846.82H66.08V143.76s2.82-23.52-18.83-34.35c-11-5.52-30.68-12-47.25-17.07V9.43C13.76,19.06,46.68,36.35,67.69,0h81.73c-2.4,11.68-4.95,38.88,20.66,47.29Z" />
                    {getStructuralElements()}
                    {createFloorUnits(4)}
                </g>
                <g id="Layer_3" data-name="Layer 3">
                    <text className="cls-8" transform="translate(902.66 99.53)">Floor 4 - Units 401-439</text>
                    {createFloorLabels(4)}
                    <text className="cls-14" transform="translate(2035.67 716.6)">N</text>
                    <text className="cls-8" transform="translate(115.74 661.53) rotate(-90)">
                        SOUTH VERMONT <tspan className="cls-16" x="193.15" y="0">A</tspan>
                        <tspan className="cls-17" x="207.02" y="0">V</tspan>
                        <tspan className="cls-18" x="220.47" y="0">ANUE</tspan>
                    </text>
                </g>
            </svg>
        </div>
    );

    // Floor 5 SVG component
    const Floor5SVG = () => (
        <div style={{ width: '100%', height: 'auto' }}>
            <style>{commonSVGStyles}</style>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2234.55 1080" style={{ width: '100%', height: 'auto' }}>
                <g id="Layer_2" data-name="Layer 2">
                    <path className="cls-1" d="M2105.61,47.29v78.12H178.08s-30.59,2.35-30.59,33.88V846.82H66.08V143.76s2.82-23.52-18.83-34.35c-11-5.52-30.68-12-47.25-17.07V9.43C13.76,19.06,46.68,36.35,67.69,0h81.73c-2.4,11.68-4.95,38.88,20.66,47.29Z" />
                    {getStructuralElements()}
                    {createFloorUnits(5)}
                </g>
                <g id="Layer_3" data-name="Layer 3">
                    <text className="cls-8" transform="translate(902.66 99.53)">Floor 5 - Units 501-539</text>
                    {createFloorLabels(5)}
                    <text className="cls-14" transform="translate(2035.67 716.6)">N</text>
                    <text className="cls-8" transform="translate(115.74 661.53) rotate(-90)">
                        SOUTH VERMONT <tspan className="cls-16" x="193.15" y="0">A</tspan>
                        <tspan className="cls-17" x="207.02" y="0">V</tspan>
                        <tspan className="cls-18" x="220.47" y="0">ANUE</tspan>
                    </text>
                </g>
            </svg>
        </div>
    );

    // Floor 6 SVG component
    const Floor6SVG = () => (
        <div style={{ width: '100%', height: 'auto' }}>
            <style>{commonSVGStyles}</style>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2234.55 1080" style={{ width: '100%', height: 'auto' }}>
                <g id="Layer_2" data-name="Layer 2">
                    <path className="cls-1" d="M2105.61,47.29v78.12H178.08s-30.59,2.35-30.59,33.88V846.82H66.08V143.76s2.82-23.52-18.83-34.35c-11-5.52-30.68-12-47.25-17.07V9.43C13.76,19.06,46.68,36.35,67.69,0h81.73c-2.4,11.68-4.95,38.88,20.66,47.29Z" />
                    {getStructuralElements()}
                    {createFloorUnits(6)}
                </g>
                <g id="Layer_3" data-name="Layer 3">
                    <text className="cls-8" transform="translate(902.66 99.53)">Floor 6 - Units 601-639</text>
                    {createFloorLabels(6)}
                    <text className="cls-14" transform="translate(2035.67 716.6)">N</text>
                    <text className="cls-8" transform="translate(115.74 661.53) rotate(-90)">
                        SOUTH VERMONT <tspan className="cls-16" x="193.15" y="0">A</tspan>
                        <tspan className="cls-17" x="207.02" y="0">V</tspan>
                        <tspan className="cls-18" x="220.47" y="0">ANUE</tspan>
                    </text>
                </g>
            </svg>
        </div>
    );

    // Generic SVG for other floors
    const GenericFloorSVG = ({ floor }) => (
        <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center">
                <div className="text-6xl font-bold text-gray-400 mb-4">{floor}</div>
                <p className="text-gray-500">Floor plan for Floor {floor} coming soon</p>
                <p className="text-sm text-gray-400 mt-2">
                    {floorUnits.length} units • {floorUnits.filter(u => u.status === 'available').length} available
                </p>
            </div>
        </div>
    );

    return (
        <div className={`bg-white rounded-lg shadow-lg border border-gray-200 ${className}`}>
            {/* Legend */}
            {showLegend && (
                <div className="p-4 border-b border-gray-200">
                    <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-green-400 rounded mr-2"></div>
                            <span className="text-sm text-gray-600">Available Units</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-red-400 rounded mr-2"></div>
                            <span className="text-sm text-gray-600">Occupied Units</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-yellow-400 rounded mr-2"></div>
                            <span className="text-sm text-gray-600">Maintenance</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
                            <span className="text-sm text-gray-600">Common Areas</span>
                        </div>
                        <div className="text-sm text-gray-500 ml-auto">
                            Click on units to view details
                        </div>
                    </div>
                </div>
            )}

            {/* Floor Plan */}
            <div className="p-6">
                {selectedFloor === 2 && <Floor2SVG />}
                {selectedFloor === 3 && <Floor3SVG />}
                {selectedFloor === 4 && <Floor4SVG />}
                {selectedFloor === 5 && <Floor5SVG />}
                {selectedFloor === 6 && <Floor6SVG />}
                {![2, 3, 4, 5, 6].includes(selectedFloor) && <GenericFloorSVG floor={selectedFloor} />}
            </div>

            {/* Unit Modal */}
            {selectedUnit && (
                <UnitModal
                    unit={selectedUnit}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default InteractiveFloorPlan;