<?php

namespace App\Exports;

use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;

class TasksExport implements FromCollection, WithHeadings, WithMapping, ShouldAutoSize, WithStyles
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

    public function styles(Worksheet $sheet)
    {
        return [
            // Style the first row as bold text on a light blue background
            1    => [
                'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']],
                'fill' => [
                    'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                    'startColor' => ['rgb' => '4F46E5'], // Indigo-600
                ],
            ],
        ];
    }
}
