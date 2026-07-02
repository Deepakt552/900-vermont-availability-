<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Unit extends Model
{
    protected $fillable = [
        'floor_id',
        'unit_type_id',
        'unit_number',
        'status',
        'price',
        'available_date',
        'coordinates',
        'notes',
        'images'
    ];

    protected $casts = [
        'coordinates' => 'array',
        'available_date' => 'date',
        'price' => 'decimal:2',
        'images' => 'array'
    ];

    public function floor(): BelongsTo
    {
        return $this->belongsTo(Floor::class);
    }

    public function unitType(): BelongsTo
    {
        return $this->belongsTo(UnitType::class);
    }

    public function scopeAvailable($query)
    {
        return $query->where('status', 'available');
    }

    public function scopeOccupied($query)
    {
        return $query->where('status', 'occupied');
    }
}
