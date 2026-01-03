import { useState, useRef, useEffect } from 'react';
import { router } from '@inertiajs/react';

export default function FilterBar({
    placeholder = "Search...",
    searchableFields = [], // [{ key: 'search_name', label: 'Name' }]
    filters = [],
    groupByOptions = [],
    activeFilters = {},
    onFilterChange
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const dropdownRef = useRef(null);
    const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchText.trim()) {
            // Default search (or first field if strict)
            onFilterChange('search', searchText);
            setSearchText('');
            setShowSearchSuggestions(false);
        }
    };

    const handleFieldSearch = (key, value) => {
        onFilterChange(key, value);
        setSearchText('');
        setShowSearchSuggestions(false);
    };

    const toggleFilter = (key, value) => {
        // Toggle logic: if already active, remove it. If not, set it.
        // For simple filters, we might just have one active value per key or multiple.
        // This implementation assumes one value per key for simplicity in this version, 
        // mimicking the basic Odoo "add filter" behavior.

        const currentValue = activeFilters[key];
        const newValue = currentValue === value ? '' : value;
        onFilterChange(key, newValue);
    };

    const removeFilter = (key) => {
        onFilterChange(key, '');
    };

    return (
        <div className="w-full relative mb-4" ref={dropdownRef}>
            <div className="flex flex-wrap items-center gap-2 border border-gray-300 rounded-md bg-white p-1 min-h-[42px] focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">

                {/* Active Filter Pills */}
                {Object.entries(activeFilters).map(([key, value]) => {
                    if (!value || key === 'page' || key === 'search') return null;

                    // Find label
                    let label = value;
                    const filterOption = filters.find(f => f.key === key && f.value === value);
                    if (filterOption) label = filterOption.label;

                    // Handle Group By labels
                    const groupOption = groupByOptions.find(g => g.value === value);
                    if (groupOption) label = `Group By: ${groupOption.label}`;

                    // Handle Search Labels
                    if (key.startsWith('search_') || key === 'search') {
                        return (
                            <div key={key} className="flex items-center bg-indigo-100 text-indigo-800 text-sm px-2 py-1 rounded-full border border-indigo-200">
                                <span className="mr-1"><span className="font-semibold">{key === 'search' ? 'Search' : key.replace('search_', '')}:</span> {value}</span>
                                <button
                                    onClick={() => removeFilter(key)}
                                    className="text-indigo-500 hover:text-indigo-700 focus:outline-none"
                                >
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                </button>
                            </div>
                        );
                    }

                    return (
                        <div key={key} className="flex items-center bg-indigo-100 text-indigo-800 text-sm px-2 py-1 rounded-full border border-indigo-200">
                            <span className="mr-1">{label}</span>
                            <button
                                onClick={() => removeFilter(key)}
                                className="text-indigo-500 hover:text-indigo-700 focus:outline-none"
                            >
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                            </button>
                        </div>
                    );
                })}

                {/* Search / Input Area */}
                <div className="flex-1 relative">
                    <form onSubmit={handleSearchSubmit} className="flex items-center">
                        <svg className="w-5 h-5 text-gray-400 ml-2 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        <input
                            type="text"
                            placeholder={placeholder}
                            className="border-none focus:ring-0 p-1 text-sm w-full bg-transparent"
                            value={searchText}
                            onChange={(e) => {
                                setSearchText(e.target.value);
                                setShowSearchSuggestions(e.target.value.length > 0);
                                setIsOpen(e.target.value.length === 0); // Open filters only if empty
                            }}
                            onFocus={() => {
                                if (searchText) setShowSearchSuggestions(true);
                                else setIsOpen(true);
                            }}
                        />
                    </form>

                    {/* Search Suggestions Dropdown */}
                    {showSearchSuggestions && searchText && (
                        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white shadow-lg rounded-md border border-gray-200">
                            <ul className="py-1">
                                {searchableFields.length > 0 ? (
                                    searchableFields.map(field => (
                                        <li key={field.key}>
                                            <button
                                                onClick={() => handleFieldSearch(field.key, searchText)}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                            >
                                                <span className="text-indigo-600 font-medium mr-1">Search {field.label} for:</span>
                                                <span className="font-bold">"{searchText}"</span>
                                            </button>
                                        </li>
                                    ))
                                ) : (
                                    <li>
                                        <button
                                            onClick={(e) => handleSearchSubmit(e)}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                        >
                                            <span className="text-indigo-600 font-medium mr-1">Search for:</span>
                                            <span className="font-bold">"{searchText}"</span>
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Dropdown Toggle (Carret) */}
                <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-500 hover:text-gray-700">
                    <svg className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute z-50 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-0 divide-x divide-gray-100">

                    {/* Filters Section */}
                    <div className="p-2">
                        <h4 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Filters</h4>
                        <ul className="space-y-1">
                            {filters.map((filter, idx) => (
                                <li key={idx}>
                                    <button
                                        onClick={() => { toggleFilter(filter.key, filter.value); setIsOpen(false); }}
                                        className={`flex items-center w-full px-3 py-2 text-sm text-left rounded-md hover:bg-gray-50 ${activeFilters[filter.key] === filter.value ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-700'}`}
                                    >
                                        {activeFilters[filter.key] === filter.value && (
                                            <svg className="w-4 h-4 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                        )}
                                        <span className={activeFilters[filter.key] === filter.value ? '' : 'pl-6'}>{filter.label}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Group By Section */}
                    <div className="p-2 bg-gray-50/50">
                        <h4 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Group By</h4>
                        <ul className="space-y-1">
                            {groupByOptions.map((option, idx) => (
                                <li key={idx}>
                                    <button
                                        onClick={() => { toggleFilter('groupBy', option.value); setIsOpen(false); }}
                                        className={`flex items-center w-full px-3 py-2 text-sm text-left rounded-md hover:bg-gray-100 ${activeFilters['groupBy'] === option.value ? 'bg-white shadow-sm text-indigo-700 font-medium' : 'text-gray-700'}`}
                                    >
                                        {activeFilters['groupBy'] === option.value && (
                                            <svg className="w-4 h-4 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                        )}
                                        <span className={activeFilters['groupBy'] === option.value ? '' : 'pl-6'}>{option.label}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
