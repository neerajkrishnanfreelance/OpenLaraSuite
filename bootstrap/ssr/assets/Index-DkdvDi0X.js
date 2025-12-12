import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-CHmnEReh.js";
import { useForm, Head, router } from "@inertiajs/react";
import { useState } from "react";
import { Search, Edit2, Trash2, X, Plus } from "lucide-react";
import "./ApplicationLogo-CtkHIfkt.js";
import "@headlessui/react";
function FoodItemsIndex({ auth, foodItems, filters }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState(filters.search || "");
  const { data, setData, post, put, processing, reset } = useForm({
    name: "",
    brand: "",
    serving_size: "",
    serving_unit: "g",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
    fiber: "",
    sugar: "",
    sodium: "",
    category: "other"
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      put(`/health/food-items/${editingItem.id}`, {
        onSuccess: () => {
          setShowAddModal(false);
          setEditingItem(null);
          reset();
        }
      });
    } else {
      post("/health/food-items", {
        onSuccess: () => {
          setShowAddModal(false);
          reset();
        }
      });
    }
  };
  const handleDelete = (itemId) => {
    if (confirm("Are you sure you want to delete this food item?")) {
      router.delete(`/health/food-items/${itemId}`);
    }
  };
  const handleEdit = (item) => {
    setEditingItem(item);
    setData({
      name: item.name,
      brand: item.brand || "",
      serving_size: item.serving_size,
      serving_unit: item.serving_unit,
      calories: item.calories,
      protein: item.protein,
      carbs: item.carbs,
      fats: item.fats,
      fiber: item.fiber,
      sugar: item.sugar,
      sodium: item.sodium,
      category: item.category || "other"
    });
    setShowAddModal(true);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    router.get("/health/food-items", { search: searchQuery }, { preserveState: true });
  };
  const categories = [
    "fruits",
    "vegetables",
    "protein",
    "grains",
    "dairy",
    "snacks",
    "beverages",
    "other"
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Food Database" }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              setEditingItem(null);
              reset();
              setShowAddModal(true);
            },
            className: "px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
              "Add Food Item"
            ]
          }
        )
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Food Database" }),
        /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-4 mb-6", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSearch, className: "flex gap-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1 relative", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: searchQuery,
                  onChange: (e) => setSearchQuery(e.target.value),
                  placeholder: "Search food items...",
                  className: "w-full px-4 py-2 border border-gray-300 rounded-md pr-10"
                }
              ),
              /* @__PURE__ */ jsx(Search, { className: "absolute right-3 top-2.5 w-5 h-5 text-gray-400" })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                className: "px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700",
                children: "Search"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow overflow-hidden", children: [
            /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
              /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Food Item" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Serving" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Calories" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Protein" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Carbs" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Fats" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Category" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: foodItems.data.map((item) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900", children: item.name }),
                  item.brand && /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: item.brand })
                ] }) }),
                /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: [
                  item.serving_size,
                  item.serving_unit
                ] }),
                /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: [
                  Math.round(item.calories),
                  " kcal"
                ] }),
                /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: [
                  Math.round(item.protein),
                  "g"
                ] }),
                /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: [
                  Math.round(item.carbs),
                  "g"
                ] }),
                /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: [
                  Math.round(item.fats),
                  "g"
                ] }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("span", { className: "px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full capitalize", children: item.category }) }),
                /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => handleEdit(item),
                      className: "text-blue-600 hover:text-blue-900 mr-3",
                      children: /* @__PURE__ */ jsx(Edit2, { className: "w-4 h-4 inline" })
                    }
                  ),
                  item.is_custom && /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => handleDelete(item.id),
                      className: "text-red-600 hover:text-red-900",
                      children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4 inline" })
                    }
                  )
                ] })
              ] }, item.id)) })
            ] }),
            foodItems.links && /* @__PURE__ */ jsx("div", { className: "bg-white px-4 py-3 border-t border-gray-200 sm:px-6", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-700", children: [
                "Showing ",
                foodItems.from,
                " to ",
                foodItems.to,
                " of ",
                foodItems.total,
                " results"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: foodItems.links.map((link, index) => /* @__PURE__ */ jsx(
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
        ] }) }),
        showAddModal && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: editingItem ? "Edit Food Item" : "Add Food Item" }),
            /* @__PURE__ */ jsx("button", { onClick: () => {
              setShowAddModal(false);
              setEditingItem(null);
              reset();
            }, children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }) })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Name *" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: data.name,
                    onChange: (e) => setData("name", e.target.value),
                    className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Brand" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: data.brand,
                    onChange: (e) => setData("brand", e.target.value),
                    className: "w-full px-3 py-2 border border-gray-300 rounded-md"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Serving Size *" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    step: "0.1",
                    min: "0",
                    value: data.serving_size,
                    onChange: (e) => setData("serving_size", e.target.value),
                    className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Unit *" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: data.serving_unit,
                    onChange: (e) => setData("serving_unit", e.target.value),
                    className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                    required: true,
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "g", children: "grams (g)" }),
                      /* @__PURE__ */ jsx("option", { value: "ml", children: "milliliters (ml)" }),
                      /* @__PURE__ */ jsx("option", { value: "cup", children: "cup" }),
                      /* @__PURE__ */ jsx("option", { value: "tbsp", children: "tablespoon" }),
                      /* @__PURE__ */ jsx("option", { value: "tsp", children: "teaspoon" }),
                      /* @__PURE__ */ jsx("option", { value: "piece", children: "piece" }),
                      /* @__PURE__ */ jsx("option", { value: "slice", children: "slice" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Category" }),
                /* @__PURE__ */ jsx(
                  "select",
                  {
                    value: data.category,
                    onChange: (e) => setData("category", e.target.value),
                    className: "w-full px-3 py-2 border border-gray-300 rounded-md capitalize",
                    children: categories.map((cat) => /* @__PURE__ */ jsx("option", { value: cat, className: "capitalize", children: cat }, cat))
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "border-t pt-4", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold text-gray-900 mb-3", children: "Nutrition Information (per serving)" }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Calories (kcal) *" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "number",
                      step: "0.1",
                      min: "0",
                      value: data.calories,
                      onChange: (e) => setData("calories", e.target.value),
                      className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                      required: true
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Protein (g)" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "number",
                      step: "0.1",
                      min: "0",
                      value: data.protein,
                      onChange: (e) => setData("protein", e.target.value),
                      className: "w-full px-3 py-2 border border-gray-300 rounded-md"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Carbs (g)" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "number",
                      step: "0.1",
                      min: "0",
                      value: data.carbs,
                      onChange: (e) => setData("carbs", e.target.value),
                      className: "w-full px-3 py-2 border border-gray-300 rounded-md"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Fats (g)" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "number",
                      step: "0.1",
                      min: "0",
                      value: data.fats,
                      onChange: (e) => setData("fats", e.target.value),
                      className: "w-full px-3 py-2 border border-gray-300 rounded-md"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Fiber (g)" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "number",
                      step: "0.1",
                      min: "0",
                      value: data.fiber,
                      onChange: (e) => setData("fiber", e.target.value),
                      className: "w-full px-3 py-2 border border-gray-300 rounded-md"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Sugar (g)" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "number",
                      step: "0.1",
                      min: "0",
                      value: data.sugar,
                      onChange: (e) => setData("sugar", e.target.value),
                      className: "w-full px-3 py-2 border border-gray-300 rounded-md"
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2 pt-4", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: processing,
                  className: "flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-300",
                  children: editingItem ? "Update" : "Add Food Item"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setShowAddModal(false);
                    setEditingItem(null);
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
  FoodItemsIndex as default
};
