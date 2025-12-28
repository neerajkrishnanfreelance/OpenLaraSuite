<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CropSchedule extends Model
{
    protected $fillable = [
        'crop_id',
        'activity_type',
        'scheduled_date',
        'completed_at',
        'notes',
    ];

    protected $casts = [
        'scheduled_date' => 'date',
        'completed_at' => 'datetime',
    ];

    public function crop()
    {
        return $this->belongsTo(Crop::class);
    }
}
