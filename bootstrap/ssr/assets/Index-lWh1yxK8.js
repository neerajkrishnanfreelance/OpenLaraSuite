import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { A as Authenticated } from "./AuthenticatedLayout-DkmIA3xH.js";
import { Link, usePage, Head, router } from "@inertiajs/react";
import { Search, Plus, Mail, Phone, ExternalLink, Edit, Trash2 } from "lucide-react";
import { S as StatusBadge } from "./StatusBadge-CPwNKsS5.js";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function Pagination({ links, className = "" }) {
  if (links.length === 3) return null;
  return /* @__PURE__ */ jsx("div", { className: `flex flex-wrap -mb-1 ${className}`, children: links.map((link, key) => link.url === null ? /* @__PURE__ */ jsx(
    "div",
    {
      className: "mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded",
      dangerouslySetInnerHTML: { __html: link.label }
    },
    key
  ) : /* @__PURE__ */ jsx(
    Link,
    {
      className: `mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-indigo-500 focus:text-indigo-500 ${link.active ? "bg-indigo-600 text-white" : "bg-white text-gray-700"}`,
      href: link.url,
      dangerouslySetInnerHTML: { __html: link.label }
    },
    key
  )) });
}
function Index({ auth, contacts, filters, users = [] }) {
  const { flash } = usePage().props;
  const [search, setSearch] = React.useState(filters.search || "");
  const [status, setStatus] = React.useState(filters.status || "");
  const [assignedTo, setAssignedTo] = React.useState(filters.assigned_to || "");
  const handleSearch = (e) => {
    if (e) e.preventDefault();
    router.get(route("contacts.index"), { search, status, assigned_to: assignedTo }, { preserveState: true, replace: true });
  };
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (status !== (filters.status || "") || assignedTo !== (filters.assigned_to || "")) {
        handleSearch();
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [status, assignedTo]);
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      router.delete(route("contacts.destroy", id), {
        onSuccess: () => {
        }
      });
    }
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Contacts" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Contacts" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: [
          flash.success && /* @__PURE__ */ jsx("div", { className: "mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative", children: flash.success }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center mb-6 gap-4", children: [
            /* @__PURE__ */ jsxs("form", { onSubmit: handleSearch, className: "flex flex-wrap gap-2 w-full md:w-auto", children: [
              /* @__PURE__ */ jsxs("div", { className: "relative text-gray-600 focus-within:text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "absolute inset-y-0 left-0 flex items-center pl-2", children: /* @__PURE__ */ jsx(Search, { className: "h-5 w-5" }) }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    name: "search",
                    className: "py-2 text-sm text-gray-900 bg-white rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900 border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500",
                    placeholder: "Search...",
                    value: search,
                    onChange: (e) => setSearch(e.target.value),
                    onBlur: handleSearch
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: status,
                  onChange: (e) => setStatus(e.target.value),
                  className: "py-2 text-sm text-gray-900 bg-white rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "All Statuses" }),
                    /* @__PURE__ */ jsx("option", { value: "prospect", children: "Prospect" }),
                    /* @__PURE__ */ jsx("option", { value: "active", children: "Active" }),
                    /* @__PURE__ */ jsx("option", { value: "converted", children: "Converted" }),
                    /* @__PURE__ */ jsx("option", { value: "lost", children: "Lost" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: assignedTo,
                  onChange: (e) => setAssignedTo(e.target.value),
                  className: "py-2 text-sm text-gray-900 bg-white rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "All Assigned" }),
                    users.map((u) => /* @__PURE__ */ jsx("option", { value: u.id, children: u.name }, u.id))
                  ]
                }
              ),
              /* @__PURE__ */ jsx("button", { type: "submit", className: "px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition", children: "Filter" })
            ] }),
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
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: [
            /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
              /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Name" }),
                /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Status" }),
                /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Contact Info" }),
                /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Assigned To" }),
                /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Hourly Rate" }),
                /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: contacts.data.length > 0 ? contacts.data.map((contact) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50 transition", children: [
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 h-10 w-10", children: /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 font-bold text-lg", children: contact.name.charAt(0) }) }),
                  /* @__PURE__ */ jsxs("div", { className: "ml-4", children: [
                    /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900", children: /* @__PURE__ */ jsx(Link, { href: route("contacts.show", contact.id), className: "hover:text-indigo-600 hover:underline", children: contact.name }) }),
                    /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: contact.company || "" })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx(StatusBadge, { status: contact.status }) }),
                /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap", children: [
                  /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-900 flex items-center mb-1", children: [
                    /* @__PURE__ */ jsx(Mail, { className: "w-3 h-3 mr-2 text-gray-400" }),
                    contact.email || "-"
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-500 flex items-center", children: [
                    /* @__PURE__ */ jsx(Phone, { className: "w-3 h-3 mr-2 text-gray-400" }),
                    contact.phone || "-"
                  ] })
                ] }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: contact.assigned_user ? contact.assigned_user.name : /* @__PURE__ */ jsx("span", { className: "text-gray-400 italic", children: "Unassigned" }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold", children: contact.hourly_rate ? `$${contact.hourly_rate}/hr` : "-" }),
                /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: [
                  /* @__PURE__ */ jsx(
                    Link,
                    {
                      href: route("contacts.show", contact.id),
                      className: "text-gray-600 hover:text-gray-900 mr-4 inline-flex items-center",
                      title: "View Dashboard",
                      children: /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Link,
                    {
                      href: route("contacts.edit", contact.id),
                      className: "text-indigo-600 hover:text-indigo-900 mr-4 inline-flex items-center",
                      children: /* @__PURE__ */ jsx(Edit, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => handleDelete(contact.id),
                      className: "text-red-600 hover:text-red-900 inline-flex items-center",
                      children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                    }
                  )
                ] })
              ] }, contact.id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "5", className: "px-6 py-10 text-center text-gray-500", children: "No contacts found." }) }) })
            ] }) }),
            /* @__PURE__ */ jsx(Pagination, { class: "mt-6", links: contacts.links })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  Index as default
};
