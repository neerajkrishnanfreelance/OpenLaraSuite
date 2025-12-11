import { jsxs, jsx, Fragment as Fragment$1 } from "react/jsx-runtime";
import { useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronDown, Check } from "lucide-react";
function SearchableSelect({ label, value, onChange, options = [], placeholder = "Select..." }) {
  const [query, setQuery] = useState("");
  const filteredPeople = query === "" ? options : options.filter(
    (person) => person.name.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, ""))
  );
  const selectedPerson = options.find((p) => p.name === value || p.id === value) || null;
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    label && /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1", children: label }),
    /* @__PURE__ */ jsx(Combobox, { value: selectedPerson, onChange: (person) => onChange(person ? person.name : null), children: /* @__PURE__ */ jsxs("div", { className: "relative mt-1", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative w-full cursor-default overflow-hidden rounded-md bg-gray-50 border border-gray-200 text-left focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm", children: [
        /* @__PURE__ */ jsx(
          Combobox.Input,
          {
            className: "w-full border-none bg-transparent py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 placeholder-gray-400",
            displayValue: (person) => person ? person.name : "",
            onChange: (event) => setQuery(event.target.value),
            placeholder
          }
        ),
        /* @__PURE__ */ jsx(Combobox.Button, { className: "absolute inset-y-0 right-0 flex items-center pr-2", children: /* @__PURE__ */ jsx(
          ChevronDown,
          {
            className: "h-4 w-4 text-gray-400",
            "aria-hidden": "true"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(
        Transition,
        {
          as: Fragment,
          leave: "transition ease-in duration-100",
          leaveFrom: "opacity-100",
          leaveTo: "opacity-0",
          afterLeave: () => setQuery(""),
          children: /* @__PURE__ */ jsx(Combobox.Options, { className: "absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50", children: filteredPeople.length === 0 && query !== "" ? /* @__PURE__ */ jsx("div", { className: "relative cursor-default select-none py-2 px-4 text-gray-700", children: "Nothing found." }) : filteredPeople.map((person) => /* @__PURE__ */ jsx(
            Combobox.Option,
            {
              className: ({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-indigo-600 text-white" : "text-gray-900"}`,
              value: person,
              children: ({ selected, active }) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: `block truncate ${selected ? "font-medium" : "font-normal"}`,
                    children: person.name
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
            person.id
          )) })
        }
      )
    ] }) })
  ] });
}
export {
  SearchableSelect as S
};
