import { jsxs, jsx } from "react/jsx-runtime";
import { B as BudgetLayout } from "./BudgetLayout-CF9Cdd68.js";
import { useForm, Head } from "@inertiajs/react";
import { Tag, Edit2, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import "./AuthenticatedLayout-CHmnEReh.js";
import "./ApplicationLogo-CtkHIfkt.js";
import "@headlessui/react";
function CategoriesIndex({ categories }) {
  const [editingCategory, setEditingCategory] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
    name: "",
    description: "",
    color: "#3B82F6",
    icon: "DollarSign",
    is_active: true
  });
  const handleCreate = (e) => {
    e.preventDefault();
    post("/budget/categories", {
      onSuccess: () => {
        reset();
        setShowCreateForm(false);
      }
    });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    put(`/budget/categories/${editingCategory.id}`, {
      onSuccess: () => {
        reset();
        setEditingCategory(null);
      }
    });
  };
  const handleDelete = (category) => {
    if (confirm(`Are you sure you want to delete "${category.name}"?`)) {
      destroy(`/budget/categories/${category.id}`);
    }
  };
  const startEdit = (category) => {
    setData({
      name: category.name,
      description: category.description || "",
      color: category.color,
      icon: category.icon,
      is_active: category.is_active
    });
    setEditingCategory(category);
    setShowCreateForm(false);
  };
  const iconOptions = [
    "DollarSign",
    "ShoppingCart",
    "Home",
    "Car",
    "Utensils",
    "Coffee",
    "Smartphone",
    "Tv",
    "Heart",
    "Briefcase",
    "GraduationCap",
    "Plane",
    "Gift",
    "Music",
    "Film",
    "Book",
    "Zap",
    "Droplet"
  ];
  const colorOptions = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
    "#14B8A6",
    "#F97316",
    "#06B6D4",
    "#84CC16"
  ];
  return /* @__PURE__ */ jsxs(
    BudgetLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Budget Categories" }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              setShowCreateForm(!showCreateForm);
              setEditingCategory(null);
              reset();
            },
            className: "px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
              "New Category"
            ]
          }
        )
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Budget Categories" }),
        (showCreateForm || editingCategory) && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6 mb-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: editingCategory ? "Edit Category" : "Create Category" }),
          /* @__PURE__ */ jsxs("form", { onSubmit: editingCategory ? handleUpdate : handleCreate, className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Name *" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: data.name,
                    onChange: (e) => setData("name", e.target.value),
                    className: "w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                    required: true
                  }
                ),
                errors.name && /* @__PURE__ */ jsx("p", { className: "text-red-600 text-sm mt-1", children: errors.name })
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
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Color" }),
                /* @__PURE__ */ jsx("div", { className: "flex gap-2 flex-wrap", children: colorOptions.map((color) => /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setData("color", color),
                    className: `w-8 h-8 rounded-full border-2 ${data.color === color ? "border-gray-900" : "border-gray-300"}`,
                    style: { backgroundColor: color }
                  },
                  color
                )) })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Icon" }),
                /* @__PURE__ */ jsx(
                  "select",
                  {
                    value: data.icon,
                    onChange: (e) => setData("icon", e.target.value),
                    className: "w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                    children: iconOptions.map((icon) => /* @__PURE__ */ jsx("option", { value: icon, children: icon }, icon))
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data.is_active,
                  onChange: (e) => setData("is_active", e.target.checked),
                  className: "rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                }
              ),
              /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-gray-700", children: "Active" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: processing,
                  className: "px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium disabled:opacity-50",
                  children: editingCategory ? "Update" : "Create"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setEditingCategory(null);
                    setShowCreateForm(false);
                    reset();
                  },
                  className: "px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 font-medium",
                  children: "Cancel"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "p-6 border-b border-gray-200", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "All Categories" }) }),
          /* @__PURE__ */ jsx("div", { className: "divide-y divide-gray-200", children: categories.length > 0 ? categories.map((category) => /* @__PURE__ */ jsxs("div", { className: "p-4 hover:bg-gray-50 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-12 h-12 rounded-lg flex items-center justify-center",
                  style: { backgroundColor: category.color + "20" },
                  children: /* @__PURE__ */ jsx(Tag, { className: "w-6 h-6", style: { color: category.color } })
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "font-medium text-gray-900", children: category.name }),
                category.description && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: category.description }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mt-1", children: [
                  category.entries_count,
                  " entries",
                  !category.is_active && " • Inactive"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => startEdit(category),
                  className: "p-2 text-indigo-600 hover:bg-indigo-50 rounded-md",
                  children: /* @__PURE__ */ jsx(Edit2, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleDelete(category),
                  className: "p-2 text-red-600 hover:bg-red-50 rounded-md",
                  disabled: category.entries_count > 0,
                  title: category.entries_count > 0 ? "Cannot delete category with entries" : "Delete category",
                  children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                }
              )
            ] })
          ] }, category.id)) : /* @__PURE__ */ jsx("div", { className: "p-8 text-center text-gray-500", children: "No categories yet. Create your first category to get started!" }) })
        ] })
      ]
    }
  );
}
export {
  CategoriesIndex as default
};
