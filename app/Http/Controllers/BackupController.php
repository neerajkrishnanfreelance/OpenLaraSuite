<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class BackupController extends Controller
{
    /**
     * Display a listing of the backups.
     */
    public function index()
    {
        $backupDir = storage_path('app/backups');
        
        // Ensure directory exists
        if (!file_exists($backupDir)) {
            if (!mkdir($backupDir, 0755, true) && !is_dir($backupDir)) {
                // If we can't create it, return empty list with error flash (optional) or just empty
                // For now, let's just return empty but log it? 
                // Better: just return empty list, the store method will try to create it too.
                return Inertia::render('Settings/Backups', [
                    'backups' => []
                ]);
            }
        }

        $files = array_filter(glob($backupDir . '/*'), 'is_file');
        
        $backups = [];
        foreach ($files as $file) {
            try {
                $backups[] = [
                    'name' => basename($file),
                    'size' => round(filesize($file) / 1024 / 1024, 2) . ' MB',
                    'date' => date('Y-m-d H:i:s', filemtime($file)),
                    'path' => $file,
                ];
            } catch (\Exception $e) {
                // Skip files we can't read
                continue;
            }
        }

        // Sort by date descending
        usort($backups, function ($a, $b) {
            return strtotime($b['date']) - strtotime($a['date']);
        });

        return Inertia::render('Settings/Backups', [
            'backups' => $backups
        ]);
    }

    /**
     * Store a newly created backup in storage.
     */
    public function store()
    {
        try {
            Artisan::call('db:backup');
            return back()->with('success', 'Backup created successfully!');
        } catch (\Exception $e) {
            return back()->with('error', 'Backup failed: ' . $e->getMessage());
        }
    }

    /**
     * Download the specified backup.
     */
    public function download($name)
    {
        $path = storage_path('app/backups/' . $name);
        
        if (!file_exists($path)) {
            return back()->with('error', 'Backup file not found.');
        }

        return response()->download($path);
    }

    /**
     * Remove the specified backup from storage.
     */
    public function destroy($name)
    {
        $path = storage_path('app/backups/' . $name);
        
        if (file_exists($path)) {
            unlink($path);
            return back()->with('success', 'Backup deleted successfully.');
        }

        return back()->with('error', 'Backup file not found.');
    }

    /**
     * Restore the database from the specified backup.
     */
    public function restore($name)
    {
        try {
            $exitCode = Artisan::call('db:restore', ['filename' => $name]);

            if ($exitCode === 0) {
                return back()->with('success', 'Database restored successfully! You may need to refresh the page.');
            } else {
                return back()->with('error', 'Restore failed. Check logs for details.');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Restore failed: ' . $e->getMessage());
        }
    }
}
