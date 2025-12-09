<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Account;
use App\Models\Journal;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'is_expense',
        'expense_account_id',
        'journal_id',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'is_expense' => 'boolean',
    ];

    public function expenseAccount()
    {
        return $this->belongsTo(Account::class, 'expense_account_id');
    }

    public function journal()
    {
        return $this->belongsTo(Journal::class);
    }
}
