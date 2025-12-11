import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-BuXJMMFe.js";
import { usePage, useForm, Head } from "@inertiajs/react";
import { Database, Download, Trash2, HardDrive, AlertCircle } from "lucide-react";
import { useState } from "react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function Backups({ auth, backups }) {
  const { flash } = usePage().props;
  const { post, delete: destroy, processing } = useForm();
  const [confirmingDeletion, setConfirmingDeletion] = useState(false);
  const [backupToDelete, setBackupToDelete] = useState(null);
  const createBackup = () => {
    post(route("backups.store"));
  };
  const deleteBackup = (name) => {
    if (confirm("Are you sure you want to delete this backup?")) {
      destroy(route("backups.destroy", name));
    }
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Database Backups" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Backups" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: [
          flash.success && /* @__PURE__ */ jsx("div", { className: "mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative", role: "alert", children: /* @__PURE__ */ jsx("span", { className: "block sm:inline", children: flash.success }) }),
          flash.error && /* @__PURE__ */ jsx("div", { className: "mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative", role: "alert", children: /* @__PURE__ */ jsx("span", { className: "block sm:inline", children: flash.error }) }),
          /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "p-6 text-gray-900", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Manage Backups" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Create and manage database backups. Backups are stored securely in the server storage." })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: createBackup,
                  disabled: processing,
                  className: "inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150",
                  children: processing ? "Creating..." : "Create New Backup"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
              /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "File Name" }),
                /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Date & Time" }),
                /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Size" }),
                /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: backups.length > 0 ? backups.map((backup) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx(Database, { className: "h-5 w-5 text-gray-400 mr-3" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-900", children: backup.name })
                ] }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: backup.date }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: backup.size }),
                /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: [
                  /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: route("backups.download", backup.name),
                      className: "text-indigo-600 hover:text-indigo-900 mr-4 inline-flex items-center",
                      title: "Download",
                      children: /* @__PURE__ */ jsx(Download, { className: "h-4 w-4" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => deleteBackup(backup.name),
                      className: "text-red-600 hover:text-red-900 inline-flex items-center",
                      title: "Delete",
                      children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
                    }
                  )
                ] })
              ] }, backup.name)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colspan: "4", className: "px-6 py-10 text-center text-gray-500", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center", children: [
                /* @__PURE__ */ jsx(HardDrive, { className: "h-10 w-10 text-gray-300 mb-2" }),
                /* @__PURE__ */ jsx("p", { children: "No backups available yet." })
              ] }) }) }) })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "mt-8 bg-blue-50 border-l-4 border-blue-400 p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex", children: [
              /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx(AlertCircle, { className: "h-5 w-5 text-blue-400" }) }),
              /* @__PURE__ */ jsx("div", { className: "ml-3", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-blue-700", children: [
                /* @__PURE__ */ jsx("strong", { children: "Note:" }),
                " Automated backups keep the last 7 backups by default. You can manually delete older backups if needed to save space."
              ] }) })
            ] }) })
          ] }) })
        ] }) })
      ]
    }
  );
}
export {
  Backups as default
};
