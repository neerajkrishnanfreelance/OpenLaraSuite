<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

// Bootstrap Laravel
require __DIR__.'/vendor/autoload.php';
$app = require __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$response = $kernel->handle(
    $request = Request::create('/contacts', 'GET')
);

echo "Status: " . $response->getStatusCode() . "\n";
if ($response->getStatusCode() !== 200 && $response->getStatusCode() !== 302) {
    echo "Content: " . substr($response->getContent(), 0, 500) . "\n";
}
// 302 is expected if unauthenticated, which confirms controller didn't crash before middleware.
// To test controller logic deeply, we need auth.
