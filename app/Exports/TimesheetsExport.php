<?php

namespace App\Exports;

use App\Models\Timesheet;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;

class TimesheetsExport implements FromCollection, WithHeadings, WithMapping, ShouldAutoSize, WithStyles
{
    protected $filters;

    public function __construct($filters)
    {
        $this->filters = $filters;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $query = Timesheet::with(['user', 'project', 'task']);

        if (isset($this->filters['project_id']) && $this->filters['project_id']) {
            $query->where('project_id', $this->filters['project_id']);
        }

        if (isset($this->filters['user_id']) && $this->filters['user_id']) {
            $query->where('user_id', $this->filters['user_id']);
        }

        if (isset($this->filters['status']) && $this->filters['status']) {
            $query->where('status', $this->filters['status']);
        }

        if (isset($this->filters['date_from']) && $this->filters['date_from']) {
            $query->whereDate('date', '>=', $this->filters['date_from']);
        }

        if (isset($this->filters['date_to']) && $this->filters['date_to']) {
            $query->whereDate('date', '<=', $this->filters['date_to']);
        }

        if (isset($this->filters['is_overtime']) && $this->filters['is_overtime']) {
             $val = filter_var($this->filters['is_overtime'], FILTER_VALIDATE_BOOLEAN);
             if ($val) {
                $query->where('is_overtime', true);
             }
        }

        return $query->get();
    }

    public function headings(): array
    {
        return [
            'Date',
            'Project',
            'Task',
            'Employee',
            'Hours',
            'Overtime',
            'Status',
            'Description',
        ];
    }

    public function map($timesheet): array
    {
        return [
            $timesheet->date->format('Y-m-d'),
            $timesheet->project ? $timesheet->project->name : '-',
            $timesheet->task ? $timesheet->task->title : '-',
            $timesheet->user ? $timesheet->user->name : '-',
            $timesheet->hours,
            $timesheet->is_overtime ? 'Yes' : 'No',
            ucfirst($timesheet->status),
            $timesheet->description,
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
            // Add a total row at the bottom (optional logic could go here)
        ];
    }
}
