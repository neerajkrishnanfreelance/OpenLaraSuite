import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Combobox } from "@headlessui/react";
import { X, ChevronsUpDown, Check } from "lucide-react";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
function MultiSelect({
  options,
  value = [],
  onChange,
  label,
  placeholder = "Select items..."
}) {
  const [query, setQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    const items = options.filter((option) => value.includes(option.value));
    setSelectedItems(items);
  }, [value, options]);
  const filteredOptions = query === "" ? options : options.filter((option) => {
    return option.label.toLowerCase().includes(query.toLowerCase());
  });
  const handleSelect = (items) => {
    const ids = items.map((item) => item.value);
    onChange(ids);
  };
  const removeItem = (itemToRemove) => {
    const newValue = value.filter((id) => id !== itemToRemove.value);
    onChange(newValue);
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    label && /* @__PURE__ */ jsx(InputLabel, { value: label, className: "mb-1" }),
    /* @__PURE__ */ jsx(Combobox, { value: selectedItems, onChange: handleSelect, multiple: true, children: /* @__PURE__ */ jsxs("div", { className: "relative mt-1", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left border border-gray-300 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 sm:text-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1 p-1", children: [
          selectedItems.map((item) => /* @__PURE__ */ jsxs(
            "span",
            {
              className: "inline-flex items-center gap-1 rounded bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700",
              children: [
                item.label,
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: (e) => {
                      e.stopPropagation();
                      removeItem(item);
                    },
                    className: "text-indigo-600 hover:text-indigo-800 focus:outline-none",
                    children: /* @__PURE__ */ jsx(X, { className: "h-3 w-3" })
                  }
                )
              ]
            },
            item.value
          )),
          /* @__PURE__ */ jsx(
            Combobox.Input,
            {
              className: "w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 min-w-[150px]",
              onChange: (event) => setQuery(event.target.value),
              displayValue: () => query,
              placeholder: selectedItems.length === 0 ? placeholder : ""
            }
          )
        ] }),
        /* @__PURE__ */ jsx(Combobox.Button, { className: "absolute inset-y-0 right-0 flex items-center pr-2", children: /* @__PURE__ */ jsx(
          ChevronsUpDown,
          {
            className: "h-5 w-5 text-gray-400",
            "aria-hidden": "true"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(Combobox.Options, { className: "absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50", children: filteredOptions.length === 0 && query !== "" ? /* @__PURE__ */ jsx("div", { className: "relative cursor-default select-none py-2 px-4 text-gray-700", children: "Nothing found." }) : filteredOptions.map((option) => /* @__PURE__ */ jsx(
        Combobox.Option,
        {
          className: ({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-indigo-600 text-white" : "text-gray-900"}`,
          value: option,
          children: ({ selected, active }) => /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                className: `block truncate ${selected ? "font-medium" : "font-normal"}`,
                children: option.label
              }
            ),
            selected ? /* @__PURE__ */ jsx(
              "span",
              {
                className: `absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-indigo-600"}`,
                children: /* @__PURE__ */ jsx(Check, { className: "h-5 w-5", "aria-hidden": "true" })
              }
            ) : null
          ] })
        },
        option.value
      )) })
    ] }) })
  ] });
}
export {
  MultiSelect as M
};
