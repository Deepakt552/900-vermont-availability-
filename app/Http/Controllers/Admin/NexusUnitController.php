<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Unit;
use App\Models\Floor;
use App\Models\UnitType;
use App\Models\Building;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class NexusUnitController extends Controller
{
    public function index()
    {
        $building = Building::where('name', 'Northridge Nexus')->first();
        
        $units = [];
        if ($building) {
            $units = Unit::whereIn('floor_id', $building->floors->pluck('id'))
                ->with(['floor.building', 'unitType'])
                ->orderBy('floor_id')
                ->orderBy('unit_number')
                ->get();
        }

        return Inertia::render('Admin/NexusUnits/Index', [
            'units' => $units
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

        return redirect()->route('admin.nexus-units.index')
            ->with('success', 'Nexus unit updated successfully.');
    }

    public function updateStatus(Request $request, Unit $unit)
    {
        $validated = $request->validate([
            'status' => 'required|in:available,occupied,maintenance,reserved'
        ]);

        $unit->update($validated);

        return redirect()->back()->with('success', 'Status updated successfully.');
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

        return redirect()->back()->with('success', 'Images uploaded successfully.');
    }

    public function removeImage(Unit $unit, $imageIndex)
    {
        $currentImages = $unit->images ?? [];
        
        if (!isset($currentImages[$imageIndex])) {
            return redirect()->back()->withErrors(['error' => 'Image not found']);
        }

        // Get the image path to delete from storage
        $imageUrl = $currentImages[$imageIndex];
        $imagePath = str_replace(asset('storage/'), '', $imageUrl);
        
        // Delete from storage
        if (Storage::disk('public')->exists($imagePath)) {
            Storage::disk('public')->delete($imagePath);
        }

        // Remove from array
        unset($currentImages[$imageIndex]);
        $currentImages = array_values($currentImages); // Re-index array

        $unit->update(['images' => $currentImages]);

        return redirect()->back()->with('success', 'Image removed successfully.');
    }

    public function bulkUpdate(Request $request)
    {
        $validated = $request->validate([
            'updates' => 'required|array',
            'updates.*.status' => 'nullable|in:available,occupied,maintenance,reserved',
            'updates.*.price' => 'nullable|numeric|min:0'
        ]);

        foreach ($validated['updates'] as $unitId => $changes) {
            $unit = Unit::find($unitId);
            if ($unit) {
                $unit->update(array_filter($changes, function($val) {
                    return $val !== null;
                }));
            }
        }

        return redirect()->back()->with('success', 'Units updated successfully.');
    }
}
