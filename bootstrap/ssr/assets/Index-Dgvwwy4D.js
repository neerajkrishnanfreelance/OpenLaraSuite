import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-Cre_3-uQ.js";
import { Head, Link, router } from "@inertiajs/react";
import { CheckCircle, Clock } from "lucide-react";
import "react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function Index({ auth, entries }) {
  const handlePost = (id) => {
    router.post(route("expenses.post", id));
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Expense Vouchers" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Expenses" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-end mb-4 gap-2", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("expense-products.index"),
                className: "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded",
                children: "Manage Expense Types"
              }
            ),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("expenses.create"),
                className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
                children: "Log New Expense"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "p-6 text-gray-900", children: [
            /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
              /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Date" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Reference" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Description" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Amount" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Status" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: entries.data.map((entry) => {
                const total = entry.lines.reduce((sum, line) => sum + parseFloat(line.debit), 0);
                return /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: new Date(entry.date).toLocaleDateString() }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: entry.reference }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: entry.notes }),
                  /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-right", children: [
                    "$",
                    total.toFixed(2)
                  ] }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-center", children: entry.state === "posted" ? /* @__PURE__ */ jsxs("span", { className: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 flex items-center gap-1 justify-center", children: [
                    /* @__PURE__ */ jsx(CheckCircle, { className: "w-3 h-3" }),
                    " Posted"
                  ] }) : /* @__PURE__ */ jsxs("span", { className: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 flex items-center gap-1 justify-center", children: [
                    /* @__PURE__ */ jsx(Clock, { className: "w-3 h-3" }),
                    " Draft"
                  ] }) }),
                  /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium", children: [
                    /* @__PURE__ */ jsx(Link, { href: route("accounting.entries.show", entry.id), className: "text-indigo-600 hover:text-indigo-900 mr-4", children: "View" }),
                    entry.state === "draft" && /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => handlePost(entry.id),
                        className: "text-green-600 hover:text-green-900",
                        children: "Post"
                      }
                    )
                  ] })
                ] }, entry.id);
              }) })
            ] }),
            entries.data.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center py-8 text-gray-500", children: "No expenses recorded yet." })
          ] }) })
        ] }) })
      ]
    }
  );
}
export {
  Index as default
};
