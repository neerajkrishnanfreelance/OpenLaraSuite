<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CropLog extends Model
{
    protected $fillable = [
        'crop_id', 
        'log_date', 
        'log_type',
        'duration_minutes',
        'stage', 
        'notes', 
        'image_path', 
        'temperature', 
        'humidity',
        'input_name',
        'input_quantity',
        'input_unit'
    ];

    protected $casts = [
        'log_date' => 'date',
    ];

    public function crop()
    {
        return $this->belongsTo(Crop::class);
    }
}
