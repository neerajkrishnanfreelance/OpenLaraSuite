import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DHAmaW8y.js";
import { Head, Link } from "@inertiajs/react";
import { D as DataTable } from "./DataTable-Cf56Cbah.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import "react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function Index({ auth, transactions }) {
  const columns = [
    { key: "trade_date", label: "Date", render: (item) => new Date(item.trade_date).toLocaleDateString() },
    {
      key: "type",
      label: "Type",
      render: (item) => /* @__PURE__ */ jsx("span", { className: `px-2 py-1 text-xs font-bold uppercase rounded ${item.type === "buy" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`, children: item.type })
    },
    { key: "stock_symbol", label: "Symbol", render: (item) => /* @__PURE__ */ jsx("span", { className: "font-mono font-bold", children: item.stock_symbol }) },
    { key: "quantity", label: "Qty" },
    { key: "price_per_unit", label: "Price" },
    { key: "total_amount", label: "Total" },
    { key: "fees", label: "Fees" },
    { key: "net_amount", label: "Net Amount", render: (item) => /* @__PURE__ */ jsx("span", { className: "font-semibold", children: item.net_amount }) },
    { key: "notes", label: "Notes", render: (item) => /* @__PURE__ */ jsx("span", { className: "text-xs", children: item.notes }) }
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Stock Market" }),
        /* @__PURE__ */ jsx(Link, { href: route("stocks.create"), children: /* @__PURE__ */ jsx(PrimaryButton, { children: "New Trade" }) })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Stocks" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6", children: /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsx(
          DataTable,
          {
            columns,
            data: transactions.data,
            pagination: transactions
          }
        ) }) }) }) })
      ]
    }
  );
}
export {
  Index as default
};
