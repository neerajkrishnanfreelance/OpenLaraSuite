import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-BuXJMMFe.js";
import { Head } from "@inertiajs/react";
import { S as StatusBadge } from "./StatusBadge-CPwNKsS5.js";
import "react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function Show({ auth, employee, stats }) {
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsxs("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: [
        "Employee Profile: ",
        employee.name
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: employee.name }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg p-6", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-500 truncate", children: "Active Projects" }),
              /* @__PURE__ */ jsx("div", { className: "mt-1 text-3xl font-semibold text-indigo-600", children: stats.active_projects })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg p-6", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-500 truncate", children: "Pending Tasks" }),
              /* @__PURE__ */ jsx("div", { className: "mt-1 text-3xl font-semibold text-yellow-500", children: stats.pending_tasks })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg p-6", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-500 truncate", children: "Hours (This Month)" }),
              /* @__PURE__ */ jsx("div", { className: "mt-1 text-3xl font-semibold text-green-600", children: stats.hours_this_month })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg p-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-4", children: "Profile Information" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "block text-sm font-medium text-gray-500", children: "Name" }),
                  /* @__PURE__ */ jsx("span", { className: "text-gray-900", children: employee.name })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "block text-sm font-medium text-gray-500", children: "Email" }),
                  /* @__PURE__ */ jsx("span", { className: "text-gray-900", children: employee.email })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "block text-sm font-medium text-gray-500", children: "Role" }),
                  /* @__PURE__ */ jsx("span", { className: "capitalize", children: employee.roles[0]?.name })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg p-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-4", children: "Current Tasks" }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
                employee.tasks.slice(0, 5).map((task) => /* @__PURE__ */ jsxs("li", { className: "flex justify-between items-center border-b border-gray-100 pb-2", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "font-medium text-sm text-gray-800", children: task.title }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: task.project?.name })
                  ] }),
                  /* @__PURE__ */ jsx(StatusBadge, { status: task.status })
                ] }, task.id)),
                employee.tasks.length === 0 && /* @__PURE__ */ jsx("li", { className: "text-sm text-gray-500", children: "No active tasks." })
              ] }),
              employee.tasks.length > 5 && /* @__PURE__ */ jsx("div", { className: "mt-4 text-center", children: /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-500", children: [
                "And ",
                employee.tasks.length - 5,
                " more..."
              ] }) })
            ] })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  Show as default
};
