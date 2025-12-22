<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NoteAttachment extends Model
{
    protected $fillable = [
        'note_id',
        'type',
        'name',
        'file_path',
        'url',
        'mime_type'
    ];

    public function note()
    {
        return $this->belongsTo(Note::class);
    }
}
