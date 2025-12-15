import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-CHpdAQnP.js";
import { Head, Link } from "@inertiajs/react";
import { D as DataTable } from "./DataTable-Cf56Cbah.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import "react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function Index({ auth, stocks }) {
  const columns = [
    { key: "symbol", label: "Symbol", render: (item) => /* @__PURE__ */ jsx("span", { className: "font-mono font-bold text-indigo-600", children: item.symbol }) },
    { key: "name", label: "Name" },
    { key: "sector", label: "Sector" },
    { key: "description", label: "Description", render: (item) => /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 truncate max-w-xs block", children: item.description }) },
    {
      key: "is_active",
      label: "Status",
      render: (item) => /* @__PURE__ */ jsx("span", { className: `px-2 py-1 text-xs font-bold uppercase rounded ${item.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`, children: item.is_active ? "Active" : "Inactive" })
    },
    {
      key: "actions",
      label: "Actions",
      render: (item) => /* @__PURE__ */ jsx("div", { className: "flex space-x-2", children: /* @__PURE__ */ jsx(Link, { href: route("stocks-definitions.edit", item.id), className: "text-indigo-600 hover:text-indigo-900 font-medium", children: "Edit" }) })
    }
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Stock List" }),
        /* @__PURE__ */ jsx(Link, { href: route("stocks-definitions.create"), children: /* @__PURE__ */ jsx(PrimaryButton, { children: "+ Add Stock" }) })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Stocks List" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6", children: /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsx(
          DataTable,
          {
            columns,
            data: stocks.data,
            pagination: stocks
          }
        ) }) }) }) })
      ]
    }
  );
}
export {
  Index as default
};
