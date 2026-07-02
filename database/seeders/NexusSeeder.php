<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Building;
use App\Models\Floor;
use App\Models\UnitType;
use App\Models\Unit;

class NexusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Create Northridge Nexus Building
        $building = Building::firstOrCreate(
            ['name' => 'Northridge Nexus'],
            [
                'address' => '9500 Zelzah Ave, Northridge, CA 91330',
                'total_floors' => 4,
                'description' => 'Premium modern apartments located in Northridge, offering state-of-the-art amenities and student/professional layouts.',
                'amenities' => [
                    'Rooftop Lounge',
                    'Resort-Style Swimming Pool',
                    '24/7 Fitness Center',
                    'Co-working & Study Spaces',
                    'Secure Parking Garage',
                    'Pet Spa'
                ]
            ]
        );

        // 2. Create Unit Types
        $unitTypesData = [
            'A' => [
                'bedrooms' => 1,
                'bathrooms' => 1,
                'area_sqft' => 600.00,
                'description' => 'Modern cozy 1-bedroom apartment',
                'amenities' => ['In-unit Washer/Dryer', 'Stainless Steel Appliances', 'Private Balcony']
            ],
            'B' => [
                'bedrooms' => 2,
                'bathrooms' => 2,
                'area_sqft' => 950.00,
                'description' => 'Spacious 2-bedroom/2-bathroom unit',
                'amenities' => ['In-unit Washer/Dryer', 'Stainless Steel Appliances', 'Double Balcony', 'Walk-in Closets']
            ],
            'C' => [
                'bedrooms' => 0, // Studio
                'bathrooms' => 1,
                'area_sqft' => 450.00,
                'description' => 'Efficient open-concept studio',
                'amenities' => ['In-unit Washer/Dryer', 'Stainless Steel Appliances']
            ],
            'D' => [
                'bedrooms' => 1,
                'bathrooms' => 1,
                'area_sqft' => 650.00,
                'description' => 'Comfortable 1-bedroom/1-bathroom unit',
                'amenities' => ['In-unit Washer/Dryer', 'Stainless Steel Appliances', 'Juliet Balcony']
            ],
            'E' => [
                'bedrooms' => 2,
                'bathrooms' => 1,
                'area_sqft' => 800.00,
                'description' => 'Smart 2-bedroom/1-bathroom floor plan',
                'amenities' => ['In-unit Washer/Dryer', 'Stainless Steel Appliances', 'Patio']
            ],
            'F' => [
                'bedrooms' => 2,
                'bathrooms' => 2,
                'area_sqft' => 1000.00,
                'description' => 'Premium luxury 2-bedroom corner suite',
                'amenities' => ['In-unit Washer/Dryer', 'Stainless Steel Appliances', 'Private Balcony', 'Walk-in Closets', 'City Views']
            ],
            'G' => [
                'bedrooms' => 1,
                'bathrooms' => 1,
                'area_sqft' => 700.00,
                'description' => 'Deluxe 1-bedroom apartment with bonus nook',
                'amenities' => ['In-unit Washer/Dryer', 'Stainless Steel Appliances', 'Private Balcony', 'Office Nook']
            ],
            'J' => [
                'bedrooms' => 0, // Studio
                'bathrooms' => 1,
                'area_sqft' => 500.00,
                'description' => 'Deluxe studio with separate alcove',
                'amenities' => ['In-unit Washer/Dryer', 'Stainless Steel Appliances', 'Smart Storage']
            ],
            'K' => [
                'bedrooms' => 2,
                'bathrooms' => 2,
                'area_sqft' => 1100.00,
                'description' => 'Large penthouse-style 2-bedroom unit',
                'amenities' => ['In-unit Washer/Dryer', 'Stainless Steel Appliances', 'Large Terrace', 'Premium Finishes']
            ],
            'L' => [
                'bedrooms' => 1,
                'bathrooms' => 1.5,
                'area_sqft' => 750.00,
                'description' => 'Deluxe 1-bedroom/1.5-bathroom loft unit',
                'amenities' => ['In-unit Washer/Dryer', 'Stainless Steel Appliances', 'High Ceilings']
            ],
            'M' => [
                'bedrooms' => 3,
                'bathrooms' => 2,
                'area_sqft' => 1200.00,
                'description' => 'Expansive 3-bedroom family apartment',
                'amenities' => ['In-unit Washer/Dryer', 'Stainless Steel Appliances', 'Private Balcony', 'Spacious Living Area']
            ],
            'N' => [
                'bedrooms' => 2,
                'bathrooms' => 2,
                'area_sqft' => 900.00,
                'description' => 'Contemporary 2-bedroom floor plan',
                'amenities' => ['In-unit Washer/Dryer', 'Stainless Steel Appliances', 'Balcony']
            ],
            'O' => [
                'bedrooms' => 1,
                'bathrooms' => 1,
                'area_sqft' => 620.00,
                'description' => 'Classic 1-bedroom/1-bathroom unit',
                'amenities' => ['In-unit Washer/Dryer', 'Stainless Steel Appliances']
            ],
            'P' => [
                'bedrooms' => 2,
                'bathrooms' => 1.5,
                'area_sqft' => 850.00,
                'description' => 'Cozy 2-bedroom/1.5-bathroom unit',
                'amenities' => ['In-unit Washer/Dryer', 'Stainless Steel Appliances', 'Balcony']
            ],
            'Q' => [
                'bedrooms' => 0, // Studio
                'bathrooms' => 1,
                'area_sqft' => 480.00,
                'description' => 'Modern open-plan student studio',
                'amenities' => ['In-unit Washer/Dryer', 'Stainless Steel Appliances']
            ],
        ];

        $unitTypes = [];
        foreach ($unitTypesData as $name => $data) {
            $unitTypes[$name] = UnitType::firstOrCreate(['name' => $name], $data);
        }

        // 3. Create Floors (1-4)
        $floors = [];
        for ($i = 1; $i <= 4; $i++) {
            $floors[$i] = Floor::firstOrCreate(
                [
                    'building_id' => $building->id,
                    'floor_number' => $i
                ],
                [
                    'name' => "Level {$i}",
                    'floor_plan_svg' => null,
                    'floor_plan_image' => null
                ]
            );
        }

        // 4. Create Units
        // --- LEVEL 1 (6 Units) ---
        $level1Units = [
            '101' => 'L',
            '102' => 'K',
            '116' => 'Q',
            '117' => 'G',
            '118' => 'G',
            '119' => 'G'
        ];
        
        $statuses = ['available', 'occupied', 'occupied', 'occupied', 'maintenance', 'reserved'];

        foreach ($level1Units as $num => $typeName) {
            $type = $unitTypes[$typeName];
            
            // Generate stable but realistic price based on unit type
            $basePrice = $this->getBasePriceForType($typeName);
            
            Unit::firstOrCreate(
                [
                    'floor_id' => $floors[1]->id,
                    'unit_number' => $num
                ],
                [
                    'unit_type_id' => $type->id,
                    'status' => $statuses[array_rand($statuses)],
                    'price' => $basePrice,
                    'available_date' => now()->addDays(rand(0, 30)),
                    'coordinates' => null,
                    'notes' => 'Ground floor convenience.'
                ]
            );
        }

        // --- LEVELS 2, 3, 4 (19 Units each) ---
        $upperFloorLayout = [
            '01' => 'C',
            '02' => 'P',
            '03' => 'E',
            '04' => 'D',
            '05' => 'D',
            '06' => 'F',
            '07' => 'J',
            '08' => 'A',
            '09' => 'A',
            '10' => 'A',
            '11' => 'O',
            '12' => 'O',
            '13' => 'M',
            '14' => 'M',
            '15' => 'N',
            '16' => 'B',
            '17' => 'B',
            '18' => 'B',
            '19' => 'B'
        ];

        for ($floorNum = 2; $floorNum <= 4; $floorNum++) {
            foreach ($upperFloorLayout as $suffix => $typeName) {
                $unitNumber = $floorNum . $suffix;
                $type = $unitTypes[$typeName];
                $basePrice = $this->getBasePriceForType($typeName);
                
                Unit::firstOrCreate(
                    [
                        'floor_id' => $floors[$floorNum]->id,
                        'unit_number' => $unitNumber
                    ],
                    [
                        'unit_type_id' => $type->id,
                        'status' => $statuses[array_rand($statuses)],
                        'price' => $basePrice,
                        'available_date' => now()->addDays(rand(0, 30)),
                        'coordinates' => null,
                        'notes' => "Convenient floor {$floorNum} living."
                    ]
                );
            }
        }
    }

    /**
     * Helper to get typical prices for seeded units
     */
    private function getBasePriceForType(string $typeName): float
    {
        return match ($typeName) {
            'C', 'J', 'Q' => 1650.00 + rand(-50, 100),
            'A', 'D', 'G', 'L', 'O' => 2200.00 + rand(-100, 150),
            'B', 'E', 'F', 'K', 'N', 'P' => 2950.00 + rand(-150, 200),
            'M' => 3750.00 + rand(-200, 250),
            default => 2000.00
        };
    }
}
