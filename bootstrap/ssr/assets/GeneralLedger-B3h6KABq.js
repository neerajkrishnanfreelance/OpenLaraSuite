import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-D7veU2Fe.js";
import { useForm, Head } from "@inertiajs/react";
import "react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function GeneralLedger({ auth, accounts, selectedAccount, lines, startDate, endDate }) {
  const { data, setData, get } = useForm({
    account_id: selectedAccount?.id || "",
    start_date: startDate,
    end_date: endDate
  });
  const handleFilter = (e) => {
    e.preventDefault();
    get(route("accounting.reports.general-ledger"), {
      preserveState: true
    });
  };
  const totalDebit = lines ? lines.reduce((sum, line) => sum + parseFloat(line.debit || 0), 0) : 0;
  const totalCredit = lines ? lines.reduce((sum, line) => sum + parseFloat(line.credit || 0), 0) : 0;
  const balanceChange = totalDebit - totalCredit;
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "General Ledger" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "General Ledger" }),
        /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-6 mb-6", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleFilter, className: "grid grid-cols-1 md:grid-cols-4 gap-4 items-end", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Account" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: data.account_id,
                  onChange: (e) => setData("account_id", e.target.value),
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "Select Account" }),
                    accounts.map((account) => /* @__PURE__ */ jsxs("option", { value: account.id, children: [
                      account.code,
                      " - ",
                      account.name
                    ] }, account.id))
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
                className: "px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700",
                children: "Run Report"
              }
            )
          ] }) }),
          selectedAccount ? /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "p-6 border-b border-gray-200", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-gray-900", children: [
                  selectedAccount.code,
                  " - ",
                  selectedAccount.name
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 capitalize", children: [
                  "Type: ",
                  selectedAccount.account_type
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-right", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
                "Period: ",
                new Date(startDate).toLocaleDateString(),
                " - ",
                new Date(endDate).toLocaleDateString()
              ] }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
              /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Date" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Journal" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Reference" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Description" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Debit" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Credit" })
              ] }) }),
              /* @__PURE__ */ jsxs("tbody", { className: "bg-white divide-y divide-gray-200", children: [
                lines.length > 0 ? lines.map((line) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: new Date(line.created_at).toLocaleDateString() }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: line.journal_entry?.journal?.name || "-" }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: line.journal_entry?.reference || "-" }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm text-gray-500", children: line.description }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900", children: parseFloat(line.debit) > 0 ? `$${parseFloat(line.debit).toFixed(2)}` : "-" }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900", children: parseFloat(line.credit) > 0 ? `$${parseFloat(line.credit).toFixed(2)}` : "-" })
                ] }, line.id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "6", className: "px-6 py-4 text-center text-gray-500", children: "No transactions found for this period." }) }),
                lines.length > 0 && /* @__PURE__ */ jsxs("tr", { className: "bg-gray-50 font-bold", children: [
                  /* @__PURE__ */ jsx("td", { colSpan: "4", className: "px-6 py-4 text-right text-sm text-gray-900", children: "Period Totals:" }),
                  /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900", children: [
                    "$",
                    totalDebit.toFixed(2)
                  ] }),
                  /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900", children: [
                    "$",
                    totalCredit.toFixed(2)
                  ] })
                ] }),
                lines.length > 0 && /* @__PURE__ */ jsxs("tr", { className: "bg-gray-100 font-bold border-t border-gray-300", children: [
                  /* @__PURE__ */ jsx("td", { colSpan: "4", className: "px-6 py-4 text-right text-sm text-gray-900", children: "Net Change:" }),
                  /* @__PURE__ */ jsxs("td", { colSpan: "2", className: `px-6 py-4 whitespace-nowrap text-center text-sm ${balanceChange >= 0 ? "text-green-700" : "text-red-700"}`, children: [
                    "$",
                    balanceChange.toFixed(2),
                    " ",
                    balanceChange >= 0 ? "(Dr)" : "(Cr)"
                  ] })
                ] })
              ] })
            ] }) })
          ] }) }) : /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-12 text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "mx-auto h-12 w-12 text-gray-400 mb-4", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Select an account" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-gray-500", children: "Choose an account above to view its general ledger entries." })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  GeneralLedger as default
};
