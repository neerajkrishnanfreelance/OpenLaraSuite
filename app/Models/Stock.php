<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    protected $fillable = ['symbol', 'name', 'sector', 'description', 'is_active', 'asset_account_id', 'pnl_account_id'];

    public function assetAccount()
    {
        return $this->belongsTo(Account::class, 'asset_account_id');
    }

    public function pnlAccount()
    {
        return $this->belongsTo(Account::class, 'pnl_account_id');
    }
}
