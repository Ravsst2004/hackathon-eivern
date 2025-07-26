<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AccountForUser extends Notification
{
    use Queueable;

    protected $nim;
    protected $password;
    /**
     * Create a new notification instance.
     */
    public function __construct($nim, $password)
    {
        $this->nim = $nim;
        $this->password = $password;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
         return (new MailMessage)
            ->subject('Akun Anda Telah Dibuat')
            ->line('Akun Anda telah berhasil dibuat. Berikut adalah informasi login Anda:')
            ->line('NIM: ' . $this->nim)
            ->line('Password: ' . $this->password)
            ->line('Harap segera ganti password Anda setelah login pertama kali untuk keamanan akun.')
            ->action('Login Sekarang', route('login'))
            ->line('Jika Anda tidak meminta pembuatan akun ini, silakan hubungi administrator.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
