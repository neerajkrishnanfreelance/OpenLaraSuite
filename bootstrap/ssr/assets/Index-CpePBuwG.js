import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-Db-Yuz5f.js";
import { useForm, Head } from "@inertiajs/react";
import { Target } from "lucide-react";
import "react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function GoalsIndex({ auth, healthGoal }) {
  const { data, setData, post, processing } = useForm({
    daily_calorie_target: healthGoal?.daily_calorie_target || "",
    daily_protein_target: healthGoal?.daily_protein_target || "",
    daily_carbs_target: healthGoal?.daily_carbs_target || "",
    daily_fats_target: healthGoal?.daily_fats_target || "",
    weekly_workout_target: healthGoal?.weekly_workout_target || 3,
    weekly_workout_minutes_target: healthGoal?.weekly_workout_minutes_target || "",
    current_weight: healthGoal?.current_weight || "",
    target_weight: healthGoal?.target_weight || "",
    weight_unit: healthGoal?.weight_unit || "kg",
    daily_water_target: healthGoal?.daily_water_target || "",
    start_date: healthGoal?.start_date || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    target_date: healthGoal?.target_date || ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/health/goals");
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Health Goals" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Health Goals" }),
        /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6 mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsx(Target, { className: "w-8 h-8 text-indigo-600" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Set Your Health Goals" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Define your targets to track your progress effectively" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h4", { className: "text-md font-semibold text-gray-900 mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-green-600 rounded-full" }),
                "Daily Nutrition Targets"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Calories (kcal)" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "number",
                      min: "0",
                      value: data.daily_calorie_target,
                      onChange: (e) => setData("daily_calorie_target", e.target.value),
                      className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                      placeholder: "2000"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Protein (g)" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "number",
                      min: "0",
                      value: data.daily_protein_target,
                      onChange: (e) => setData("daily_protein_target", e.target.value),
                      className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                      placeholder: "150"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Carbs (g)" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "number",
                      min: "0",
                      value: data.daily_carbs_target,
                      onChange: (e) => setData("daily_carbs_target", e.target.value),
                      className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                      placeholder: "200"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Fats (g)" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "number",
                      min: "0",
                      value: data.daily_fats_target,
                      onChange: (e) => setData("daily_fats_target", e.target.value),
                      className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                      placeholder: "65"
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h4", { className: "text-md font-semibold text-gray-900 mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-blue-600 rounded-full" }),
                "Weekly Workout Targets"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Workouts per Week" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "number",
                      min: "0",
                      value: data.weekly_workout_target,
                      onChange: (e) => setData("weekly_workout_target", e.target.value),
                      className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                      placeholder: "3"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Total Minutes per Week" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "number",
                      min: "0",
                      value: data.weekly_workout_minutes_target,
                      onChange: (e) => setData("weekly_workout_minutes_target", e.target.value),
                      className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                      placeholder: "150"
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h4", { className: "text-md font-semibold text-gray-900 mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-purple-600 rounded-full" }),
                "Weight Tracking"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Current Weight" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "number",
                      step: "0.1",
                      min: "0",
                      value: data.current_weight,
                      onChange: (e) => setData("current_weight", e.target.value),
                      className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                      placeholder: "70"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Target Weight" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "number",
                      step: "0.1",
                      min: "0",
                      value: data.target_weight,
                      onChange: (e) => setData("target_weight", e.target.value),
                      className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                      placeholder: "65"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Unit" }),
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      value: data.weight_unit,
                      onChange: (e) => setData("weight_unit", e.target.value),
                      className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "kg", children: "Kilograms (kg)" }),
                        /* @__PURE__ */ jsx("option", { value: "lbs", children: "Pounds (lbs)" })
                      ]
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h4", { className: "text-md font-semibold text-gray-900 mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-cyan-600 rounded-full" }),
                "Other Targets"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4", children: /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Daily Water (liters)" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    step: "0.1",
                    min: "0",
                    value: data.daily_water_target,
                    onChange: (e) => setData("daily_water_target", e.target.value),
                    className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                    placeholder: "2.5"
                  }
                )
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h4", { className: "text-md font-semibold text-gray-900 mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-orange-600 rounded-full" }),
                "Timeline"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Start Date" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "date",
                      value: data.start_date,
                      onChange: (e) => setData("start_date", e.target.value),
                      className: "w-full px-3 py-2 border border-gray-300 rounded-md"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Target Date" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "date",
                      value: data.target_date,
                      onChange: (e) => setData("target_date", e.target.value),
                      className: "w-full px-3 py-2 border border-gray-300 rounded-md"
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: processing,
                className: "w-full px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium disabled:bg-gray-300",
                children: healthGoal ? "Update Goals" : "Set Goals"
              }
            ) })
          ] })
        ] }) }) })
      ]
    }
  );
}
export {
  GoalsIndex as default
};
