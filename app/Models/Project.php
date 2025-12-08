<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\HasChatter;
use App\Traits\HasMeetings;
use App\Traits\HasDocuments;

class Project extends Model
{
    use HasFactory, SoftDeletes, HasChatter, HasMeetings, HasDocuments;

    protected $fillable = [
        'name',
        'description',
        'status',
        'start_date',
        'end_date',
        'is_learning',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'is_learning' => 'boolean',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'project_user');
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function timesheets()
    {
        return $this->hasMany(Timesheet::class);
    }
}
