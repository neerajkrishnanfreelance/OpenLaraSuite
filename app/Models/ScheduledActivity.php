<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScheduledActivity extends Model
{
    use HasFactory;

    protected $fillable = [
        'task_id',
        'type', // call, email, meeting
        'subject',
        'description',
        'due_at',
        'is_completed',
    ];

    protected $casts = [
        'due_at' => 'datetime',
        'is_completed' => 'boolean',
    ];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
