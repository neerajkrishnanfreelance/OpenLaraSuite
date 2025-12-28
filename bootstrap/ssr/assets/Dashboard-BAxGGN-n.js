import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DksizGbA.js";
import { Head, Link } from "@inertiajs/react";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, PieChart, Pie, Cell } from "recharts";
import { Utensils, Flame, Dumbbell, TrendingUp, Target } from "lucide-react";
import "react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function HealthDashboard({
  auth,
  healthGoal,
  todayNutrition,
  todayWorkoutSummary,
  weeklyNutritionTrend,
  weeklyWorkoutTrend,
  recentFoodLogs,
  recentWorkouts,
  currentDate
}) {
  const calorieProgress = healthGoal?.daily_calorie_target ? todayNutrition.calories / healthGoal.daily_calorie_target * 100 : 0;
  const proteinProgress = healthGoal?.daily_protein_target ? todayNutrition.protein / healthGoal.daily_protein_target * 100 : 0;
  const workoutProgress = healthGoal?.weekly_workout_target ? todayWorkoutSummary.count / healthGoal.weekly_workout_target * 7 * 100 : 0;
  const macroData = [
    { name: "Protein", value: parseFloat(todayNutrition.protein) || 0, color: "#3b82f6" },
    { name: "Carbs", value: parseFloat(todayNutrition.carbs) || 0, color: "#10b981" },
    { name: "Fats", value: parseFloat(todayNutrition.fats) || 0, color: "#f59e0b" }
  ];
  const KPICard = ({ icon: Icon, title, value, target, unit, progress, color }) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsx("div", { className: `p-3 rounded-lg bg-${color}-100`, children: /* @__PURE__ */ jsx(Icon, { className: `w-6 h-6 text-${color}-600` }) }),
      target && /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-500", children: [
        "Target: ",
        target,
        unit
      ] })
    ] }),
    /* @__PURE__ */ jsx("h3", { className: "text-gray-600 text-sm font-medium mb-1", children: title }),
    /* @__PURE__ */ jsxs("p", { className: "text-3xl font-bold text-gray-900", children: [
      value,
      /* @__PURE__ */ jsx("span", { className: "text-lg text-gray-500 ml-1", children: unit })
    ] }),
    progress !== void 0 && /* @__PURE__ */ jsxs("div", { className: "mt-3", children: [
      /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: `bg-${color}-600 h-2 rounded-full transition-all duration-300`,
          style: { width: `${Math.min(progress, 100)}%` }
        }
      ) }),
      /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mt-1", children: [
        Math.round(progress),
        "% of goal"
      ] })
    ] })
  ] });
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "hidden md:flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Health & Wellness" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/health/food-logs",
              className: "px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium",
              children: "Log Food"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/health/workouts",
              className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium",
              children: "Log Workout"
            }
          )
        ] })
      ] }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Daily Tracker" }),
        /* @__PURE__ */ jsxs("div", { className: "md:hidden pb-24 bg-[#F5F7FA] min-h-screen", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-white rounded-b-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-5 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "p-6 pb-2 text-center relative z-10", children: [
            /* @__PURE__ */ jsxs("div", { className: "circular-progress-container mx-auto mb-6 relative w-[180px] h-[180px]", children: [
              /* @__PURE__ */ jsxs("svg", { className: "w-full h-full transform -rotate-90", viewBox: "0 0 100 100", children: [
                /* @__PURE__ */ jsx(
                  "circle",
                  {
                    cx: "50",
                    cy: "50",
                    r: "45",
                    fill: "none",
                    stroke: "#E8ECF1",
                    strokeWidth: "6"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "circle",
                  {
                    cx: "50",
                    cy: "50",
                    r: "45",
                    fill: "none",
                    stroke: "#3565F0",
                    strokeWidth: "6",
                    strokeDasharray: "283",
                    strokeDashoffset: 283 - 283 * 0.75,
                    strokeLinecap: "round"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
                /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-[10px] uppercase tracking-wider font-semibold mb-1", children: "Calories" }),
                /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold text-[#1F2A36]", children: "1500" }),
                /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-xs font-medium mt-1", children: "/ 2000 kcal" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-4 border-t border-gray-100", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex-1 text-center border-r border-gray-100 last:border-0", children: [
                /* @__PURE__ */ jsx("span", { className: "block text-[10px] text-gray-400 font-medium mb-1 uppercase tracking-wide", children: "Protein" }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-center gap-1", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-[#1F2A36]", children: "105" }),
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-400 mb-1", children: "g" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "w-8 h-1 bg-blue-100 rounded-full mx-auto mt-2 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-[#3565F0] w-[40%]" }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 text-center border-r border-gray-100 last:border-0", children: [
                /* @__PURE__ */ jsx("span", { className: "block text-[10px] text-gray-400 font-medium mb-1 uppercase tracking-wide", children: "Carbs" }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-center gap-1", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-[#1F2A36]", children: "210" }),
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-400 mb-1", children: "g" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "w-8 h-1 bg-green-100 rounded-full mx-auto mt-2 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-green-500 w-[65%]" }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 text-center last:border-0", children: [
                /* @__PURE__ */ jsx("span", { className: "block text-[10px] text-gray-400 font-medium mb-1 uppercase tracking-wide", children: "Fats" }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-center gap-1", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-[#1F2A36]", children: "55" }),
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-400 mb-1", children: "g" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "w-8 h-1 bg-orange-100 rounded-full mx-auto mt-2 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-orange-400 w-[30%]" }) })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "px-4 mb-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-1", children: "Today's Meals" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              ["Breakfast", "Lunch"].map((meal, idx) => /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-[#E8ECF1] flex items-center justify-between active:scale-[0.99] transition-transform", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100", children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: `https://source.unsplash.com/random/100x100?${meal.toLowerCase()}`,
                      alt: meal,
                      className: "w-full h-full object-cover",
                      onError: (e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/100?text=" + meal[0];
                      }
                    }
                  ) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h4", { className: "font-semibold text-sm text-[#1F2A36]", children: meal }),
                    /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-gray-400 font-medium mt-0.5", children: [
                      idx === 0 ? "Oatmeal & Fruits" : "Chicken Salad",
                      " • 450 kcal"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsx(Link, { href: "/health/food-logs", className: "px-3 py-1.5 bg-[#F5F7FA] text-[#3565F0] rounded-lg text-[10px] font-bold hover:bg-blue-50 transition-colors uppercase tracking-wide", children: "Add" })
              ] }, meal)),
              /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-[#E8ECF1] border-dashed flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-300", children: /* @__PURE__ */ jsx(Utensils, { className: "w-4 h-4" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h4", { className: "font-semibold text-sm text-gray-800", children: "Dinner" }),
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400", children: "Not logged" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx(Link, { href: "/health/food-logs", className: "px-3 py-1.5 bg-[#3565F0] text-white rounded-lg text-[10px] font-bold hover:bg-blue-700 tracking-wide uppercase", children: "Add" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "px-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-1", children: "Activity" }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-[#E8ECF1]", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center text-orange-500", children: /* @__PURE__ */ jsx(Flame, { className: "w-4 h-4" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h4", { className: "font-semibold text-sm text-[#1F2A36]", children: "Running" }),
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400", children: "06:30 AM • 45 min" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "text-sm font-bold text-[#1F2A36]", children: [
                  "320 ",
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-400 font-normal", children: "kcal" })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "h-1.5 w-full bg-gray-100 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-orange-400 w-[60%] rounded-full" }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "hidden md:block py-3 md:py-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-0 sm:px-4 lg:px-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8 px-4 sm:px-0", children: [
            /* @__PURE__ */ jsx(
              KPICard,
              {
                icon: Flame,
                title: "Calories Today",
                value: Math.round(todayNutrition.calories),
                target: healthGoal?.daily_calorie_target,
                unit: " kcal",
                progress: calorieProgress,
                color: "red"
              }
            ),
            /* @__PURE__ */ jsx(
              KPICard,
              {
                icon: Utensils,
                title: "Protein Today",
                value: Math.round(todayNutrition.protein),
                target: healthGoal?.daily_protein_target,
                unit: "g",
                progress: proteinProgress,
                color: "blue"
              }
            ),
            /* @__PURE__ */ jsx(
              KPICard,
              {
                icon: Dumbbell,
                title: "Workouts Today",
                value: todayWorkoutSummary.count,
                target: healthGoal?.weekly_workout_target ? Math.ceil(healthGoal.weekly_workout_target / 7) : null,
                unit: " sessions",
                progress: workoutProgress,
                color: "green"
              }
            ),
            /* @__PURE__ */ jsx(
              KPICard,
              {
                icon: TrendingUp,
                title: "Calories Burned",
                value: Math.round(todayWorkoutSummary.total_calories_burned),
                unit: " kcal",
                color: "purple"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6 mb-6 md:mb-8 px-4 sm:px-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-4 md:p-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-base md:text-lg font-semibold text-gray-900 mb-4", children: "Weekly Calorie Trend" }),
              /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 250, className: "md:h-[300px]", children: /* @__PURE__ */ jsxs(LineChart, { data: weeklyNutritionTrend, children: [
                /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3" }),
                /* @__PURE__ */ jsx(XAxis, { dataKey: "day" }),
                /* @__PURE__ */ jsx(YAxis, {}),
                /* @__PURE__ */ jsx(Tooltip, {}),
                /* @__PURE__ */ jsx(Legend, {}),
                /* @__PURE__ */ jsx(Line, { type: "monotone", dataKey: "calories", stroke: "#ef4444", strokeWidth: 2, name: "Calories" }),
                healthGoal?.daily_calorie_target && /* @__PURE__ */ jsx(
                  Line,
                  {
                    type: "monotone",
                    dataKey: () => healthGoal.daily_calorie_target,
                    stroke: "#9ca3af",
                    strokeDasharray: "5 5",
                    name: "Target"
                  }
                )
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-4 md:p-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-base md:text-lg font-semibold text-gray-900 mb-4", children: "Today's Macros" }),
              /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 250, className: "md:h-[300px]", children: /* @__PURE__ */ jsxs(PieChart, { children: [
                /* @__PURE__ */ jsx(
                  Pie,
                  {
                    data: macroData,
                    cx: "50%",
                    cy: "50%",
                    labelLine: false,
                    label: ({ name, value }) => `${name}: ${Math.round(value)}g`,
                    outerRadius: 80,
                    fill: "#8884d8",
                    dataKey: "value",
                    children: macroData.map((entry, index) => /* @__PURE__ */ jsx(Cell, { fill: entry.color }, `cell-${index}`))
                  }
                ),
                /* @__PURE__ */ jsx(Tooltip, {})
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "mt-4 grid grid-cols-3 gap-4 text-center", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Protein" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-lg font-semibold text-blue-600", children: [
                    Math.round(todayNutrition.protein),
                    "g"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Carbs" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-lg font-semibold text-green-600", children: [
                    Math.round(todayNutrition.carbs),
                    "g"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Fats" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-lg font-semibold text-yellow-600", children: [
                    Math.round(todayNutrition.fats),
                    "g"
                  ] })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-4 md:p-6 mb-6 md:mb-8 mx-4 sm:mx-0", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-base md:text-lg font-semibold text-gray-900 mb-4", children: "Weekly Workout Activity" }),
            /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 250, className: "md:h-[300px]", children: /* @__PURE__ */ jsxs(LineChart, { data: weeklyWorkoutTrend, children: [
              /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3" }),
              /* @__PURE__ */ jsx(XAxis, { dataKey: "day" }),
              /* @__PURE__ */ jsx(YAxis, { yAxisId: "left" }),
              /* @__PURE__ */ jsx(YAxis, { yAxisId: "right", orientation: "right" }),
              /* @__PURE__ */ jsx(Tooltip, {}),
              /* @__PURE__ */ jsx(Legend, {}),
              /* @__PURE__ */ jsx(Line, { yAxisId: "left", type: "monotone", dataKey: "minutes", stroke: "#3b82f6", strokeWidth: 2, name: "Minutes" }),
              /* @__PURE__ */ jsx(Line, { yAxisId: "right", type: "monotone", dataKey: "calories", stroke: "#10b981", strokeWidth: 2, name: "Calories Burned" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6 px-4 sm:px-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow", children: [
              /* @__PURE__ */ jsx("div", { className: "p-4 md:p-6 border-b border-gray-200", children: /* @__PURE__ */ jsx("h3", { className: "text-base md:text-lg font-semibold text-gray-900", children: "Recent Food Logs" }) }),
              /* @__PURE__ */ jsx("div", { className: "divide-y divide-gray-200", children: recentFoodLogs.length > 0 ? recentFoodLogs.map((log) => /* @__PURE__ */ jsx("div", { className: "p-4 hover:bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900", children: log.food_item.name }),
                  /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
                    log.servings,
                    " × ",
                    log.food_item.serving_size,
                    log.food_item.serving_unit,
                    " • ",
                    log.meal_type
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
                  /* @__PURE__ */ jsxs("p", { className: "font-semibold text-gray-900", children: [
                    Math.round(log.total_calories),
                    " kcal"
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: new Date(log.consumed_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })
                ] })
              ] }) }, log.id)) : /* @__PURE__ */ jsx("div", { className: "p-8 text-center text-gray-500", children: "No food logs yet. Start tracking your meals!" }) }),
              /* @__PURE__ */ jsx("div", { className: "p-4 bg-gray-50 border-t border-gray-200", children: /* @__PURE__ */ jsx(Link, { href: "/health/food-logs", className: "text-sm text-indigo-600 hover:text-indigo-800 font-medium", children: "View all food logs →" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow", children: [
              /* @__PURE__ */ jsx("div", { className: "p-4 md:p-6 border-b border-gray-200", children: /* @__PURE__ */ jsx("h3", { className: "text-base md:text-lg font-semibold text-gray-900", children: "Recent Workouts" }) }),
              /* @__PURE__ */ jsx("div", { className: "divide-y divide-gray-200", children: recentWorkouts.length > 0 ? recentWorkouts.map((workout) => /* @__PURE__ */ jsx("div", { className: "p-4 hover:bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900", children: workout.workout_type.name }),
                  /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
                    workout.duration_minutes,
                    " min • ",
                    workout.intensity,
                    " intensity"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
                  /* @__PURE__ */ jsxs("p", { className: "font-semibold text-gray-900", children: [
                    Math.round(workout.calories_burned),
                    " kcal"
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: new Date(workout.performed_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })
                ] })
              ] }) }, workout.id)) : /* @__PURE__ */ jsx("div", { className: "p-8 text-center text-gray-500", children: "No workouts logged yet. Get moving!" }) }),
              /* @__PURE__ */ jsx("div", { className: "p-4 bg-gray-50 border-t border-gray-200", children: /* @__PURE__ */ jsx(Link, { href: "/health/workouts", className: "text-sm text-indigo-600 hover:text-indigo-800 font-medium", children: "View all workouts →" }) })
            ] })
          ] }),
          !healthGoal && /* @__PURE__ */ jsx("div", { className: "mt-8 bg-indigo-50 border border-indigo-200 rounded-lg p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx(Target, { className: "w-12 h-12 text-indigo-600" }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-1", children: "Set Your Health Goals" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Define your daily calorie targets, macro goals, and workout targets to track your progress effectively." })
            ] }),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: "/health/goals",
                className: "px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium whitespace-nowrap",
                children: "Set Goals"
              }
            )
          ] }) })
        ] }) })
      ]
    }
  );
}
export {
  HealthDashboard as default
};
