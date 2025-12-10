<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Contact extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'hourly_rate',
        'company',
        'address',
        'description',
        'status',
        'assigned_to',
        'created_by',
        'tags',
        'source',
    ];

    protected $casts = [
        'tags' => 'array',
        'hourly_rate' => 'decimal:2',
    ];

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function assignedUser()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
