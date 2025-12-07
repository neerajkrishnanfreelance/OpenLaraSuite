<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Exports\TasksExport;
use App\Imports\TasksImport;
use Maatwebsite\Excel\Facades\Excel;

class ImportExportController extends Controller
{
    public function exportTasks() 
    {
        return Excel::download(new TasksExport, 'tasks.xlsx');
    }
   
    public function importTasks(Request $request) 
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv',
        ]);
        
        Excel::import(new TasksImport, $request->file('file'));
        
        return redirect()->back()->with('message', 'Tasks imported successfully.');
    }
}
