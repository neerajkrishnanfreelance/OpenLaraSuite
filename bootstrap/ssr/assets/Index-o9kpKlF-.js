import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-C4fftoMV.js";
import { useForm, Head, router } from "@inertiajs/react";
import { useState } from "react";
import { Edit2, Trash2, X, Search, Plus } from "lucide-react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function FoodLogsIndex({ auth, foodLogs, dailyTotals, currentDate }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState("breakfast");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [editingLog, setEditingLog] = useState(null);
  const { data, setData, post, put, processing, reset } = useForm({
    food_item_id: "",
    meal_type: "breakfast",
    servings: 1,
    consumed_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16),
    notes: ""
  });
  const searchFood = async (query) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }
    try {
      const response = await fetch(`/health/food-items/search?q=${encodeURIComponent(query)}`);
      const results = await response.json();
      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingLog) {
      put(`/health/food-logs/${editingLog.id}`, {
        onSuccess: () => {
          setShowAddModal(false);
          setEditingLog(null);
          reset();
        }
      });
    } else {
      post("/health/food-logs", {
        onSuccess: () => {
          setShowAddModal(false);
          reset();
          setSearchResults([]);
        }
      });
    }
  };
  const handleDelete = (logId) => {
    if (confirm("Are you sure you want to delete this food log?")) {
      router.delete(`/health/food-logs/${logId}`);
    }
  };
  const handleEdit = (log) => {
    setEditingLog(log);
    setData({
      food_item_id: log.food_item_id,
      meal_type: log.meal_type,
      servings: log.servings,
      consumed_at: new Date(log.consumed_at).toISOString().slice(0, 16),
      notes: log.notes || ""
    });
    setShowAddModal(true);
  };
  const selectFoodItem = (foodItem) => {
    setData("food_item_id", foodItem.id);
    setSearchQuery(foodItem.name);
    setSearchResults([]);
  };
  const mealTypes = ["breakfast", "lunch", "dinner", "snack"];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Food Logs" }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              setEditingLog(null);
              reset();
              setShowAddModal(true);
            },
            className: "px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
              "Log Food"
            ]
          }
        )
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Food Logs" }),
        /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6 mb-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Today's Nutrition Summary" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-red-600", children: Math.round(dailyTotals.calories) }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Calories" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-blue-600", children: [
                  Math.round(dailyTotals.protein),
                  "g"
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Protein" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-green-600", children: [
                  Math.round(dailyTotals.carbs),
                  "g"
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Carbs" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-yellow-600", children: [
                  Math.round(dailyTotals.fats),
                  "g"
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Fats" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-purple-600", children: [
                  Math.round(dailyTotals.fiber),
                  "g"
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Fiber" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow", children: [
            /* @__PURE__ */ jsx("div", { className: "border-b border-gray-200", children: /* @__PURE__ */ jsx("nav", { className: "flex -mb-px", children: mealTypes.map((type) => /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setSelectedMealType(type),
                className: `px-6 py-3 text-sm font-medium capitalize ${selectedMealType === type ? "border-b-2 border-indigo-600 text-indigo-600" : "text-gray-500 hover:text-gray-700 hover:border-gray-300"}`,
                children: type
              },
              type
            )) }) }),
            /* @__PURE__ */ jsx("div", { className: "p-6", children: foodLogs[selectedMealType]?.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-4", children: foodLogs[selectedMealType].map((log) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-50 rounded-lg", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx("h4", { className: "font-medium text-gray-900", children: log.food_item.name }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
                  log.servings,
                  " × ",
                  log.food_item.serving_size,
                  log.food_item.serving_unit
                ] }),
                log.notes && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1", children: log.notes })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-right mr-4", children: [
                /* @__PURE__ */ jsxs("p", { className: "font-semibold text-gray-900", children: [
                  Math.round(log.total_calories),
                  " kcal"
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
                  "P: ",
                  Math.round(log.total_protein),
                  "g | C: ",
                  Math.round(log.total_carbs),
                  "g | F: ",
                  Math.round(log.total_fats),
                  "g"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleEdit(log),
                    className: "p-2 text-blue-600 hover:bg-blue-50 rounded",
                    children: /* @__PURE__ */ jsx(Edit2, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleDelete(log.id),
                    className: "p-2 text-red-600 hover:bg-red-50 rounded",
                    children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                  }
                )
              ] })
            ] }, log.id)) }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-12 text-gray-500", children: [
              "No food logged for ",
              selectedMealType,
              " yet."
            ] }) })
          ] })
        ] }) }),
        showAddModal && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-6 w-full max-w-md", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: editingLog ? "Edit Food Log" : "Log Food" }),
            /* @__PURE__ */ jsx("button", { onClick: () => {
              setShowAddModal(false);
              setEditingLog(null);
              reset();
            }, children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }) })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
            !editingLog && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Search Food" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: searchQuery,
                    onChange: (e) => {
                      setSearchQuery(e.target.value);
                      searchFood(e.target.value);
                    },
                    className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                    placeholder: "Search for food..."
                  }
                ),
                /* @__PURE__ */ jsx(Search, { className: "absolute right-3 top-2.5 w-5 h-5 text-gray-400" })
              ] }),
              searchResults.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-2 max-h-48 overflow-y-auto border border-gray-200 rounded-md", children: searchResults.map((item) => /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => selectFoodItem(item),
                  className: "w-full text-left px-3 py-2 hover:bg-gray-50 border-b border-gray-100",
                  children: [
                    /* @__PURE__ */ jsx("p", { className: "font-medium", children: item.name }),
                    /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
                      item.calories,
                      " kcal per ",
                      item.serving_size,
                      item.serving_unit
                    ] })
                  ]
                },
                item.id
              )) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Meal Type" }),
              /* @__PURE__ */ jsx(
                "select",
                {
                  value: data.meal_type,
                  onChange: (e) => setData("meal_type", e.target.value),
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                  children: mealTypes.map((type) => /* @__PURE__ */ jsx("option", { value: type, className: "capitalize", children: type }, type))
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Servings" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  step: "0.1",
                  min: "0.1",
                  value: data.servings,
                  onChange: (e) => setData("servings", e.target.value),
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Time" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "datetime-local",
                  value: data.consumed_at,
                  onChange: (e) => setData("consumed_at", e.target.value),
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Notes (Optional)" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  value: data.notes,
                  onChange: (e) => setData("notes", e.target.value),
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                  rows: "2"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: processing || !editingLog && !data.food_item_id,
                  className: "flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-300",
                  children: editingLog ? "Update" : "Log Food"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setShowAddModal(false);
                    setEditingLog(null);
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
  FoodLogsIndex as default
};
