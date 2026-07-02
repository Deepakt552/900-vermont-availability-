<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class UnitType extends Model
{
    protected $fillable = [
        'name',
        'bedrooms',
        'bathrooms',
        'area_sqft',
        'description',
        'floor_plan_2d',
        'floor_plan_3d_image',
        'amenities'
    ];

    protected $casts = [
        'floor_plan_2d' => 'array',
        'amenities' => 'array',
        'area_sqft' => 'decimal:2'
    ];

    public function units(): HasMany
    {
        return $this->hasMany(Unit::class);
    }
}
