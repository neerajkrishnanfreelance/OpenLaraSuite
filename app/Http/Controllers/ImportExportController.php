<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Exports\TasksExport;
use App\Exports\TimesheetsExport;
use App\Imports\TasksImport;
use Maatwebsite\Excel\Facades\Excel;

class ImportExportController extends Controller
{
    public function exportTasks(Request $request) 
    {
        return Excel::download(new TasksExport($request->all()), 'tasks.xlsx');
    }
    
    public function exportTimesheets(Request $request)
    {
        return Excel::download(new TimesheetsExport($request->all()), 'timesheets.xlsx');
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
