<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\AccountingJournalEntry;

class StockTransaction extends Model
{
    protected $fillable = [
        'user_id',
        'type',
        'stock_symbol',
        'quantity',
        'price_per_unit',
        'total_amount',
        'fees',
        'net_amount',
        'trade_date',
        'notes',
        'accounting_journal_entry_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function journalEntry()
    {
        return $this->belongsTo(AccountingJournalEntry::class, 'accounting_journal_entry_id');
    }
}
