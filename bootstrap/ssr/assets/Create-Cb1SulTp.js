import { jsxs, jsx } from "react/jsx-runtime";
import { B as BudgetLayout } from "./BudgetLayout-CF9Cdd68.js";
import { useForm, Head, router } from "@inertiajs/react";
import { useState } from "react";
import "./AuthenticatedLayout-CHmnEReh.js";
import "./ApplicationLogo-CtkHIfkt.js";
import "@headlessui/react";
function PlansCreate({ categories }) {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    budget_type: "monthly",
    start_date: "",
    end_date: "",
    total_amount: "",
    currency: "INR",
    status: "active",
    notes: "",
    allocations: []
  });
  const [allocations, setAllocations] = useState([]);
  const addAllocation = () => {
    setAllocations([...allocations, { budget_category_id: "", allocated_amount: "", notes: "" }]);
  };
  const removeAllocation = (index) => {
    setAllocations(allocations.filter((_, i) => i !== index));
  };
  const updateAllocation = (index, field, value) => {
    const updated = [...allocations];
    updated[index][field] = value;
    setAllocations(updated);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("budget.plans.store"), {
      ...data,
      allocations
    });
  };
  const totalAllocated = allocations.reduce((sum, alloc) => sum + (parseFloat(alloc.allocated_amount) || 0), 0);
  const remaining = (parseFloat(data.total_amount) || 0) - totalAllocated;
  return /* @__PURE__ */ jsxs(
    BudgetLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Create Budget Plan" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Create Budget Plan" }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Basic Details" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Plan Name *" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: data.name,
                    onChange: (e) => setData("name", e.target.value),
                    className: "w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                    placeholder: "e.g., December 2025 Budget",
                    required: true
                  }
                ),
                errors.name && /* @__PURE__ */ jsx("p", { className: "text-red-600 text-sm mt-1", children: errors.name })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Budget Type *" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: data.budget_type,
                    onChange: (e) => setData("budget_type", e.target.value),
                    className: "w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "monthly", children: "Monthly" }),
                      /* @__PURE__ */ jsx("option", { value: "daily", children: "Daily" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Status *" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: data.status,
                    onChange: (e) => setData("status", e.target.value),
                    className: "w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "active", children: "Active" }),
                      /* @__PURE__ */ jsx("option", { value: "completed", children: "Completed" }),
                      /* @__PURE__ */ jsx("option", { value: "cancelled", children: "Cancelled" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Start Date *" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "date",
                    value: data.start_date,
                    onChange: (e) => setData("start_date", e.target.value),
                    className: "w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "End Date *" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "date",
                    value: data.end_date,
                    onChange: (e) => setData("end_date", e.target.value),
                    className: "w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Total Amount *" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    step: "0.01",
                    value: data.total_amount,
                    onChange: (e) => setData("total_amount", e.target.value),
                    className: "w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                    placeholder: "0.00",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Currency" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: data.currency,
                    onChange: (e) => setData("currency", e.target.value),
                    className: "w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                    maxLength: "3"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Notes" }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    value: data.notes,
                    onChange: (e) => setData("notes", e.target.value),
                    rows: "3",
                    className: "w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Category Allocations" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: addAllocation,
                  className: "px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium",
                  children: "Add Category"
                }
              )
            ] }),
            allocations.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              allocations.map((alloc, index) => /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-start", children: [
                /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: alloc.budget_category_id,
                    onChange: (e) => updateAllocation(index, "budget_category_id", e.target.value),
                    className: "w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                    required: true,
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "", children: "Select Category..." }),
                      categories.map((cat) => /* @__PURE__ */ jsx("option", { value: cat.id, children: cat.name }, cat.id))
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsx("div", { className: "w-32", children: /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    step: "0.01",
                    value: alloc.allocated_amount,
                    onChange: (e) => updateAllocation(index, "allocated_amount", e.target.value),
                    className: "w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                    placeholder: "Amount",
                    required: true
                  }
                ) }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => removeAllocation(index),
                    className: "px-3 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200",
                    children: "Remove"
                  }
                )
              ] }, index)),
              /* @__PURE__ */ jsxs("div", { className: "mt-4 p-4 bg-gray-50 rounded-md", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsx("span", { children: "Total Allocated:" }),
                  /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
                    "₹",
                    totalAllocated.toLocaleString("en-IN")
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm mt-1", children: [
                  /* @__PURE__ */ jsx("span", { children: "Remaining:" }),
                  /* @__PURE__ */ jsxs("span", { className: `font-semibold ${remaining < 0 ? "text-red-600" : "text-green-600"}`, children: [
                    "₹",
                    remaining.toLocaleString("en-IN")
                  ] })
                ] })
              ] })
            ] }) : /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-center py-4", children: "No allocations added yet" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: processing,
                className: "px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium disabled:opacity-50",
                children: "Create Plan"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => router.visit("/budget/plans"),
                className: "px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 font-medium",
                children: "Cancel"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  PlansCreate as default
};
