<?php

namespace App\Http\Controllers;

use App\Models\Unit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FloorPlanController extends Controller
{
    public function dynamic()
    {
        // Get all units with their relationships for the modern floor plan
        $units = Unit::with(['unitType', 'floor'])->get();
        
        return Inertia::render('FloorPlan/Modern', [
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