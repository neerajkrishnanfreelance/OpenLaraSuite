<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountingJournalEntry extends Model
{
    use HasFactory;

    protected $fillable = [
        'journal_id',
        'reference',
        'date',
        'state',
        'notes',
        'created_by',
        'posted_by',
        'posted_at',
    ];

    protected $casts = [
        'date' => 'date',
        'posted_at' => 'datetime',
    ];

    /**
     * Relationships
     */
    public function journal()
    {
        return $this->belongsTo(Journal::class);
    }

    public function lines()
    {
        return $this->hasMany(AccountingJournalEntryLine::class, 'journal_entry_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function postedBy()
    {
        return $this->belongsTo(User::class, 'posted_by');
    }

    /**
     * Scopes
     */
    public function scopeDraft($query)
    {
        return $query->where('state', 'draft');
    }

    public function scopePosted($query)
    {
        return $query->where('state', 'posted');
    }

    public function scopeByJournal($query, $journalId)
    {
        return $query->where('journal_id', $journalId);
    }

    public function scopeDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('date', [$startDate, $endDate]);
    }

    /**
     * Methods
     */
    public function getTotalDebit()
    {
        return $this->lines()->sum('debit');
    }

    public function getTotalCredit()
    {
        return $this->lines()->sum('credit');
    }

    public function isBalanced()
    {
        return round($this->getTotalDebit(), 2) === round($this->getTotalCredit(), 2);
    }

    public function post()
    {
        if (!$this->isBalanced()) {
            throw new \Exception('Cannot post unbalanced journal entry. Debit and Credit must be equal.');
        }

        if ($this->state === 'posted') {
            throw new \Exception('Journal entry is already posted.');
        }

        $this->state = 'posted';
        $this->posted_by = auth()->id();
        $this->posted_at = now();
        $this->save();

        // Update account balances
        foreach ($this->lines as $line) {
            $line->account->updateBalance();
        }

        return true;
    }

    public function getDifferenceAttribute()
    {
        return $this->getTotalDebit() - $this->getTotalCredit();
    }
}
