<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class LearningController extends Controller
{
    public function index()
    {
        $projects = Project::where('is_learning', true)
            ->whereHas('users', function ($query) {
                $query->where('users.id', Auth::id());
            })
            ->with(['tasks' => function ($query) {
                $query->latest()->limit(5);
            }])
            ->get();

        return Inertia::render('Learning/Index', [
            'projects' => $projects,
        ]);
    }
}
