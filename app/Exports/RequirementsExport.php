<?php

namespace App\Exports;

use App\Models\Requirement;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\Exportable;

class RequirementsExport implements FromQuery, WithHeadings, WithMapping
{
    use Exportable;

    protected $projectId;

    public function __construct(int $projectId)
    {
        $this->projectId = $projectId;
    }

    public function query()
    {
        return Requirement::query()->where('project_id', $this->projectId);
    }

    public function map($requirement): array
    {
        return [
            $requirement->title,
            $requirement->priority,
            $requirement->status,
            $requirement->description,
        ];
    }

    public function headings(): array
    {
        return [
            'Title',
            'Priority',
            'Status',
            'Description',
        ];
    }
}
