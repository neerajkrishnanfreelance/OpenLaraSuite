<?php

namespace App\Exports;

use App\Models\Task;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class TasksExport implements FromCollection, WithHeadings, WithMapping
{
    protected $filters;

    public function __construct($filters = [])
    {
        $this->filters = $filters;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $query = Task::with(['project', 'assignedUser']);

        if (isset($this->filters['project_id']) && $this->filters['project_id']) {
            $query->where('project_id', $this->filters['project_id']);
        }

        if (isset($this->filters['assigned_to']) && $this->filters['assigned_to']) {
            $query->where('assigned_to', $this->filters['assigned_to']);
        }

        if (isset($this->filters['status']) && $this->filters['status']) {
            $query->where('status', $this->filters['status']);
        }

        return $query->get();
    }

    public function headings(): array
    {
        return [
            'ID',
            'Title',
            'Project',
            'Assigned To',
            'Priority',
            'Status',
            'Due Date',
        ];
    }

    public function map($task): array
    {
        return [
            $task->id,
            $task->title,
            $task->project ? $task->project->name : '-',
            $task->assignedUser ? $task->assignedUser->name : 'Unassigned',
            ucfirst($task->priority),
            str_replace('_', ' ', ucfirst($task->status)),
            $task->due_date ? $task->due_date->format('Y-m-d') : '-',
        ];
    }
}
