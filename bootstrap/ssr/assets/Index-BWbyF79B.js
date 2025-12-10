import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DkmIA3xH.js";
import { useForm, Head, router } from "@inertiajs/react";
import { useState } from "react";
import { Dumbbell, Edit2, Trash2, X, Plus } from "lucide-react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function WorkoutsIndex({ auth, workouts, workoutTypes, dailyTotals, currentDate }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const { data, setData, post, put, processing, reset } = useForm({
    workout_type_id: "",
    duration_minutes: 30,
    intensity: "medium",
    performed_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16),
    sets: "",
    reps: "",
    weight: "",
    notes: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingWorkout) {
      put(`/health/workouts/${editingWorkout.id}`, {
        onSuccess: () => {
          setShowAddModal(false);
          setEditingWorkout(null);
          reset();
        }
      });
    } else {
      post("/health/workouts", {
        onSuccess: () => {
          setShowAddModal(false);
          reset();
        }
      });
    }
  };
  const handleDelete = (workoutId) => {
    if (confirm("Are you sure you want to delete this workout?")) {
      router.delete(`/health/workouts/${workoutId}`);
    }
  };
  const handleEdit = (workout) => {
    setEditingWorkout(workout);
    setData({
      workout_type_id: workout.workout_type_id,
      duration_minutes: workout.duration_minutes,
      intensity: workout.intensity,
      performed_at: new Date(workout.performed_at).toISOString().slice(0, 16),
      sets: workout.sets || "",
      reps: workout.reps || "",
      weight: workout.weight || "",
      notes: workout.notes || ""
    });
    setShowAddModal(true);
  };
  const groupedWorkoutTypes = workoutTypes.reduce((acc, type) => {
    if (!acc[type.category]) {
      acc[type.category] = [];
    }
    acc[type.category].push(type);
    return acc;
  }, {});
  const selectedWorkoutType = workoutTypes.find((t) => t.id === parseInt(data.workout_type_id));
  const isStrength = selectedWorkoutType?.category === "strength";
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Workout Logs" }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              setEditingWorkout(null);
              reset();
              setShowAddModal(true);
            },
            className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
              "Log Workout"
            ]
          }
        )
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Workout Logs" }),
        /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6 mb-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Today's Workout Summary" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-blue-600", children: dailyTotals.count }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Workouts" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-green-600", children: dailyTotals.total_minutes }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Minutes" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-red-600", children: Math.round(dailyTotals.total_calories) }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Calories Burned" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow", children: [
            /* @__PURE__ */ jsx("div", { className: "p-6 border-b border-gray-200", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Today's Workouts" }) }),
            /* @__PURE__ */ jsx("div", { className: "p-6", children: workouts.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-4", children: workouts.map((workout) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-50 rounded-lg", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "p-3 bg-blue-100 rounded-lg", children: /* @__PURE__ */ jsx(Dumbbell, { className: "w-6 h-6 text-blue-600" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h4", { className: "font-medium text-gray-900", children: workout.workout_type.name }),
                  /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
                    workout.duration_minutes,
                    " min • ",
                    workout.intensity,
                    " intensity"
                  ] }),
                  workout.sets && workout.reps && /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
                    workout.sets,
                    " sets × ",
                    workout.reps,
                    " reps",
                    workout.weight && ` @ ${workout.weight}kg`
                  ] }),
                  workout.notes && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1", children: workout.notes })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
                  /* @__PURE__ */ jsxs("p", { className: "font-semibold text-gray-900", children: [
                    Math.round(workout.calories_burned),
                    " kcal"
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: new Date(workout.performed_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => handleEdit(workout),
                      className: "p-2 text-blue-600 hover:bg-blue-50 rounded",
                      children: /* @__PURE__ */ jsx(Edit2, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => handleDelete(workout.id),
                      className: "p-2 text-red-600 hover:bg-red-50 rounded",
                      children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                    }
                  )
                ] })
              ] })
            ] }, workout.id)) }) : /* @__PURE__ */ jsx("div", { className: "text-center py-12 text-gray-500", children: "No workouts logged today. Time to get moving!" }) })
          ] })
        ] }) }),
        showAddModal && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: editingWorkout ? "Edit Workout" : "Log Workout" }),
            /* @__PURE__ */ jsx("button", { onClick: () => {
              setShowAddModal(false);
              setEditingWorkout(null);
              reset();
            }, children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }) })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Workout Type" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: data.workout_type_id,
                  onChange: (e) => setData("workout_type_id", e.target.value),
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                  required: true,
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "Select workout type..." }),
                    Object.entries(groupedWorkoutTypes).map(([category, types]) => /* @__PURE__ */ jsx("optgroup", { label: category.charAt(0).toUpperCase() + category.slice(1), children: types.map((type) => /* @__PURE__ */ jsxs("option", { value: type.id, children: [
                      type.icon,
                      " ",
                      type.name
                    ] }, type.id)) }, category))
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Duration (min)" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    min: "1",
                    value: data.duration_minutes,
                    onChange: (e) => setData("duration_minutes", e.target.value),
                    className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Intensity" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: data.intensity,
                    onChange: (e) => setData("intensity", e.target.value),
                    className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                    required: true,
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "low", children: "Low" }),
                      /* @__PURE__ */ jsx("option", { value: "medium", children: "Medium" }),
                      /* @__PURE__ */ jsx("option", { value: "high", children: "High" })
                    ]
                  }
                )
              ] })
            ] }),
            isStrength && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Sets" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    min: "1",
                    value: data.sets,
                    onChange: (e) => setData("sets", e.target.value),
                    className: "w-full px-3 py-2 border border-gray-300 rounded-md"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Reps" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    min: "1",
                    value: data.reps,
                    onChange: (e) => setData("reps", e.target.value),
                    className: "w-full px-3 py-2 border border-gray-300 rounded-md"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Weight (kg)" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    step: "0.5",
                    min: "0",
                    value: data.weight,
                    onChange: (e) => setData("weight", e.target.value),
                    className: "w-full px-3 py-2 border border-gray-300 rounded-md"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Time" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "datetime-local",
                  value: data.performed_at,
                  onChange: (e) => setData("performed_at", e.target.value),
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
                  disabled: processing,
                  className: "flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300",
                  children: editingWorkout ? "Update" : "Log Workout"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setShowAddModal(false);
                    setEditingWorkout(null);
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
  WorkoutsIndex as default
};
