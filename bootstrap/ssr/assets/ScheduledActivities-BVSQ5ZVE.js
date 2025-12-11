import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Clock, Plus, X, Check } from "lucide-react";
import { M as Modal } from "./Modal-BeSeEOS3.js";
import { S as SecondaryButton } from "./SecondaryButton-C9TQBbBR.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { T as TextInput } from "./TextInput-Xf9xHrLa.js";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { I as InputError } from "./InputError-CBvD_6aD.js";
function ScheduledActivities({ task, activities = [] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    type: "call",
    // call, email, meeting
    subject: "",
    due_at: "",
    description: ""
  });
  const toggleForm = useForm({});
  const submitActivity = (e) => {
    e.preventDefault();
    post(route("tasks.activities.store", task.id), {
      onSuccess: () => {
        setIsModalOpen(false);
        reset();
      }
    });
  };
  const handleToggle = (activity) => {
    toggleForm.setData({ is_completed: !activity.is_completed });
    toggleForm.put(route("tasks.activities.update", [task.id, activity.id]), {
      preserveScroll: true
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg border border-gray-200 p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-gray-800 flex items-center", children: [
        /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 mr-2 text-indigo-500" }),
        "Scheduled Activities"
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setIsModalOpen(true),
          className: "flex items-center text-xs font-semibold text-purple-600 hover:text-purple-700",
          children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 mr-1" }),
            "Schedule Activity"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      activities.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 text-center py-4", children: "No scheduled activities." }),
      activities.map((activity) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: `flex items-start p-3 rounded-lg border ${activity.is_completed ? "bg-gray-50 border-gray-100" : "bg-green-50/50 border-green-100"} ${activity.type === "email" ? "bg-yellow-50/50 border-yellow-100" : ""}`,
          children: [
            /* @__PURE__ */ jsx("div", { className: `mt-0.5 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mr-3 ${activity.type === "call" ? "bg-green-500 text-white" : activity.type === "email" ? "bg-yellow-500 text-white" : "bg-blue-500 text-white"}`, children: activity.type.charAt(0).toUpperCase() }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("h4", { className: `text-sm font-semibold ${activity.is_completed ? "text-gray-500 line-through" : "text-gray-800"}`, children: activity.subject }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: new Date(activity.due_at).toLocaleString() })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleToggle(activity),
                className: `p-1 rounded-full ${activity.is_completed ? "text-gray-400 hover:text-gray-600" : "text-green-500 hover:text-green-600"}`,
                children: activity.is_completed ? /* @__PURE__ */ jsx(X, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Check, { className: "w-4 h-4" })
              }
            )
          ]
        },
        activity.id
      ))
    ] }),
    /* @__PURE__ */ jsx(Modal, { show: isModalOpen, onClose: () => setIsModalOpen(false), children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 mb-4", children: "Schedule Activity" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submitActivity, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { value: "Type" }),
          /* @__PURE__ */ jsx("div", { className: "flex space-x-4 mt-1", children: ["call", "meeting", "email"].map((t) => /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "radio",
                checked: data.type === t,
                onChange: () => setData("type", t),
                className: "text-indigo-600 focus:ring-indigo-500"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "capitalize text-sm text-gray-700", children: t })
          ] }, t)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "subject", value: "Subject" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "subject",
              type: "text",
              className: "mt-1 block w-full",
              value: data.subject,
              onChange: (e) => setData("subject", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.subject, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "due_at", value: "Due Date & Time" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "due_at",
              type: "datetime-local",
              className: "mt-1 block w-full",
              value: data.due_at,
              onChange: (e) => setData("due_at", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.due_at, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "description", value: "Description" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "description",
              className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
              value: data.description,
              onChange: (e) => setData("description", e.target.value)
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.description, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end space-x-3 mt-6", children: [
          /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => setIsModalOpen(false), children: "Cancel" }),
          /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Schedule" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  ScheduledActivities as S
};
