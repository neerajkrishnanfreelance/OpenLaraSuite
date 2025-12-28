import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DksizGbA.js";
import { Head, Link, router } from "@inertiajs/react";
import { D as DataTable } from "./DataTable-Cf56Cbah.js";
import { S as StatusBadge } from "./StatusBadge-CkNaSVC0.js";
import { P as PriorityLabel } from "./PriorityLabel-CPBMCKmp.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { C as ClickableLink } from "./ClickableLink-Du0eMkfO.js";
import { useState } from "react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function Index({ auth, tasks, projects, users, lead_stages = [], filters }) {
  const [viewMode, setViewMode] = useState("list");
  const [kanbanGroupBy, setKanbanGroupBy] = useState("status");
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
  const getKanbanColumns = () => {
    if (kanbanGroupBy === "stage" && lead_stages.length > 0) {
      return lead_stages.map((stage) => ({
        id: stage.id,
        key: stage.id.toString(),
        label: stage.name,
        color: stage.color
      }));
    }
    return ["todo", "in_progress", "review", "done"].map((status) => ({
      id: status,
      key: status,
      label: status.replace("_", " "),
      color: null
    }));
  };
  const currentKanbanColumns = getKanbanColumns();
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center gap-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Tasks / Leads" }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-2 items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-gray-200 p-1 rounded-md flex", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setViewMode("list"),
                className: `px-3 py-1 rounded-md text-sm font-medium transition-colors ${viewMode === "list" ? "bg-white shadow text-gray-800" : "text-gray-600 hover:text-gray-800"}`,
                children: "List"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setViewMode("kanban"),
                className: `px-3 py-1 rounded-md text-sm font-medium transition-colors ${viewMode === "kanban" ? "bg-white shadow text-gray-800" : "text-gray-600 hover:text-gray-800"}`,
                children: "Kanban"
              }
            )
          ] }),
          viewMode === "kanban" && /* @__PURE__ */ jsxs(
            "select",
            {
              value: kanbanGroupBy,
              onChange: (e) => setKanbanGroupBy(e.target.value),
              className: "bg-white border-gray-300 text-gray-700 text-sm rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block p-1.5",
              children: [
                /* @__PURE__ */ jsx("option", { value: "status", children: "By Status" }),
                /* @__PURE__ */ jsx("option", { value: "stage", children: "By Lead Stage" })
              ]
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
          /* @__PURE__ */ jsx(Link, { href: route("tasks.create"), children: /* @__PURE__ */ jsx(PrimaryButton, { children: "New" }) })
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Tasks" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-wrap gap-4 items-end", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-[200px]", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-700 mb-1", children: "Project" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  className: "w-full border-gray-300 rounded-md shadow-sm text-sm",
                  value: filterData.project_id,
                  onChange: (e) => handleFilterChange("project_id", e.target.value),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "All Projects" }),
                    projects.map((p) => /* @__PURE__ */ jsx("option", { value: p.id, children: p.name }, p.id))
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-[200px]", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-700 mb-1", children: "Assigned To" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  className: "w-full border-gray-300 rounded-md shadow-sm text-sm",
                  value: filterData.assigned_to,
                  onChange: (e) => handleFilterChange("assigned_to", e.target.value),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "All Employees" }),
                    users.map((u) => /* @__PURE__ */ jsx("option", { value: u.id, children: u.name }, u.id))
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-[200px]", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-700 mb-1", children: "Status" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  className: "w-full border-gray-300 rounded-md shadow-sm text-sm",
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
            ] })
          ] }),
          viewMode === "list" ? /* @__PURE__ */ jsx(
            DataTable,
            {
              columns,
              data: tasks.data || [],
              pagination: tasks.links ? tasks : null,
              actions
            }
          ) : /* @__PURE__ */ jsx("div", { className: "flex space-x-4 overflow-x-auto pb-4 items-start min-h-[500px]", children: currentKanbanColumns.map((col) => /* @__PURE__ */ jsxs("div", { className: "w-80 flex-shrink-0 bg-gray-100 rounded-lg p-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-700 uppercase text-xs tracking-wider", children: col.label }),
              /* @__PURE__ */ jsx("span", { className: "bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded-full font-bold", children: (tasks.data || tasks).filter((t) => {
                if (kanbanGroupBy === "stage") {
                  return t.lead_stage_id == col.id;
                }
                return t.status === col.id;
              }).length })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              (tasks.data || tasks).filter((t) => {
                if (kanbanGroupBy === "stage") {
                  return t.lead_stage_id == col.id;
                }
                return t.status === col.id;
              }).map((task) => /* @__PURE__ */ jsxs("div", { className: "bg-white p-3 rounded shadow-sm border border-gray-200 hover:shadow-md transition-shadow group relative", children: [
                kanbanGroupBy !== "stage" && task.lead_stage && /* @__PURE__ */ jsx("div", { className: "absolute left-0 top-3 bottom-3 w-1 rounded-r bg-indigo-500", style: { backgroundColor: task.lead_stage.color } }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-2 pl-2", children: [
                  /* @__PURE__ */ jsx(PriorityLabel, { priority: task.priority }),
                  /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-gray-400 font-mono", children: [
                    "#",
                    task.id
                  ] })
                ] }),
                /* @__PURE__ */ jsx(ClickableLink, { routeName: "tasks.show", params: task.id, className: "font-medium text-gray-900 hover:text-indigo-600 block mb-1 text-sm pl-2", children: task.title }),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 mb-2 pl-2", children: task.contact ? /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-green-400" }),
                  task.contact.name
                ] }) : task.project ? task.project.name : "-" }),
                /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center mt-3 pt-2 border-t border-gray-50 pl-2", children: /* @__PURE__ */ jsxs("div", { className: "text-xs font-semibold text-gray-600 flex items-center", children: [
                  task.assigned_user ? /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-[10px] mr-1", children: task.assigned_user.name.charAt(0) }) : /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-[10px] mr-1", children: "?" }),
                  task.expected_revenue > 0 ? /* @__PURE__ */ jsxs("span", { className: "text-green-600 ml-1 font-mono", children: [
                    "$",
                    task.expected_revenue
                  ] }) : null
                ] }) })
              ] }, task.id)),
              (tasks.data || tasks).filter((t) => {
                if (kanbanGroupBy === "stage") return t.lead_stage_id == col.id;
                return t.status === col.id;
              }).length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center text-gray-400 text-xs py-8 border-2 border-dashed border-gray-200 rounded-lg", children: "Empty" })
            ] })
          ] }, col.key)) })
        ] }) })
      ]
    }
  );
}
export {
  Index as default
};
