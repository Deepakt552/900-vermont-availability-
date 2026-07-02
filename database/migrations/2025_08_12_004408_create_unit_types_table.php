<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('unit_types', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // A3-1, B2-1, etc.
            $table->integer('bedrooms');
            $table->integer('bathrooms');
            $table->decimal('area_sqft', 8, 2);
            $table->text('description')->nullable();
            $table->json('floor_plan_2d')->nullable(); // SVG or coordinates
            $table->string('floor_plan_3d_image')->nullable();
            $table->json('amenities')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('unit_types');
    }
};