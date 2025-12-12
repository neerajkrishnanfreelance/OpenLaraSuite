import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { B as BudgetLayout } from "./BudgetLayout-_D7v7aUE.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { Edit } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import "./AuthenticatedLayout-D5dyBxod.js";
import "react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function PlansShow({ plan, categories }) {
  const { data, setData, post, processing, reset } = useForm({
    budget_category_id: "",
    amount: "",
    description: "",
    entry_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    payment_method: "cash",
    budget_plan_id: plan.id
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/budget/entries", {
      onSuccess: () => reset()
    });
  };
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];
  const allocationData = plan.allocations.map((alloc) => ({
    name: alloc.category.name,
    value: parseFloat(alloc.spent_amount),
    allocated: parseFloat(alloc.allocated_amount),
    color: alloc.category.color
  }));
  return /* @__PURE__ */ jsxs(
    BudgetLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: plan.name }),
        /* @__PURE__ */ jsxs(
          Link,
          {
            href: `/budget/plans/${plan.id}/edit`,
            className: "px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx(Edit, { className: "w-4 h-4" }),
              "Edit Plan"
            ]
          }
        )
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: plan.name }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-1", children: "Total Budget" }),
            /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-gray-900", children: [
              "₹",
              parseFloat(plan.total_amount).toLocaleString("en-IN")
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-1", children: "Spent" }),
            /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-red-600", children: [
              "₹",
              parseFloat(plan.spent_amount).toLocaleString("en-IN")
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-1", children: "Remaining" }),
            /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-green-600", children: [
              "₹",
              parseFloat(plan.remaining_amount).toLocaleString("en-IN")
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-1", children: "Progress" }),
            /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-purple-600", children: [
              plan.progress_percentage,
              "%"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-2 w-full bg-gray-200 rounded-full h-2", children: /* @__PURE__ */ jsx(
              "div",
              {
                className: "bg-purple-600 h-2 rounded-full",
                style: { width: `${Math.min(plan.progress_percentage, 100)}%` }
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Category Allocations" }),
            plan.allocations.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxs(PieChart, { children: [
                /* @__PURE__ */ jsx(
                  Pie,
                  {
                    data: allocationData,
                    cx: "50%",
                    cy: "50%",
                    outerRadius: 60,
                    fill: "#8884d8",
                    dataKey: "value",
                    label: ({ name }) => name,
                    children: allocationData.map((entry, index) => /* @__PURE__ */ jsx(Cell, { fill: entry.color || COLORS[index % COLORS.length] }, `cell-${index}`))
                  }
                ),
                /* @__PURE__ */ jsx(Tooltip, { formatter: (value) => `₹${value.toLocaleString("en-IN")}` })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "mt-4 space-y-2", children: plan.allocations.map((alloc) => /* @__PURE__ */ jsxs("div", { className: "border-b border-gray-200 pb-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-1", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "w-3 h-3 rounded-full",
                        style: { backgroundColor: alloc.category.color }
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900", children: alloc.category.name })
                  ] }),
                  /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-600", children: [
                    "₹",
                    parseFloat(alloc.spent_amount).toLocaleString("en-IN"),
                    " / ₹",
                    parseFloat(alloc.allocated_amount).toLocaleString("en-IN")
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-1.5", children: /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "bg-indigo-600 h-1.5 rounded-full",
                    style: {
                      width: `${Math.min(parseFloat(alloc.spent_amount) / parseFloat(alloc.allocated_amount) * 100, 100)}%`
                    }
                  }
                ) })
              ] }, alloc.id)) })
            ] }) : /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-center py-8", children: "No allocations defined" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Add Entry to This Plan" }),
            /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Date" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "date",
                    value: data.entry_date,
                    onChange: (e) => setData("entry_date", e.target.value),
                    className: "w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Category" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: data.budget_category_id,
                    onChange: (e) => setData("budget_category_id", e.target.value),
                    className: "w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                    required: true,
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "", children: "Select..." }),
                      categories.map((cat) => /* @__PURE__ */ jsx("option", { value: cat.id, children: cat.name }, cat.id))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Amount" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    step: "0.01",
                    value: data.amount,
                    onChange: (e) => setData("amount", e.target.value),
                    className: "w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                    placeholder: "0.00",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Description" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: data.description,
                    onChange: (e) => setData("description", e.target.value),
                    className: "w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Payment Method" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: data.payment_method,
                    onChange: (e) => setData("payment_method", e.target.value),
                    className: "w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "cash", children: "Cash" }),
                      /* @__PURE__ */ jsx("option", { value: "card", children: "Card" }),
                      /* @__PURE__ */ jsx("option", { value: "upi", children: "UPI" }),
                      /* @__PURE__ */ jsx("option", { value: "bank_transfer", children: "Bank Transfer" }),
                      /* @__PURE__ */ jsx("option", { value: "other", children: "Other" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: processing,
                  className: "w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium disabled:opacity-50",
                  children: "Add Entry"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow", children: [
          /* @__PURE__ */ jsx("div", { className: "p-6 border-b border-gray-200", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Entries for This Plan" }) }),
          /* @__PURE__ */ jsx("div", { className: "divide-y divide-gray-200", children: plan.entries.length > 0 ? plan.entries.map((entry) => /* @__PURE__ */ jsx("div", { className: "p-4 hover:bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "w-3 h-3 rounded-full",
                    style: { backgroundColor: entry.budget_category.color }
                  }
                ),
                /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900", children: entry.budget_category.name })
              ] }),
              entry.description && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: entry.description }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mt-1", children: [
                new Date(entry.entry_date).toLocaleDateString("en-IN"),
                " • ",
                entry.payment_method
              ] })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-lg font-semibold text-red-600", children: [
              "-₹",
              parseFloat(entry.amount).toLocaleString("en-IN")
            ] })
          ] }) }, entry.id)) : /* @__PURE__ */ jsx("div", { className: "p-8 text-center text-gray-500", children: "No entries yet for this plan" }) })
        ] })
      ]
    }
  );
}
export {
  PlansShow as default
};
