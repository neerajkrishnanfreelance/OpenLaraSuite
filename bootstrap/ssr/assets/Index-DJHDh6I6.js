import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-CHpdAQnP.js";
import { Head, Link, router } from "@inertiajs/react";
import { DollarSign, Settings, FileText, Calendar, CheckCircle, Clock, ExternalLink } from "lucide-react";
import "react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
const StatCard = ({ title, value, icon: Icon, color }) => /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 flex items-center", children: [
  /* @__PURE__ */ jsx("div", { className: `p-3 rounded-full ${color} bg-opacity-10 mr-4`, children: /* @__PURE__ */ jsx(Icon, { className: `w-8 h-8 ${color.replace("bg-", "text-")}` }) }),
  /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-500", children: title }),
    /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-gray-900", children: value })
  ] })
] });
function Index({ auth, entries, stats }) {
  const handlePost = (id) => {
    router.post(route("expenses.post", id));
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Expense Dashboard" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Expense Dashboard" }),
        /* @__PURE__ */ jsx("div", { className: "py-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6", children: [
          /* @__PURE__ */ jsx("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxs(
              Link,
              {
                href: route("expenses.create"),
                className: "bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded shadow flex items-center gap-2",
                children: [
                  /* @__PURE__ */ jsx(DollarSign, { className: "w-4 h-4" }),
                  " Log Expense"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              Link,
              {
                href: route("expense-products.index"),
                className: "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2 px-4 rounded shadow flex items-center gap-2",
                children: [
                  /* @__PURE__ */ jsx(Settings, { className: "w-4 h-4" }),
                  " Types"
                ]
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
            /* @__PURE__ */ jsx(
              StatCard,
              {
                title: "Today's Spend",
                value: `$${stats.today_total.toLocaleString()}`,
                icon: DollarSign,
                color: "bg-green-500"
              }
            ),
            /* @__PURE__ */ jsx(
              StatCard,
              {
                title: "Today's Vouchers",
                value: stats.today_count,
                icon: FileText,
                color: "bg-blue-500"
              }
            ),
            /* @__PURE__ */ jsx(
              StatCard,
              {
                title: "Month to Date",
                value: `$${stats.month_total.toLocaleString()}`,
                icon: Calendar,
                color: "bg-purple-500"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: [
            /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-b border-gray-200 flex justify-between items-center", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Today's Transactions" }),
              stats.today_count === 0 && /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500", children: "No entries yet today" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "p-0", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
              /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Ref / Date" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Description" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Amount" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Status" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: entries.length > 0 ? entries.map((entry) => {
                const total = entry.lines.reduce((sum, line) => sum + parseFloat(line.debit), 0);
                return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50 transition-colors", children: [
                  /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap", children: [
                    /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900", children: entry.reference || "N/A" }),
                    /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: new Date(entry.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })
                  ] }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-900 truncate max-w-xs", children: entry.notes }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-right", children: /* @__PURE__ */ jsxs("div", { className: "text-sm font-bold text-gray-900", children: [
                    "$",
                    total.toFixed(2)
                  ] }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-center", children: entry.state === "posted" ? /* @__PURE__ */ jsxs("span", { className: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 items-center justify-center gap-1", children: [
                    /* @__PURE__ */ jsx(CheckCircle, { className: "w-3 h-3" }),
                    " Posted"
                  ] }) : entry.state === "cancelled" ? /* @__PURE__ */ jsx("span", { className: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 items-center justify-center gap-1", children: "Cancelled" }) : /* @__PURE__ */ jsxs("span", { className: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 items-center justify-center gap-1", children: [
                    /* @__PURE__ */ jsx(Clock, { className: "w-3 h-3" }),
                    " Draft"
                  ] }) }),
                  /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end gap-2 items-center", children: [
                    /* @__PURE__ */ jsx(
                      Link,
                      {
                        href: route("accounting.entries.show", entry.id),
                        className: "text-gray-400 hover:text-indigo-600 p-1 rounded hover:bg-indigo-50",
                        title: "View Journal Entry",
                        children: /* @__PURE__ */ jsx(ExternalLink, { className: "w-5 h-5" })
                      }
                    ),
                    entry.state === "draft" && /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => handlePost(entry.id),
                        className: "bg-green-50 text-green-600 hover:bg-green-100 px-3 py-1 rounded-full text-xs font-bold border border-green-200",
                        children: "POST"
                      }
                    )
                  ] })
                ] }, entry.id);
              }) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "5", className: "px-6 py-4 text-center text-gray-500 italic", children: "No expenses recorded today." }) }) })
            ] }) })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  Index as default
};
