import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DHAmaW8y.js";
import { useForm, Head, Link } from "@inertiajs/react";
import "react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function JournalLedger({ auth, journals, selectedJournal, entries, startDate, endDate }) {
  const { data, setData, get } = useForm({
    journal_id: selectedJournal?.id || "",
    start_date: startDate,
    end_date: endDate
  });
  const handleFilter = (e) => {
    e.preventDefault();
    get(route("accounting.reports.journal-ledger"), {
      preserveState: true
    });
  };
  entries ? entries.reduce((sum, entry) => sum + entry.total_debit, 0) : 0;
  entries ? entries.reduce((sum, entry) => sum + entry.total_credit, 0) : 0;
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Journal Ledger" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Journal Ledger" }),
        /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6 mb-6", children: [
          /* @__PURE__ */ jsxs("form", { onSubmit: handleFilter, className: "flex gap-4 items-end mb-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "w-1/3", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Journal" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: data.journal_id,
                  onChange: (e) => setData("journal_id", e.target.value),
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "Select Journal" }),
                    journals.map((journal) => /* @__PURE__ */ jsxs("option", { value: journal.id, children: [
                      journal.name,
                      " (",
                      journal.code,
                      ")"
                    ] }, journal.id))
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
                  className: "px-3 py-2 border border-gray-300 rounded-md"
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
                  className: "px-3 py-2 border border-gray-300 rounded-md"
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                className: "px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700",
                children: "Filter"
              }
            )
          ] }),
          selectedJournal ? /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-6 pb-6 border-b border-gray-200", children: [
              /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: selectedJournal.name }),
              /* @__PURE__ */ jsxs("p", { className: "text-gray-600", children: [
                "Period: ",
                new Date(startDate).toLocaleDateString(),
                " - ",
                new Date(endDate).toLocaleDateString()
              ] })
            ] }),
            entries && entries.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-6", children: entries.map((entry) => /* @__PURE__ */ jsxs("div", { className: "border border-gray-200 rounded-lg p-4 hover:bg-gray-50", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-2", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("h3", { className: "font-semibold text-gray-900", children: [
                    new Date(entry.date).toLocaleDateString(),
                    " - ",
                    entry.reference || "No Reference"
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: entry.notes || "No notes" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
                  /* @__PURE__ */ jsx("span", { className: `px-2 py-1 text-xs rounded-full ${entry.state === "posted" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`, children: entry.state.toUpperCase() }),
                  /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mt-1", children: [
                    "Entry #",
                    entry.id
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("table", { className: "min-w-full text-sm", children: [
                /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "text-gray-500 border-b border-gray-200", children: [
                  /* @__PURE__ */ jsx("th", { className: "text-left font-normal py-1", children: "Account" }),
                  /* @__PURE__ */ jsx("th", { className: "text-left font-normal py-1", children: "Type" }),
                  /* @__PURE__ */ jsx("th", { className: "text-left font-normal py-1", children: "Description" }),
                  /* @__PURE__ */ jsx("th", { className: "text-right font-normal py-1", children: "Debit" }),
                  /* @__PURE__ */ jsx("th", { className: "text-right font-normal py-1", children: "Credit" })
                ] }) }),
                /* @__PURE__ */ jsxs("tbody", { children: [
                  entry.lines.map((line, index) => /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { className: "py-1", children: /* @__PURE__ */ jsxs(
                      Link,
                      {
                        href: `/accounting/accounts/${line.account_id}`,
                        className: "text-indigo-600 hover:text-indigo-800",
                        children: [
                          line.account.code,
                          " - ",
                          line.account.name
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsx("td", { className: "py-1 text-gray-500", children: line.account.account_type }),
                    /* @__PURE__ */ jsx("td", { className: "py-1 text-gray-600", children: line.description }),
                    /* @__PURE__ */ jsx("td", { className: "py-1 text-right", children: line.debit > 0 ? `$${parseFloat(line.debit).toLocaleString()}` : "-" }),
                    /* @__PURE__ */ jsx("td", { className: "py-1 text-right", children: line.credit > 0 ? `$${parseFloat(line.credit).toLocaleString()}` : "-" })
                  ] }, index)),
                  /* @__PURE__ */ jsxs("tr", { className: "border-t border-gray-100 font-medium bg-gray-50", children: [
                    /* @__PURE__ */ jsx("td", { colSpan: "3", className: "py-1 text-right pr-4", children: "Total" }),
                    /* @__PURE__ */ jsxs("td", { className: "py-1 text-right", children: [
                      "$",
                      entry.lines.reduce((s, l) => s + parseFloat(l.debit), 0).toLocaleString()
                    ] }),
                    /* @__PURE__ */ jsxs("td", { className: "py-1 text-right", children: [
                      "$",
                      entry.lines.reduce((s, l) => s + parseFloat(l.credit), 0).toLocaleString()
                    ] })
                  ] })
                ] })
              ] })
            ] }, entry.id)) }) : /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500 py-8", children: "No entries found for this period." })
          ] }) : /* @__PURE__ */ jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-lg", children: "Please select a journal to view its ledger." }) })
        ] }) }) })
      ]
    }
  );
}
export {
  JournalLedger as default
};
