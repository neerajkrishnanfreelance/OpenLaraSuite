import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-__gkNP0U.js";
import { Head, Link } from "@inertiajs/react";
import "react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function BalanceSheet({ auth, assets, liabilities, equity, totalAssets, totalLiabilities, totalEquity, date }) {
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
  const Section = ({ title, accounts, total }) => /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
    /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg text-gray-900 mb-3 bg-gray-100 px-4 py-2", children: title }),
    /* @__PURE__ */ jsx("table", { className: "min-w-full", children: /* @__PURE__ */ jsxs("tbody", { children: [
      accounts && accounts.length > 0 ? accounts.map((account) => /* @__PURE__ */ jsx(AccountRow, { account }, account.id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsxs("td", { colSpan: "2", className: "px-4 py-4 text-center text-gray-500", children: [
        "No ",
        title.toLowerCase(),
        " accounts"
      ] }) }),
      /* @__PURE__ */ jsxs("tr", { className: "border-t-2 font-bold bg-gray-50", children: [
        /* @__PURE__ */ jsxs("td", { className: "px-4 py-3", children: [
          "Total ",
          title
        ] }),
        /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 text-right", children: [
          "$",
          total?.toLocaleString() || "0.00"
        ] })
      ] })
    ] }) })
  ] });
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Balance Sheet" }),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/accounting/entries/create",
            className: "px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm",
            children: "Create Journal Entry"
          }
        )
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Balance Sheet" }),
        /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-6 flex justify-between items-center", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Balance Sheet" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-600", children: [
              "As of ",
              new Date(date).toLocaleDateString()
            ] })
          ] }),
          /* @__PURE__ */ jsx(Section, { title: "Assets", accounts: assets, total: totalAssets }),
          /* @__PURE__ */ jsx(Section, { title: "Liabilities", accounts: liabilities, total: totalLiabilities }),
          /* @__PURE__ */ jsx(Section, { title: "Equity", accounts: equity, total: totalEquity }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 p-4 bg-blue-50 rounded-lg", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "Accounting Equation" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700", children: "Assets = Liabilities + Equity" }),
            /* @__PURE__ */ jsxs("p", { className: "text-lg font-bold mt-2", children: [
              "$",
              totalAssets?.toLocaleString() || "0.00",
              " = $",
              totalLiabilities?.toLocaleString() || "0.00",
              " + $",
              totalEquity?.toLocaleString() || "0.00"
            ] }),
            Math.abs(totalAssets - (totalLiabilities + totalEquity)) > 0.01 && /* @__PURE__ */ jsx("p", { className: "text-red-600 mt-2", children: "⚠️ Warning: Balance sheet does not balance!" })
          ] })
        ] }) }) })
      ]
    }
  );
}
export {
  BalanceSheet as default
};
