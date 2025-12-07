<?php

namespace App\Traits;

use App\Models\Meeting;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait HasMeetings
{
    /**
     * Get all of the meetings for the model.
     */
    public function relatedMeetings(): MorphMany
    {
        return $this->morphMany(Meeting::class, 'meetingable')->latest();
    }
}
