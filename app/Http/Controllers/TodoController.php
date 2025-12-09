<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Models\TodoCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class TodoController extends Controller
{
    /**
     * Display the todo dashboard with overview.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        // Today's todos
        $todayTodos = Todo::forUser($user->id)
            ->today()
            ->with('category')
            ->orderBy('due_time')
            ->get();

        // Overdue todos
        $overdueTodos = Todo::forUser($user->id)
            ->overdue()
            ->with('category')
            ->orderBy('due_date')
            ->get();

        // Upcoming todos (next 7 days)
        $upcomingTodos = Todo::forUser($user->id)
            ->upcoming(7)
            ->with('category')
            ->orderBy('due_date')
            ->orderBy('due_time')
            ->get();

        // Completion statistics
        $totalTodos = Todo::forUser($user->id)->count();
        $completedTodos = Todo::forUser($user->id)->completed()->count();
        $pendingTodos = Todo::forUser($user->id)->pending()->count();
        $completionRate = $totalTodos > 0 ? round(($completedTodos / $totalTodos) * 100) : 0;

        // Category breakdown
        $categories = TodoCategory::forUser($user->id)
            ->withCount(['todos' => function ($query) {
                $query->where('is_completed', false);
            }])
            ->get();

        return Inertia::render('Todos/Dashboard', [
            'todayTodos' => $todayTodos,
            'overdueTodos' => $overdueTodos,
            'upcomingTodos' => $upcomingTodos,
            'stats' => [
                'total' => $totalTodos,
                'completed' => $completedTodos,
                'pending' => $pendingTodos,
                'completion_rate' => $completionRate,
            ],
            'categories' => $categories,
        ]);
    }

    /**
     * Display the calendar view.
     */
    public function calendar(Request $request)
    {
        $user = $request->user();
        
        // Get todos for calendar (format for react-big-calendar)
        $todos = Todo::forUser($user->id)
            ->whereNotNull('due_date')
            ->with('category')
            ->get()
            ->map(function ($todo) {
                return [
                    'id' => $todo->id,
                    'title' => $todo->title,
                    'start' => $todo->due_date_time ? $todo->due_date_time->toIso8601String() : $todo->due_date->toIso8601String(),
                    'end' => $todo->due_date_time ? $todo->due_date_time->toIso8601String() : $todo->due_date->toIso8601String(),
                    'allDay' => !$todo->due_time,
                    'resource' => $todo,
                    'backgroundColor' => $todo->category->color ?? '#3b82f6',
                ];
            });

        $categories = TodoCategory::forUser($user->id)->get();

        return Inertia::render('Todos/Calendar', [
            'events' => $todos,
            'categories' => $categories,
        ]);
    }

    /**
     * Display the list view with filters.
     */
    public function list(Request $request)
    {
        $user = $request->user();
        
        $query = Todo::forUser($user->id)->with('category');

        // Apply filters
        if ($request->filled('category_id')) {
            $query->byCategory($request->category_id);
        }

        if ($request->filled('priority')) {
            $query->byPriority($request->priority);
        }

        if ($request->filled('status')) {
            if ($request->status === 'completed') {
                $query->completed();
            } elseif ($request->status === 'pending') {
                $query->pending();
            } elseif ($request->status === 'overdue') {
                $query->overdue();
            }
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Apply sorting
        $sortBy = $request->get('sort_by', 'due_date');
        $sortOrder = $request->get('sort_order', 'asc');
        $query->orderBy($sortBy, $sortOrder);

        $todos = $query->paginate(20)->withQueryString();
        $categories = TodoCategory::forUser($user->id)->get();

        return Inertia::render('Todos/List', [
            'todos' => $todos,
            'categories' => $categories,
            'filters' => $request->only(['category_id', 'priority', 'status', 'search', 'sort_by', 'sort_order']),
        ]);
    }

    /**
     * Store a newly created todo.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'due_time' => 'nullable|date_format:H:i',
            'priority' => 'nullable|in:low,medium,high',
            'category_id' => 'nullable|exists:todo_categories,id',
            'reminder_time' => 'nullable|date',
        ]);

        $validated['user_id'] = $request->user()->id;

        Todo::create($validated);

        return redirect()->back()->with('success', 'Todo created successfully.');
    }

    /**
     * Update the specified todo.
     */
    public function update(Request $request, Todo $todo)
    {
        // Authorize
        if ($todo->user_id !== $request->user()->id) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'due_time' => 'nullable|date_format:H:i',
            'priority' => 'nullable|in:low,medium,high',
            'category_id' => 'nullable|exists:todo_categories,id',
            'status' => 'nullable|in:pending,in_progress,completed',
            'reminder_time' => 'nullable|date',
        ]);

        $todo->update($validated);

        return redirect()->back()->with('success', 'Todo updated successfully.');
    }

    /**
     * Remove the specified todo.
     */
    public function destroy(Todo $todo)
    {
        // Authorize
        if ($todo->user_id !== request()->user()->id) {
            abort(403);
        }

        $todo->delete();

        return redirect()->back()->with('success', 'Todo deleted successfully.');
    }

    /**
     * Toggle the completion status of a todo.
     */
    public function toggleComplete(Todo $todo)
    {
        // Authorize
        if ($todo->user_id !== request()->user()->id) {
            abort(403);
        }

        $todo->toggleComplete();

        return response()->json([
            'success' => true,
            'todo' => $todo->fresh(),
        ]);
    }

    /**
     * Bulk delete todos.
     */
    public function bulkDelete(Request $request)
    {
        $validated = $request->validate([
            'todo_ids' => 'required|array',
            'todo_ids.*' => 'exists:todos,id',
        ]);

        // Authorize - ensure user owns all todos
        $todos = Todo::whereIn('id', $validated['todo_ids'])
            ->where('user_id', $request->user()->id)
            ->get();

        if ($todos->count() !== count($validated['todo_ids'])) {
            abort(403);
        }

        Todo::whereIn('id', $validated['todo_ids'])->delete();

        return response()->json([
            'success' => true,
            'message' => 'Todos deleted successfully.',
        ]);
    }
}
