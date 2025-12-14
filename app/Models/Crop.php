<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Crop extends Model
{
    protected $fillable = ['name', 'type', 'variety', 'planting_date', 'harvest_date', 'status', 'check_r_n_d', 'notes'];

    protected $casts = [
        'planting_date' => 'date',
        'harvest_date' => 'date',
        'check_r_n_d' => 'boolean',
    ];

    public function logs()
    {
        return $this->hasMany(CropLog::class);
    }
}
