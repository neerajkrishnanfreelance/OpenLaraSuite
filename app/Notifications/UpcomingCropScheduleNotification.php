<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class UpcomingCropScheduleNotification extends Notification
{
    use Queueable;

    public $crop;
    public $type;

    /**
     * Create a new notification instance.
     */
    public function __construct($crop, $type)
    {
        $this->crop = $crop;
        $this->type = $type;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $date = $this->type === 'watering' ? $this->crop->watering_schedule->format('Y-m-d') : $this->crop->fertilizer_schedule->format('Y-m-d');
        
        return (new MailMessage)
                    ->subject("Upcoming {$this->type} Schedule for {$this->crop->name}")
                    ->line("This is a reminder that the {$this->type} schedule for {$this->crop->name} is tomorrow ({$date}).")
                    ->action('View Crop', url('/agriculture/crops/' . $this->crop->id))
                    ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        $date = $this->type === 'watering' ? $this->crop->watering_schedule->format('Y-m-d') : $this->crop->fertilizer_schedule->format('Y-m-d');

        return [
            'crop_id' => $this->crop->id,
            'crop_name' => $this->crop->name,
            'type' => $this->type,
            'schedule_date' => $date,
            'message' => "Upcoming {$this->type} schedule for {$this->crop->name} is on {$date}.",
        ];
    }
}
