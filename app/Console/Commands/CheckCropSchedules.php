<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CheckCropSchedules extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'agriculture:check-schedules';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check for upcoming crop watering and fertilizer schedules and notify users';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $tomorrow = now()->addDay()->startOfDay();
        $endOfTomorrow = now()->addDay()->endOfDay();
        
        // Check Schedules for tomorrow
        $schedules = \App\Models\CropSchedule::whereBetween('scheduled_date', [$tomorrow, $endOfTomorrow])
            ->whereNull('completed_at')
            ->with('crop')
            ->get();

        foreach ($schedules as $schedule) {
            $this->info("Notifying for {$schedule->activity_type}: {$schedule->crop->name}");
            
            $user = \App\Models\User::first();
            if ($user && $schedule->crop) {
                // We'll reuse the existing notification class but pass the activity type dynamicall
                $user->notify(new \App\Notifications\UpcomingCropScheduleNotification($schedule->crop, $schedule->activity_type));
            }
        }
    }
}
