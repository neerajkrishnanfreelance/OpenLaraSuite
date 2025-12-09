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
use App\Http\Controllers\RequirementController;
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

    // Shortcuts from Welcome Page
    Route::redirect('/crm', '/projects');
    // Budget module - handled in budget routes group below
    Route::redirect('/expense', '/expenses');

    Route::resource('expense-products', \App\Http\Controllers\ProductController::class);
    Route::resource('expenses', \App\Http\Controllers\ExpenseController::class);
    Route::post('expenses/{entry}/post', [\App\Http\Controllers\ExpenseController::class, 'post'])->name('expenses.post');

    // Specific routes must come before resources to avoid wildcard conflicts
    Route::get('/tasks/export', [App\Http\Controllers\ImportExportController::class, 'exportTasks'])->name('tasks.export');
    Route::post('/tasks/import', [App\Http\Controllers\ImportExportController::class, 'importTasks'])->name('tasks.import');
    Route::post('/tasks/{task}/timesheets', [TaskController::class, 'storeTimesheet'])->name('tasks.timesheets.store');
    Route::get('/timesheets/export', [App\Http\Controllers\ImportExportController::class, 'exportTimesheets'])->name('timesheets.export');
    Route::post('/chatter/store', [ChatterController::class, 'store'])->name('chatter.store');
    Route::get('/calendar', [App\Http\Controllers\CalendarController::class, 'index'])->name('calendar.index');
    
    // Learning Module
    Route::get('/learning', [App\Http\Controllers\LearningController::class, 'index'])->name('learning.index');
    Route::post('/learning/subjects', [App\Http\Controllers\LearningController::class, 'storeSubject'])->name('learning.subjects.store');
    Route::post('/learning/timetable', [App\Http\Controllers\LearningController::class, 'storeTimetable'])->name('learning.timetable.store');
    Route::delete('/learning/timetable/{entry}', [App\Http\Controllers\LearningController::class, 'destroyTimetable'])->name('learning.timetable.destroy');

    Route::post('/documents', [App\Http\Controllers\DocumentController::class, 'store'])->name('documents.store');
    Route::delete('/documents/{document}', [App\Http\Controllers\DocumentController::class, 'destroy'])->name('documents.destroy');
    Route::resource('journal', \App\Http\Controllers\JournalController::class);

    Route::resource('projects', ProjectController::class);
    Route::resource('tasks', TaskController::class);
    Route::resource('employees', EmployeeController::class);
    Route::resource('meetings', MeetingController::class);
    Route::post('/timesheets/timer/start', [TimesheetController::class, 'storeTimer'])->name('timesheets.timer.start');
    Route::post('/timesheets/timer/stop', [TimesheetController::class, 'stopTimer'])->name('timesheets.timer.stop');
    Route::resource('timesheets', TimesheetController::class);
    Route::resource('overtime-requests', OvertimeRequestController::class);

    Route::post('/requirements', [RequirementController::class, 'store'])->name('requirements.store');
    Route::put('/requirements/{requirement}', [RequirementController::class, 'update'])->name('requirements.update');
    Route::delete('/requirements/{requirement}', [RequirementController::class, 'destroy'])->name('requirements.destroy');
    Route::get('/projects/{project}/requirements/export', [RequirementController::class, 'export'])->name('requirements.export');
    Route::post('/projects/{project}/requirements/import', [RequirementController::class, 'import'])->name('requirements.import');

    // Health & Wellness Module Routes
    Route::prefix('health')->group(function () {
        Route::get('/', [App\Http\Controllers\HealthDashboardController::class, 'index'])->name('health.dashboard');
        
        // Food Items
        Route::get('/food-items', [App\Http\Controllers\FoodItemController::class, 'index'])->name('health.food-items.index');
        Route::post('/food-items', [App\Http\Controllers\FoodItemController::class, 'store'])->name('health.food-items.store');
        Route::put('/food-items/{foodItem}', [App\Http\Controllers\FoodItemController::class, 'update'])->name('health.food-items.update');
        Route::delete('/food-items/{foodItem}', [App\Http\Controllers\FoodItemController::class, 'destroy'])->name('health.food-items.destroy');
        Route::get('/food-items/search', [App\Http\Controllers\FoodItemController::class, 'search'])->name('health.food-items.search');
        
        // Daily Food Logs
        Route::get('/food-logs', [App\Http\Controllers\DailyFoodLogController::class, 'index'])->name('health.food-logs.index');
        Route::post('/food-logs', [App\Http\Controllers\DailyFoodLogController::class, 'store'])->name('health.food-logs.store');
        Route::put('/food-logs/{dailyFoodLog}', [App\Http\Controllers\DailyFoodLogController::class, 'update'])->name('health.food-logs.update');
        Route::delete('/food-logs/{dailyFoodLog}', [App\Http\Controllers\DailyFoodLogController::class, 'destroy'])->name('health.food-logs.destroy');
        Route::get('/food-logs/daily-summary', [App\Http\Controllers\DailyFoodLogController::class, 'dailySummary'])->name('health.food-logs.daily-summary');
        
        // Workout Logs
        Route::get('/workouts', [App\Http\Controllers\WorkoutLogController::class, 'index'])->name('health.workouts.index');
        Route::post('/workouts', [App\Http\Controllers\WorkoutLogController::class, 'store'])->name('health.workouts.store');
        Route::put('/workouts/{workoutLog}', [App\Http\Controllers\WorkoutLogController::class, 'update'])->name('health.workouts.update');
        Route::delete('/workouts/{workoutLog}', [App\Http\Controllers\WorkoutLogController::class, 'destroy'])->name('health.workouts.destroy');
        Route::get('/workouts/weekly-summary', [App\Http\Controllers\WorkoutLogController::class, 'weeklySummary'])->name('health.workouts.weekly-summary');
        
        // Health Goals
        Route::get('/goals', [App\Http\Controllers\HealthGoalController::class, 'index'])->name('health.goals.index');
        Route::post('/goals', [App\Http\Controllers\HealthGoalController::class, 'store'])->name('health.goals.store');
        Route::get('/goals/progress', [App\Http\Controllers\HealthGoalController::class, 'progress'])->name('health.goals.progress');
    });

    // Todo Module Routes
    Route::prefix('todos')->group(function () {
        // Dashboard
        Route::get('/', [App\Http\Controllers\TodoController::class, 'index'])->name('todos.index');
        
        // Calendar View
        Route::get('/calendar', [App\Http\Controllers\TodoController::class, 'calendar'])->name('todos.calendar');
        
        // List View
        Route::get('/list', [App\Http\Controllers\TodoController::class, 'list'])->name('todos.list');
        
        // CRUD
        Route::post('/', [App\Http\Controllers\TodoController::class, 'store'])->name('todos.store');
        Route::put('/{todo}', [App\Http\Controllers\TodoController::class, 'update'])->name('todos.update');
        Route::delete('/{todo}', [App\Http\Controllers\TodoController::class, 'destroy'])->name('todos.destroy');
        
        // Actions
        Route::post('/{todo}/toggle', [App\Http\Controllers\TodoController::class, 'toggleComplete'])->name('todos.toggle');
        Route::post('/bulk-delete', [App\Http\Controllers\TodoController::class, 'bulkDelete'])->name('todos.bulk-delete');
        
        // Categories
        Route::get('/categories', [App\Http\Controllers\TodoCategoryController::class, 'index'])->name('todos.categories.index');
        Route::post('/categories', [App\Http\Controllers\TodoCategoryController::class, 'store'])->name('todos.categories.store');
        Route::put('/categories/{category}', [App\Http\Controllers\TodoCategoryController::class, 'update'])->name('todos.categories.update');
        Route::delete('/categories/{category}', [App\Http\Controllers\TodoCategoryController::class, 'destroy'])->name('todos.categories.destroy');
    });

    // Accounting Module Routes
    Route::prefix('accounting')->group(function () {
        // Dashboard
        Route::get('/', [App\Http\Controllers\AccountingDashboardController::class, 'index'])->name('accounting.dashboard');
        
        // Chart of Accounts
        Route::get('/accounts', [App\Http\Controllers\AccountController::class, 'index'])->name('accounting.accounts.index');
        Route::post('/accounts', [App\Http\Controllers\AccountController::class, 'store'])->name('accounting.accounts.store');
        Route::put('/accounts/{account}', [App\Http\Controllers\AccountController::class, 'update'])->name('accounting.accounts.update');
        Route::delete('/accounts/{account}', [App\Http\Controllers\AccountController::class, 'destroy'])->name('accounting.accounts.destroy');
        Route::get('/accounts/{account}', [App\Http\Controllers\AccountController::class, 'show'])->name('accounting.accounts.show');
        
        // Journal Entries
        Route::get('/entries', [App\Http\Controllers\AccountingJournalEntryController::class, 'index'])->name('accounting.entries.index');
        Route::get('/entries/create', [App\Http\Controllers\AccountingJournalEntryController::class, 'create'])->name('accounting.entries.create');
        Route::post('/entries', [App\Http\Controllers\AccountingJournalEntryController::class, 'store'])->name('accounting.entries.store');
        Route::get('/entries/{entry}', [App\Http\Controllers\AccountingJournalEntryController::class, 'show'])->name('accounting.entries.show');
        Route::get('/entries/{entry}/edit', [App\Http\Controllers\AccountingJournalEntryController::class, 'edit'])->name('accounting.entries.edit');
        Route::put('/entries/{entry}', [App\Http\Controllers\AccountingJournalEntryController::class, 'update'])->name('accounting.entries.update');
        Route::post('/entries/{entry}/post', [App\Http\Controllers\AccountingJournalEntryController::class, 'post'])->name('accounting.entries.post');
        Route::post('/entries/{entry}/cancel', [App\Http\Controllers\AccountingJournalEntryController::class, 'cancel'])->name('accounting.entries.cancel');
        Route::delete('/entries/{entry}', [App\Http\Controllers\AccountingJournalEntryController::class, 'destroy'])->name('accounting.entries.destroy');
        
        // Journals
        Route::resource('/journals', App\Http\Controllers\AccountingJournalController::class)->names([
            'index' => 'accounting.journals.index',
            'store' => 'accounting.journals.store',
            'update' => 'accounting.journals.update',
            'destroy' => 'accounting.journals.destroy',
        ]);

        // Report Routes (Keep existing)
        Route::get('/reports/balance-sheet', [App\Http\Controllers\AccountingReportController::class, 'balanceSheet'])->name('accounting.reports.balance-sheet');
        Route::get('/reports/profit-loss', [App\Http\Controllers\AccountingReportController::class, 'profitLoss'])->name('accounting.reports.profit-loss');
        Route::get('/reports/general-ledger', [App\Http\Controllers\AccountingReportController::class, 'generalLedger'])->name('accounting.reports.general-ledger');
        Route::get('/reports/trial-balance', [App\Http\Controllers\AccountingReportController::class, 'trialBalance'])->name('accounting.reports.trial-balance');
        Route::get('/reports/journal-ledger', [App\Http\Controllers\AccountingReportController::class, 'journalLedger'])->name('accounting.reports.journal-ledger');
    });

    // Budget Module Routes
    Route::prefix('budget')->group(function () {
        // Dashboard (root of budget module)
        Route::get('/', [App\Http\Controllers\BudgetDashboardController::class, 'index'])->name('budget.dashboard');
        
        // Categories (Master)
        Route::get('/categories', [App\Http\Controllers\BudgetCategoryController::class, 'index'])->name('budget.categories.index');
        Route::post('/categories', [App\Http\Controllers\BudgetCategoryController::class, 'store'])->name('budget.categories.store');
        Route::put('/categories/{category}', [App\Http\Controllers\BudgetCategoryController::class, 'update'])->name('budget.categories.update');
        Route::delete('/categories/{category}', [App\Http\Controllers\BudgetCategoryController::class, 'destroy'])->name('budget.categories.destroy');
        
        // Budget Plans
        Route::resource('plans', App\Http\Controllers\BudgetPlanController::class)->names([
            'index' => 'budget.plans.index',
            'create' => 'budget.plans.create',
            'store' => 'budget.plans.store',
            'show' => 'budget.plans.show',
            'edit' => 'budget.plans.edit',
            'update' => 'budget.plans.update',
            'destroy' => 'budget.plans.destroy',
        ]);
        
        // Budget Entries
        Route::get('/entries', [App\Http\Controllers\BudgetEntryController::class, 'index'])->name('budget.entries.index');
        Route::get('/entries/calendar', [App\Http\Controllers\BudgetEntryController::class, 'calendar'])->name('budget.entries.calendar');
        Route::post('/entries', [App\Http\Controllers\BudgetEntryController::class, 'store'])->name('budget.entries.store');
        Route::put('/entries/{entry}', [App\Http\Controllers\BudgetEntryController::class, 'update'])->name('budget.entries.update');
        Route::delete('/entries/{entry}', [App\Http\Controllers\BudgetEntryController::class, 'destroy'])->name('budget.entries.destroy');
    });


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Journal Masters
    Route::post('/journal/categories', [App\Http\Controllers\JournalController::class, 'storeCategory'])->name('journal.categories.store');
    Route::delete('/journal/categories/{category}', [App\Http\Controllers\JournalController::class, 'destroyCategory'])->name('journal.categories.destroy');

    // System Backups
    Route::get('/settings/backups', [App\Http\Controllers\BackupController::class, 'index'])->name('backups.index');
    Route::post('/settings/backups', [App\Http\Controllers\BackupController::class, 'store'])->name('backups.store');
    Route::get('/settings/backups/{name}', [App\Http\Controllers\BackupController::class, 'download'])->name('backups.download');
    Route::delete('/settings/backups/{name}', [App\Http\Controllers\BackupController::class, 'destroy'])->name('backups.destroy');
});

require __DIR__.'/auth.php';
