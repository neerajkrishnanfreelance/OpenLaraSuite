<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Account;
use App\Models\Journal;

class AccountingSeeder extends Seeder
{
    public function run(): void
    {
        // Create Journals
        $journals = [
            ['name' => 'General Journal', 'code' => 'GEN', 'type' => 'general'],
            ['name' => 'Sales Journal', 'code' => 'SAL', 'type' => 'sale'],
            ['name' => 'Purchase Journal', 'code' => 'PUR', 'type' => 'purchase'],
            ['name' => 'Cash Receipts', 'code' => 'CR', 'type' => 'cash'],
            ['name' => 'Cash Payments', 'code' => 'CP', 'type' => 'cash'],
        ];

        foreach ($journals as $journal) {
            Journal::create($journal);
        }

        // Create Chart of Accounts
        $accounts = [
            // Assets
            ['code' => '1000', 'name' => 'Cash', 'account_type' => 'asset'],
            ['code' => '1100', 'name' => 'Bank Account', 'account_type' => 'asset'],
            ['code' => '1200', 'name' => 'Accounts Receivable', 'account_type' => 'asset'],
            ['code' => '1300', 'name' => 'Inventory', 'account_type' => 'asset'],
            ['code' => '1400', 'name' => 'Prepaid Expenses', 'account_type' => 'asset'],
            ['code' => '1500', 'name' => 'Equipment', 'account_type' => 'asset'],
            
            // Liabilities
            ['code' => '2000', 'name' => 'Accounts Payable', 'account_type' => 'liability'],
            ['code' => '2100', 'name' => 'Loans Payable', 'account_type' => 'liability'],
            ['code' => '2200', 'name' => 'Accrued Expenses', 'account_type' => 'liability'],
            
            // Equity
            ['code' => '3000', 'name' => 'Owner\'s Equity', 'account_type' => 'equity'],
            ['code' => '3100', 'name' => 'Retained Earnings', 'account_type' => 'equity'],
            
            // Income
            ['code' => '4000', 'name' => 'Sales Revenue', 'account_type' => 'income'],
            ['code' => '4100', 'name' => 'Service Revenue', 'account_type' => 'income'],
            ['code' => '4200', 'name' => 'Interest Income', 'account_type' => 'income'],
            
            // Expenses
            ['code' => '5000', 'name' => 'Cost of Goods Sold', 'account_type' => 'expense'],
            ['code' => '5100', 'name' => 'Salaries Expense', 'account_type' => 'expense'],
            ['code' => '5200', 'name' => 'Rent Expense', 'account_type' => 'expense'],
            ['code' => '5300', 'name' => 'Utilities Expense', 'account_type' => 'expense'],
            ['code' => '5400', 'name' => 'Office Supplies', 'account_type' => 'expense'],
            ['code' => '5500', 'name' => 'Depreciation Expense', 'account_type' => 'expense'],
        ];

        foreach ($accounts as $account) {
            Account::create($account);
        }
    }
}
