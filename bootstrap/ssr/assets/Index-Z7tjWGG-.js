import { jsxs, jsx } from "react/jsx-runtime";
import { B as BudgetLayout } from "./BudgetLayout-DlWYD0jK.js";
import { Head, Link } from "@inertiajs/react";
import { Calendar, Eye, Edit, TrendingUp, Plus } from "lucide-react";
import "./AuthenticatedLayout-CxZoB_L7.js";
import "react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function PlansIndex({ plans }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return /* @__PURE__ */ jsxs(
    BudgetLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Budget Plans" }),
        /* @__PURE__ */ jsxs(
          Link,
          {
            href: "/budget/plans/create",
            className: "px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
              "New Plan"
            ]
          }
        )
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Budget Plans" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-6", children: plans.length > 0 ? plans.map((plan) => /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900", children: plan.name }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 mt-1", children: [
                /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 inline mr-1" }),
                new Date(plan.start_date).toLocaleDateString("en-IN"),
                " - ",
                new Date(plan.end_date).toLocaleDateString("en-IN")
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: `px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(plan.status)}`, children: plan.status }),
              /* @__PURE__ */ jsx("span", { className: "px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800", children: plan.budget_type })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4 mb-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Total Budget" }),
              /* @__PURE__ */ jsxs("p", { className: "text-xl font-bold text-gray-900", children: [
                "₹",
                parseFloat(plan.total_amount).toLocaleString("en-IN")
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Spent" }),
              /* @__PURE__ */ jsxs("p", { className: "text-xl font-bold text-red-600", children: [
                "₹",
                parseFloat(plan.spent_amount).toLocaleString("en-IN")
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Remaining" }),
              /* @__PURE__ */ jsxs("p", { className: "text-xl font-bold text-green-600", children: [
                "₹",
                parseFloat(plan.remaining_amount).toLocaleString("en-IN")
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Progress" }),
              /* @__PURE__ */ jsxs("p", { className: "text-xl font-bold text-purple-600", children: [
                plan.progress_percentage,
                "%"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-3", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: `h-3 rounded-full transition-all duration-300 ${plan.progress_percentage > 90 ? "bg-red-600" : plan.progress_percentage > 75 ? "bg-yellow-600" : "bg-green-600"}`,
              style: { width: `${Math.min(plan.progress_percentage, 100)}%` }
            }
          ) }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
              plan.entries_count,
              " entries • ",
              plan.allocations.length,
              " categories"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxs(
                Link,
                {
                  href: `/budget/plans/${plan.id}`,
                  className: "px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium flex items-center gap-1",
                  children: [
                    /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" }),
                    "View"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  href: `/budget/plans/${plan.id}/edit`,
                  className: "px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm font-medium flex items-center gap-1",
                  children: [
                    /* @__PURE__ */ jsx(Edit, { className: "w-4 h-4" }),
                    "Edit"
                  ]
                }
              )
            ] })
          ] })
        ] }) }, plan.id)) : /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-12 text-center", children: [
          /* @__PURE__ */ jsx(TrendingUp, { className: "w-16 h-16 text-gray-400 mx-auto mb-4" }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "No Budget Plans Yet" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-4", children: "Create your first budget plan to start tracking your spending" }),
          /* @__PURE__ */ jsxs(
            Link,
            {
              href: "/budget/plans/create",
              className: "inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium",
              children: [
                /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
                "Create Budget Plan"
              ]
            }
          )
        ] }) })
      ]
    }
  );
}
export {
  PlansIndex as default
};
