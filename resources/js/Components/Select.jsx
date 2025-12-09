import { useState, useEffect } from 'react';
import { Combobox } from '@headlessui/react';
import { Check, ChevronsUpDown } from 'lucide-react';
import InputLabel from '@/Components/InputLabel';

export default function Select({
    options,
    value,
    onChange,
    label,
    placeholder = "Select an option...",
    disabled = false
}) {
    const [query, setQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);

    // Sync internal state with prop value
    useEffect(() => {
        const item = options.find(option => option.value == value);
        setSelectedItem(item || null);
    }, [value, options]);

    const filteredOptions =
        query === ''
            ? options
            : options.filter((option) =>
                option.label.toLowerCase().includes(query.toLowerCase())
            );

    const handleSelect = (item) => {
        onChange(item ? item.value : null);
        setSelectedItem(item);
    };

    return (
        <div className="w-full">
            {label && <InputLabel value={label} className="mb-1" />}
            <Combobox value={selectedItem} onChange={handleSelect} disabled={disabled} nullable>
                <div className="relative mt-1">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left border border-gray-300 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 sm:text-sm">
                        <Combobox.Input
                            className={`w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
                            onChange={(event) => setQuery(event.target.value)}
                            displayValue={(item) => item?.label}
                            placeholder={placeholder}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronsUpDown
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                        {options.length === 0 ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-500">
                                {disabled ? placeholder : 'No options available'}
                            </div>
                        ) : filteredOptions.length === 0 && query !== '' ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                Nothing found.
                            </div>
                        ) : (
                            filteredOptions.map((option) => (
                                <Combobox.Option
                                    key={option.value}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                        }`
                                    }
                                    value={option}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {option.label}
                                            </span>
                                            {selected ? (
                                                <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-indigo-600'
                                                        }`}
                                                >
                                                    <Check className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </div>
            </Combobox>
        </div>
    );
}
