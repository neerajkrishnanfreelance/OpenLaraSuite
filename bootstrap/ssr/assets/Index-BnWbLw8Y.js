import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DksizGbA.js";
import { Head, Link, router } from "@inertiajs/react";
import { D as DataTable } from "./DataTable-Cf56Cbah.js";
import { S as StatusBadge } from "./StatusBadge-CkNaSVC0.js";
import { P as PriorityLabel } from "./PriorityLabel-CPBMCKmp.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { C as ClickableLink } from "./ClickableLink-Du0eMkfO.js";
import { useState, useRef, useEffect } from "react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function FilterBar({
  placeholder = "Search...",
  filters = [],
  groupByOptions = [],
  activeFilters = {},
  onFilterChange
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      onFilterChange("search", searchText);
      setSearchText("");
    }
  };
  const toggleFilter = (key, value) => {
    const currentValue = activeFilters[key];
    const newValue = currentValue === value ? "" : value;
    onFilterChange(key, newValue);
  };
  const removeFilter = (key) => {
    onFilterChange(key, "");
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full relative mb-4", ref: dropdownRef, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 border border-gray-300 rounded-md bg-white p-1 min-h-[42px] focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500", children: [
      Object.entries(activeFilters).map(([key, value]) => {
        if (!value || key === "page" || key === "search") return null;
        let label = value;
        const filterOption = filters.find((f) => f.key === key && f.value === value);
        if (filterOption) label = filterOption.label;
        if (key === "groupBy") {
          const groupOption = groupByOptions.find((g) => g.value === value);
          if (groupOption) label = `Group By: ${groupOption.label}`;
        }
        return /* @__PURE__ */ jsxs("div", { className: "flex items-center bg-indigo-100 text-indigo-800 text-sm px-2 py-1 rounded-full border border-indigo-200", children: [
          /* @__PURE__ */ jsx("span", { className: "mr-1", children: label }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => removeFilter(key),
              className: "text-indigo-500 hover:text-indigo-700 focus:outline-none",
              children: /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z", clipRule: "evenodd" }) })
            }
          )
        ] }, key);
      }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 relative", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSearchSubmit, className: "flex items-center", children: [
        /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-gray-400 ml-2 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder,
            className: "border-none focus:ring-0 p-1 text-sm w-full bg-transparent",
            value: searchText,
            onChange: (e) => setSearchText(e.target.value),
            onFocus: () => setIsOpen(true)
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx("button", { onClick: () => setIsOpen(!isOpen), className: "p-2 text-gray-500 hover:text-gray-700", children: /* @__PURE__ */ jsx("svg", { className: `w-4 h-4 transition-transform ${isOpen ? "transform rotate-180" : ""}`, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" }) }) })
    ] }),
    isOpen && /* @__PURE__ */ jsxs("div", { className: "absolute z-50 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-0 divide-x divide-gray-100", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-2", children: [
        /* @__PURE__ */ jsx("h4", { className: "px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider", children: "Filters" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-1", children: filters.map((filter, idx) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              toggleFilter(filter.key, filter.value);
              setIsOpen(false);
            },
            className: `flex items-center w-full px-3 py-2 text-sm text-left rounded-md hover:bg-gray-50 ${activeFilters[filter.key] === filter.value ? "bg-indigo-50 text-indigo-700 font-medium" : "text-gray-700"}`,
            children: [
              activeFilters[filter.key] === filter.value && /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-2 text-indigo-600", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }),
              /* @__PURE__ */ jsx("span", { className: activeFilters[filter.key] === filter.value ? "" : "pl-6", children: filter.label })
            ]
          }
        ) }, idx)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-2 bg-gray-50/50", children: [
        /* @__PURE__ */ jsx("h4", { className: "px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider", children: "Group By" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-1", children: groupByOptions.map((option, idx) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              toggleFilter("groupBy", option.value);
              setIsOpen(false);
            },
            className: `flex items-center w-full px-3 py-2 text-sm text-left rounded-md hover:bg-gray-100 ${activeFilters["groupBy"] === option.value ? "bg-white shadow-sm text-indigo-700 font-medium" : "text-gray-700"}`,
            children: [
              activeFilters["groupBy"] === option.value && /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-2 text-indigo-600", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }),
              /* @__PURE__ */ jsx("span", { className: activeFilters["groupBy"] === option.value ? "" : "pl-6", children: option.label })
            ]
          }
        ) }, idx)) })
      ] })
    ] })
  ] });
}
function Index({ auth, tasks, projects, users, lead_stages = [], filters }) {
  const [viewMode, setViewMode] = useState("list");
  const [filterData, setFilterData] = useState({
    project_id: filters.project_id || "",
    assigned_to: filters.assigned_to || "",
    status: filters.status || "",
    groupBy: "status",
    // default group by
    search: filters.search || ""
  });
  const kanbanGroupBy = filterData.groupBy;
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
          /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx(
            FilterBar,
            {
              filters: [
                // Quick Filters
                { key: "assigned_to", value: auth.user.id.toString(), label: "My Tasks" },
                { key: "assigned_to", value: "unassigned", label: "Unassigned" },
                { key: "priority", value: "high", label: "High Priority" },
                { key: "status", value: "todo", label: "To Do" },
                { key: "status", value: "done", label: "Done" }
              ],
              groupByOptions: [
                { value: "status", label: "Status" },
                { value: "stage", label: "Lead Stage" },
                { value: "project", label: "Project" },
                // Example, handling in frontend list might be needed or just API
                { value: "assigned_to", label: "Assigned User" }
              ],
              activeFilters: filterData,
              onFilterChange: handleFilterChange
            }
          ) }),
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
