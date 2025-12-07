<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use App\Traits\HasDocuments;

class ChatterMessage extends Model
{
    use HasFactory, HasDocuments;

    protected $fillable = [
        'user_id',
        'chatterable_id',
        'chatterable_type',
        'message',
        'attachment_path',
    ];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
