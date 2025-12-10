<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Config;

class DatabaseBackup extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:backup {--keep=7 : Number of backups to keep}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a backup of the database';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting database backup...');

        $connection = Config::get('database.default');
        $database = Config::get("database.connections.{$connection}.database");
        $username = Config::get("database.connections.{$connection}.username");
        $password = Config::get("database.connections.{$connection}.password");
        $host = Config::get("database.connections.{$connection}.host");
        $port = Config::get("database.connections.{$connection}.port");

        // Create backup directory if it doesn't exist
        $backupDir = storage_path('app/backups');
        if (!file_exists($backupDir)) {
            mkdir($backupDir, 0755, true);
        }

        // Generate backup filename with timestamp
        $timestamp = date('Y-m-d_H-i-s');
        $filename = "backup_{$timestamp}.sql";
        $filepath = $backupDir . '/' . $filename;
        $gzFilepath = $filepath . '.gz';

        try {
            if ($connection === 'pgsql') {
                // PostgreSQL backup using pg_dump
                $command = sprintf(
                    'PGPASSWORD=%s pg_dump -h %s -p %s -U %s -F c -b -v -f %s %s 2>&1',
                    escapeshellarg($password),
                    escapeshellarg($host),
                    escapeshellarg($port),
                    escapeshellarg($username),
                    escapeshellarg($filepath),
                    escapeshellarg($database)
                );
            } elseif ($connection === 'mysql') {
                // MySQL backup using mysqldump
                $command = sprintf(
                    'mysqldump -h %s -P %s -u %s -p%s %s > %s 2>&1',
                    escapeshellarg($host),
                    escapeshellarg($port),
                    escapeshellarg($username),
                    escapeshellarg($password),
                    escapeshellarg($database),
                    escapeshellarg($filepath)
                );
            } elseif ($connection === 'sqlite') {
                // SQLite backup - simple file copy
                $sqlitePath = database_path('database.sqlite');
                if (file_exists($sqlitePath)) {
                    copy($sqlitePath, $filepath);
                    $this->info('SQLite database backed up successfully.');
                } else {
                    $this->error('SQLite database file not found.');
                    return 1;
                }
            } else {
                $this->error("Unsupported database connection: {$connection}");
                return 1;
            }

            // Execute backup command for PostgreSQL/MySQL
            if ($connection !== 'sqlite') {
                exec($command, $output, $returnCode);

                if ($returnCode !== 0) {
                    $this->error('Backup failed!');
                    $this->error(implode("\n", $output));
                    return 1;
                }
            }

            // Get final file path (no compression)
            $finalFile = $filepath;
            $fileSize = filesize($finalFile);
            $fileSizeMB = round($fileSize / 1024 / 1024, 2);

            $this->info("Backup created successfully!");
            $this->info("File: " . basename($finalFile));
            $this->info("Size: {$fileSizeMB} MB");
            $this->info("Location: {$finalFile}");

            // Clean up old backups
            $this->cleanupOldBackups($this->option('keep'));

            return 0;
        } catch (\Exception $e) {
            $this->error('Backup failed: ' . $e->getMessage());
            return 1;
        }
    }

    /**
     * Clean up old backup files
     */
    private function cleanupOldBackups($keep = 7)
    {
        $backupDir = storage_path('app/backups');
        $files = array_merge(
            glob($backupDir . '/backup_*.sql') ?: [],
            glob($backupDir . '/backup_*.gz') ?: [],
            glob($backupDir . '/backup_*.sql.gz') ?: []
        );

        if (count($files) <= $keep) {
            return;
        }

        // Sort files by modification time (oldest first)
        usort($files, function ($a, $b) {
            return filemtime($a) - filemtime($b);
        });

        // Delete oldest files
        $filesToDelete = array_slice($files, 0, count($files) - $keep);
        foreach ($filesToDelete as $file) {
            unlink($file);
            $this->info("Deleted old backup: " . basename($file));
        }
    }
}
