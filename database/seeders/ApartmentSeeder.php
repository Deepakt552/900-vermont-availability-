<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Building;
use App\Models\Floor;
use App\Models\UnitType;
use App\Models\Unit;

class ApartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create building
        $building = Building::create([
            'name' => 'The 900 Apartments',
            'address' => 'James M Wood Boulevard',
            'total_floors' => 5,
            'description' => 'Modern luxury apartments with premium amenities',
            'amenities' => [
                'Swimming Pool',
                'Fitness Center',
                'Rooftop Terrace',
                'Concierge Service',
                'Parking Garage'
            ]
        ]);

        // Create unit types
        $unitTypes = [
            [
                'name' => 'A3-1',
                'bedrooms' => 1,
                'bathrooms' => 1,
                'area_sqft' => 652.00,
                'description' => 'Cozy one-bedroom apartment with modern finishes',
                'amenities' => [
                    'In-unit Washer/Dryer',
                    'Stainless Steel Appliances',
                    'Hardwood Floors',
                    'Walk-in Closet',
                    'Private Balcony'
                ]
            ],
            [
                'name' => 'B2-1',
                'bedrooms' => 2,
                'bathrooms' => 2,
                'area_sqft' => 950.00,
                'description' => 'Spacious two-bedroom apartment with city views',
                'amenities' => [
                    'In-unit Washer/Dryer',
                    'Stainless Steel Appliances',
                    'Hardwood Floors',
                    'Walk-in Closets',
                    'Private Balcony',
                    'City Views'
                ]
            ],
            [
                'name' => 'C1-1',
                'bedrooms' => 1,
                'bathrooms' => 1,
                'area_sqft' => 580.00,
                'description' => 'Efficient studio-style apartment',
                'amenities' => [
                    'In-unit Washer/Dryer',
                    'Stainless Steel Appliances',
                    'Hardwood Floors'
                ]
            ]
        ];

        foreach ($unitTypes as $typeData) {
            UnitType::create($typeData);
        }

        // Create floors (2-6)
        for ($floorNumber = 2; $floorNumber <= 6; $floorNumber++) {
            $floor = Floor::create([
                'building_id' => $building->id,
                'floor_number' => $floorNumber,
                'name' => "Floor {$floorNumber}",
                'floor_plan_svg' => null,
                'floor_plan_image' => null
            ]);

            // Create units for each floor with proper numbering
            $unitTypes = UnitType::all();
            
            // Create 31 units per floor (matching your image layout)
            $unitNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39];
            
            foreach ($unitNumbers as $unitNum) {
                $unitNumber = $floorNumber . str_pad($unitNum, 2, '0', STR_PAD_LEFT);
                
                // Assign unit types based on position (larger units for 04 and 11)
                if (in_array($unitNum, [4, 11])) {
                    $unitType = $unitTypes->where('name', 'B2-1')->first(); // Larger 2BR units
                } else if (in_array($unitNum, [1, 2, 21])) {
                    $unitType = $unitTypes->where('name', 'A3-1')->first(); // 1BR units
                } else {
                    $unitType = $unitTypes->where('name', 'C1-1')->first(); // Studio units
                }
                
                // Make units 04 and 11 available (green in image), others mostly occupied
                if (in_array($unitNum, [4, 11])) {
                    $status = 'available';
                } else {
                    $statuses = ['available', 'occupied', 'occupied', 'occupied'];
                    $status = $statuses[array_rand($statuses)];
                }
                
                // Generate price based on unit type
                $basePrice = match($unitType->name) {
                    'A3-1' => 2400,
                    'B2-1' => 3200,
                    'C1-1' => 1800,
                    default => 2000
                };
                
                $price = $basePrice + rand(-100, 300);
                
                Unit::create([
                    'floor_id' => $floor->id,
                    'unit_type_id' => $unitType->id,
                    'unit_number' => $unitNumber,
                    'status' => $status,
                    'price' => $price,
                    'available_date' => $status === 'available' ? now()->addDays(rand(0, 30)) : null,
                    'coordinates' => null, // Will be calculated in frontend
                    'notes' => null
                ]);
            }
        }
    }
}