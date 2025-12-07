<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasChatter;
use App\Traits\HasMeetings;
use App\Traits\HasDocuments;

class Timesheet extends Model
{
    use HasFactory, HasChatter, HasMeetings, HasDocuments;

    protected $fillable = [
        'user_id',
        'project_id',
        'task_id',
        'date',
        'hours',
        'description',
        'status',
    ];

    protected $casts = [
        'date' => 'date',
        'hours' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
