import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-SKnxjhft.js";
import { useForm, Head, Link, router } from "@inertiajs/react";
import { D as DataTable } from "./DataTable-Cf56Cbah.js";
import { S as StatusBadge } from "./StatusBadge-CQKRwizJ.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { C as ClickableLink } from "./ClickableLink-Du0eMkfO.js";
import { useState } from "react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function Index({ auth, timesheets, projects, users, filters }) {
  const { put } = useForm();
  const [filterData, setFilterData] = useState({
    project_id: filters?.project_id || "",
    user_id: filters?.user_id || "",
    status: filters?.status || "",
    date_from: filters?.date_from || "",
    date_to: filters?.date_to || "",
    is_overtime: filters?.is_overtime === "true" || filters?.is_overtime === true
  });
  const handleAction = (id, status) => {
    if (confirm(`Are you sure you want to ${status} this timesheet?`)) {
      put(route("timesheets.update", { timesheet: id, status }));
    }
  };
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filterData, [key]: value };
    setFilterData(newFilters);
    router.get(route("timesheets.index"), newFilters, { preserveState: true, replace: true });
  };
  const clearFilters = () => {
    setFilterData({
      project_id: "",
      user_id: "",
      status: "",
      date_from: "",
      date_to: "",
      is_overtime: false
    });
    router.get(route("timesheets.index"), {}, { preserveState: true, replace: true });
  };
  const isManager = auth.user.roles.some((r) => ["admin", "manager"].includes(r.name));
  const columns = [
    { key: "date", label: "Date", render: (item) => new Date(item.date).toLocaleDateString() },
    {
      key: "user_name",
      label: "Employee",
      render: (item) => item.user ? /* @__PURE__ */ jsx(ClickableLink, { routeName: "employees.show", params: item.user.id, children: item.user.name }) : "-"
    },
    {
      key: "project_name",
      label: "Project",
      render: (item) => item.project ? /* @__PURE__ */ jsx(ClickableLink, { routeName: "projects.show", params: item.project.id, children: item.project.name }) : "-"
    },
    {
      key: "task_name",
      label: "Task",
      render: (item) => item.task ? /* @__PURE__ */ jsx(ClickableLink, { routeName: "tasks.show", params: item.task.id, children: item.task.title }) : "-"
    },
    {
      key: "time",
      label: "Time",
      render: (item) => /* @__PURE__ */ jsx("div", { className: "text-sm", children: item.start_time && item.end_time ? /* @__PURE__ */ jsxs("span", { className: "text-gray-600", children: [
        item.start_time,
        " - ",
        item.end_time
      ] }) : /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "-" }) })
    },
    {
      key: "hours",
      label: "Hours",
      render: (item) => /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
          item.hours,
          "h"
        ] }),
        item.is_overtime && /* @__PURE__ */ jsx("span", { className: "ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800", children: "OT" })
      ] })
    },
    { key: "description", label: "Description", render: (item) => /* @__PURE__ */ jsx("span", { className: "text-xs truncate block max-w-xs", title: item.description, children: item.description || "-" }) },
    { key: "status", label: "Status", render: (item) => /* @__PURE__ */ jsx(StatusBadge, { status: item.status }) }
  ];
  const actions = (item) => /* @__PURE__ */ jsxs("div", { className: "flex space-x-2 justify-end", children: [
    isManager && item.status === "pending" && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleAction(item.id, "approved"),
          className: "text-green-600 hover:text-green-900 font-medium text-xs uppercase",
          children: "Approve"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleAction(item.id, "rejected"),
          className: "text-red-600 hover:text-red-900 font-medium text-xs uppercase",
          children: "Reject"
        }
      )
    ] }),
    auth.user.id === item.user_id && item.status === "pending" && /* @__PURE__ */ jsx(
      Link,
      {
        href: route("timesheets.edit", item.id),
        className: "text-blue-600 hover:text-blue-900 font-medium text-xs uppercase",
        children: "Edit"
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => {
          if (confirm("Are you sure you want to delete this timesheet entry?")) {
            router.delete(route("timesheets.destroy", item.id));
          }
        },
        className: "text-red-600 hover:text-red-900 font-medium text-xs uppercase",
        children: "Delete"
      }
    )
  ] });
  const handleExport = () => {
    const params = new URLSearchParams(filterData).toString();
    window.location.href = route("timesheets.export") + "?" + params;
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Timesheets" }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleExport,
              className: "px-4 py-2 bg-green-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-green-700",
              children: "Export"
            }
          ),
          /* @__PURE__ */ jsx(Link, { href: route("timesheets.create"), children: /* @__PURE__ */ jsx(PrimaryButton, { children: "Log Time" }) })
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Timesheets" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-white p-4 rounded-lg shadow-sm mb-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 items-end", children: [
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
                    projects?.map((p) => /* @__PURE__ */ jsx("option", { value: p.id, children: p.name }, p.id))
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-[200px]", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-700 mb-1", children: "Employee" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  className: "w-full border-gray-300 rounded-md shadow-sm text-sm",
                  value: filterData.user_id,
                  onChange: (e) => handleFilterChange("user_id", e.target.value),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "All Employees" }),
                    users?.map((u) => /* @__PURE__ */ jsx("option", { value: u.id, children: u.name }, u.id))
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-[150px]", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-700 mb-1", children: "Status" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  className: "w-full border-gray-300 rounded-md shadow-sm text-sm",
                  value: filterData.status,
                  onChange: (e) => handleFilterChange("status", e.target.value),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "All Statuses" }),
                    /* @__PURE__ */ jsx("option", { value: "pending", children: "Pending" }),
                    /* @__PURE__ */ jsx("option", { value: "approved", children: "Approved" }),
                    /* @__PURE__ */ jsx("option", { value: "rejected", children: "Rejected" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-[150px]", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-700 mb-1", children: "From Date" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "date",
                  className: "w-full border-gray-300 rounded-md shadow-sm text-sm",
                  value: filterData.date_from,
                  onChange: (e) => handleFilterChange("date_from", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-[150px]", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-700 mb-1", children: "To Date" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "date",
                  className: "w-full border-gray-300 rounded-md shadow-sm text-sm",
                  value: filterData.date_to,
                  onChange: (e) => handleFilterChange("date_to", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center pb-2", children: /* @__PURE__ */ jsxs("label", { className: "inline-flex items-center text-xs font-medium text-gray-700", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  className: "rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mr-2",
                  checked: filterData.is_overtime,
                  onChange: (e) => handleFilterChange("is_overtime", e.target.checked)
                }
              ),
              "Overtime Only"
            ] }) }),
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
              "button",
              {
                onClick: clearFilters,
                className: "px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50",
                children: "Clear"
              }
            ) })
          ] }) }),
          /* @__PURE__ */ jsx(
            DataTable,
            {
              columns,
              data: timesheets.data,
              pagination: timesheets,
              actions
            }
          )
        ] }) })
      ]
    }
  );
}
export {
  Index as default
};
