import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { A as Authenticated } from "./AuthenticatedLayout-DHAmaW8y.js";
import { usePage, Head, Link, router } from "@inertiajs/react";
import { Mail, Phone, Send, Edit, Trash2 } from "lucide-react";
import { S as StatusBadge } from "./StatusBadge-CkNaSVC0.js";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function Index({ auth, contacts }) {
  const { flash } = usePage().props;
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      router.delete(route("hr-contacts.destroy", id), {
        onSuccess: () => {
        }
      });
    }
  };
  const handleSendWelcome = (id) => {
    if (confirm("Are you sure you want to send the welcome email?")) {
      router.post(route("hr-contacts.send-welcome", id), {}, {
        onSuccess: () => alert("Welcome email sent!"),
        onError: () => alert("Failed to send email.")
      });
    }
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "HR Contacts" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "HR Contacts" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center mb-6 gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-1" }),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("hr-contacts.create"),
                className: "inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150",
                children: "Add HR Contact"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
            /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Name" }),
              /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Company / Position" }),
              /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Status" }),
              /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Contact Info" }),
              /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: contacts.length > 0 ? contacts.map((contact) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50 transition", children: [
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 h-10 w-10", children: /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg", children: contact.name.charAt(0) }) }),
                /* @__PURE__ */ jsx("div", { className: "ml-4", children: /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900", children: contact.name }) })
              ] }) }),
              /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap", children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-900", children: contact.company || "-" }),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: contact.position || "-" })
              ] }),
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
              /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleSendWelcome(contact.id),
                    className: "text-blue-600 hover:text-blue-900 mr-4 inline-flex items-center",
                    title: "Send Welcome Email",
                    children: /* @__PURE__ */ jsx(Send, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: route("hr-contacts.edit", contact.id),
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
            ] }, contact.id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "5", className: "px-6 py-10 text-center text-gray-500", children: "No HR contacts found." }) }) })
          ] }) }) })
        ] }) })
      ]
    }
  );
}
export {
  Index as default
};
