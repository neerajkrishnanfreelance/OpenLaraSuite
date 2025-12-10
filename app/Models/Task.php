<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\HasChatter;
use App\Traits\HasMeetings;
use App\Traits\HasDocuments;

class Task extends Model
{
    use HasFactory, SoftDeletes, HasChatter, HasMeetings, HasDocuments;

    protected $fillable = [
        'project_id',
        'assigned_to',
        'created_by',
        'title',
        'description',
        'priority',
        'status',
        'due_date',
        // Lead specific fields
        // Lead specific fields
        'contact_id',
        'lead_stage_id',
        'contact_name',
        'mobile',
        'expected_revenue',
        'stage',
        'source',
    ];

    protected $casts = [
        'due_date' => 'date',
        'expected_revenue' => 'decimal:2',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function assignedUser()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function timesheets()
    {
        return $this->hasMany(Timesheet::class);
    }

    public function activities()
    {
        return $this->hasMany(ScheduledActivity::class);
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function leadStage()
    {
        return $this->belongsTo(LeadStage::class);
    }
}
