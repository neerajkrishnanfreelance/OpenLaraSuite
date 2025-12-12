import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-__gkNP0U.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { Plus, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { useState } from "react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function TodoDashboard({
  auth,
  todayTodos,
  overdueTodos,
  upcomingTodos,
  stats,
  categories
}) {
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const { data, setData, post, processing, reset } = useForm({
    title: "",
    due_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    priority: "medium"
  });
  const handleQuickAdd = (e) => {
    e.preventDefault();
    post("/todos", {
      onSuccess: () => {
        reset();
        setShowQuickAdd(false);
      }
    });
  };
  const StatCard = ({ icon: Icon, title, value, color }) => /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-1", children: title }),
      /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-gray-900", children: value })
    ] }),
    /* @__PURE__ */ jsx("div", { className: `p-3 rounded-lg bg-${color}-100`, children: /* @__PURE__ */ jsx(Icon, { className: `w-8 h-8 text-${color}-600` }) })
  ] }) });
  const TodoItem = ({ todo, showDate = false }) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "checkbox",
        checked: todo.is_completed,
        onChange: () => {
          fetch(`/todos/${todo.id}/toggle`, {
            method: "POST",
            headers: {
              "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content,
              "Content-Type": "application/json"
            }
          }).then(() => window.location.reload());
        },
        className: "mt-1 h-5 w-5 rounded border-gray-300"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsx("p", { className: `font-medium ${todo.is_completed ? "line-through text-gray-400" : "text-gray-900"}`, children: todo.title }),
      showDate && todo.due_date && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: new Date(todo.due_date).toLocaleDateString() }),
      todo.category && /* @__PURE__ */ jsx(
        "span",
        {
          className: "inline-block mt-1 px-2 py-1 text-xs rounded-full",
          style: { backgroundColor: todo.category.color + "20", color: todo.category.color },
          children: todo.category.name
        }
      )
    ] }),
    /* @__PURE__ */ jsx("span", { className: `px-2 py-1 text-xs rounded-full ${todo.priority === "high" ? "bg-red-100 text-red-700" : todo.priority === "medium" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`, children: todo.priority })
  ] });
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Todo Dashboard" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/todos/calendar",
              className: "px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium",
              children: "Calendar View"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/todos/list",
              className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium",
              children: "List View"
            }
          )
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Todo Dashboard" }),
        /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-4 mb-6", children: !showQuickAdd ? /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setShowQuickAdd(true),
              className: "w-full flex items-center gap-2 text-gray-600 hover:text-gray-900",
              children: [
                /* @__PURE__ */ jsx(Plus, { className: "w-5 h-5" }),
                /* @__PURE__ */ jsx("span", { children: "Quick add a todo..." })
              ]
            }
          ) : /* @__PURE__ */ jsxs("form", { onSubmit: handleQuickAdd, className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.title,
                onChange: (e) => setData("title", e.target.value),
                placeholder: "What needs to be done?",
                className: "flex-1 px-3 py-2 border border-gray-300 rounded-md",
                autoFocus: true,
                required: true
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "date",
                value: data.due_date,
                onChange: (e) => setData("due_date", e.target.value),
                className: "px-3 py-2 border border-gray-300 rounded-md"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: processing,
                className: "px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700",
                children: "Add"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setShowQuickAdd(false);
                  reset();
                },
                className: "px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300",
                children: "Cancel"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-8", children: [
            /* @__PURE__ */ jsx(StatCard, { icon: CheckCircle2, title: "Total Todos", value: stats.total, color: "blue" }),
            /* @__PURE__ */ jsx(StatCard, { icon: CheckCircle2, title: "Completed", value: stats.completed, color: "green" }),
            /* @__PURE__ */ jsx(StatCard, { icon: Clock, title: "Pending", value: stats.pending, color: "yellow" }),
            /* @__PURE__ */ jsx(StatCard, { icon: AlertCircle, title: "Completion Rate", value: `${stats.completion_rate}%`, color: "purple" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
            overdueTodos.length > 0 && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow", children: [
              /* @__PURE__ */ jsx("div", { className: "p-4 border-b border-gray-200 bg-red-50", children: /* @__PURE__ */ jsxs("h3", { className: "font-semibold text-red-900 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5" }),
                "Overdue (",
                overdueTodos.length,
                ")"
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "p-4 space-y-2", children: overdueTodos.map((todo) => /* @__PURE__ */ jsx(TodoItem, { todo, showDate: true }, todo.id)) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow", children: [
              /* @__PURE__ */ jsx("div", { className: "p-4 border-b border-gray-200", children: /* @__PURE__ */ jsxs("h3", { className: "font-semibold text-gray-900", children: [
                "Today (",
                todayTodos.length,
                ")"
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "p-4 space-y-2", children: todayTodos.length > 0 ? todayTodos.map((todo) => /* @__PURE__ */ jsx(TodoItem, { todo }, todo.id)) : /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500 py-8", children: "No todos for today" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow", children: [
              /* @__PURE__ */ jsx("div", { className: "p-4 border-b border-gray-200", children: /* @__PURE__ */ jsxs("h3", { className: "font-semibold text-gray-900", children: [
                "Upcoming (",
                upcomingTodos.length,
                ")"
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "p-4 space-y-2", children: upcomingTodos.length > 0 ? upcomingTodos.map((todo) => /* @__PURE__ */ jsx(TodoItem, { todo, showDate: true }, todo.id)) : /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500 py-8", children: "No upcoming todos" }) })
            ] })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  TodoDashboard as default
};
