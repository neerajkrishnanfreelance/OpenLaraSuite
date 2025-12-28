<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class EmailConfigurationServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        try {
            if (\Illuminate\Support\Facades\Schema::hasTable('email_configurations')) {
                $config = \App\Models\EmailConfiguration::first();
                if ($config) {
                    $mailConfig = [
                        'transport' => $config->driver,
                        'host' => $config->host,
                        'port' => $config->port,
                        'encryption' => $config->encryption,
                        'username' => $config->username,
                        'password' => $config->password,
                        'timeout' => null,
                        'local_domain' => env('MAIL_EHLO_DOMAIN'),
                    ];

                    config(['mail.mailers.smtp' => $mailConfig]);
                    config(['mail.from.address' => $config->from_address]);
                    config(['mail.from.name' => $config->from_name]);
                }
            }
        } catch (\Exception $e) {
            // Fallback to .env or log error if needed
        }
    }
}
