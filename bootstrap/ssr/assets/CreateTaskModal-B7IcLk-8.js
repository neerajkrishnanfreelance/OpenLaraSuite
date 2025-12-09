import { jsx, jsxs } from "react/jsx-runtime";
import { useForm } from "@inertiajs/react";
import { M as Modal } from "./Modal-BeSeEOS3.js";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { I as InputError, T as TextInput } from "./TextInput-mUZk5oTn.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { S as SecondaryButton } from "./SecondaryButton-C9TQBbBR.js";
function CreateTaskModal({ show, onClose, projectId, projects = [], users = [] }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    project_id: projectId || "",
    assigned_to: "",
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    due_date: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("tasks.store"), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        onClose();
      }
    });
  };
  const handleClose = () => {
    reset();
    onClose();
  };
  return /* @__PURE__ */ jsx(Modal, { show, onClose: handleClose, maxWidth: "2xl", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "p-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-gray-900 mb-6", children: "Create New Task" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "project_id", value: "Project *" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              id: "project_id",
              className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
              value: data.project_id,
              onChange: (e) => setData("project_id", e.target.value),
              disabled: projectId,
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Select Project" }),
                projects.map((project) => /* @__PURE__ */ jsx("option", { value: project.id, children: project.name }, project.id))
              ]
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.project_id, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "assigned_to", value: "Assign To" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              id: "assigned_to",
              className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
              value: data.assigned_to,
              onChange: (e) => setData("assigned_to", e.target.value),
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Unassigned" }),
                users.map((user) => /* @__PURE__ */ jsx("option", { value: user.id, children: user.name }, user.id))
              ]
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.assigned_to, className: "mt-2" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { forInput: "title", value: "Title *" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "title",
            className: "mt-1 block w-full",
            value: data.title,
            onChange: (e) => setData("title", e.target.value),
            placeholder: "Enter task title"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.title, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { forInput: "description", value: "Description" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            id: "description",
            className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
            rows: "3",
            value: data.description,
            onChange: (e) => setData("description", e.target.value),
            placeholder: "Describe the task..."
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.description, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "priority", value: "Priority *" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              id: "priority",
              className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
              value: data.priority,
              onChange: (e) => setData("priority", e.target.value),
              children: [
                /* @__PURE__ */ jsx("option", { value: "low", children: "Low" }),
                /* @__PURE__ */ jsx("option", { value: "medium", children: "Medium" }),
                /* @__PURE__ */ jsx("option", { value: "high", children: "High" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.priority, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "status", value: "Status *" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              id: "status",
              className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
              value: data.status,
              onChange: (e) => setData("status", e.target.value),
              children: [
                /* @__PURE__ */ jsx("option", { value: "todo", children: "To Do" }),
                /* @__PURE__ */ jsx("option", { value: "in_progress", children: "In Progress" }),
                /* @__PURE__ */ jsx("option", { value: "review", children: "Review" }),
                /* @__PURE__ */ jsx("option", { value: "done", children: "Done" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.status, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "due_date", value: "Due Date" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "due_date",
              type: "date",
              className: "mt-1 block w-full",
              value: data.due_date,
              onChange: (e) => setData("due_date", e.target.value)
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.due_date, className: "mt-2" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end space-x-3", children: [
      /* @__PURE__ */ jsx(SecondaryButton, { type: "button", onClick: handleClose, children: "Cancel" }),
      /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: processing ? "Creating..." : "Create Task" })
    ] })
  ] }) });
}
export {
  CreateTaskModal as C
};
