import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DHAmaW8y.js";
import { useForm, Head } from "@inertiajs/react";
import "react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function TrialBalance({ auth, accounts, totalDebit, totalCredit, date }) {
  const { data, setData, get } = useForm({
    date
  });
  const handleFilter = (e) => {
    e.preventDefault();
    get(route("accounting.reports.trial-balance"), {
      preserveState: true
    });
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Trial Balance" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Trial Balance" }),
        /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-6 mb-6", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleFilter, className: "flex items-end gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1 max-w-xs", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "As of Date" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "date",
                  value: data.date,
                  onChange: (e) => setData("date", e.target.value),
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
          /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "p-6 border-b border-gray-200", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-center mb-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-900", children: "Trial Balance" }),
              /* @__PURE__ */ jsxs("p", { className: "text-gray-500", children: [
                "As of ",
                new Date(date).toLocaleDateString()
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
              /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Account Code" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Account Name" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Type" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Debit" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Credit" })
              ] }) }),
              /* @__PURE__ */ jsxs("tbody", { className: "bg-white divide-y divide-gray-200", children: [
                accounts.map((account) => (parseFloat(account.debit) !== 0 || parseFloat(account.credit) !== 0) && /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: account.code }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900", children: account.name }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize", children: account.account_type }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900", children: parseFloat(account.debit) !== 0 ? `$${parseFloat(account.debit).toLocaleString(void 0, { minimumFractionDigits: 2 })}` : "-" }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900", children: parseFloat(account.credit) !== 0 ? `$${parseFloat(account.credit).toLocaleString(void 0, { minimumFractionDigits: 2 })}` : "-" })
                ] }, account.id)),
                /* @__PURE__ */ jsxs("tr", { className: "bg-gray-100 font-bold border-t-2 border-gray-300", children: [
                  /* @__PURE__ */ jsx("td", { colSpan: "3", className: "px-6 py-4 text-right text-sm text-gray-900", children: "Total:" }),
                  /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900", children: [
                    "$",
                    parseFloat(totalDebit).toLocaleString(void 0, { minimumFractionDigits: 2 })
                  ] }),
                  /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900", children: [
                    "$",
                    parseFloat(totalCredit).toLocaleString(void 0, { minimumFractionDigits: 2 })
                  ] })
                ] }),
                Math.abs(totalDebit - totalCredit) > 0.01 && /* @__PURE__ */ jsx("tr", { className: "bg-red-50 text-red-700", children: /* @__PURE__ */ jsxs("td", { colSpan: "5", className: "px-6 py-3 text-center text-sm font-bold", children: [
                  "⚠️ Trial Balance is NOT balanced! Difference: $",
                  Math.abs(totalDebit - totalCredit).toFixed(2)
                ] }) })
              ] })
            ] }) })
          ] }) })
        ] }) })
      ]
    }
  );
}
export {
  TrialBalance as default
};
