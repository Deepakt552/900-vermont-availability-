<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Building extends Model
{
    protected $fillable = [
        'name',
        'address',
        'total_floors',
        'description',
        'amenities'
    ];

    protected $casts = [
        'amenities' => 'array'
    ];

    public function floors(): HasMany
    {
        return $this->hasMany(Floor::class);
    }
}
