<?php

namespace App\Exports;

use App\Models\Task;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class TasksExport implements FromCollection, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Task::select('id', 'title', 'description', 'status', 'priority', 'due_date')->get();
    }

    public function headings(): array
    {
        return ['ID', 'Title', 'Description', 'Status', 'Priority', 'Due Date'];
    }
}
