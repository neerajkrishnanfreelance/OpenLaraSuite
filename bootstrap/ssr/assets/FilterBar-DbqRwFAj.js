import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import "@inertiajs/react";
function FilterBar({
  placeholder = "Search...",
  searchableFields = [],
  // [{ key: 'search_name', label: 'Name' }]
  filters = [],
  groupByOptions = [],
  activeFilters = {},
  onFilterChange
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const dropdownRef = useRef(null);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
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
      onFilterChange("search", searchText);
      setSearchText("");
      setShowSearchSuggestions(false);
    }
  };
  const handleFieldSearch = (key, value) => {
    onFilterChange(key, value);
    setSearchText("");
    setShowSearchSuggestions(false);
  };
  const toggleFilter = (key, value) => {
    const currentValue = activeFilters[key];
    const newValue = currentValue === value ? "" : value;
    onFilterChange(key, newValue);
  };
  const removeFilter = (key) => {
    onFilterChange(key, "");
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full relative mb-4", ref: dropdownRef, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 border border-gray-300 rounded-md bg-white p-1 min-h-[42px] focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500", children: [
      Object.entries(activeFilters).map(([key, value]) => {
        if (!value || key === "page" || key === "search") return null;
        let label = value;
        const filterOption = filters.find((f) => f.key === key && f.value === value);
        if (filterOption) label = filterOption.label;
        const groupOption = groupByOptions.find((g) => g.value === value);
        if (groupOption) label = `Group By: ${groupOption.label}`;
        if (key.startsWith("search_") || key === "search") {
          return /* @__PURE__ */ jsxs("div", { className: "flex items-center bg-indigo-100 text-indigo-800 text-sm px-2 py-1 rounded-full border border-indigo-200", children: [
            /* @__PURE__ */ jsxs("span", { className: "mr-1", children: [
              /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
                key === "search" ? "Search" : key.replace("search_", ""),
                ":"
              ] }),
              " ",
              value
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => removeFilter(key),
                className: "text-indigo-500 hover:text-indigo-700 focus:outline-none",
                children: /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z", clipRule: "evenodd" }) })
              }
            )
          ] }, key);
        }
        return /* @__PURE__ */ jsxs("div", { className: "flex items-center bg-indigo-100 text-indigo-800 text-sm px-2 py-1 rounded-full border border-indigo-200", children: [
          /* @__PURE__ */ jsx("span", { className: "mr-1", children: label }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => removeFilter(key),
              className: "text-indigo-500 hover:text-indigo-700 focus:outline-none",
              children: /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z", clipRule: "evenodd" }) })
            }
          )
        ] }, key);
      }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 relative", children: [
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSearchSubmit, className: "flex items-center", children: [
          /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-gray-400 ml-2 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder,
              className: "border-none focus:ring-0 p-1 text-sm w-full bg-transparent",
              value: searchText,
              onChange: (e) => {
                setSearchText(e.target.value);
                setShowSearchSuggestions(e.target.value.length > 0);
                setIsOpen(e.target.value.length === 0);
              },
              onFocus: () => {
                if (searchText) setShowSearchSuggestions(true);
                else setIsOpen(true);
              }
            }
          )
        ] }),
        showSearchSuggestions && searchText && /* @__PURE__ */ jsx("div", { className: "absolute top-full left-0 right-0 z-50 mt-1 bg-white shadow-lg rounded-md border border-gray-200", children: /* @__PURE__ */ jsx("ul", { className: "py-1", children: searchableFields.length > 0 ? searchableFields.map((field) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleFieldSearch(field.key, searchText),
            className: "w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center",
            children: [
              /* @__PURE__ */ jsxs("span", { className: "text-indigo-600 font-medium mr-1", children: [
                "Search ",
                field.label,
                " for:"
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "font-bold", children: [
                '"',
                searchText,
                '"'
              ] })
            ]
          }
        ) }, field.key)) : /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: (e) => handleSearchSubmit(e),
            className: "w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center",
            children: [
              /* @__PURE__ */ jsx("span", { className: "text-indigo-600 font-medium mr-1", children: "Search for:" }),
              /* @__PURE__ */ jsxs("span", { className: "font-bold", children: [
                '"',
                searchText,
                '"'
              ] })
            ]
          }
        ) }) }) })
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: () => setIsOpen(!isOpen), className: "p-2 text-gray-500 hover:text-gray-700", children: /* @__PURE__ */ jsx("svg", { className: `w-4 h-4 transition-transform ${isOpen ? "transform rotate-180" : ""}`, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" }) }) })
    ] }),
    isOpen && /* @__PURE__ */ jsxs("div", { className: "absolute z-50 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-0 divide-x divide-gray-100", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-2", children: [
        /* @__PURE__ */ jsx("h4", { className: "px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider", children: "Filters" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-1", children: filters.map((filter, idx) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              toggleFilter(filter.key, filter.value);
              setIsOpen(false);
            },
            className: `flex items-center w-full px-3 py-2 text-sm text-left rounded-md hover:bg-gray-50 ${activeFilters[filter.key] === filter.value ? "bg-indigo-50 text-indigo-700 font-medium" : "text-gray-700"}`,
            children: [
              activeFilters[filter.key] === filter.value && /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-2 text-indigo-600", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }),
              /* @__PURE__ */ jsx("span", { className: activeFilters[filter.key] === filter.value ? "" : "pl-6", children: filter.label })
            ]
          }
        ) }, idx)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-2 bg-gray-50/50", children: [
        /* @__PURE__ */ jsx("h4", { className: "px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider", children: "Group By" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-1", children: groupByOptions.map((option, idx) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              toggleFilter("groupBy", option.value);
              setIsOpen(false);
            },
            className: `flex items-center w-full px-3 py-2 text-sm text-left rounded-md hover:bg-gray-100 ${activeFilters["groupBy"] === option.value ? "bg-white shadow-sm text-indigo-700 font-medium" : "text-gray-700"}`,
            children: [
              activeFilters["groupBy"] === option.value && /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-2 text-indigo-600", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }),
              /* @__PURE__ */ jsx("span", { className: activeFilters["groupBy"] === option.value ? "" : "pl-6", children: option.label })
            ]
          }
        ) }, idx)) })
      ] })
    ] })
  ] });
}
export {
  FilterBar as F
};
