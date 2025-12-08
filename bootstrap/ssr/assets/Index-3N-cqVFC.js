import { jsx, jsxs } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-CGySncB_.js";
import { Head, Link, router } from "@inertiajs/react";
import { D as DataTable } from "./DataTable-Cf56Cbah.js";
import { S as StatusBadge } from "./StatusBadge-CQKRwizJ.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { C as ClickableLink } from "./ClickableLink-Du0eMkfO.js";
import { useState } from "react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function PriorityLabel({ priority }) {
  const colors = {
    low: "text-gray-500",
    medium: "text-yellow-600",
    high: "text-red-600 font-bold"
  };
  return /* @__PURE__ */ jsx("span", { className: `text-xs font-medium uppercase ${colors[priority]}`, children: priority });
}
function Index({ auth, tasks, projects, users, filters }) {
  const [viewMode, setViewMode] = useState("list");
  const [filterData, setFilterData] = useState({
    project_id: filters.project_id || "",
    assigned_to: filters.assigned_to || "",
    status: filters.status || ""
  });
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filterData, [key]: value };
    setFilterData(newFilters);
    router.get(route("tasks.index"), newFilters, { preserveState: true, replace: true });
  };
  const columns = [
    { key: "title", label: "Title", render: (item) => /* @__PURE__ */ jsx(ClickableLink, { routeName: "tasks.show", params: item.id, children: item.title }) },
    { key: "project", label: "Project", render: (item) => item.project ? /* @__PURE__ */ jsx(ClickableLink, { routeName: "projects.show", params: item.project.id, children: item.project.name }) : "-" },
    { key: "assigned_to", label: "Assigned To", render: (item) => item.assigned_user ? /* @__PURE__ */ jsx(ClickableLink, { routeName: "employees.show", params: item.assigned_user.id, children: item.assigned_user.name }) : "Unassigned" },
    { key: "priority", label: "Priority", render: (item) => /* @__PURE__ */ jsx(PriorityLabel, { priority: item.priority }) },
    { key: "status", label: "Status", render: (item) => /* @__PURE__ */ jsx(StatusBadge, { status: item.status }) },
    { key: "due_date", label: "Due Date", render: (item) => item.due_date ? new Date(item.due_date).toLocaleDateString() : "-" }
  ];
  const actions = (item) => /* @__PURE__ */ jsxs("div", { className: "flex space-x-4 justify-end", children: [
    /* @__PURE__ */ jsx(Link, { href: route("tasks.show", item.id), className: "text-indigo-600 hover:text-indigo-900", children: "View" }),
    /* @__PURE__ */ jsx(Link, { href: route("tasks.edit", item.id), className: "text-gray-600 hover:text-gray-900", children: "Edit" }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => {
          if (confirm(`Are you sure you want to delete task "${item.title}"?`)) {
            router.delete(route("tasks.destroy", item.id));
          }
        },
        className: "text-red-600 hover:text-red-900",
        children: "Delete"
      }
    )
  ] });
  const kanbanColumns = ["todo", "in_progress", "review", "done"];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Tasks" }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setViewMode("list"),
              className: `px-3 py-1 rounded-md text-sm font-medium ${viewMode === "list" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700"}`,
              children: "List"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setViewMode("kanban"),
              className: `px-3 py-1 rounded-md text-sm font-medium ${viewMode === "kanban" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700"}`,
              children: "Kanban"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                const params = new URLSearchParams(filterData).toString();
                window.location.href = route("tasks.export") + "?" + params;
              },
              className: "px-4 py-2 bg-green-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-green-700",
              children: "Export"
            }
          ),
          /* @__PURE__ */ jsx(Link, { href: route("tasks.create"), children: /* @__PURE__ */ jsx(PrimaryButton, { children: "New Task" }) })
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Tasks" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-wrap gap-4", children: [
            /* @__PURE__ */ jsxs(
              "select",
              {
                className: "border-gray-300 rounded-md shadow-sm",
                value: filterData.project_id,
                onChange: (e) => handleFilterChange("project_id", e.target.value),
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "All Projects" }),
                  projects.map((p) => /* @__PURE__ */ jsx("option", { value: p.id, children: p.name }, p.id))
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "select",
              {
                className: "border-gray-300 rounded-md shadow-sm",
                value: filterData.assigned_to,
                onChange: (e) => handleFilterChange("assigned_to", e.target.value),
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "All Employees" }),
                  users.map((u) => /* @__PURE__ */ jsx("option", { value: u.id, children: u.name }, u.id))
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "select",
              {
                className: "border-gray-300 rounded-md shadow-sm",
                value: filterData.status,
                onChange: (e) => handleFilterChange("status", e.target.value),
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "All Statuses" }),
                  /* @__PURE__ */ jsx("option", { value: "todo", children: "To Do" }),
                  /* @__PURE__ */ jsx("option", { value: "in_progress", children: "In Progress" }),
                  /* @__PURE__ */ jsx("option", { value: "review", children: "Review" }),
                  /* @__PURE__ */ jsx("option", { value: "done", children: "Done" })
                ]
              }
            )
          ] }),
          viewMode === "list" ? /* @__PURE__ */ jsx(
            DataTable,
            {
              columns,
              data: tasks.data || [],
              pagination: tasks.links ? tasks : null,
              actions
            }
          ) : /* @__PURE__ */ jsx("div", { className: "flex space-x-4 overflow-x-auto pb-4", children: kanbanColumns.map((status) => /* @__PURE__ */ jsxs("div", { className: "w-80 flex-shrink-0 bg-gray-100 rounded-lg p-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-700 mb-4 uppercase text-sm", children: status.replace("_", " ") }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              (tasks.data || tasks).filter((t) => t.status === status).map((task) => /* @__PURE__ */ jsxs("div", { className: "bg-white p-3 rounded shadow-sm border border-gray-200", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-2", children: [
                  /* @__PURE__ */ jsx(PriorityLabel, { priority: task.priority }),
                  /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-400", children: [
                    "#",
                    task.id
                  ] })
                ] }),
                /* @__PURE__ */ jsx(ClickableLink, { routeName: "tasks.show", params: task.id, className: "font-medium text-gray-900 hover:text-indigo-600 block mb-1", children: task.title }),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 mb-2", children: task.project ? /* @__PURE__ */ jsx(ClickableLink, { routeName: "projects.show", params: task.project.id, children: task.project.name }) : "-" }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mt-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-xs font-semibold text-gray-600", children: task.assigned_user?.name ? task.assigned_user.name.split(" ")[0] : "Unassigned" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
                    /* @__PURE__ */ jsx(Link, { href: route("tasks.edit", task.id), className: "text-xs text-indigo-500 hover:underline", children: "Edit" }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => {
                          if (confirm("Are you sure you want to delete this task?")) {
                            router.delete(route("tasks.destroy", task.id));
                          }
                        },
                        className: "text-xs text-red-500 hover:underline",
                        children: "Delete"
                      }
                    )
                  ] })
                ] })
              ] }, task.id)),
              (tasks.data || tasks).filter((t) => t.status === status).length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center text-gray-400 text-sm py-4", children: "No tasks" })
            ] })
          ] }, status)) })
        ] }) })
      ]
    }
  );
}
export {
  Index as default
};
