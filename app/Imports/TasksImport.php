<?php

namespace App\Imports;

use App\Models\Task;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Support\Facades\Auth;

class TasksImport implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Task([
            'title'     => $row['title'],
            'description' => $row['description'] ?? null,
            'status'    => $row['status'] ?? 'todo',
            'priority'  => $row['priority'] ?? 'medium',
            'due_date'  => $row['due_date'] ?? null,
            // Default project_id? Maybe pass it via constructor?
            // For now let's skip project_id or set null if allowed
            'project_id' => 1, // Placeholder
            'created_by' => Auth::id() ?? 1,
        ]);
    }
}
