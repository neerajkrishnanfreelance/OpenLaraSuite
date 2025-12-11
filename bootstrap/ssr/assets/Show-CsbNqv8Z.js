import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-CxZoB_L7.js";
import { Head, router } from "@inertiajs/react";
import { Clock, XCircle, CheckCircle, ArrowLeft, Pencil, FileCheck, Ban, Trash2 } from "lucide-react";
import "react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function ShowJournalEntry({ auth, entry }) {
  const isDraft = entry.state === "draft";
  const isPosted = entry.state === "posted";
  const isCancelled = entry.state === "cancelled";
  const steps = [
    { id: "draft", label: "Draft", icon: Clock },
    { id: "final", label: isCancelled ? "Cancelled" : "Posted", icon: isCancelled ? XCircle : CheckCircle }
    // Dynamic second step
  ];
  const getCurrentStepIndex = () => {
    if (isDraft) return 0;
    return 1;
  };
  const currentStepIndex = getCurrentStepIndex();
  const handlePost = () => {
    router.post(route("accounting.entries.post", entry.id));
  };
  const handleCancel = () => {
    router.post(route("accounting.entries.cancel", entry.id));
  };
  const handleDelete = () => {
    router.delete(route("accounting.entries.destroy", entry.id));
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("h2", { className: "font-semibold text-xl text-gray-800 leading-tight flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("a", { href: route("accounting.entries.index"), className: "text-gray-500 hover:text-gray-700", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-5 h-5" }) }),
          "Journal Entry #",
          entry.id
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: isDraft && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: route("accounting.entries.edit", entry.id),
              className: "px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center gap-2 shadow-sm",
              children: [
                /* @__PURE__ */ jsx(Pencil, { className: "w-4 h-4" }),
                " Edit"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handlePost,
              className: "px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2 shadow-sm",
              children: [
                /* @__PURE__ */ jsx(FileCheck, { className: "w-4 h-4" }),
                " Post"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleCancel,
              className: "px-4 py-2 bg-orange-100 text-orange-700 border border-orange-200 rounded-md hover:bg-orange-200 flex items-center gap-2 shadow-sm",
              children: [
                /* @__PURE__ */ jsx(Ban, { className: "w-4 h-4" }),
                " Cancel"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleDelete,
              className: "px-4 py-2 bg-white border border-red-200 text-red-600 rounded-md hover:bg-red-50 flex items-center gap-2 shadow-sm",
              children: [
                /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" }),
                " Delete"
              ]
            }
          )
        ] }) })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `Entry #${entry.id}` }),
        /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-6 mb-6", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center max-w-2xl mx-auto", children: steps.map((step, index) => {
            const isCompleted = index < currentStepIndex || index === currentStepIndex && !isDraft;
            const isCurrent = index === currentStepIndex;
            const StepIcon = step.icon;
            let colorClass = "text-gray-400 border-gray-300";
            let lineClass = "bg-gray-300";
            if (isCancelled) {
              if (isCompleted || isCurrent) colorClass = "text-red-600 border-red-600";
              lineClass = "bg-red-600";
            } else if (isPosted) {
              if (isCompleted || isCurrent) colorClass = "text-green-600 border-green-600";
              lineClass = "bg-green-600";
            } else {
              if (index === 0) colorClass = "text-blue-600 border-blue-600";
              if (index === 0 && isCurrent) lineClass = "bg-gray-300";
            }
            return /* @__PURE__ */ jsxs("div", { className: "flex-1 flex items-center relative", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center relative z-10 w-full", children: [
                /* @__PURE__ */ jsx("div", { className: `w-10 h-10 rounded-full border-2 flex items-center justify-center bg-white ${colorClass}`, children: /* @__PURE__ */ jsx(StepIcon, { className: "w-6 h-6" }) }),
                /* @__PURE__ */ jsx("span", { className: `mt-2 text-sm font-medium ${isCurrent || isCompleted ? "text-gray-900" : "text-gray-500"}`, children: step.label })
              ] }),
              index < steps.length - 1 && /* @__PURE__ */ jsx("div", { className: `absolute top-5 left-1/2 w-full h-1 -translate-y-1/2 -z-0 ${isCompleted ? lineClass : "bg-gray-300"}` })
            ] }, step.id);
          }) }) }),
          /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6", children: /* @__PURE__ */ jsxs("div", { className: "p-6 border-b border-gray-200", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-500", children: "Journal" }),
                /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-900", children: entry.journal?.name })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-500", children: "Reference" }),
                /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-900", children: entry.reference || "-" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-500", children: "Date" }),
                /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-900", children: new Date(entry.date).toLocaleDateString() })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-500", children: "Created By" }),
                /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-900", children: entry.created_by?.name || "Unknown" })
              ] })
            ] }),
            entry.notes && /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-500", children: "Notes" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-900", children: entry.notes })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: [
            /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900", children: "Line Items" }),
              /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-500", children: [
                entry.lines?.length || 0,
                " lines"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
              /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Account" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Description" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Debit" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Credit" })
              ] }) }),
              /* @__PURE__ */ jsxs("tbody", { className: "bg-white divide-y divide-gray-200", children: [
                entry.lines && entry.lines.map((line) => /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium", children: [
                    line.account?.code,
                    " - ",
                    line.account?.name
                  ] }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm text-gray-500", children: line.description }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900", children: parseFloat(line.debit) !== 0 ? `$${parseFloat(line.debit).toFixed(2)}` : "-" }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900", children: parseFloat(line.credit) !== 0 ? `$${parseFloat(line.credit).toFixed(2)}` : "-" })
                ] }, line.id)),
                /* @__PURE__ */ jsxs("tr", { className: "bg-gray-50 font-semibold border-t-2 border-gray-200", children: [
                  /* @__PURE__ */ jsx("td", { colSpan: "2", className: "px-6 py-4 text-right text-sm text-gray-900", children: "Totals:" }),
                  /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900", children: [
                    "$",
                    entry.lines?.reduce((sum, line) => sum + parseFloat(line.debit || 0), 0).toFixed(2)
                  ] }),
                  /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900", children: [
                    "$",
                    entry.lines?.reduce((sum, line) => sum + parseFloat(line.credit || 0), 0).toFixed(2)
                  ] })
                ] })
              ] })
            ] }) })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  ShowJournalEntry as default
};
