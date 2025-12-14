import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import FormHeader from '@/Components/FormHeader';
import FormPageLayout from '@/Components/FormPageLayout';
import { useEffect } from 'react';

export default function Create({ auth, accounts, stocks }) {
    const { data, setData, post, processing, errors } = useForm({
        type: 'buy',
        stock_id: '',
        stock_symbol: '',
        quantity: '',
        price_per_unit: '',
        fees: '',
        trade_date: new Date().toISOString().split('T')[0],
        bank_account_id: '',
        stock_account_id: '',
        pnl_account_id: '',
        cost_basis: '', // Only for sell
        notes: '',
    });

    const bankAccounts = accounts.filter(a => ['asset'].includes(a.account_type)); // Simplify filtering
    const stockAccounts = accounts.filter(a => a.account_type === 'asset');
    const incomeAccounts = accounts.filter(a => ['income', 'equity', 'expense'].includes(a.account_type)); // For PnL

    const submit = (e) => {
        e.preventDefault();
        post(route('stocks.store'));
    };

    // Watch for stock selection to auto-fill accounts
    useEffect(() => {
        if (data.stock_id) {
            const selectedStock = stocks.find(s => s.id == data.stock_id);
            if (selectedStock) {
                // Only auto-fill if the field is empty to avoid overwriting user changes?
                // Or overwrite always? Usually simpler to overwrite or do it if empty.
                // Let's overwrite if the stock has a default set.
                if (selectedStock.asset_account_id) {
                    setData(d => ({ ...d, stock_account_id: selectedStock.asset_account_id }));
                }
                if (selectedStock.pnl_account_id) {
                    setData(d => ({ ...d, pnl_account_id: selectedStock.pnl_account_id }));
                }
            }
        }
    }, [data.stock_id]);

    // Auto-calculate Total
    const total = (parseFloat(data.quantity || 0) * parseFloat(data.price_per_unit || 0)).toFixed(2);
    const net = data.type === 'buy'
        ? (parseFloat(total) + parseFloat(data.fees || 0)).toFixed(2)
        : (parseFloat(total) - parseFloat(data.fees || 0)).toFixed(2);

    return (
        <AuthenticatedLayout
            header={
                <FormHeader title="Record Trade" backRoute="stocks.index">
                    <PrimaryButton form="create-stock-form" disabled={processing}>
                        Record Transaction
                    </PrimaryButton>
                </FormHeader>
            }
        >
            <Head title="New Trade" />

            <FormPageLayout isCreate={true}>
                <form id="create-stock-form" onSubmit={submit}>

                    <div className="mb-6">
                        <InputLabel value="Transaction Type" />
                        <div className="flex gap-4 mt-2">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="type"
                                    value="buy"
                                    checked={data.type === 'buy'}
                                    onChange={(e) => setData('type', e.target.value)}
                                    className="text-green-600 focus:ring-green-500"
                                />
                                <span className={`ml-2 px-3 py-1 rounded-full text-sm font-bold ${data.type === 'buy' ? 'bg-green-100 text-green-800' : 'text-gray-600'}`}>BUY</span>
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="type"
                                    value="sell"
                                    checked={data.type === 'sell'}
                                    onChange={(e) => setData('type', e.target.value)}
                                    className="text-red-600 focus:ring-red-500"
                                />
                                <span className={`ml-2 px-3 py-1 rounded-full text-sm font-bold ${data.type === 'sell' ? 'bg-red-100 text-red-800' : 'text-gray-600'}`}>SELL</span>
                            </label>
                        </div>
                        <InputError message={errors.type} className="mt-2" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <InputLabel htmlFor="trade_date" value="Date" />
                            <TextInput
                                id="trade_date"
                                type="date"
                                className="mt-1 block w-full"
                                value={data.trade_date}
                                onChange={(e) => setData('trade_date', e.target.value)}
                                required
                            />
                            <InputError message={errors.trade_date} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="stock_id" value="Stock" />
                            <div className="flex gap-2">
                                <select
                                    id="stock_id"
                                    className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm"
                                    value={data.stock_id || ''}
                                    onChange={(e) => setData('stock_id', e.target.value)}
                                    required
                                >
                                    <option value="">Select Stock</option>
                                    {stocks.map(s => <option key={s.id} value={s.id}>{s.symbol} - {s.name}</option>)}
                                </select>
                                <a
                                    href={route('stocks-definitions.create')}
                                    target="_blank"
                                    className="mt-1 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                                >
                                    +
                                </a>
                            </div>
                            <InputError message={errors.stock_id} className="mt-2" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <InputLabel htmlFor="quantity" value="Quantity" />
                            <TextInput
                                id="quantity"
                                type="number"
                                step="0.0001"
                                className="mt-1 block w-full"
                                value={data.quantity}
                                onChange={(e) => setData('quantity', e.target.value)}
                                required
                            />
                            <InputError message={errors.quantity} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="price_per_unit" value="Price Per Unit" />
                            <TextInput
                                id="price_per_unit"
                                type="number"
                                step="0.01"
                                className="mt-1 block w-full"
                                value={data.price_per_unit}
                                onChange={(e) => setData('price_per_unit', e.target.value)}
                                required
                            />
                            <InputError message={errors.price_per_unit} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="fees" value="Brokerage/Fees" />
                            <TextInput
                                id="fees"
                                type="number"
                                step="0.01"
                                className="mt-1 block w-full"
                                value={data.fees}
                                onChange={(e) => setData('fees', e.target.value)}
                            />
                            <InputError message={errors.fees} className="mt-2" />
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md mb-6 flex justify-between items-center text-sm font-medium text-gray-700">
                        <span>Total: {total}</span>
                        <span className="text-lg">Net Amount: {net}</span>
                    </div>

                    <h3 className="text-sm font-medium text-gray-900 border-b pb-1 mb-4">Accounting Details</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <InputLabel htmlFor="bank_account_id" value="Bank / Cash Account" />
                            <select
                                id="bank_account_id"
                                className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm"
                                value={data.bank_account_id}
                                onChange={(e) => setData('bank_account_id', e.target.value)}
                                required
                            >
                                <option value="">Select Account</option>
                                {bankAccounts.map(acc => <option key={acc.id} value={acc.id}>{acc.name} ({acc.code})</option>)}
                            </select>
                            <InputError message={errors.bank_account_id} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="stock_account_id" value="Investment / Stock Account" />
                            <select
                                id="stock_account_id"
                                className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm"
                                value={data.stock_account_id}
                                onChange={(e) => setData('stock_account_id', e.target.value)}
                                required
                            >
                                <option value="">Select Account</option>
                                {stockAccounts.map(acc => <option key={acc.id} value={acc.id}>{acc.name} ({acc.code})</option>)}
                            </select>
                            <InputError message={errors.stock_account_id} className="mt-2" />
                        </div>
                    </div>

                    {data.type === 'sell' && (
                        <div className="bg-yellow-50 p-4 rounded-md mb-6 border border-yellow-100">
                            <h4 className="text-sm font-bold text-yellow-800 mb-2">Sell Details</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel htmlFor="cost_basis" value="Cost Basis (Optional)" />
                                    <TextInput
                                        id="cost_basis"
                                        type="number"
                                        step="0.01"
                                        className="mt-1 block w-full"
                                        value={data.cost_basis}
                                        onChange={(e) => setData('cost_basis', e.target.value)}
                                        placeholder="Original purchase cost"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">If provided, profit/loss will be posted to the P&L account.</p>
                                    <InputError message={errors.cost_basis} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="pnl_account_id" value="Realized Gain/Loss Account" />
                                    <select
                                        id="pnl_account_id"
                                        className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm"
                                        value={data.pnl_account_id}
                                        onChange={(e) => setData('pnl_account_id', e.target.value)}
                                    >
                                        <option value="">Select Account</option>
                                        {incomeAccounts.map(acc => <option key={acc.id} value={acc.id}>{acc.name} ({acc.code})</option>)}
                                    </select>
                                    <InputError message={errors.pnl_account_id} className="mt-2" />
                                </div>
                            </div>
                        </div>
                    )}

                    <div>
                        <InputLabel htmlFor="notes" value="Notes" />
                        <textarea
                            id="notes"
                            className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm h-24"
                            value={data.notes}
                            onChange={(e) => setData('notes', e.target.value)}
                        />
                        <InputError message={errors.notes} className="mt-2" />
                    </div>

                </form>
            </FormPageLayout>
        </AuthenticatedLayout>
    );
}
