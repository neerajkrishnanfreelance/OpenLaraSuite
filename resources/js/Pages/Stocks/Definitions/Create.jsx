import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react'; // Import Link
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';

export default function Create({ auth, accounts }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        symbol: '',
        name: '',
        sector: '',
        description: '',
        is_active: true,
        asset_account_id: '',
        pnl_account_id: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('stocks-definitions.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Add New Stock</h2>
                    <Link href={route('stocks-definitions.index')} className="text-indigo-600 hover:text-indigo-900">
                        Back to List
                    </Link>
                </div>
            }
        >
            <Head title="Add Stock" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="symbol" value="Stock Symbol" />
                                    <TextInput
                                        id="symbol"
                                        type="text"
                                        name="symbol"
                                        value={data.symbol}
                                        className="mt-1 block w-full uppercase font-mono"
                                        isFocused={true}
                                        onChange={(e) => setData('symbol', e.target.value.toUpperCase())}
                                        placeholder="AAPL"
                                    />
                                    <InputError message={errors.symbol} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="name" value="Stock Name" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Apple Inc."
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="sector" value="Sector (Optional)" />
                                    <TextInput
                                        id="sector"
                                        type="text"
                                        name="sector"
                                        value={data.sector}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('sector', e.target.value)}
                                        placeholder="Technology"
                                    />
                                    <InputError message={errors.sector} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="description" value="Description (Optional)" />
                                    <textarea
                                        id="description"
                                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                        rows="3"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    ></textarea>
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                    <div>
                                        <InputLabel htmlFor="asset_account_id" value="Default Asset Account (Optional)" />
                                        <select
                                            id="asset_account_id"
                                            className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm"
                                            value={data.asset_account_id}
                                            onChange={(e) => setData('asset_account_id', e.target.value)}
                                        >
                                            <option value="">Select Account</option>
                                            {accounts.filter(a => a.account_type === 'asset').map(acc => (
                                                <option key={acc.id} value={acc.id}>{acc.name} ({acc.code})</option>
                                            ))}
                                        </select>
                                        <InputError message={errors.asset_account_id} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="pnl_account_id" value="Default P&L Account (Optional)" />
                                        <select
                                            id="pnl_account_id"
                                            className="mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm"
                                            value={data.pnl_account_id}
                                            onChange={(e) => setData('pnl_account_id', e.target.value)}
                                        >
                                            <option value="">Select Account</option>
                                            {accounts.filter(a => ['income', 'expense', 'equity'].includes(a.account_type)).map(acc => (
                                                <option key={acc.id} value={acc.id}>{acc.name} ({acc.code})</option>
                                            ))}
                                        </select>
                                        <InputError message={errors.pnl_account_id} className="mt-2" />
                                    </div>
                                </div>

                                <div className="block mt-4">
                                    <label className="flex items-center">
                                        <Checkbox
                                            name="is_active"
                                            checked={data.is_active}
                                            onChange={(e) => setData('is_active', e.target.checked)}
                                        />
                                        <span className="ms-2 text-sm text-gray-600">Active</span>
                                    </label>
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        Save Stock
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
