<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Floor Plans - Available Units</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }

        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            font-weight: 300;
        }

        .header p {
            font-size: 1.1rem;
            opacity: 0.9;
        }

        .floor-selector {
            display: flex;
            justify-content: center;
            gap: 10px;
            padding: 20px;
            background: #f8f9fa;
            border-bottom: 1px solid #e9ecef;
            flex-wrap: wrap;
        }

        .floor-btn {
            padding: 12px 24px;
            border: none;
            background: #6c757d;
            color: white;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
            min-width: 120px;
        }

        .floor-btn:hover {
            background: #495057;
            transform: translateY(-2px);
        }

        .floor-btn.active {
            background: #28a745;
            box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
        }

        .legend {
            display: flex;
            justify-content: center;
            gap: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-bottom: 1px solid #e9ecef;
            flex-wrap: wrap;
        }

        .legend-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 500;
        }

        .legend-color {
            width: 20px;
            height: 20px;
            border-radius: 4px;
            border: 2px solid #333;
        }

        .available { background-color: #28a745; }
        .occupied { background-color: #dc3545; }
        .maintenance { background-color: #ffc107; }

        .floor-plan-container {
            padding: 30px;
            text-align: center;
            min-height: 600px;
            position: relative;
        }

        .floor-plan {
            display: none;
            max-width: 100%;
            height: auto;
            border: 2px solid #dee2e6;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .floor-plan.active {
            display: inline-block;
        }

        .floor-plan svg {
            max-width: 100%;
            height: auto;
        }

        .unit-info {
            position: fixed;
            background: rgba(0,0,0,0.9);
            color: white;
            padding: 15px;
            border-radius: 8px;
            font-size: 14px;
            pointer-events: none;
            z-index: 1000;
            display: none;
            max-width: 250px;
        }

        .unit-info h4 {
            margin-bottom: 8px;
            color: #28a745;
        }

        .unit-info p {
            margin: 4px 0;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .header h1 {
                font-size: 2rem;
            }
            
            .floor-selector {
                padding: 15px;
            }
            
            .floor-btn {
                padding: 10px 20px;
                min-width: 100px;
                font-size: 14px;
            }
            
            .legend {
                padding: 15px;
                gap: 20px;
            }
            
            .floor-plan-container {
                padding: 20px;
            }
        }

        @media (max-width: 480px) {
            .header {
                padding: 20px;
            }
            
            .header h1 {
                font-size: 1.8rem;
            }
            
            .floor-selector {
                gap: 8px;
            }
            
            .floor-btn {
                padding: 8px 16px;
                min-width: 80px;
                font-size: 13px;
            }
            
            .legend {
                gap: 15px;
            }
            
            .legend-item {
                font-size: 14px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Floor Plans</h1>
            <p>Interactive floor plans showing available units in green</p>
        </div>

        <div class="floor-selector">
            <button class="floor-btn active" onclick="showFloor('ground')">Ground Floor</button>
            <button class="floor-btn" onclick="showFloor('2')">2nd Floor</button>
            <button class="floor-btn" onclick="showFloor('3')">3rd Floor</button>
            <button class="floor-btn" onclick="showFloor('4')">4th Floor</button>
            <button class="floor-btn" onclick="showFloor('5')">5th Floor</button>
            <button class="floor-btn" onclick="showFloor('6')">6th Floor</button>
        </div>

        <div class="legend">
            <div class="legend-item">
                <div class="legend-color available"></div>
                <span>Available</span>
            </div>
            <div class="legend-item">
                <div class="legend-color occupied"></div>
                <span>Occupied</span>
            </div>
            <div class="legend-item">
                <div class="legend-color maintenance"></div>
                <span>Maintenance</span>
            </div>
        </div>

        <div class="floor-plan-container">
            <div id="floor-ground" class="floor-plan active">
                <div id="ground-floor-svg"></div>
            </div>
            <div id="floor-2" class="floor-plan">
                <div id="floor-2-svg"></div>
            </div>
            <div id="floor-3" class="floor-plan">
                <div id="floor-3-svg"></div>
            </div>
            <div id="floor-4" class="floor-plan">
                <div id="floor-4-svg"></div>
            </div>
            <div id="floor-5" class="floor-plan">
                <div id="floor-5-svg"></div>
            </div>
            <div id="floor-6" class="floor-plan">
                <div id="floor-6-svg"></div>
            </div>
        </div>
    </div>

    <div class="unit-info" id="unitInfo">
        <h4 id="unitNumber"></h4>
        <p id="unitStatus"></p>
        <p id="unitSize"></p>
        <p id="unitPrice"></p>
    </div>

    <script>
        // Unit data will be loaded from the database
        let unitData = {};

        function showFloor(floorNumber) {
            // Hide all floor plans
            document.querySelectorAll('.floor-plan').forEach(plan => {
                plan.classList.remove('active');
            });
            
            // Remove active class from all buttons
            document.querySelectorAll('.floor-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Show selected floor plan
            document.getElementById(`floor-${floorNumber}`).classList.add('active');
            
            // Add active class to clicked button
            event.target.classList.add('active');
            
            // Load the appropriate SVG
            loadFloorPlan(floorNumber);
        }

        async function loadFloorPlan(floorNumber) {
            const svgContainer = document.getElementById(`floor-${floorNumber}-svg`);
            
            // Don't reload if already loaded
            if (svgContainer.innerHTML.trim() !== '') {
                return;
            }
            
            try {
                let svgFile;
                switch(floorNumber) {
                    case 'ground':
                        svgFile = '/Floor Plan.svg';
                        break;
                    case '2':
                        svgFile = '/2Floor.svg';
                        break;
                    case '3':
                        svgFile = '/3floor.svg';
                        break;
                    case '4':
                        svgFile = '/4floor.svg';
                        break;
                    case '5':
                        svgFile = '/5floor.svg';
                        break;
                    case '6':
                        svgFile = '/6floor.svg';
                        break;
                }
                
                const response = await fetch(svgFile);
                const svgContent = await response.text();
                svgContainer.innerHTML = svgContent;
                
                // Apply unit coloring and interactivity
                applyUnitStyling(svgContainer);
                
            } catch (error) {
                console.error('Error loading floor plan:', error);
                svgContainer.innerHTML = '<p>Error loading floor plan. Please try again.</p>';
            }
        }

        function applyUnitStyling(container) {
            const svg = container.querySelector('svg');
            if (!svg) return;
            
            // Find all text elements that contain unit numbers
            const textElements = svg.querySelectorAll('text');
            
            textElements.forEach(textEl => {
                const unitNumber = textEl.textContent.trim();
                
                // Check if this looks like a unit number (3 digits starting with 2)
                if (/^2\d{2}$/.test(unitNumber) && unitData[unitNumber]) {
                    const unit = unitData[unitNumber];
                    
                    // Find the parent group or create a clickable area
                    let unitElement = textEl.parentElement;
                    
                    // Style the unit based on availability
                    let fillColor;
                    switch(unit.status) {
                        case 'available':
                            fillColor = '#28a745'; // Green
                            break;
                        case 'occupied':
                            fillColor = '#dc3545'; // Red
                            break;
                        case 'maintenance':
                            fillColor = '#ffc107'; // Yellow
                            break;
                        default:
                            fillColor = '#6c757d'; // Gray
                    }
                    
                    // Apply styling to the unit area
                    if (unitElement) {
                        // Find rectangles or polygons near this text that represent the unit
                        const unitShapes = findUnitShapes(svg, textEl);
                        unitShapes.forEach(shape => {
                            shape.style.fill = fillColor;
                            shape.style.fillOpacity = '0.7';
                            shape.style.stroke = '#000';
                            shape.style.strokeWidth = '2';
                            shape.style.cursor = 'pointer';
                            
                            // Add hover effects
                            shape.addEventListener('mouseenter', (e) => showUnitInfo(e, unitNumber, unit));
                            shape.addEventListener('mouseleave', hideUnitInfo);
                            shape.addEventListener('mousemove', (e) => moveUnitInfo(e));
                            
                            // Add click handler for available units
                            if (unit.status === 'available') {
                                shape.addEventListener('click', () => {
                                    alert(`Unit ${unitNumber} is available!\n\nSize: ${unit.size}\nPrice: ${unit.price}\n\nWould you like to schedule a viewing?`);
                                });
                            }
                        });
                    }
                    
                    // Style the text element
                    textEl.style.fill = '#fff';
                    textEl.style.fontWeight = 'bold';
                    textEl.style.fontSize = '18px';
                }
            });
        }

        function findUnitShapes(svg, textElement) {
            const shapes = [];
            const textRect = textElement.getBBox();
            const textCenterX = textRect.x + textRect.width / 2;
            const textCenterY = textRect.y + textRect.height / 2;
            
            // Look for rectangles and polygons near the text
            const allShapes = svg.querySelectorAll('rect, polygon, path');
            
            allShapes.forEach(shape => {
                if (shape.getAttribute('fill') === '#ffffff' || shape.getAttribute('fill') === 'white') {
                    const shapeRect = shape.getBBox();
                    const shapeCenterX = shapeRect.x + shapeRect.width / 2;
                    const shapeCenterY = shapeRect.y + shapeRect.height / 2;
                    
                    // Check if the text is within or near the shape
                    const distance = Math.sqrt(
                        Math.pow(textCenterX - shapeCenterX, 2) + 
                        Math.pow(textCenterY - shapeCenterY, 2)
                    );
                    
                    if (distance < 100) { // Adjust this threshold as needed
                        shapes.push(shape);
                    }
                }
            });
            
            return shapes;
        }

        function showUnitInfo(event, unitNumber, unit) {
            const unitInfo = document.getElementById('unitInfo');
            const unitNumberEl = document.getElementById('unitNumber');
            const unitStatusEl = document.getElementById('unitStatus');
            const unitSizeEl = document.getElementById('unitSize');
            const unitPriceEl = document.getElementById('unitPrice');
            
            unitNumberEl.textContent = `Unit ${unitNumber}`;
            unitStatusEl.textContent = `Status: ${unit.status.charAt(0).toUpperCase() + unit.status.slice(1)}`;
            unitSizeEl.textContent = `Size: ${unit.size}`;
            unitPriceEl.textContent = `Price: ${unit.price}`;
            
            unitInfo.style.display = 'block';
            moveUnitInfo(event);
        }

        function hideUnitInfo() {
            document.getElementById('unitInfo').style.display = 'none';
        }

        function moveUnitInfo(event) {
            const unitInfo = document.getElementById('unitInfo');
            unitInfo.style.left = (event.pageX + 10) + 'px';
            unitInfo.style.top = (event.pageY - 10) + 'px';
        }

        // Load unit data from database
        async function loadUnitData() {
            try {
                const response = await fetch('/api/units-data');
                unitData = await response.json();
                console.log('Unit data loaded:', unitData);
            } catch (error) {
                console.error('Error loading unit data:', error);
                // Fallback to sample data if database fails
                unitData = {
                    '201': { status: 'available', size: '1BR/1BA', price: '$1,200/month' },
                    '202': { status: 'occupied', size: '1BR/1BA', price: '$1,200/month' },
                    '203': { status: 'available', size: '2BR/1BA', price: '$1,500/month' },
                    '204': { status: 'maintenance', size: '2BR/1BA', price: '$1,500/month' },
                    '205': { status: 'available', size: '1BR/1BA', price: '$1,200/month' },
                    '206': { status: 'available', size: '1BR/1BA', price: '$1,200/month' },
                    '207': { status: 'occupied', size: '2BR/2BA', price: '$1,800/month' },
                    '208': { status: 'available', size: '2BR/2BA', price: '$1,800/month' },
                    '209': { status: 'available', size: '1BR/1BA', price: '$1,200/month' },
                    '210': { status: 'occupied', size: '1BR/1BA', price: '$1,200/month' },
                    '211': { status: 'available', size: '2BR/1BA', price: '$1,500/month' },
                    '212': { status: 'available', size: '2BR/1BA', price: '$1,500/month' },
                    '213': { status: 'available', size: '1BR/1BA', price: '$1,200/month' },
                    '214': { status: 'available', size: '1BR/1BA', price: '$1,200/month' },
                    '215': { status: 'available', size: '2BR/2BA', price: '$1,800/month' },
                    '216': { status: 'occupied', size: '2BR/2BA', price: '$1,800/month' },
                    '217': { status: 'available', size: '1BR/1BA', price: '$1,200/month' },
                    '218': { status: 'available', size: '1BR/1BA', price: '$1,200/month' },
                    '219': { status: 'available', size: '2BR/1BA', price: '$1,500/month' },
                    '220': { status: 'available', size: '2BR/1BA', price: '$1,500/month' },
                    '221': { status: 'available', size: '1BR/1BA', price: '$1,200/month' },
                    '222': { status: 'available', size: '1BR/1BA', price: '$1,200/month' },
                    '223': { status: 'available', size: '2BR/2BA', price: '$1,800/month' },
                    '224': { status: 'available', size: '2BR/2BA', price: '$1,800/month' },
                    '225': { status: 'available', size: '1BR/1BA', price: '$1,200/month' },
                    '226': { status: 'available', size: '1BR/1BA', price: '$1,200/month' },
                    '227': { status: 'available', size: '2BR/1BA', price: '$1,500/month' },
                    '228': { status: 'available', size: '2BR/1BA', price: '$1,500/month' },
                    '229': { status: 'available', size: '1BR/1BA', price: '$1,200/month' },
                    '230': { status: 'available', size: '1BR/1BA', price: '$1,200/month' },
                    '231': { status: 'available', size: '2BR/2BA', price: '$1,800/month' },
                    '232': { status: 'available', size: '2BR/2BA', price: '$1,800/month' },
                    '233': { status: 'available', size: '1BR/1BA', price: '$1,200/month' },
                    '234': { status: 'available', size: '1BR/1BA', price: '$1,200/month' },
                    '235': { status: 'available', size: '2BR/1BA', price: '$1,500/month' },
                    '236': { status: 'available', size: '2BR/1BA', price: '$1,500/month' },
                    '237': { status: 'available', size: '1BR/1BA', price: '$1,200/month' },
                    '238': { status: 'available', size: '1BR/1BA', price: '$1,200/month' },
                    '239': { status: 'available', size: '2BR/2BA', price: '$1,800/month' }
                };
            }
        }

        // Load the ground floor plan on page load
        document.addEventListener('DOMContentLoaded', async () => {
            await loadUnitData();
            loadFloorPlan('ground');
        });
    </script>
</body>
</html>