<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FloorPlanController;
use App\Http\Controllers\Admin\UnitController;
use App\Http\Controllers\Admin\BuildingController;
use App\Http\Controllers\Admin\NexusUnitController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Public routes
Route::get('/gallery', function () {
    return Inertia::render('Gallery');
})->name('gallery');

Route::get('/neighborhood', function () {
    return Inertia::render('Neighborhood');
})->name('neighborhood');

Route::get('/information', function () {
    return Inertia::render('Information');
})->name('information');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::post('/contact', function () {
    // Handle contact form submission
    return redirect()->back()->with('success', 'Thank you for your message! We will get back to you soon.');
})->name('contact.submit');

Route::get('/privacy-policy', function () {
    return Inertia::render('PrivacyPolicy');
})->name('privacy-policy');

// Public floor plan routes
Route::get('/floor-plans/dynamic', [FloorPlanController::class, 'dynamic'])->name('floor-plans.dynamic');
Route::get('/floor-plans/nexus', [FloorPlanController::class, 'nexus'])->name('floor-plans.nexus');
Route::get('/api/units/{unit}', [FloorPlanController::class, 'getUnitDetails'])->name('units.details');
Route::get('/api/units-data', [FloorPlanController::class, 'getUnitsData'])->name('units.data');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Admin routes
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('buildings', BuildingController::class);
        Route::patch('units/bulk-update', [UnitController::class, 'bulkUpdate'])->name('units.bulk-update');
        Route::resource('units', UnitController::class);
        Route::patch('units/{unit}/status', [UnitController::class, 'updateStatus'])->name('units.status');
        Route::post('units/upload-images', [UnitController::class, 'uploadImages'])->name('units.upload-images');
        Route::delete('units/{unit}/images/{imageIndex}', [UnitController::class, 'removeImage'])->name('units.remove-image');
        
        // Nexus units routes
        Route::patch('nexus-units/bulk-update', [NexusUnitController::class, 'bulkUpdate'])->name('nexus-units.bulk-update');
        Route::get('nexus-units', [NexusUnitController::class, 'index'])->name('nexus-units.index');
        Route::patch('nexus-units/{unit}', [NexusUnitController::class, 'update'])->name('nexus-units.update');
        Route::patch('nexus-units/{unit}/status', [NexusUnitController::class, 'updateStatus'])->name('nexus-units.status');
        Route::post('nexus-units/upload-images', [NexusUnitController::class, 'uploadImages'])->name('nexus-units.upload-images');
        Route::delete('nexus-units/{unit}/images/{imageIndex}', [NexusUnitController::class, 'removeImage'])->name('nexus-units.remove-image');
    });
});

require __DIR__.'/auth.php';
