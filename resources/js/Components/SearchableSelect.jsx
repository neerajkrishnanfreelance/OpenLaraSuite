import { useState, Fragment } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { Check, ChevronDown } from 'lucide-react'

export default function SearchableSelect({ label, value, onChange, options = [], placeholder = "Select..." }) {
    const [query, setQuery] = useState('')

    const filteredPeople =
        query === ''
            ? options
            : options.filter((person) =>
                person.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

    // Find the selected object based on the value (which might be an ID or name)
    const selectedPerson = options.find((p) => p.name === value || p.id === value) || null;

    return (
        <div className="w-full">
            {label && <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</label>}
            <Combobox value={selectedPerson} onChange={(person) => onChange(person ? person.name : null)}>
                <div className="relative mt-1">
                    <div className="relative w-full cursor-default overflow-hidden rounded-md bg-gray-50 border border-gray-200 text-left focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                            className="w-full border-none bg-transparent py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 placeholder-gray-400"
                            displayValue={(person) => person ? person.name : ''}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder={placeholder}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDown
                                className="h-4 w-4 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                            {filteredPeople.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredPeople.map((person) => (
                                    <Combobox.Option
                                        key={person.id}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                            }`
                                        }
                                        value={person}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {person.name}
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
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}
