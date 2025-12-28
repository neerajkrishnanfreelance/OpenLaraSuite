import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DksizGbA.js";
import { useForm, Head, Link } from "@inertiajs/react";
import "react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function Index({ auth, entries, journals, filters }) {
  const { data, setData, get } = useForm({
    journal_id: filters.journal_id || "",
    state: filters.state || "",
    start_date: filters.start_date || "",
    end_date: filters.end_date || ""
  });
  const handleFilter = (e) => {
    e.preventDefault();
    get(route("accounting.entries.index"), {
      preserveState: true
    });
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Journal Entries" }),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("accounting.entries.create"),
            className: "inline-flex items-center px-4 py-2 bg-purple-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-purple-700 active:bg-purple-900 focus:outline-none focus:border-purple-900 focus:ring ring-purple-300 disabled:opacity-25 transition ease-in-out duration-150",
            children: "Create Entry"
          }
        )
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Journal Entries" }),
        /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-6 mb-6", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleFilter, className: "grid grid-cols-1 md:grid-cols-5 gap-4 items-end", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Journal" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: data.journal_id,
                  onChange: (e) => setData("journal_id", e.target.value),
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "All Journals" }),
                    journals.map((journal) => /* @__PURE__ */ jsx("option", { value: journal.id, children: journal.name }, journal.id))
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Status" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: data.state,
                  onChange: (e) => setData("state", e.target.value),
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "All Statuses" }),
                    /* @__PURE__ */ jsx("option", { value: "draft", children: "Draft" }),
                    /* @__PURE__ */ jsx("option", { value: "posted", children: "Posted" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Start Date" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "date",
                  value: data.start_date,
                  onChange: (e) => setData("start_date", e.target.value),
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "End Date" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "date",
                  value: data.end_date,
                  onChange: (e) => setData("end_date", e.target.value),
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md"
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                className: "px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700",
                children: "Filter"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: [
            /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
              /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Date" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Number / Ref" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Journal" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Notes" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Status" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: entries.data.length > 0 ? entries.data.map((entry) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: new Date(entry.date).toLocaleDateString() }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-600", children: /* @__PURE__ */ jsxs(Link, { href: route("accounting.entries.show", entry.id), children: [
                  entry.id,
                  " ",
                  entry.reference ? `/ ${entry.reference}` : ""
                ] }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: entry.journal.name }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm text-gray-500 max-w-xs truncate", children: entry.notes || "-" }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("span", { className: `px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${entry.state === "posted" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`, children: entry.state.toUpperCase() }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: route("accounting.entries.show", entry.id),
                    className: "text-purple-600 hover:text-purple-900 mr-4",
                    children: "View"
                  }
                ) })
              ] }, entry.id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "6", className: "px-6 py-4 text-center text-gray-500", children: "No journal entries found." }) }) })
            ] }) }),
            entries.links && entries.links.length > 3 && /* @__PURE__ */ jsxs("div", { className: "bg-white px-4 py-3 border-t border-gray-200 sm:px-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-1 justify-between sm:hidden", children: [
                entries.prev_page_url ? /* @__PURE__ */ jsx(Link, { href: entries.prev_page_url, className: "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500", children: "Previous" }) : /* @__PURE__ */ jsx("div", {}),
                entries.next_page_url && /* @__PURE__ */ jsx(Link, { href: entries.next_page_url, className: "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500", children: "Next" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between", children: [
                /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-700", children: [
                  "Showing ",
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: entries.from || 0 }),
                  " to ",
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: entries.to || 0 }),
                  " of ",
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: entries.total }),
                  " results"
                ] }) }),
                /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("nav", { className: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px", "aria-label": "Pagination", children: entries.links.map((link, key) => /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: link.url || "#",
                    dangerouslySetInnerHTML: { __html: link.label },
                    className: `relative inline-flex items-center px-4 py-2 border text-sm font-medium ${link.active ? "z-10 bg-purple-50 border-purple-500 text-purple-600" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"} ${!link.url ? "cursor-not-allowed opacity-50" : ""}`
                  },
                  key
                )) }) })
              ] })
            ] })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  Index as default
};
