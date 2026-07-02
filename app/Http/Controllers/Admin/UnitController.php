<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Unit;
use App\Models\Floor;
use App\Models\UnitType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UnitController extends Controller
{
    public function index()
    {
        $units = Unit::with(['floor.building', 'unitType'])
            ->orderBy('floor_id')
            ->orderBy('unit_number')
            ->get();

        return Inertia::render('Admin/Units/Index', [
            'units' => $units
        ]);
    }

    public function create()
    {
        $floors = Floor::with('building')->get();
        $unitTypes = UnitType::all();

        return Inertia::render('Admin/Units/Create', [
            'floors' => $floors,
            'unitTypes' => $unitTypes
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'floor_id' => 'required|exists:floors,id',
            'unit_type_id' => 'required|exists:unit_types,id',
            'unit_number' => 'required|string',
            'status' => 'required|in:available,occupied,maintenance,reserved',
            'price' => 'required|numeric|min:0',
            'available_date' => 'nullable|date',
            'coordinates' => 'nullable|array',
            'notes' => 'nullable|string'
        ]);

        Unit::create($validated);

        return redirect()->route('admin.units.index')
            ->with('success', 'Unit created successfully.');
    }

    public function show(Unit $unit)
    {
        $unit->load(['floor.building', 'unitType']);

        return Inertia::render('Admin/Units/Show', [
            'unit' => $unit
        ]);
    }

    public function edit(Unit $unit)
    {
        $floors = Floor::with('building')->get();
        $unitTypes = UnitType::all();
        $unit->load(['floor.building', 'unitType']);

        return Inertia::render('Admin/Units/Edit', [
            'unit' => $unit,
            'floors' => $floors,
            'unitTypes' => $unitTypes
        ]);
    }

    public function update(Request $request, Unit $unit)
    {
        $validated = $request->validate([
            'floor_id' => 'required|exists:floors,id',
            'unit_type_id' => 'required|exists:unit_types,id',
            'unit_number' => 'required|string',
            'status' => 'required|in:available,occupied,maintenance,reserved',
            'price' => 'required|numeric|min:0',
            'available_date' => 'nullable|date',
            'coordinates' => 'nullable|array',
            'notes' => 'nullable|string'
        ]);

        $unit->update($validated);

        return redirect()->route('admin.units.index')
            ->with('success', 'Unit updated successfully.');
    }

    public function destroy(Unit $unit)
    {
        $unit->delete();

        return redirect()->route('admin.units.index')
            ->with('success', 'Unit deleted successfully.');
    }

    public function updateStatus(Request $request, Unit $unit)
    {
        $validated = $request->validate([
            'status' => 'required|in:available,occupied,maintenance,reserved'
        ]);

        $unit->update($validated);

        return response()->json(['message' => 'Status updated successfully']);
    }

    public function uploadImages(Request $request)
    {
        $request->validate([
            'unit_id' => 'required|exists:units,id',
            'images' => 'required|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:10240' // 10MB max
        ]);

        $unit = Unit::findOrFail($request->unit_id);
        $currentImages = $unit->images ?? [];
        $newImagePaths = [];

        foreach ($request->file('images') as $image) {
            // Generate unique filename
            $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            
            // Store in public/storage/units directory
            $path = $image->storeAs('units', $filename, 'public');
            
            // Add full URL to array
            $newImagePaths[] = asset('storage/' . $path);
        }

        // Merge with existing images
        $allImages = array_merge($currentImages, $newImagePaths);
        
        $unit->update(['images' => $allImages]);

        return response()->json([
            'message' => 'Images uploaded successfully',
            'images' => $allImages
        ]);
    }

    public function removeImage(Unit $unit, $imageIndex)
    {
        $currentImages = $unit->images ?? [];
        
        if (!isset($currentImages[$imageIndex])) {
            return response()->json(['error' => 'Image not found'], 404);
        }

        // Get the image path to delete from storage
        $imageUrl = $currentImages[$imageIndex];
        $imagePath = str_replace(asset('storage/'), '', $imageUrl);
        
        // Delete from storage
        if (\Storage::disk('public')->exists($imagePath)) {
            \Storage::disk('public')->delete($imagePath);
        }

        // Remove from array
        unset($currentImages[$imageIndex]);
        $currentImages = array_values($currentImages); // Re-index array

        $unit->update(['images' => $currentImages]);

        return response()->json([
            'message' => 'Image removed successfully',
            'images' => $currentImages
        ]);
    }
}