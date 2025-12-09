<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'account_type',
        'parent_id',
        'is_active',
        'balance',
        'description',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'balance' => 'decimal:2',
    ];

    /**
     * Relationships
     */
    public function parent()
    {
        return $this->belongsTo(Account::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Account::class, 'parent_id');
    }

    public function journalEntryLines()
    {
        return $this->hasMany(AccountingJournalEntryLine::class, 'account_id');
    }

    /**
     * Scopes
     */
    public function scopeAssets($query)
    {
        return $query->where('account_type', 'asset');
    }

    public function scopeLiabilities($query)
    {
        return $query->where('account_type', 'liability');
    }

    public function scopeEquity($query)
    {
        return $query->where('account_type', 'equity');
    }

    public function scopeIncome($query)
    {
        return $query->where('account_type', 'income');
    }

    public function scopeExpenses($query)
    {
        return $query->where('account_type', 'expense');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Methods
     */
    public function updateBalance()
    {
        $totalDebit = $this->journalEntryLines()
            ->whereHas('journalEntry', function ($q) {
                $q->where('state', 'posted');
            })
            ->sum('debit');

        $totalCredit = $this->journalEntryLines()
            ->whereHas('journalEntry', function ($q) {
                $q->where('state', 'posted');
            })
            ->sum('credit');

        // For asset and expense accounts: Debit increases, Credit decreases
        // For liability, equity, and income: Credit increases, Debit decreases
        if (in_array($this->account_type, ['asset', 'expense'])) {
            $this->balance = $totalDebit - $totalCredit;
        } else {
            $this->balance = $totalCredit - $totalDebit;
        }

        $this->save();
    }

    public function getFullCodeAttribute()
    {
        if ($this->parent) {
            return $this->parent->full_code . '.' . $this->code;
        }
        return $this->code;
    }
}
