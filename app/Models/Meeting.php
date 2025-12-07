<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meeting extends Model
{
    use HasFactory;

    protected $fillable = [
        'organizer_id',
        'meetingable_id',
        'meetingable_type',
        'title',
        'description',
        'start_time',
        'end_time',
        'location_link',
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
    ];

    public function organizer()
    {
        return $this->belongsTo(User::class, 'organizer_id');
    }

    public function participants()
    {
        return $this->belongsToMany(User::class, 'meeting_user');
    }
}
