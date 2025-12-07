import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-hQdgXqic.js";
import { Head, Link } from "@inertiajs/react";
import { S as StatusBadge } from "./StatusBadge-CQKRwizJ.js";
import "react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function Show({ auth, project }) {
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
              /* @__PURE__ */ jsx(Link, { href: route("tasks.create", { project_id: project.id }), className: "text-sm text-indigo-600 hover:text-indigo-800 font-medium", children: "+ Add" })
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
        ] })
      ]
    }
  );
}
export {
  Show as default
};
