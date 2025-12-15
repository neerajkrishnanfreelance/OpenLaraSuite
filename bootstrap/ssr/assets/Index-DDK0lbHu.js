import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-Bg39NUCY.js";
import { Head, Link } from "@inertiajs/react";
import { D as DataTable } from "./DataTable-Cf56Cbah.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import "react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function Index({ auth, crops }) {
  const columns = [
    { key: "name", label: "Name", render: (item) => /* @__PURE__ */ jsx(Link, { href: route("agriculture.crops.show", item.id), className: "text-indigo-600 hover:text-indigo-900 font-bold", children: item.name }) },
    {
      key: "status",
      label: "Status",
      render: (item) => /* @__PURE__ */ jsx("span", { className: `px-2 py-1 text-xs font-bold uppercase rounded ${item.status === "active" ? "bg-green-100 text-green-800" : item.status === "harvested" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`, children: item.status })
    },
    { key: "type", label: "Type" },
    { key: "variety", label: "Variety" },
    { key: "planting_date", label: "Planted" },
    {
      key: "check_r_n_d",
      label: "R&D",
      render: (item) => item.check_r_n_d ? /* @__PURE__ */ jsx("span", { className: "bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full", children: "R&D" }) : null
    },
    {
      key: "actions",
      label: "Actions",
      render: (item) => /* @__PURE__ */ jsx("div", { className: "flex space-x-2", children: /* @__PURE__ */ jsx(Link, { href: route("agriculture.crops.edit", item.id), className: "text-gray-600 hover:text-gray-900 text-sm", children: "Edit" }) })
    }
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Your Crops" }),
        /* @__PURE__ */ jsx(Link, { href: route("agriculture.crops.create"), children: /* @__PURE__ */ jsx(PrimaryButton, { children: "+ New Crop" }) })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Crops List" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6", children: /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsx(
          DataTable,
          {
            columns,
            data: crops.data,
            pagination: crops
          }
        ) }) }) }) })
      ]
    }
  );
}
export {
  Index as default
};
