<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CrmLead extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'contact_id',
        'contact_name',
        'email',
        'phone',
        'company',
        'lead_stage_id',
        'expected_revenue',
        'source',
        'medium_id',
        'priority',
        'status',
        'assigned_to',
        'created_by',
        'expected_close_date',
        'last_contact_date',
        'tags',
        'notes',
    ];

    protected $casts = [
        'tags' => 'array',
        'expected_revenue' => 'decimal:2',
        'expected_close_date' => 'date',
        'last_contact_date' => 'datetime',
    ];

    // Relationships
    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function leadStage()
    {
        return $this->belongsTo(LeadStage::class);
    }

    public function medium()
    {
        return $this->belongsTo(Medium::class);
    }

    public function assignedUser()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function activities()
    {
        return $this->morphMany(ScheduledActivity::class, 'activityable');
    }

    public function chatterMessages()
    {
        return $this->morphMany(ChatterMessage::class, 'chatterable');
    }

    public function documents()
    {
        return $this->morphMany(Document::class, 'documentable');
    }
}
