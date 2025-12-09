import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-Cre_3-uQ.js";
import { Head, Link } from "@inertiajs/react";
import { FileText, TrendingUp, TrendingDown, DollarSign, Plus } from "lucide-react";
import "react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function AccountingDashboard({ auth, stats, recent_entries }) {
  const StatCard = ({ icon: Icon, title, value, color, trend }) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsx("div", { className: `p-3 rounded-lg bg-${color}-100`, children: /* @__PURE__ */ jsx(Icon, { className: `w-6 h-6 text-${color}-600` }) }),
      trend && /* @__PURE__ */ jsxs("span", { className: `text-sm font-medium ${trend > 0 ? "text-green-600" : "text-red-600"}`, children: [
        trend > 0 ? "+" : "",
        trend,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsx("h3", { className: "text-sm text-gray-600 mb-1", children: title }),
    /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-gray-900", children: value })
  ] });
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Accounting Dashboard" }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxs(
          Link,
          {
            href: "/accounting/entries/create",
            className: "px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
              "New Journal Entry"
            ]
          }
        ) })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Accounting Dashboard" }),
        /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: [
            /* @__PURE__ */ jsx(
              StatCard,
              {
                icon: FileText,
                title: "Total Accounts",
                value: stats.total_accounts,
                color: "blue"
              }
            ),
            /* @__PURE__ */ jsx(
              StatCard,
              {
                icon: FileText,
                title: "Journal Entries",
                value: stats.total_entries,
                color: "indigo"
              }
            ),
            /* @__PURE__ */ jsx(
              StatCard,
              {
                icon: TrendingUp,
                title: "Draft Entries",
                value: stats.draft_entries,
                color: "yellow"
              }
            ),
            /* @__PURE__ */ jsx(
              StatCard,
              {
                icon: TrendingDown,
                title: "Posted Entries",
                value: stats.posted_entries,
                color: "green"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
              /* @__PURE__ */ jsx("div", { className: "p-3 rounded-lg bg-green-100", children: /* @__PURE__ */ jsx(TrendingUp, { className: "w-6 h-6 text-green-600" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-sm text-gray-600", children: "Total Assets" }),
                /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-gray-900", children: [
                  "$",
                  stats.total_assets?.toLocaleString() || "0.00"
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
              /* @__PURE__ */ jsx("div", { className: "p-3 rounded-lg bg-red-100", children: /* @__PURE__ */ jsx(TrendingDown, { className: "w-6 h-6 text-red-600" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-sm text-gray-600", children: "Total Liabilities" }),
                /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-gray-900", children: [
                  "$",
                  stats.total_liabilities?.toLocaleString() || "0.00"
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
              /* @__PURE__ */ jsx("div", { className: "p-3 rounded-lg bg-blue-100", children: /* @__PURE__ */ jsx(DollarSign, { className: "w-6 h-6 text-blue-600" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-sm text-gray-600", children: "Total Equity" }),
                /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-gray-900", children: [
                  "$",
                  stats.total_equity?.toLocaleString() || "0.00"
                ] })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4 mb-8", children: [
            /* @__PURE__ */ jsxs(
              Link,
              {
                href: "/accounting/accounts",
                className: "bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow",
                children: [
                  /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "Chart of Accounts" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "View and manage accounts" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              Link,
              {
                href: "/accounting/entries",
                className: "bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow",
                children: [
                  /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "Journal Entries" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "View all entries" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              Link,
              {
                href: "/accounting/reports/balance-sheet",
                className: "bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow",
                children: [
                  /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "Balance Sheet" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Assets, Liabilities, Equity" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              Link,
              {
                href: "/accounting/reports/profit-loss",
                className: "bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow",
                children: [
                  /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "Profit & Loss" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Income and Expenses" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow", children: [
            /* @__PURE__ */ jsx("div", { className: "p-6 border-b border-gray-200", children: /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900", children: "Recent Journal Entries" }) }),
            /* @__PURE__ */ jsx("div", { className: "p-6", children: recent_entries && recent_entries.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-4", children: recent_entries.map((entry) => /* @__PURE__ */ jsx(
              Link,
              {
                href: `/accounting/entries/${entry.id}`,
                className: "block p-4 border border-gray-200 rounded-lg hover:bg-gray-50",
                children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900", children: entry.reference || `Entry #${entry.id}` }),
                    /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
                      entry.journal?.name,
                      " • ",
                      new Date(entry.date).toLocaleDateString()
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: `px-2 py-1 text-xs rounded-full ${entry.state === "posted" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`, children: entry.state })
                ] })
              },
              entry.id
            )) }) : /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500 py-8", children: "No journal entries yet. Create your first entry to get started!" }) })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  AccountingDashboard as default
};
