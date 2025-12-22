<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $fillable = [
        'user_id',
        'project_id',
        'task_id',
        'title',
        'content',
        'drawing_data',
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

    public function recordings()
    {
        return $this->hasMany(NoteRecording::class);
    }

    public function attachments()
    {
        return $this->hasMany(NoteAttachment::class);
    }
}
