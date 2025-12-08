import { useState, useRef, useEffect } from 'react';
import { Combobox } from '@headlessui/react';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import InputLabel from '@/Components/InputLabel';

export default function MultiSelect({
    options,
    value = [],
    onChange,
    label,
    placeholder = "Select items..."
}) {
    const [query, setQuery] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);

    // Sync internal state with prop value
    useEffect(() => {
        // Map value IDs to full option objects for display
        const items = options.filter(option => value.includes(option.value));
        setSelectedItems(items);
    }, [value, options]);

    const filteredOptions =
        query === ''
            ? options
            : options.filter((option) => {
                return option.label.toLowerCase().includes(query.toLowerCase());
            });

    const handleSelect = (items) => {
        // Headless UI Combobox multiple returns array of selected objects
        // We probably just want to pass IDs back to the parent to match current form data structure
        // But for display we need objects.
        // Actually, Headless UI with 'multiple' handles array of values if we map it right.

        // Let's rely on valid objects.
        const ids = items.map(item => item.value);
        onChange(ids);
    };

    const removeItem = (itemToRemove) => {
        const newValue = value.filter(id => id !== itemToRemove.value);
        onChange(newValue);
    };

    return (
        <div className="w-full">
            {label && <InputLabel value={label} className="mb-1" />}
            <Combobox value={selectedItems} onChange={handleSelect} multiple>
                <div className="relative mt-1">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left border border-gray-300 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 sm:text-sm">

                        <div className="flex flex-wrap gap-1 p-1">
                            {selectedItems.map((item) => (
                                <span
                                    key={item.value}
                                    className="inline-flex items-center gap-1 rounded bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700"
                                >
                                    {item.label}
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent opening combo
                                            removeItem(item);
                                        }}
                                        className="text-indigo-600 hover:text-indigo-800 focus:outline-none"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </span>
                            ))}
                            <Combobox.Input
                                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 min-w-[150px]"
                                onChange={(event) => setQuery(event.target.value)}
                                displayValue={() => query}
                                placeholder={selectedItems.length === 0 ? placeholder : ''}
                            />
                        </div>

                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronsUpDown
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>

                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                        {filteredOptions.length === 0 && query !== '' ? (
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
