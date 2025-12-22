import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DHAmaW8y.js";
import { Head, Link } from "@inertiajs/react";
import { D as DataTable } from "./DataTable-Cf56Cbah.js";
import "react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function Index({ auth, logs }) {
  const columns = [
    { key: "log_date", label: "Date", render: (item) => new Date(item.log_date).toLocaleDateString() },
    {
      key: "log_type",
      label: "Activity",
      render: (item) => /* @__PURE__ */ jsx("span", { className: `px-2 py-1 text-xs font-bold uppercase rounded ${item.log_type === "nutrition" ? "bg-purple-100 text-purple-800" : item.log_type === "pesticide" ? "bg-red-100 text-red-800" : item.log_type === "water" ? "bg-blue-100 text-blue-800" : item.log_type === "harvest" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"}`, children: item.log_type })
    },
    {
      key: "crop_name",
      label: "Crop",
      render: (item) => /* @__PURE__ */ jsx(Link, { href: route("agriculture.crops.show", item.crop_id), className: "text-indigo-600 hover:text-indigo-900 font-medium", children: item.crop?.name })
    },
    {
      key: "details",
      label: "Details",
      render: (item) => /* @__PURE__ */ jsx("div", { children: item.log_type === "nutrition" || item.log_type === "pesticide" ? /* @__PURE__ */ jsxs("div", { className: "text-xs", children: [
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: item.input_name }),
        item.input_quantity && ` (${item.input_quantity} ${item.input_unit})`
      ] }) : /* @__PURE__ */ jsx("span", { className: "text-gray-600 text-sm truncate max-w-xs block", children: item.notes }) })
    },
    { key: "stage", label: "Stage" },
    {
      key: "image",
      label: "Photo",
      render: (item) => item.image_path ? /* @__PURE__ */ jsx("a", { href: `/storage/${item.image_path}`, target: "_blank", className: "text-blue-500 hover:underline text-xs", children: "View" }) : /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-xs", children: "-" })
    }
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Daily Activities Feed" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Daily Activities" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsx(
          DataTable,
          {
            columns,
            data: logs.data,
            pagination: logs
          }
        ) }) }) }) })
      ]
    }
  );
}
export {
  Index as default
};
