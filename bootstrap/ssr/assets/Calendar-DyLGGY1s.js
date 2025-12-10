import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { B as BudgetLayout } from "./BudgetLayout-V7LV_fqb.js";
import { useForm, Head } from "@inertiajs/react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./AuthenticatedLayout-DqVvfPrE.js";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function EntriesCalendar({ entries, currentMonth, categories, plans }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [month, setMonth] = useState(currentMonth);
  const { data, setData, post, processing, reset } = useForm({
    budget_plan_id: "",
    budget_category_id: "",
    entry_date: "",
    amount: "",
    description: "",
    payment_method: "cash"
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/budget/entries", {
      onSuccess: () => {
        reset();
        setSelectedDate(null);
      }
    });
  };
  const getDaysInMonth = () => {
    const [year, monthNum] = month.split("-");
    const date = new Date(year, monthNum - 1, 1);
    const days2 = [];
    const firstDay = date.getDay();
    const daysInMonth = new Date(year, monthNum, 0).getDate();
    for (let i = 0; i < firstDay; i++) {
      days2.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days2.push(day);
    }
    return days2;
  };
  const getEntriesForDate = (day) => {
    if (!day) return [];
    const dateStr = `${month}-${String(day).padStart(2, "0")}`;
    return entries[dateStr] || [];
  };
  const getTotalForDate = (day) => {
    const dayEntries = getEntriesForDate(day);
    return dayEntries.reduce((sum, entry) => sum + parseFloat(entry.amount), 0);
  };
  const changeMonth = (delta) => {
    const [year, monthNum] = month.split("-");
    const newDate = new Date(year, monthNum - 1 + delta, 1);
    const newMonth = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, "0")}`;
    window.location.href = `/budget/entries/calendar?month=${newMonth}`;
  };
  const days = getDaysInMonth();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return /* @__PURE__ */ jsxs(
    BudgetLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Daily Entries Calendar" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Budget Calendar" }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => changeMonth(-1),
                className: "p-2 hover:bg-gray-100 rounded-md",
                children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900", children: (/* @__PURE__ */ new Date(month + "-01")).toLocaleDateString("en-IN", { month: "long", year: "numeric" }) }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => changeMonth(1),
                className: "p-2 hover:bg-gray-100 rounded-md",
                children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-7 gap-2", children: [
            weekDays.map((day) => /* @__PURE__ */ jsx("div", { className: "text-center text-sm font-medium text-gray-600 py-2", children: day }, day)),
            days.map((day, index) => {
              const dayEntries = getEntriesForDate(day);
              const total = getTotalForDate(day);
              const dateStr = day ? `${month}-${String(day).padStart(2, "0")}` : null;
              const isToday = dateStr === (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
              return /* @__PURE__ */ jsx(
                "div",
                {
                  className: `min-h-24 border rounded-lg p-2 ${day ? "cursor-pointer hover:bg-gray-50" : "bg-gray-50"} ${isToday ? "border-indigo-500 border-2" : "border-gray-200"}`,
                  onClick: () => {
                    if (day) {
                      setSelectedDate(dateStr);
                      setData("entry_date", dateStr);
                    }
                  },
                  children: day && /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900 mb-1", children: day }),
                    dayEntries.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsxs("div", { className: "text-xs font-semibold text-red-600 mb-1", children: [
                        "-₹",
                        total.toLocaleString("en-IN")
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
                        dayEntries.slice(0, 2).map((entry) => /* @__PURE__ */ jsxs(
                          "div",
                          {
                            className: "text-xs truncate",
                            style: { color: entry.budget_category.color },
                            children: [
                              "• ",
                              entry.budget_category.name
                            ]
                          },
                          entry.id
                        )),
                        dayEntries.length > 2 && /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500", children: [
                          "+",
                          dayEntries.length - 2,
                          " more"
                        ] })
                      ] })
                    ] })
                  ] })
                },
                index
              );
            })
          ] })
        ] }),
        selectedDate && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-xl max-w-md w-full p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold text-gray-900", children: [
              "Add Entry for ",
              new Date(selectedDate).toLocaleDateString("en-IN")
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setSelectedDate(null),
                className: "text-gray-400 hover:text-gray-600",
                children: "✕"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Budget Plan" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: data.budget_plan_id,
                  onChange: (e) => setData("budget_plan_id", e.target.value),
                  className: "w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "None" }),
                    plans.map((plan) => /* @__PURE__ */ jsx("option", { value: plan.id, children: plan.name }, plan.id))
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Category *" }),
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
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Amount *" }),
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
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: processing,
                  className: "flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium disabled:opacity-50",
                  children: "Add Entry"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setSelectedDate(null),
                  className: "px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 font-medium",
                  children: "Cancel"
                }
              )
            ] })
          ] }),
          getEntriesForDate(new Date(selectedDate).getDate()).length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-6 pt-6 border-t border-gray-200", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold text-gray-900 mb-3", children: "Entries for this day:" }),
            /* @__PURE__ */ jsx("div", { className: "space-y-2", children: getEntriesForDate(new Date(selectedDate).getDate()).map((entry) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-sm", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "w-2 h-2 rounded-full",
                    style: { backgroundColor: entry.budget_category.color }
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "text-gray-900", children: entry.budget_category.name })
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "font-semibold text-red-600", children: [
                "-₹",
                parseFloat(entry.amount).toLocaleString("en-IN")
              ] })
            ] }, entry.id)) })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  EntriesCalendar as default
};
