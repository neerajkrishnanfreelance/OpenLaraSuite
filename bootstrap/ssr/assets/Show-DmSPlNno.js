import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { A as Authenticated } from "./AuthenticatedLayout-BuXJMMFe.js";
import { Head, Link } from "@inertiajs/react";
import { S as StatusBadge } from "./StatusBadge-CPwNKsS5.js";
import { P as PriorityLabel } from "./PriorityLabel-CPBMCKmp.js";
import { C as ClickableLink } from "./ClickableLink-Du0eMkfO.js";
import { Building, Mail, Phone, MapPin, DollarSign, Briefcase, Edit } from "lucide-react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function Show({ auth, contact, users }) {
  const [activeTab, setActiveTab] = useState("details");
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("h2", { className: "font-semibold text-xl text-gray-800 leading-tight flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Link, { href: route("contacts.index"), className: "text-gray-400 hover:text-gray-600", children: "Contacts" }),
          /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "/" }),
          contact.name
        ] }),
        /* @__PURE__ */ jsxs(
          Link,
          {
            href: route("contacts.edit", contact.id),
            className: "flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium",
            children: [
              /* @__PURE__ */ jsx(Edit, { className: "w-4 h-4 mr-2" }),
              "Edit Contact"
            ]
          }
        )
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `Contact: ${contact.name}` }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-2xl border-2 border-indigo-200", children: contact.name.charAt(0) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: contact.name }),
                /* @__PURE__ */ jsxs("p", { className: "text-gray-500 flex items-center gap-2 mt-1", children: [
                  contact.company && /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(Building, { className: "w-4 h-4" }),
                    " ",
                    contact.company
                  ] }),
                  contact.company && contact.description && /* @__PURE__ */ jsx("span", { children: "•" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm", children: contact.description })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 md:mt-0 flex flex-col items-end gap-2", children: [
              /* @__PURE__ */ jsx(StatusBadge, { status: contact.status }),
              /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-500", children: [
                "Assigned to: ",
                /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-700", children: contact.assigned_user?.name || "Unassigned" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "lg:col-span-1 space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg p-6", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-4 border-b pb-2", children: "Contact Details" }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
                    /* @__PURE__ */ jsx(Mail, { className: "w-5 h-5 text-gray-400 mt-0.5" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 uppercase", children: "Email" }),
                      /* @__PURE__ */ jsx("a", { href: `mailto:${contact.email}`, className: "text-indigo-600 hover:underline", children: contact.email || "-" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
                    /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5 text-gray-400 mt-0.5" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 uppercase", children: "Phone" }),
                      /* @__PURE__ */ jsx("a", { href: `tel:${contact.phone}`, className: "text-gray-700 hover:text-gray-900", children: contact.phone || "-" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
                    /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5 text-gray-400 mt-0.5" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 uppercase", children: "Address" }),
                      /* @__PURE__ */ jsx("p", { className: "text-gray-700 whitespace-pre-wrap", children: contact.address || "-" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "w-5 h-5 text-gray-400 mt-0.5" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 uppercase", children: "Hourly Rate" }),
                      /* @__PURE__ */ jsx("p", { className: "text-gray-700 font-mono", children: contact.hourly_rate ? `$${contact.hourly_rate}` : "-" })
                    ] })
                  ] }),
                  contact.source && /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
                    /* @__PURE__ */ jsx(Briefcase, { className: "w-5 h-5 text-gray-400 mt-0.5" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 uppercase", children: "Source" }),
                      /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: contact.source })
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg p-6", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-gray-900 mb-4", children: "Metadata" }),
                /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-500 space-y-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                    /* @__PURE__ */ jsx("span", { children: "Created By:" }),
                    /* @__PURE__ */ jsx("span", { children: contact.creator?.name || "System" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                    /* @__PURE__ */ jsx("span", { children: "Created At:" }),
                    /* @__PURE__ */ jsx("span", { children: new Date(contact.created_at).toLocaleDateString() })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg overflow-hidden min-h-[500px]", children: [
              /* @__PURE__ */ jsx("div", { className: "border-b border-gray-200", children: /* @__PURE__ */ jsx("nav", { className: "-mb-px flex space-x-8 px-6", "aria-label": "Tabs", children: /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setActiveTab("leads"),
                  className: `${activeTab === "leads" ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`,
                  children: "Leads / Tasks"
                }
              ) }) }),
              /* @__PURE__ */ jsx("div", { className: "p-6", children: activeTab === "leads" && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Leads & Tasks" }),
                  /* @__PURE__ */ jsx(Link, { href: route("tasks.create", { contact_id: contact.id }), children: /* @__PURE__ */ jsx("span", { className: "text-sm text-indigo-600 hover:underline", children: "+ New Lead" }) })
                ] }),
                contact.tasks && contact.tasks.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-4", children: contact.tasks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((task) => /* @__PURE__ */ jsxs("div", { className: "border border-gray-200 rounded-lg p-4 hover:shadow-md transition bg-gray-50", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsx(PriorityLabel, { priority: task.priority }),
                        task.lead_stage && /* @__PURE__ */ jsx("span", { className: "text-xs px-2 py-0.5 rounded-full text-white", style: { backgroundColor: task.lead_stage.color || "#6366f1" }, children: task.lead_stage.name }),
                        /* @__PURE__ */ jsx(ClickableLink, { routeName: "tasks.show", params: task.id, className: "text-lg font-semibold text-gray-900 hover:text-indigo-600", children: task.title })
                      ] }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mt-1 line-clamp-2", children: task.description })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "text-right text-xs text-gray-500", children: [
                      /* @__PURE__ */ jsx("div", { children: new Date(task.created_at).toLocaleDateString() }),
                      /* @__PURE__ */ jsx("div", { className: "mt-1 font-medium", children: task.status.replace("_", " ") })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "mt-3 text-xs text-gray-500 flex justify-between items-center", children: [
                    /* @__PURE__ */ jsxs("span", { children: [
                      "Assigned to: ",
                      task.assigned_user?.name || "Unassigned"
                    ] }),
                    task.expected_revenue && /* @__PURE__ */ jsxs("span", { className: "font-mono text-green-600 font-bold", children: [
                      "$",
                      task.expected_revenue
                    ] })
                  ] })
                ] }, task.id)) }) : /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm text-center py-8", children: "No leads associated with this contact." })
              ] }) })
            ] }) })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  Show as default
};
