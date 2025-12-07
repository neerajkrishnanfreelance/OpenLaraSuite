<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = ['name', 'path', 'mime_type', 'size', 'documentable_id', 'documentable_type'];

    public function documentable()
    {
        return $this->morphTo();
    }
    //
}
