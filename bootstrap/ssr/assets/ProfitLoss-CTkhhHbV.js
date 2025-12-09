import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-D7veU2Fe.js";
import { Head, Link } from "@inertiajs/react";
import "react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function ProfitLoss({ auth, income, expenses, totalIncome, totalExpenses, netProfit, startDate, endDate }) {
  const AccountRow = ({ account }) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
    /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: /* @__PURE__ */ jsxs(
      Link,
      {
        href: `/accounting/accounts/${account.id}`,
        className: "text-indigo-600 hover:text-indigo-800",
        children: [
          account.code,
          " - ",
          account.name
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs("td", { className: "px-4 py-2 text-right font-medium", children: [
      "$",
      account.balance?.toLocaleString() || "0.00"
    ] })
  ] });
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Profit & Loss Statement" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Profit & Loss" }),
        /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Profit & Loss Statement" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-600", children: [
              new Date(startDate).toLocaleDateString(),
              " - ",
              new Date(endDate).toLocaleDateString()
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg text-gray-900 mb-3 bg-green-100 px-4 py-2", children: "Income" }),
            /* @__PURE__ */ jsx("table", { className: "min-w-full", children: /* @__PURE__ */ jsxs("tbody", { children: [
              income && income.length > 0 ? income.map((account) => /* @__PURE__ */ jsx(AccountRow, { account }, account.id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "2", className: "px-4 py-4 text-center text-gray-500", children: "No income accounts" }) }),
              /* @__PURE__ */ jsxs("tr", { className: "border-t-2 font-bold bg-gray-50", children: [
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: "Total Income" }),
                /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 text-right", children: [
                  "$",
                  totalIncome?.toLocaleString() || "0.00"
                ] })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg text-gray-900 mb-3 bg-red-100 px-4 py-2", children: "Expenses" }),
            /* @__PURE__ */ jsx("table", { className: "min-w-full", children: /* @__PURE__ */ jsxs("tbody", { children: [
              expenses && expenses.length > 0 ? expenses.map((account) => /* @__PURE__ */ jsx(AccountRow, { account }, account.id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "2", className: "px-4 py-4 text-center text-gray-500", children: "No expense accounts" }) }),
              /* @__PURE__ */ jsxs("tr", { className: "border-t-2 font-bold bg-gray-50", children: [
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: "Total Expenses" }),
                /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 text-right", children: [
                  "$",
                  totalExpenses?.toLocaleString() || "0.00"
                ] })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: `p-4 rounded-lg ${netProfit >= 0 ? "bg-green-50" : "bg-red-50"}`, children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900", children: netProfit >= 0 ? "Net Profit" : "Net Loss" }),
            /* @__PURE__ */ jsxs("p", { className: `text-2xl font-bold ${netProfit >= 0 ? "text-green-700" : "text-red-700"}`, children: [
              "$",
              Math.abs(netProfit)?.toLocaleString() || "0.00"
            ] })
          ] }) })
        ] }) }) })
      ]
    }
  );
}
export {
  ProfitLoss as default
};
