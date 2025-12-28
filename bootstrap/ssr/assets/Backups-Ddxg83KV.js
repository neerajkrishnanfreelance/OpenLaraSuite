import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DksizGbA.js";
import { usePage, useForm, Head } from "@inertiajs/react";
import { Database, RotateCcw, AlertCircle, RefreshCw, Server, Download, Trash2, HardDrive } from "lucide-react";
import { useState } from "react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function Backups({ auth, backups }) {
  const { flash } = usePage().props;
  const [activeTab, setActiveTab] = useState("backup");
  const [selectedConnection, setSelectedConnection] = useState("pgsql");
  const createForm = useForm({
    connection: "pgsql"
  });
  const restoreForm = useForm({
    connection: "pgsql"
  });
  const deleteForm = useForm();
  const handleCreateBackup = (e) => {
    e.preventDefault();
    createForm.setData("connection", selectedConnection);
    createForm.post(route("backups.store"), {
      onSuccess: () => {
      }
    });
  };
  const handleRestoreBackup = (fileName) => {
    if (confirm(`Are you sure you want to OVERWRITE the "${selectedConnection}" database with this backup? This action cannot be undone.`)) {
      restoreForm.setData("connection", selectedConnection);
      restoreForm.post(route("backups.restore", fileName));
    }
  };
  const handleDeleteBackup = (name) => {
    if (confirm("Are you sure you want to delete this backup?")) {
      deleteForm.delete(route("backups.destroy", name));
    }
  };
  const connections = [
    { id: "pgsql", name: "PostgreSQL (Default)" },
    { id: "mysql", name: "MySQL" },
    { id: "sqlite", name: "SQLite" }
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Database Backups" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Backups" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg flex min-h-[500px]", children: [
          /* @__PURE__ */ jsxs("div", { className: "w-1/4 bg-gray-50 border-r border-gray-200 p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-6", children: "Operations" }),
            /* @__PURE__ */ jsxs("nav", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setActiveTab("backup"),
                  className: `w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === "backup" ? "bg-indigo-50 text-indigo-700 border border-indigo-200" : "text-gray-600 hover:bg-gray-100"}`,
                  children: [
                    /* @__PURE__ */ jsx(Database, { className: "w-5 h-5 mr-3" }),
                    "Backup Database"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setActiveTab("restore"),
                  className: `w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === "restore" ? "bg-indigo-50 text-indigo-700 border border-indigo-200" : "text-gray-600 hover:bg-gray-100"}`,
                  children: [
                    /* @__PURE__ */ jsx(RotateCcw, { className: "w-5 h-5 mr-3" }),
                    "Restore Database"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-8 pt-6 border-t border-gray-200", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4", children: "Target Connection" }),
              /* @__PURE__ */ jsx("div", { className: "space-y-2", children: connections.map((conn) => /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-3 cursor-pointer", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "radio",
                    name: "connection",
                    value: conn.id,
                    checked: selectedConnection === conn.id,
                    onChange: (e) => setSelectedConnection(e.target.value),
                    className: "h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-700", children: conn.name })
              ] }, conn.id)) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-3/4 p-8", children: activeTab === "backup" ? /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-4", children: "Create New Backup" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-500 mb-8", children: [
              "Create a full backup of your ",
              /* @__PURE__ */ jsx("strong", { children: connections.find((c) => c.id === selectedConnection)?.name }),
              " database. The backup file will be stored securely on the server."
            ] }),
            /* @__PURE__ */ jsx("div", { className: "bg-blue-50 border border-blue-200 rounded-md p-4 mb-8", children: /* @__PURE__ */ jsxs("div", { className: "flex", children: [
              /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx(AlertCircle, { className: "h-5 w-5 text-blue-400" }) }),
              /* @__PURE__ */ jsx("div", { className: "ml-3", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-blue-700", children: "Automated backups keep the last 7 backups by default. Backups created manually here are preserved until deleted." }) })
            ] }) }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleCreateBackup,
                disabled: createForm.processing,
                className: "inline-flex items-center px-6 py-3 bg-indigo-600 border border-transparent rounded-md font-semibold text-base text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50",
                children: createForm.processing ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(RefreshCw, { className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white" }),
                  "Processing..."
                ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(Database, { className: "-ml-1 mr-3 h-5 w-5" }),
                  "Create Backup Now"
                ] })
              }
            )
          ] }) : /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-4", children: "Restore Database" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-500 mb-6", children: [
              "Select a backup file to restore to the ",
              /* @__PURE__ */ jsx("strong", { children: connections.find((c) => c.id === selectedConnection)?.name }),
              " database."
            ] }),
            /* @__PURE__ */ jsx("div", { className: "bg-red-50 border border-red-200 rounded-md p-4 mb-8", children: /* @__PURE__ */ jsxs("div", { className: "flex", children: [
              /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx(AlertCircle, { className: "h-5 w-5 text-red-500" }) }),
              /* @__PURE__ */ jsxs("div", { className: "ml-3", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-red-800", children: "Warning: Destructive Action" }),
                /* @__PURE__ */ jsx("div", { className: "mt-2 text-sm text-red-700", children: /* @__PURE__ */ jsxs("p", { children: [
                  "Restoring a database will ",
                  /* @__PURE__ */ jsx("strong", { children: "overwrite all existing data" }),
                  " in the selected connection. Make sure you have a current backup before proceeding."
                ] }) })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "overflow-hidden border border-gray-200 sm:rounded-lg", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
              /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Backup File" }),
                /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Details" }),
                /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: backups.length > 0 ? backups.map((backup) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(Server, { className: "h-5 w-5 text-indigo-600" }) }),
                  /* @__PURE__ */ jsxs("div", { className: "ml-4", children: [
                    /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900", children: backup.name }),
                    /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: "System Backup" })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-900", children: backup.date }),
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: backup.size })
                ] }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end space-x-3", children: [
                  /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: route("backups.download", backup.name),
                      className: "text-gray-400 hover:text-gray-600",
                      title: "Download",
                      children: /* @__PURE__ */ jsx(Download, { className: "h-5 w-5" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => handleDeleteBackup(backup.name),
                      className: "text-gray-400 hover:text-red-600",
                      title: "Delete",
                      children: /* @__PURE__ */ jsx(Trash2, { className: "h-5 w-5" })
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "|" }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => handleRestoreBackup(backup.name),
                      disabled: restoreForm.processing,
                      className: "text-indigo-600 hover:text-indigo-900 font-semibold",
                      children: "Restore"
                    }
                  )
                ] }) })
              ] }, backup.name)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "3", className: "px-6 py-10 text-center text-gray-500", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center", children: [
                /* @__PURE__ */ jsx(HardDrive, { className: "h-10 w-10 text-gray-300 mb-2" }),
                /* @__PURE__ */ jsx("p", { children: "No backups available yet." })
              ] }) }) }) })
            ] }) })
          ] }) })
        ] }) }) })
      ]
    }
  );
}
export {
  Backups as default
};
