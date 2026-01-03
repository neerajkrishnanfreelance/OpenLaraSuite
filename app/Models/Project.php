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

    public function requirements()
    {
        return $this->hasMany(Requirement::class);
    }

    public function notes()
    {
        return $this->hasMany(Note::class);
    }

    public function scopeLearning($query)
    {
        return $query->where('is_learning', true);
    }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', '%'.$search.'%')
                      ->orWhere('description', 'like', '%'.$search.'%');
            });
        })->when($filters['search_name'] ?? null, function ($query, $search) {
            $query->where('name', 'like', '%'.$search.'%');
        })->when($filters['search_description'] ?? null, function ($query, $search) {
            $query->where('description', 'like', '%'.$search.'%');
        })->when($filters['status'] ?? null, function ($query, $status) {
            if ($status !== 'all') {
                $query->where('status', $status);
            }
        })->when($filters['date_range'] ?? null, function ($query, $range) {
            // Assume $range is like "start,end"
             $dates = explode(',', $range);
             if (count($dates) == 2) {
                 $query->whereBetween('start_date', [$dates[0], $dates[1]]);
             }
        });
    }
}
