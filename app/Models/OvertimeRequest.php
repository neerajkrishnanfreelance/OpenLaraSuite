<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasChatter;
use App\Traits\HasMeetings;
use App\Traits\HasDocuments;

class OvertimeRequest extends Model
{
    use HasFactory, HasChatter, HasMeetings, HasDocuments;

    protected $fillable = [
        'user_id',
        'date',
        'start_time',
        'end_time',
        'reason',
        'status',
        'approver_id',
    ];

    protected $casts = [
        'date' => 'date',
        // start_time and end_time are usually cast to string or custom time objects, 
        // but 'date' cast handles Y-m-d. Time columns return as strings by default which is fine for HTML inputs.
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function approver()
    {
        return $this->belongsTo(User::class, 'approver_id');
    }
}
