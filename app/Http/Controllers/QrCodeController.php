<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class QrCodeController extends Controller
{
    public function index()
    {
        // Attempt to get local IP
        $localIp = '127.0.0.1';
        try {
            // Create a UDP socket to a public address to determine routing interface
            // This does not actually send data packets
            if (function_exists('socket_create')) {
                $sock = socket_create(AF_INET, SOCK_DGRAM, SOL_UDP);
                if ($sock) {
                    socket_connect($sock, "8.8.8.8", 53);
                    socket_getsockname($sock, $localIp);
                    socket_close($sock);
                }
            }
        } catch (\Exception $e) {
            // Fallback to hostname -I if socket fails
            try {
                $ip = trim(shell_exec("hostname -I | awk '{print $1}'"));
                if (!empty($ip)) {
                    $localIp = $ip;
                }
            } catch (\Exception $ex) {
                // Keep 127.0.0.1
            }
        }

        // Attempt to detect Ngrok URL
        $ngrokUrl = env('NGROK_URL');
        
        if (!$ngrokUrl) {
            try {
                $tunnels = @file_get_contents('http://127.0.0.1:4040/api/tunnels');
                if ($tunnels) {
                    $data = json_decode($tunnels, true);
                    if (isset($data['tunnels'][0]['public_url'])) {
                        $ngrokUrl = $data['tunnels'][0]['public_url'];
                    }
                }
            } catch (\Exception $e) {
                // Ngrok not running or not accessible
            }
        }

        return Inertia::render('QrCode/Index', [
            'localIp' => $localIp,
            'appPort' => env('APP_PORT', '8000'),
            'ngrokUrl' => $ngrokUrl,
        ]);
    }
}
