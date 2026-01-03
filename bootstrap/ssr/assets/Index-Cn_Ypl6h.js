import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DksizGbA.js";
import { router, usePage, Head, Link } from "@inertiajs/react";
import { D as DataTable } from "./DataTable-Cf56Cbah.js";
import { S as StatusBadge } from "./StatusBadge-CkNaSVC0.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { C as ClickableLink } from "./ClickableLink-Du0eMkfO.js";
import { useState, useEffect } from "react";
import { useSensors, useSensor, PointerSensor, KeyboardSensor, DndContext, closestCenter } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { F as FilterBar } from "./FilterBar-DbqRwFAj.js";
import { LayoutList, LayoutGrid } from "lucide-react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
const SortableItem = ({ project }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: project.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };
  return /* @__PURE__ */ jsxs("div", { ref: setNodeRef, style, ...attributes, ...listeners, className: "bg-white p-4 rounded shadow-sm border border-gray-200 mb-3 cursor-move hover:shadow-md transition-shadow", children: [
    /* @__PURE__ */ jsx("h4", { className: "font-semibold text-gray-800 mb-1", children: project.name }),
    /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 mb-2 truncate", children: project.description }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mt-2", children: [
      /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: project.start_date ? new Date(project.start_date).toLocaleDateString() : "No Date" }),
      /* @__PURE__ */ jsx(ClickableLink, { routeName: "projects.show", params: project.id, className: "text-indigo-600 hover:text-indigo-800 text-xs font-medium", children: "View" })
    ] }),
    project.users && project.users.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex -space-x-1 overflow-hidden mt-3", children: project.users.slice(0, 3).map((user) => /* @__PURE__ */ jsx("div", { className: "inline-block h-6 w-6 rounded-full ring-2 ring-white bg-gray-300 flex items-center justify-center text-[10px] font-bold text-gray-700", title: user.name, children: user.name.charAt(0) }, user.id)) })
  ] });
};
const DroppableColumn = ({ id, status, projects }) => {
  const { setNodeRef } = useSortable({ id, disabled: true });
  return /* @__PURE__ */ jsxs("div", { ref: setNodeRef, className: "bg-gray-100 p-4 rounded-lg w-72 flex-shrink-0 flex flex-col h-[calc(100vh-250px)]", children: [
    /* @__PURE__ */ jsxs("h3", { className: "font-bold text-gray-700 mb-4 uppercase text-xs tracking-wider flex justify-between items-center", children: [
      status.replace("_", " "),
      /* @__PURE__ */ jsx("span", { className: "bg-gray-200 text-gray-600 py-0.5 px-2 rounded-full text-xs", children: projects.length })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto", children: /* @__PURE__ */ jsx(SortableContext, { items: projects.map((p) => p.id), strategy: verticalListSortingStrategy, children: projects.map((project) => /* @__PURE__ */ jsx(SortableItem, { project }, project.id)) }) })
  ] });
};
function KanbanBoard({ projects = [] }) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
        // Requires 8px movement before drag starts, allowing for small taps/scrolls
      }
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  const statuses = ["active", "on_hold", "completed", "archived"];
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    const projectId = active.id;
    let newStatus = over.id;
    const overProject = projects.find((p) => p.id === over.id);
    if (overProject) {
      newStatus = overProject.status;
    }
    if (statuses.includes(over.id)) {
      newStatus = over.id;
    }
    const activeProject = projects.find((p) => p.id === projectId);
    if (activeProject && activeProject.status !== newStatus && statuses.includes(newStatus)) {
      router.put(route("projects.update-status", projectId), {
        status: newStatus
      }, {
        preserveScroll: true,
        onSuccess: () => {
        }
      });
    }
  };
  return /* @__PURE__ */ jsx(
    DndContext,
    {
      sensors,
      collisionDetection: closestCenter,
      onDragEnd: handleDragEnd,
      children: /* @__PURE__ */ jsx("div", { className: "flex space-x-6 overflow-x-auto pb-4", children: statuses.map((status) => /* @__PURE__ */ jsx(
        DroppableColumn,
        {
          id: status,
          status,
          projects: projects.filter((p) => p.status === status)
        },
        status
      )) })
    }
  );
}
function Index({ auth, projects, filters = {} }) {
  const { flash } = usePage().props;
  const [viewMode, setViewMode] = useState(localStorage.getItem("projectsViewMode") || "list");
  const [filterData, setFilterData] = useState({
    search: filters.search || "",
    search_name: filters.search_name || "",
    search_description: filters.search_description || "",
    status: filters.status || "",
    date_range: filters.date_range || ""
  });
  useEffect(() => {
    localStorage.setItem("projectsViewMode", viewMode);
  }, [viewMode]);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.get(
        route("projects.index"),
        filterData,
        { preserveState: true, replace: true }
      );
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [filterData]);
  const handleFilterChange = (key, value) => {
    setFilterData((prev) => ({ ...prev, [key]: value }));
  };
  const columns = [
    { key: "name", label: "Name", render: (item) => /* @__PURE__ */ jsx(ClickableLink, { routeName: "projects.show", params: item.id, children: item.name }) },
    {
      key: "status",
      label: "Status",
      render: (item) => /* @__PURE__ */ jsx(StatusBadge, { status: item.status })
    },
    {
      key: "start_date",
      label: "Start Date",
      render: (item) => item.start_date ? new Date(item.start_date).toLocaleDateString() : "-"
    },
    {
      key: "users",
      label: "Team",
      render: (item) => /* @__PURE__ */ jsx("div", { className: "flex -space-x-2 overflow-hidden", children: item.users && item.users.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
        item.users.slice(0, 3).map((user) => /* @__PURE__ */ jsx("div", { className: "inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-700", title: user?.name, children: user?.name ? user.name.charAt(0) : "?" }, user.id)),
        item.users.length > 3 && /* @__PURE__ */ jsxs("div", { className: "inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500", children: [
          "+",
          item.users.length - 3
        ] })
      ] }) : /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "No Team" }) })
    }
  ];
  const actions = (item) => /* @__PURE__ */ jsxs("div", { className: "flex space-x-4 justify-end", children: [
    /* @__PURE__ */ jsx(Link, { href: route("projects.show", item.id), className: "text-indigo-600 hover:text-indigo-900", children: "View" }),
    /* @__PURE__ */ jsx(Link, { href: route("projects.edit", item.id), className: "text-gray-600 hover:text-gray-900", children: "Edit" }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => {
          if (confirm(`Are you sure you want to delete project "${item.name}"? This will also delete all associated tasks and timesheets.`)) {
            router.delete(route("projects.destroy", item.id));
          }
        },
        className: "text-red-600 hover:text-red-900",
        children: "Delete"
      }
    )
  ] });
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center gap-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Projects" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-md shadow-sm border border-gray-300 flex p-1 mr-4", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setViewMode("list"),
                className: `p-1.5 rounded ${viewMode === "list" ? "bg-indigo-100 text-indigo-600" : "text-gray-500 hover:text-gray-700"}`,
                title: "List View",
                children: /* @__PURE__ */ jsx(LayoutList, { size: 18 })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setViewMode("kanban"),
                className: `p-1.5 rounded ${viewMode === "kanban" ? "bg-indigo-100 text-indigo-600" : "text-gray-500 hover:text-gray-700"}`,
                title: "Kanban View",
                children: /* @__PURE__ */ jsx(LayoutGrid, { size: 18 })
              }
            )
          ] }),
          /* @__PURE__ */ jsx(Link, { href: route("projects.planning"), className: "mr-2", children: /* @__PURE__ */ jsx("button", { className: "px-4 py-2 bg-purple-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-purple-700", children: "Planning Report" }) }),
          /* @__PURE__ */ jsx(Link, { href: route("projects.create"), children: /* @__PURE__ */ jsx(PrimaryButton, { children: "New Project" }) })
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Projects" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: [
          flash && flash.message && /* @__PURE__ */ jsx("div", { className: "mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative", role: "alert", children: /* @__PURE__ */ jsx("span", { className: "block sm:inline", children: flash.message }) }),
          /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx(
            FilterBar,
            {
              filters: [
                { key: "status", value: "active", label: "Active" },
                { key: "status", value: "on_hold", label: "On Hold" },
                { key: "status", value: "completed", label: "Completed" },
                { key: "status", value: "archived", label: "Archived" }
              ],
              searchableFields: [
                { key: "search_name", label: "Name" },
                { key: "search_description", label: "Description" }
              ],
              groupByOptions: [
                { value: "status", label: "Status" }
              ],
              activeFilters: filterData,
              onFilterChange: handleFilterChange
            }
          ) }),
          viewMode === "list" ? filterData.groupBy ? Object.entries(projects.data.reduce((groups, project) => {
            const key = project[filterData.groupBy] || "Ungrouped";
            if (!groups[key]) groups[key] = [];
            groups[key].push(project);
            return groups;
          }, {})).map(([groupName, groupProjects]) => /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg text-gray-700 mb-2 px-2 border-l-4 border-indigo-500 bg-gray-50 py-1 capitalize", children: groupName.replace("_", " ") }),
            /* @__PURE__ */ jsx(
              DataTable,
              {
                columns,
                data: groupProjects,
                pagination: { ...projects, data: groupProjects, links: [] },
                actions
              }
            )
          ] }, groupName)) : /* @__PURE__ */ jsx(
            DataTable,
            {
              columns,
              data: projects.data,
              pagination: projects,
              actions
            }
          ) : /* @__PURE__ */ jsx(KanbanBoard, { projects: projects.data })
        ] }) })
      ]
    }
  );
}
export {
  Index as default
};
