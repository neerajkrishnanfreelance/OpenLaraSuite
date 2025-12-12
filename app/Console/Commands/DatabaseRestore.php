<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Storage;

class DatabaseRestore extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:restore {filename : The name of the backup file to restore} {--connection= : Database connection to use}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Restore the database from a backup file';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $filename = $this->argument('filename');
        $backupDir = storage_path('app/backups');
        $filepath = $backupDir . '/' . $filename;

        if (!file_exists($filepath)) {
            $this->error("Backup file not found: {$filename}");
            return 1;
        }

        $this->info("Restoring from: {$filename}");

        $connection = $this->option('connection') ?: Config::get('database.default');
        $database = Config::get("database.connections.{$connection}.database");
        $username = Config::get("database.connections.{$connection}.username");
        $password = Config::get("database.connections.{$connection}.password");
        $host = Config::get("database.connections.{$connection}.host");
        $port = Config::get("database.connections.{$connection}.port");

        // Handle decompression if needed
        $cleanFilepath = $filepath;
        $isGzipped = str_ends_with($filename, '.gz');
        
        if ($isGzipped) {
            $this->info("Decompressing backup...");
            $cleanFilepath = substr($filepath, 0, -3); // remove .gz
            // Use gzip -dk to keep original file
            exec("gzip -dk -f " . escapeshellarg($filepath), $output, $returnCode);
            
            if ($returnCode !== 0) {
                $this->error("Decompression failed!");
                return 1;
            }
        }

        try {
            if ($connection === 'pgsql') {
                // PostgreSQL Import
                // Using pg_restore for custom format (-F c) which we used in backup
                // Note: --clean to drop objects before creating them
                // Note: --if-exists to avoid errors if objects don't exist
                
                // If it was a plain SQL dump (not possible with our backup command unless changed, but good to handle if manual)
                // Our backup uses -F c.
                
                 $command = sprintf(
                    'PGPASSWORD=%s pg_restore -h %s -p %s -U %s -d %s --clean --if-exists -v %s 2>&1',
                    escapeshellarg($password),
                    escapeshellarg($host),
                    escapeshellarg($port),
                    escapeshellarg($username),
                    escapeshellarg($database),
                    escapeshellarg($cleanFilepath)
                );

            } elseif ($connection === 'mysql') {
                // MySQL Import
                 $command = sprintf(
                    'mysql -h %s -P %s -u %s -p%s %s < %s 2>&1',
                    escapeshellarg($host),
                    escapeshellarg($port),
                    escapeshellarg($username),
                    escapeshellarg($password),
                    escapeshellarg($database),
                    escapeshellarg($cleanFilepath)
                );

            } elseif ($connection === 'sqlite') {
                // SQLite Import - just overwrite the file
                $sqlitePath = database_path('database.sqlite');
                copy($cleanFilepath, $sqlitePath);
                $this->info("SQLite database restored successfully.");
                
                // Cleanup decompressed file if we created one
                if ($isGzipped && file_exists($cleanFilepath)) {
                    unlink($cleanFilepath);
                }
                return 0;
            } else {
                $this->error("Unsupported connection: {$connection}");
                return 1;
            }

            // Execute restore
            $this->info("Importing database...");
            exec($command, $output, $returnCode);

            // Cleanup decompressed file
            if ($isGzipped && file_exists($cleanFilepath)) {
                unlink($cleanFilepath);
            }

            if ($returnCode !== 0) {
                $this->error("Restore failed!");
                $this->error(implode("\n", $output));
                return 1;
            }

            $this->info("Database restored successfully!");
            return 0;

        } catch (\Exception $e) {
            $this->error('Restore failed: ' . $e->getMessage());
            // Cleanup on error
            if ($isGzipped && file_exists($cleanFilepath)) {
                unlink($cleanFilepath);
            }
            return 1;
        }
    }
}
