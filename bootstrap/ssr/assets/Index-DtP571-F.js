import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-Bg39NUCY.js";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { format, addDays } from "date-fns";
import { ChevronLeft, ChevronRight, Plus, Loader2, Sparkles, Trash2 } from "lucide-react";
import axios from "axios";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function MealPlannerIndex({ auth, date, mealPlans, dailyTotals, dailyGoal }) {
  const [currentDate, setCurrentDate] = useState(new Date(date));
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const [selectedMealType, setSelectedMealType] = useState(null);
  const [dietPreference, setDietPreference] = useState("balanced");
  const handleDateChange = (days) => {
    const newDate = addDays(currentDate, days);
    setCurrentDate(newDate);
    router.visit(route("health.meal-planner.index", { date: format(newDate, "yyyy-MM-dd") }));
  };
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to remove this meal?")) {
      router.delete(route("health.meal-planner.destroy", id), {
        preserveScroll: true
      });
    }
  };
  const handleSuggest = async (mealType) => {
    setIsSuggesting(true);
    setSelectedMealType(mealType);
    setSuggestions(null);
    try {
      const response = await axios.post(route("health.meal-planner.suggest"), {
        date: format(currentDate, "yyyy-MM-dd"),
        meal_type: mealType.toLowerCase(),
        preference: dietPreference
        // Send preference
      });
      setSuggestions(response.data);
    } catch (error) {
      console.error("Failed to get suggestions", error);
    } finally {
      setIsSuggesting(false);
    }
  };
  const addSuggestion = (foodItem) => {
    router.post(route("health.meal-planner.store"), {
      date: format(currentDate, "yyyy-MM-dd"),
      meal_type: selectedMealType.toLowerCase(),
      food_item_id: foodItem.id,
      serving_amount: 1
      // Default to 1 serving
    }, {
      onSuccess: () => setSuggestions(null)
    });
  };
  const renderSummaryBar = () => {
    if (!dailyGoal) return null;
    const getPercent = (current, target) => Math.min(100, current / target * 100);
    return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-4 mb-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-gray-700 mb-3", children: "Daily Nutrition Progress" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs mb-1", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Calories" }),
            /* @__PURE__ */ jsxs("span", { className: "text-gray-500", children: [
              Math.round(dailyTotals.calories),
              " / ",
              Math.round(dailyGoal.calories),
              " kcal"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-2.5", children: /* @__PURE__ */ jsx("div", { className: "bg-indigo-600 h-2.5 rounded-full", style: { width: `${getPercent(dailyTotals.calories, dailyGoal.calories)}%` } }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs mb-1", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Protein" }),
            /* @__PURE__ */ jsxs("span", { className: "text-gray-500", children: [
              Math.round(dailyTotals.protein),
              " / ",
              Math.round(dailyGoal.protein),
              " g"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-2.5", children: /* @__PURE__ */ jsx("div", { className: "bg-blue-500 h-2.5 rounded-full", style: { width: `${getPercent(dailyTotals.protein, dailyGoal.protein)}%` } }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs mb-1", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Carbs" }),
            /* @__PURE__ */ jsxs("span", { className: "text-gray-500", children: [
              Math.round(dailyTotals.carbs),
              " / ",
              Math.round(dailyGoal.carbs),
              " g"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-2.5", children: /* @__PURE__ */ jsx("div", { className: "bg-green-500 h-2.5 rounded-full", style: { width: `${getPercent(dailyTotals.carbs, dailyGoal.carbs)}%` } }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs mb-1", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Fats" }),
            /* @__PURE__ */ jsxs("span", { className: "text-gray-500", children: [
              Math.round(dailyTotals.fats),
              " / ",
              Math.round(dailyGoal.fats),
              " g"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-2.5", children: /* @__PURE__ */ jsx("div", { className: "bg-yellow-500 h-2.5 rounded-full", style: { width: `${getPercent(dailyTotals.fats, dailyGoal.fats)}%` } }) })
        ] })
      ] })
    ] });
  };
  const renderMealSection = (title, type) => {
    const plans = mealPlans[type.toLowerCase()] || [];
    const totalCals = plans.reduce((acc, plan) => acc + parseFloat(plan.calories), 0);
    return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6 mb-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold capitalize text-gray-800 flex items-center gap-2", children: [
          title,
          /* @__PURE__ */ jsxs("span", { className: "text-sm font-normal text-gray-500", children: [
            "(",
            Math.round(totalCals),
            " kcal)"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleSuggest(type),
            className: "text-xs flex items-center gap-1 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition-colors",
            children: [
              /* @__PURE__ */ jsx(Sparkles, { className: "w-3 h-3" }),
              "Suggest"
            ]
          }
        ) })
      ] }),
      plans.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-3", children: plans.map((plan) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center bg-gray-50 p-3 rounded-md border border-gray-100", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-medium text-gray-900", children: plan.food_item.name }),
          /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500", children: [
            plan.serving_amount,
            " ",
            plan.food_item.serving_unit,
            " • ",
            Math.round(plan.calories),
            " kcal • P: ",
            Math.round(plan.protein),
            "g C: ",
            Math.round(plan.carbs),
            "g F: ",
            Math.round(plan.fats),
            "g"
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleDelete(plan.id),
            className: "text-red-400 hover:text-red-600 p-1",
            children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
          }
        )
      ] }, plan.id)) }) : /* @__PURE__ */ jsx("div", { className: "text-center py-6 border-2 border-dashed border-gray-100 rounded-lg text-gray-400 text-sm", children: "No meals planned yet." })
    ] });
  };
  return /* @__PURE__ */ jsxs(Authenticated, { header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Meal Planner" }), children: [
    /* @__PURE__ */ jsx(Head, { title: "Meal Planner" }),
    /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-white p-4 rounded-lg shadow mb-6", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => handleDateChange(-1), className: "p-2 hover:bg-gray-100 rounded-full", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5 text-gray-600" }) }),
        /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-gray-800", children: format(currentDate, "EEEE, MMMM do, yyyy") }),
        /* @__PURE__ */ jsx("button", { onClick: () => handleDateChange(1), className: "p-2 hover:bg-gray-100 rounded-full", children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5 text-gray-600" }) })
      ] }),
      renderSummaryBar(),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
        renderMealSection("Breakfast", "Breakfast"),
        renderMealSection("Lunch", "Lunch"),
        renderMealSection("Dinner", "Dinner"),
        renderMealSection("Snacks", "Snack")
      ] })
    ] }) }),
    suggestions && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 overflow-y-auto", "aria-labelledby": "modal-title", role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0", children: [
      /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity", onClick: () => setSuggestions(null) }),
      /* @__PURE__ */ jsx("span", { className: "hidden sm:inline-block sm:align-middle sm:h-screen", "aria-hidden": "true", children: "​" }),
      /* @__PURE__ */ jsxs("div", { className: "inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-lg leading-6 font-medium text-gray-900 mb-2", children: [
            "Suggested for ",
            selectedMealType
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Options" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: dietPreference,
                onChange: (e) => {
                  setDietPreference(e.target.value);
                  setIsSuggesting(true);
                  axios.post(route("health.meal-planner.suggest"), {
                    date: format(currentDate, "yyyy-MM-dd"),
                    meal_type: selectedMealType.toLowerCase(),
                    preference: e.target.value
                  }).then((res) => {
                    setSuggestions(res.data);
                  }).finally(() => setIsSuggesting(false));
                },
                className: "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "balanced", children: "Balanced (Random)" }),
                  /* @__PURE__ */ jsx("option", { value: "high_protein", children: "High Protein" }),
                  /* @__PURE__ */ jsx("option", { value: "low_carb", children: "Low Carb" }),
                  /* @__PURE__ */ jsx("option", { value: "low_fat", children: "Low Fat" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 mb-4", children: [
            "Target: ~",
            suggestions.target_calories,
            " kcal"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            suggestions.suggestions.map((item) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-3 border rounded hover:bg-gray-50 cursor-pointer", onClick: () => addSuggestion(item), children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "font-medium text-gray-900", children: item.name }),
                /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500", children: [
                  item.calories,
                  " kcal • ",
                  item.serving_size,
                  " ",
                  item.serving_unit
                ] })
              ] }),
              /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 text-indigo-600" })
            ] }, item.id)),
            suggestions.suggestions.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm", children: "No specific suggestions found." })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setSuggestions(null),
            className: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm",
            children: "Cancel"
          }
        ) })
      ] })
    ] }) }),
    isSuggesting && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 text-indigo-600 animate-spin mb-2" }),
      /* @__PURE__ */ jsx("span", { className: "text-indigo-600 font-medium", children: "Finding healthy options..." })
    ] }) })
  ] });
}
export {
  MealPlannerIndex as default
};
