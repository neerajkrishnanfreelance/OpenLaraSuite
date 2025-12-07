import { jsx, jsxs } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-hQdgXqic.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { S as StatusBadge } from "./StatusBadge-CQKRwizJ.js";
import { M as Modal } from "./Modal-BeSeEOS3.js";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { I as InputError, T as TextInput } from "./TextInput-mUZk5oTn.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { S as SecondaryButton } from "./SecondaryButton-C9TQBbBR.js";
import { C as CreateMeetingModal } from "./CreateMeetingModal-BpL3dkvm.js";
import { useState } from "react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
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
function Show({ auth, project, users = [], projects = [] }) {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const Field = ({ label, value, fullWidth = false }) => /* @__PURE__ */ jsxs("div", { className: `mb-4 ${fullWidth ? "col-span-2" : ""}`, children: [
    /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1", children: label }),
    /* @__PURE__ */ jsx("div", { className: "bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-md px-3 py-2", children: value || "-" })
  ] });
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx(Link, { href: route("projects.index"), className: "mr-4 text-gray-400 hover:text-gray-600 transition", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }) }),
          /* @__PURE__ */ jsx("h2", { className: "font-bold text-2xl text-gray-800 leading-tight", children: project.name }),
          /* @__PURE__ */ jsx("span", { className: "ml-4", children: /* @__PURE__ */ jsx(StatusBadge, { status: project.status }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-3", children: [
          /* @__PURE__ */ jsx(Link, { href: route("projects.edit", project.id), className: "px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm", children: "Edit Project" }),
          /* @__PURE__ */ jsx("button", { className: "px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700 transition shadow-sm", children: "Mark Complete" })
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `Project: ${project.name}` }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg border border-gray-200 p-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 mb-6 border-b border-gray-100 pb-2", children: "Project Information" }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                /* @__PURE__ */ jsx(Field, { label: "Project Name", value: project.name }),
                /* @__PURE__ */ jsx(Field, { label: "Status", value: project.status === "active" ? "Active" : "Archived" }),
                /* @__PURE__ */ jsx(Field, { label: "Start Date", value: project.start_date }),
                /* @__PURE__ */ jsx(Field, { label: "End Date", value: project.end_date }),
                /* @__PURE__ */ jsx(Field, { label: "Description", value: project.description, fullWidth: true })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg border border-gray-200 p-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2", children: "Assigned Team" }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: project.users && project.users.length > 0 ? project.users.map((user) => /* @__PURE__ */ jsxs("div", { className: "flex items-center px-3 py-2 bg-gray-50 rounded-full border border-gray-200", children: [
                /* @__PURE__ */ jsx("div", { className: "h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold mr-2", children: user.name.charAt(0) }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-700", children: user.name })
              ] }, user.id)) : /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 italic", children: "No members assigned." }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg border border-gray-200 p-4 h-full", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-gray-800 flex items-center", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 mr-2 text-indigo-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" }) }),
                "Tasks (",
                project.tasks ? project.tasks.length : 0,
                ")"
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setShowTaskModal(true),
                  className: "text-sm text-indigo-600 hover:text-indigo-800 font-medium",
                  children: "+ Add Task"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-4 max-h-[600px] overflow-y-auto pr-2", children: project.tasks && project.tasks.length > 0 ? project.tasks.map((task) => /* @__PURE__ */ jsxs("div", { className: "p-3 bg-gray-50 rounded-lg border border-gray-200 relative group hover:bg-gray-100 transition", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
                /* @__PURE__ */ jsx(Link, { href: route("tasks.edit", task.id), className: "font-semibold text-gray-800 text-sm hover:text-indigo-600 block mb-1", children: task.title }),
                /* @__PURE__ */ jsx(StatusBadge, { status: task.status })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 line-clamp-2 mb-2", children: task.description || "No description" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-2", children: [
                /* @__PURE__ */ jsx("div", { className: "flex items-center text-xs text-gray-400", children: task.assigned_user ? /* @__PURE__ */ jsxs("div", { className: "flex items-center", title: `Assigned to ${task.assigned_user.name}`, children: [
                  /* @__PURE__ */ jsx("div", { className: "h-5 w-5 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center text-[10px] font-bold mr-1", children: task.assigned_user.name.charAt(0) }),
                  /* @__PURE__ */ jsx("span", { children: task.assigned_user.name.split(" ")[0] })
                ] }) : /* @__PURE__ */ jsx("span", { children: "Unassigned" }) }),
                /* @__PURE__ */ jsx("div", { className: "text-[10px] text-gray-400", children: task.due_date ? new Date(task.due_date).toLocaleDateString() : "No Due Date" })
              ] })
            ] }, task.id)) : /* @__PURE__ */ jsxs("div", { className: "text-center py-6", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "No tasks yet." }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Start by adding one!" })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 pt-4 border-t border-gray-100", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Write a note or @mention...",
                  className: "w-full text-sm border-gray-200 rounded-md focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50",
                  disabled: true
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "flex justify-end mt-2", children: /* @__PURE__ */ jsx("button", { disabled: true, className: "px-3 py-1 bg-indigo-600 text-white text-xs rounded opacity-50 cursor-not-allowed", children: "Send" }) })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx(
          CreateTaskModal,
          {
            show: showTaskModal,
            onClose: () => setShowTaskModal(false),
            projectId: project.id,
            projects,
            users
          }
        ),
        /* @__PURE__ */ jsx(
          CreateMeetingModal,
          {
            show: showMeetingModal,
            onClose: () => setShowMeetingModal(false),
            users,
            relatedId: project.id,
            relatedType: "App\\\\Models\\\\Project"
          }
        )
      ]
    }
  );
}
export {
  Show as default
};
