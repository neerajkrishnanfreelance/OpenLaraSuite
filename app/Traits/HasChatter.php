<?php

namespace App\Traits;

use App\Models\ChatterMessage;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait HasChatter
{
    /**
     * Get all of the chatter messages for the model.
     */
    public function chatterMessages(): MorphMany
    {
        return $this->morphMany(ChatterMessage::class, 'chatterable')->latest();
    }
}
