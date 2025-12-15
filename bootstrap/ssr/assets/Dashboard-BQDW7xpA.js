import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { A as Authenticated } from "./AuthenticatedLayout-CHpdAQnP.js";
import { Head, Link } from "@inertiajs/react";
import { Users, TrendingUp, CheckCircle, DollarSign, ArrowRight, Plus } from "lucide-react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function Dashboard({ auth, kpis, recentContacts, leadsByStage, recentActivities }) {
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "CRM Dashboard" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "CRM Dashboard" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-blue-500", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-600 uppercase tracking-wider", children: "Total Contacts" }),
                /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-gray-900 mt-2", children: kpis.totalContacts })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "bg-blue-100 p-3 rounded-full", children: /* @__PURE__ */ jsx(Users, { className: "h-8 w-8 text-blue-600" }) })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-yellow-500", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-600 uppercase tracking-wider", children: "Active Leads" }),
                /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-gray-900 mt-2", children: kpis.activeLeads })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "bg-yellow-100 p-3 rounded-full", children: /* @__PURE__ */ jsx(TrendingUp, { className: "h-8 w-8 text-yellow-600" }) })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-green-500", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-600 uppercase tracking-wider", children: "Converted Leads" }),
                /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-gray-900 mt-2", children: kpis.convertedLeads })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "bg-green-100 p-3 rounded-full", children: /* @__PURE__ */ jsx(CheckCircle, { className: "h-8 w-8 text-green-600" }) })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-purple-500", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-600 uppercase tracking-wider", children: "Revenue Pipeline" }),
                /* @__PURE__ */ jsxs("p", { className: "text-3xl font-bold text-gray-900 mt-2", children: [
                  "$",
                  kpis.revenuePipeline?.toLocaleString() || 0
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "bg-purple-100 p-3 rounded-full", children: /* @__PURE__ */ jsx(DollarSign, { className: "h-8 w-8 text-purple-600" }) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: [
              /* @__PURE__ */ jsxs("div", { className: "p-6 border-b border-gray-200 flex justify-between items-center", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-800", children: "Recent Contacts" }),
                /* @__PURE__ */ jsxs(
                  Link,
                  {
                    href: route("contacts.index"),
                    className: "text-sm text-indigo-600 hover:text-indigo-800 flex items-center",
                    children: [
                      "View All ",
                      /* @__PURE__ */ jsx(ArrowRight, { className: "ml-1 h-4 w-4" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "p-6", children: recentContacts && recentContacts.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-4", children: recentContacts.map((contact) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-3 border-b border-gray-100 last:border-0", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg mr-3", children: contact.name.charAt(0) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(
                      Link,
                      {
                        href: route("contacts.show", contact.id),
                        className: "font-medium text-gray-900 hover:text-indigo-600",
                        children: contact.name
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: contact.company || "No company" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "text-right", children: /* @__PURE__ */ jsx("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${contact.status === "active" ? "bg-green-100 text-green-800" : contact.status === "prospect" ? "bg-yellow-100 text-yellow-800" : contact.status === "converted" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`, children: contact.status }) })
              ] }, contact.id)) }) : /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-center py-8", children: "No recent contacts" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: [
              /* @__PURE__ */ jsxs("div", { className: "p-6 border-b border-gray-200 flex justify-between items-center", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-800", children: "Leads by Stage" }),
                /* @__PURE__ */ jsxs(
                  Link,
                  {
                    href: route("crm.leads"),
                    className: "text-sm text-indigo-600 hover:text-indigo-800 flex items-center",
                    children: [
                      "View Pipeline ",
                      /* @__PURE__ */ jsx(ArrowRight, { className: "ml-1 h-4 w-4" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "p-6", children: leadsByStage && leadsByStage.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-3", children: leadsByStage.map((stage, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center flex-1", children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "w-3 h-3 rounded-full mr-3",
                      style: { backgroundColor: stage.color || "#6366f1" }
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-700", children: stage.name })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-gray-900 mr-2", children: stage.count }),
                  /* @__PURE__ */ jsx("div", { className: "w-24 bg-gray-200 rounded-full h-2", children: /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "h-2 rounded-full",
                      style: {
                        width: `${leadsByStage.reduce((sum, s) => sum + s.count, 0) > 0 ? stage.count / leadsByStage.reduce((sum, s) => sum + s.count, 0) * 100 : 0}%`,
                        backgroundColor: stage.color || "#6366f1"
                      }
                    }
                  ) })
                ] })
              ] }, index)) }) : /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-center py-8", children: "No leads data available" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-800 mb-4", children: "Quick Actions" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4", children: [
              /* @__PURE__ */ jsxs(
                Link,
                {
                  href: route("contacts.create"),
                  className: "inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150",
                  children: [
                    /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 mr-2" }),
                    "Add Contact"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  href: route("tasks.create"),
                  className: "inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 active:bg-green-900 focus:outline-none focus:border-green-900 focus:ring ring-green-300 disabled:opacity-25 transition ease-in-out duration-150",
                  children: [
                    /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 mr-2" }),
                    "Add Lead"
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: route("crm.leads"),
                  className: "inline-flex items-center px-4 py-2 bg-purple-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-purple-700 active:bg-purple-900 focus:outline-none focus:border-purple-900 focus:ring ring-purple-300 disabled:opacity-25 transition ease-in-out duration-150",
                  children: "View Pipeline"
                }
              )
            ] })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  Dashboard as default
};
