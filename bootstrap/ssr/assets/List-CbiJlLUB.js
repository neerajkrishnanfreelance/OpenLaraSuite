import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DqVvfPrE.js";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import { Search, Trash2 } from "lucide-react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function TodoList({ auth, todos, categories, filters }) {
  const [selectedTodos, setSelectedTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState(filters.search || "");
  const [filterData, setFilterData] = useState({
    category_id: filters.category_id || "",
    priority: filters.priority || "",
    status: filters.status || "",
    sort_by: filters.sort_by || "due_date",
    sort_order: filters.sort_order || "asc"
  });
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filterData, [key]: value, search: searchQuery };
    setFilterData({ ...filterData, [key]: value });
    router.get("/todos/list", newFilters, { preserveState: true, replace: true });
  };
  const handleSearch = (e) => {
    e.preventDefault();
    router.get("/todos/list", { ...filterData, search: searchQuery }, { preserveState: true, replace: true });
  };
  const handleToggleComplete = (todoId, isCompleted) => {
    fetch(`/todos/${todoId}/toggle`, {
      method: "POST",
      headers: {
        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content,
        "Content-Type": "application/json"
      }
    }).then(() => window.location.reload());
  };
  const handleBulkDelete = () => {
    if (selectedTodos.length === 0) return;
    if (!confirm(`Delete ${selectedTodos.length} selected todos?`)) return;
    fetch("/todos/bulk-delete", {
      method: "POST",
      headers: {
        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ todo_ids: selectedTodos })
    }).then(() => {
      setSelectedTodos([]);
      window.location.reload();
    });
  };
  const toggleSelectAll = () => {
    if (selectedTodos.length === todos.data.length) {
      setSelectedTodos([]);
    } else {
      setSelectedTodos(todos.data.map((t) => t.id));
    }
  };
  const toggleSelect = (todoId) => {
    if (selectedTodos.includes(todoId)) {
      setSelectedTodos(selectedTodos.filter((id) => id !== todoId));
    } else {
      setSelectedTodos([...selectedTodos, todoId]);
    }
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Todo List" }),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/todos",
            className: "px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium",
            children: "Dashboard"
          }
        )
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Todo List" }),
        /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-4 mb-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 items-end", children: [
              /* @__PURE__ */ jsxs("form", { onSubmit: handleSearch, className: "flex-1 min-w-[200px]", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Search" }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: searchQuery,
                        onChange: (e) => setSearchQuery(e.target.value),
                        placeholder: "Search todos...",
                        className: "w-full px-3 py-2 border border-gray-300 rounded-md pr-10"
                      }
                    ),
                    /* @__PURE__ */ jsx(Search, { className: "absolute right-3 top-2.5 w-5 h-5 text-gray-400" })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "submit",
                      className: "px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700",
                      children: "Search"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-[150px]", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Category" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: filterData.category_id,
                    onChange: (e) => handleFilterChange("category_id", e.target.value),
                    className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "", children: "All Categories" }),
                      categories.map((cat) => /* @__PURE__ */ jsx("option", { value: cat.id, children: cat.name }, cat.id))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-[150px]", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Priority" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: filterData.priority,
                    onChange: (e) => handleFilterChange("priority", e.target.value),
                    className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "", children: "All Priorities" }),
                      /* @__PURE__ */ jsx("option", { value: "low", children: "Low" }),
                      /* @__PURE__ */ jsx("option", { value: "medium", children: "Medium" }),
                      /* @__PURE__ */ jsx("option", { value: "high", children: "High" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-[150px]", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Status" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: filterData.status,
                    onChange: (e) => handleFilterChange("status", e.target.value),
                    className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "", children: "All Status" }),
                      /* @__PURE__ */ jsx("option", { value: "pending", children: "Pending" }),
                      /* @__PURE__ */ jsx("option", { value: "completed", children: "Completed" }),
                      /* @__PURE__ */ jsx("option", { value: "overdue", children: "Overdue" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-[150px]", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Sort By" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: filterData.sort_by,
                    onChange: (e) => handleFilterChange("sort_by", e.target.value),
                    className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "due_date", children: "Due Date" }),
                      /* @__PURE__ */ jsx("option", { value: "priority", children: "Priority" }),
                      /* @__PURE__ */ jsx("option", { value: "created_at", children: "Created Date" }),
                      /* @__PURE__ */ jsx("option", { value: "title", children: "Title" })
                    ]
                  }
                )
              ] })
            ] }),
            selectedTodos.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center gap-4 p-3 bg-indigo-50 rounded-md", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium text-indigo-900", children: [
                selectedTodos.length,
                " selected"
              ] }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: handleBulkDelete,
                  className: "px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" }),
                    "Delete Selected"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow overflow-hidden", children: [
            /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
              /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left", children: /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: selectedTodos.length === todos.data.length && todos.data.length > 0,
                    onChange: toggleSelectAll,
                    className: "h-4 w-4 rounded border-gray-300"
                  }
                ) }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Done" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Title" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Category" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Priority" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Due Date" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Status" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: todos.data.length > 0 ? todos.data.map((todo) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: selectedTodos.includes(todo.id),
                    onChange: () => toggleSelect(todo.id),
                    className: "h-4 w-4 rounded border-gray-300"
                  }
                ) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: todo.is_completed,
                    onChange: () => handleToggleComplete(todo.id, todo.is_completed),
                    className: "h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  }
                ) }),
                /* @__PURE__ */ jsxs("td", { className: "px-6 py-4", children: [
                  /* @__PURE__ */ jsx("p", { className: `font-medium ${todo.is_completed ? "line-through text-gray-400" : "text-gray-900"}`, children: todo.title }),
                  todo.description && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1", children: todo.description })
                ] }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: todo.category ? /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "px-2 py-1 text-xs rounded-full",
                    style: { backgroundColor: todo.category.color + "20", color: todo.category.color },
                    children: todo.category.name
                  }
                ) : /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-sm", children: "-" }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: `px-2 py-1 text-xs rounded-full ${todo.priority === "high" ? "bg-red-100 text-red-700" : todo.priority === "medium" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`, children: todo.priority }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm text-gray-900", children: todo.due_date ? new Date(todo.due_date).toLocaleDateString() : "-" }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: `px-2 py-1 text-xs rounded-full ${todo.is_completed ? "bg-green-100 text-green-700" : todo.status === "in_progress" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`, children: todo.is_completed ? "Completed" : todo.status.replace("_", " ") }) })
              ] }, todo.id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "7", className: "px-6 py-12 text-center text-gray-500", children: "No todos found. Try adjusting your filters." }) }) })
            ] }),
            todos.links && /* @__PURE__ */ jsx("div", { className: "bg-white px-4 py-3 border-t border-gray-200 sm:px-6", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-700", children: [
                "Showing ",
                todos.from,
                " to ",
                todos.to,
                " of ",
                todos.total,
                " results"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: todos.links.map((link, index) => /* @__PURE__ */ jsx(
                "a",
                {
                  href: link.url,
                  className: `px-3 py-1 rounded ${link.active ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50 border"} ${!link.url && "opacity-50 cursor-not-allowed"}`,
                  dangerouslySetInnerHTML: { __html: link.label }
                },
                index
              )) })
            ] }) })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  TodoList as default
};
