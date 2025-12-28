import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DksizGbA.js";
import { useForm, Head } from "@inertiajs/react";
import { Target, Calculator, X } from "lucide-react";
import { useState } from "react";
import axios from "axios";
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
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcLoading, setCalcLoading] = useState(false);
  const [calcError, setCalcError] = useState(null);
  const [calculatedResults, setCalculatedResults] = useState(null);
  const [profileData, setProfileData] = useState({
    height: auth.user.height || "",
    weight: auth.user.weight || "",
    birth_date: auth.user.birth_date || "",
    gender: auth.user.gender || "male",
    activity_level: auth.user.activity_level || "moderate",
    goal_type: "maintain"
    // lose_weight, maintain, gain_muscle
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/health/goals");
  };
  const handleCalculate = async () => {
    setCalcLoading(true);
    setCalcError(null);
    setCalculatedResults(null);
    try {
      const { goal_type, ...profileUpdateData } = profileData;
      await axios.post(route("health.profile.update"), profileUpdateData);
      const response = await axios.post(route("health.profile.calculate"), { goal_type: profileData.goal_type });
      const result = response.data;
      setCalculatedResults(result);
      setData((prev) => ({
        ...prev,
        daily_calorie_target: result.daily_calorie_target,
        daily_protein_target: result.daily_protein_target,
        daily_carbs_target: result.daily_carbs_target,
        daily_fats_target: result.daily_fats_target,
        daily_water_target: result.daily_water_target,
        current_weight: result.current_weight
      }));
    } catch (error) {
      console.error(error);
      setCalcError(error.response?.data?.error || "An error occurred while calculating.");
    } finally {
      setCalcLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Health Goals" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Health Goals" }),
        /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6 mb-6 relative", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(Target, { className: "w-8 h-8 text-indigo-600" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Set Your Health Goals" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Define your targets to track your progress effectively" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => setShowCalculator(true),
                className: "flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors",
                children: [
                  /* @__PURE__ */ jsx(Calculator, { className: "w-4 h-4" }),
                  "Auto-Calculate"
                ]
              }
            )
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
        ] }) }) }),
        showCalculator && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 overflow-y-auto", "aria-labelledby": "modal-title", role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0", children: [
          /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity", "aria-hidden": "true", onClick: () => setShowCalculator(false) }),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline-block sm:align-middle sm:h-screen", "aria-hidden": "true", children: "​" }),
          /* @__PURE__ */ jsxs("div", { className: "inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg leading-6 font-medium text-gray-900", id: "modal-title", children: "Calculate Your Needs" }),
                /* @__PURE__ */ jsx("button", { onClick: () => setShowCalculator(false), className: "text-gray-400 hover:text-gray-500", children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                calcError && /* @__PURE__ */ jsx("div", { className: "p-3 bg-red-100 text-red-700 rounded-md text-sm", children: calcError }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "We'll update your profile with these details to calculate your daily targets." }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Height (cm)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                        value: profileData.height,
                        onChange: (e) => setProfileData({ ...profileData, height: e.target.value })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Weight (kg)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                        value: profileData.weight,
                        onChange: (e) => setProfileData({ ...profileData, weight: e.target.value })
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Date of Birth" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "date",
                      className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                      value: profileData.birth_date,
                      onChange: (e) => setProfileData({ ...profileData, birth_date: e.target.value })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Gender" }),
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                      value: profileData.gender,
                      onChange: (e) => setProfileData({ ...profileData, gender: e.target.value }),
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "male", children: "Male" }),
                        /* @__PURE__ */ jsx("option", { value: "female", children: "Female" }),
                        /* @__PURE__ */ jsx("option", { value: "other", children: "Other" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Activity Level" }),
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                      value: profileData.activity_level,
                      onChange: (e) => setProfileData({ ...profileData, activity_level: e.target.value }),
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "sedentary", children: "Sedentary (Little or no exercise)" }),
                        /* @__PURE__ */ jsx("option", { value: "light", children: "Lightly Active (1-3 days/week)" }),
                        /* @__PURE__ */ jsx("option", { value: "moderate", children: "Moderately Active (3-5 days/week)" }),
                        /* @__PURE__ */ jsx("option", { value: "active", children: "Active (6-7 days/week)" }),
                        /* @__PURE__ */ jsx("option", { value: "very_active", children: "Very Active (Physical job or hard exercise)" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Goal" }),
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      className: "w-full px-3 py-2 border border-gray-300 rounded-md font-medium text-indigo-900 bg-indigo-50",
                      value: profileData.goal_type,
                      onChange: (e) => setProfileData({ ...profileData, goal_type: e.target.value }),
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "lose_weight", children: "Lose Weight (-500 kcal deficit)" }),
                        /* @__PURE__ */ jsx("option", { value: "maintain", children: "Maintain Weight (Maintenance)" }),
                        /* @__PURE__ */ jsx("option", { value: "gain_muscle", children: "Gain Muscle (+500 kcal surplus)" })
                      ]
                    }
                  )
                ] }),
                calculatedResults && /* @__PURE__ */ jsxs("div", { className: "mt-4 p-3 bg-blue-50 rounded-md border border-blue-100", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-blue-800 font-medium", children: "Based on your data:" }),
                  /* @__PURE__ */ jsxs("div", { className: "mt-2 grid grid-cols-2 gap-2 text-sm text-blue-700", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      "Maintenance: ",
                      /* @__PURE__ */ jsxs("span", { className: "font-bold", children: [
                        calculatedResults.maintenance_calories,
                        " kcal"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      "Target: ",
                      /* @__PURE__ */ jsxs("span", { className: "font-bold", children: [
                        calculatedResults.daily_calorie_target,
                        " kcal"
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-blue-600 mt-2", children: "Values currently applied to the form." })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: handleCalculate,
                  disabled: calcLoading,
                  className: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm disabled:bg-gray-400",
                  children: calcLoading ? "Calculating..." : "Calculate & Apply"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setShowCalculator(false),
                  className: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm",
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
  GoalsIndex as default
};
