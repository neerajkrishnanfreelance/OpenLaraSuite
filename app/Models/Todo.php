<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Todo extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'description',
        'due_date',
        'due_time',
        'priority',
        'status',
        'is_completed',
        'completed_at',
        'reminder_time',
    ];

    protected $casts = [
        'due_date' => 'date',
        'is_completed' => 'boolean',
        'completed_at' => 'datetime',
        'reminder_time' => 'datetime',
    ];

    /**
     * Get the user that owns the todo.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the category that the todo belongs to.
     */
    public function category()
    {
        return $this->belongsTo(TodoCategory::class, 'category_id');
    }

    /**
     * Scope a query to only include todos for a specific user.
     */
    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope a query to only include completed todos.
     */
    public function scopeCompleted($query)
    {
        return $query->where('is_completed', true);
    }

    /**
     * Scope a query to only include pending todos.
     */
    public function scopePending($query)
    {
        return $query->where('is_completed', false);
    }

    /**
     * Scope a query to only include overdue todos.
     */
    public function scopeOverdue($query)
    {
        return $query->where('is_completed', false)
                     ->where('due_date', '<', now()->toDateString());
    }

    /**
     * Scope a query to only include todos due today.
     */
    public function scopeToday($query)
    {
        return $query->where('due_date', now()->toDateString());
    }

    /**
     * Scope a query to only include upcoming todos.
     */
    public function scopeUpcoming($query, $days = 7)
    {
        return $query->where('is_completed', false)
                     ->where('due_date', '>=', now()->toDateString())
                     ->where('due_date', '<=', now()->addDays($days)->toDateString());
    }

    /**
     * Scope a query to filter by priority.
     */
    public function scopeByPriority($query, $priority)
    {
        return $query->where('priority', $priority);
    }

    /**
     * Scope a query to filter by category.
     */
    public function scopeByCategory($query, $categoryId)
    {
        return $query->where('category_id', $categoryId);
    }

    /**
     * Toggle the completion status of the todo.
     */
    public function toggleComplete()
    {
        $this->is_completed = !$this->is_completed;
        $this->completed_at = $this->is_completed ? now() : null;
        $this->status = $this->is_completed ? 'completed' : 'pending';
        $this->save();

        return $this;
    }

    /**
     * Check if the todo is overdue.
     */
    public function isOverdue()
    {
        if ($this->is_completed || !$this->due_date) {
            return false;
        }

        return $this->due_date->isPast();
    }

    /**
     * Get the combined due date and time.
     */
    public function getDueDateTimeAttribute()
    {
        if (!$this->due_date) {
            return null;
        }

        $dateTime = $this->due_date->format('Y-m-d');
        
        if ($this->due_time) {
            $dateTime .= ' ' . $this->due_time;
        }

        return Carbon::parse($dateTime);
    }
}
