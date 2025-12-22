<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Note; // Added this line for the Note relationship

class NoteRecording extends Model
{
    protected $fillable = ['note_id', 'file_path', 'duration'];

    public function note()
    {
        return $this->belongsTo(Note::class);
    }
}
