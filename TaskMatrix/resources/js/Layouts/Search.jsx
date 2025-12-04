import React, { useState, useEffect } from 'react';

const Search = ({ value, onChange, placeholder = "Search messages, files..." }) => {
  const [searchValue, setSearchValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]); // Dynamic suggestions

  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue.length > 2) {
        setIsLoading(true);
        // Simulate API call for suggestions
        setTimeout(() => {
          setSuggestions([`Suggestion 1 for "${searchValue}"`, `Suggestion 2 for "${searchValue}"`]);
          setIsLoading(false);
        }, 300);
      } else {
        setSuggestions([]);
      }
      onChange(searchValue);
    }, 300); // Debounce

    return () => clearTimeout(timer);
  }, [searchValue]);

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-4 py-3 w-full bg-gray-100/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-500"
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-200 z-10 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              onClick={() => setSearchValue(suggestion.split(' for ')[0])}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;