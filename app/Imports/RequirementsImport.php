<?php

namespace App\Imports;

use App\Models\Requirement;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class RequirementsImport implements ToModel, WithHeadingRow
{
    protected $projectId;

    public function __construct(int $projectId)
    {
        $this->projectId = $projectId;
    }

    public function model(array $row)
    {
        return new Requirement([
            'project_id'  => $this->projectId,
            'title'       => $row['title'],
            'priority'    => ucfirst(strtolower($row['priority'] ?? 'Medium')),
            'status'      => ucfirst(strtolower($row['status'] ?? 'Pending')),
            'description' => $row['description'] ?? null,
        ]);
    }
}
