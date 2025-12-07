<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\MeetingController;
use App\Http\Controllers\TimesheetController;
use App\Http\Controllers\OvertimeRequestController;
use App\Http\Controllers\ChatterController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('projects', ProjectController::class);

    Route::resource('tasks', TaskController::class);
    Route::resource('employees', EmployeeController::class);
    Route::resource('meetings', MeetingController::class);
    Route::resource('timesheets', TimesheetController::class);
    Route::resource('overtime-requests', OvertimeRequestController::class);

    Route::post('/chatter/store', [ChatterController::class, 'store'])->name('chatter.store');

    Route::get('/calendar', [App\Http\Controllers\CalendarController::class, 'index'])->name('calendar.index');
    Route::post('/documents', [App\Http\Controllers\DocumentController::class, 'store'])->name('documents.store');
    Route::delete('/documents/{document}', [App\Http\Controllers\DocumentController::class, 'destroy'])->name('documents.destroy');
    Route::get('/tasks/export', [App\Http\Controllers\ImportExportController::class, 'exportTasks'])->name('tasks.export');
    Route::post('/tasks/import', [App\Http\Controllers\ImportExportController::class, 'importTasks'])->name('tasks.import');
    Route::post('/tasks/{task}/timesheets', [TaskController::class, 'storeTimesheet'])->name('tasks.timesheets.store');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
