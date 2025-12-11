import { jsxs, jsx } from "react/jsx-runtime";
import { B as BudgetLayout } from "./BudgetLayout-DlWYD0jK.js";
import { Head, Link } from "@inertiajs/react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import { TrendingUp, Plus, Calendar } from "lucide-react";
import "./AuthenticatedLayout-CxZoB_L7.js";
import "react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function BudgetDashboard({
  activePlans,
  monthlyTrend,
  categories
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  const getProgressColor = (percentage) => {
    if (percentage >= 90) return "bg-red-600";
    if (percentage >= 75) return "bg-yellow-600";
    return "bg-green-600";
  };
  return /* @__PURE__ */ jsxs(
    BudgetLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Budget Dashboard" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxs(
            Link,
            {
              href: "/budget/entries/calendar",
              className: "px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" }),
                "Add Entry"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Link,
            {
              href: "/budget/plans/create",
              className: "px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
                "New Budget"
              ]
            }
          )
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Budget Dashboard" }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6 mb-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Monthly Spending Trend" }),
          /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxs(BarChart, { data: monthlyTrend, children: [
            /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3" }),
            /* @__PURE__ */ jsx(XAxis, { dataKey: "month" }),
            /* @__PURE__ */ jsx(YAxis, {}),
            /* @__PURE__ */ jsx(Tooltip, { formatter: (value) => `₹${value.toLocaleString("en-IN")}` }),
            /* @__PURE__ */ jsx(Legend, {}),
            /* @__PURE__ */ jsx(Bar, { dataKey: "budget", fill: "#3b82f6", name: "Budget", radius: [8, 8, 0, 0] }),
            /* @__PURE__ */ jsx(Bar, { dataKey: "spent", fill: "#ef4444", name: "Spent", radius: [8, 8, 0, 0] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Active Budget Plans" }),
          activePlans.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: activePlans.map((plan) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-4 border-b border-gray-200", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-2", children: [
                /* @__PURE__ */ jsx("h4", { className: "font-semibold text-gray-900 text-lg", children: plan.name }),
                /* @__PURE__ */ jsx("span", { className: `px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(plan.status)}`, children: plan.status })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
                new Date(plan.start_date).toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
                " - ",
                new Date(plan.end_date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600 mb-1", children: "Budget" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-lg font-bold text-blue-600", children: [
                    "₹",
                    parseFloat(plan.total_amount).toLocaleString("en-IN")
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600 mb-1", children: "Spent" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-lg font-bold text-red-600", children: [
                    "₹",
                    parseFloat(plan.spent_amount).toLocaleString("en-IN")
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-1", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-600", children: "Progress" }),
                  /* @__PURE__ */ jsxs("span", { className: "text-xs font-semibold text-gray-900", children: [
                    plan.progress_percentage,
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-3", children: /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `h-3 rounded-full transition-all duration-300 ${getProgressColor(plan.progress_percentage)}`,
                    style: { width: `${Math.min(plan.progress_percentage, 100)}%` }
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600 mb-1", children: "Remaining" }),
                /* @__PURE__ */ jsxs("p", { className: "text-xl font-bold text-green-600", children: [
                  "₹",
                  parseFloat(plan.remaining_amount).toLocaleString("en-IN")
                ] })
              ] }),
              plan.allocations && plan.allocations.length > 0 && /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-200 pt-3", children: [
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-600 mb-2", children: [
                  "Categories (",
                  plan.allocations.length,
                  ")"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  plan.allocations.slice(0, 3).map((alloc) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "w-2 h-2 rounded-full",
                          style: { backgroundColor: alloc.budget_category?.color || "#3b82f6" }
                        }
                      ),
                      /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: alloc.budget_category?.name })
                    ] }),
                    /* @__PURE__ */ jsxs("span", { className: "text-gray-600", children: [
                      "₹",
                      parseFloat(alloc.allocated_amount).toLocaleString("en-IN")
                    ] })
                  ] }, alloc.id)),
                  plan.allocations.length > 3 && /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500", children: [
                    "+",
                    plan.allocations.length - 3,
                    " more"
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-600", children: [
                plan.entries_count || 0,
                " entries"
              ] }),
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: `/budget/plans/${plan.id}`,
                  className: "text-sm text-indigo-600 hover:text-indigo-800 font-medium",
                  children: "View Details →"
                }
              )
            ] })
          ] }, plan.id)) }) : /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-12 text-center", children: [
            /* @__PURE__ */ jsx(TrendingUp, { className: "w-16 h-16 text-gray-400 mx-auto mb-4" }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "No Active Budgets" }),
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
          ] })
        ] })
      ]
    }
  );
}
export {
  BudgetDashboard as default
};
