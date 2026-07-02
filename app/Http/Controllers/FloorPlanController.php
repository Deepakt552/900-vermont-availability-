<?php

namespace App\Http\Controllers;

use App\Models\Unit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FloorPlanController extends Controller
{
    public function dynamic()
    {
        // Get all units with their relationships for The 900 Apartments
        $units = Unit::with(['unitType', 'floor.building'])
            ->whereHas('floor.building', function ($query) {
                $query->where('name', 'The 900 Apartments');
            })->get();
        
        return Inertia::render('FloorPlan/Modern', [
            'units' => $units
        ]);
    }

    public function nexus()
    {
        // Get all units with their relationships for Northridge Nexus
        $units = Unit::with(['unitType', 'floor.building'])
            ->whereHas('floor.building', function ($query) {
                $query->where('name', 'Northridge Nexus');
            })->get();
        
        return Inertia::render('FloorPlan/Nexus', [
            'units' => $units
        ]);
    }

    public function getUnitDetails(Unit $unit)
    {
        $unit->load(['unitType', 'floor.building']);
        
        return response()->json($unit);
    }

    public function getUnitsData()
    {
        $units = Unit::with(['floor', 'unitType'])->get();
        
        $unitsData = [];
        foreach ($units as $unit) {
            $unitsData[$unit->unit_number] = [
                'status' => $unit->status,
                'size' => $unit->unitType->name ?? 'N/A',
                'price' => '$' . number_format($unit->price ?? 0, 0) . '/month',
                'available_date' => $unit->available_date ? $unit->available_date->format('M d, Y') : null,
                'floor' => $unit->floor->floor_number ?? 'N/A',
                'coordinates' => $unit->coordinates
            ];
        }
        
        return response()->json($unitsData);
    }
}