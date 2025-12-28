import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DksizGbA.js";
import { useForm, Head } from "@inertiajs/react";
import { useState } from "react";
import { Tag, Edit2, Trash2, X, Plus } from "lucide-react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function TodoCategories({ auth, categories }) {
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const { data, setData, post, put, processing, reset } = useForm({
    name: "",
    color: "#3b82f6",
    icon: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      put(`/todos/categories/${editingCategory.id}`, {
        onSuccess: () => {
          setShowModal(false);
          setEditingCategory(null);
          reset();
        }
      });
    } else {
      post("/todos/categories", {
        onSuccess: () => {
          setShowModal(false);
          reset();
        }
      });
    }
  };
  const handleEdit = (category) => {
    setEditingCategory(category);
    setData({
      name: category.name,
      color: category.color,
      icon: category.icon || ""
    });
    setShowModal(true);
  };
  const handleDelete = (categoryId) => {
    if (confirm("Delete this category? Todos in this category will be uncategorized.")) {
      fetch(`/todos/categories/${categoryId}`, {
        method: "DELETE",
        headers: {
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content
        }
      }).then(() => window.location.reload());
    }
  };
  const predefinedColors = [
    "#3b82f6",
    // Blue
    "#ef4444",
    // Red
    "#10b981",
    // Green
    "#f59e0b",
    // Yellow
    "#8b5cf6",
    // Purple
    "#ec4899",
    // Pink
    "#06b6d4",
    // Cyan
    "#f97316"
    // Orange
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Todo Categories" }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              setEditingCategory(null);
              reset();
              setShowModal(true);
            },
            className: "px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
              "New Category"
            ]
          }
        )
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Todo Categories" }),
        /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: categories.length > 0 ? categories.map((category) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-12 h-12 rounded-lg flex items-center justify-center",
                  style: { backgroundColor: category.color + "20" },
                  children: /* @__PURE__ */ jsx(Tag, { className: "w-6 h-6", style: { color: category.color } })
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900", children: category.name }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
                  category.todos_count || 0,
                  " active todos"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleEdit(category),
                  className: "p-2 text-blue-600 hover:bg-blue-50 rounded",
                  children: /* @__PURE__ */ jsx(Edit2, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleDelete(category.id),
                  className: "p-2 text-red-600 hover:bg-red-50 rounded",
                  children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "w-6 h-6 rounded border-2 border-gray-200",
                style: { backgroundColor: category.color }
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: category.color })
          ] })
        ] }, category.id)) : /* @__PURE__ */ jsxs("div", { className: "col-span-full bg-white rounded-lg shadow p-12 text-center", children: [
          /* @__PURE__ */ jsx(Tag, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-4", children: "No categories yet" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setShowModal(true),
              className: "px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700",
              children: "Create Your First Category"
            }
          )
        ] }) }) }) }),
        showModal && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-6 w-full max-w-md", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: editingCategory ? "Edit Category" : "New Category" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => {
                  setShowModal(false);
                  setEditingCategory(null);
                  reset();
                },
                children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Category Name *" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: data.name,
                  onChange: (e) => setData("name", e.target.value),
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                  placeholder: "e.g., Personal, Work, Shopping",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Color *" }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-2 mb-3", children: predefinedColors.map((color) => /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setData("color", color),
                  className: `w-full h-10 rounded-md border-2 ${data.color === color ? "border-gray-900" : "border-gray-200"}`,
                  style: { backgroundColor: color }
                },
                color
              )) }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "color",
                    value: data.color,
                    onChange: (e) => setData("color", e.target.value),
                    className: "h-10 w-20 rounded border border-gray-300"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: data.color,
                    onChange: (e) => setData("color", e.target.value),
                    className: "flex-1 px-3 py-2 border border-gray-300 rounded-md",
                    placeholder: "#3b82f6"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 bg-gray-50 rounded-md", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-2", children: "Preview:" }),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: "inline-block px-3 py-1 rounded-full text-sm font-medium",
                  style: { backgroundColor: data.color + "20", color: data.color },
                  children: data.name || "Category Name"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2 pt-4", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: processing,
                  className: "flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-300",
                  children: editingCategory ? "Update" : "Create"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setShowModal(false);
                    setEditingCategory(null);
                    reset();
                  },
                  className: "px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300",
                  children: "Cancel"
                }
              )
            ] })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  TodoCategories as default
};
