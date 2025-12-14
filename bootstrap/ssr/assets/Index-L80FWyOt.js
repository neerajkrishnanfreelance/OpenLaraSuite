import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-Db-Yuz5f.js";
import { useForm, Head } from "@inertiajs/react";
import { useState } from "react";
import { Edit2, Trash2, X, Plus } from "lucide-react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function Journals({ auth, journals }) {
  const [showModal, setShowModal] = useState(false);
  const [editingJournal, setEditingJournal] = useState(null);
  const { data, setData, post, put, processing, reset, errors } = useForm({
    name: "",
    code: "",
    type: "general",
    description: "",
    is_active: true
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingJournal) {
      put(`/accounting/journals/${editingJournal.id}`, {
        onSuccess: () => {
          setShowModal(false);
          setEditingJournal(null);
          reset();
        }
      });
    } else {
      post("/accounting/journals", {
        onSuccess: () => {
          setShowModal(false);
          reset();
        }
      });
    }
  };
  const handleEdit = (journal) => {
    setEditingJournal(journal);
    setData({
      name: journal.name,
      code: journal.code,
      type: journal.type,
      description: journal.description || "",
      is_active: journal.is_active
    });
    setShowModal(true);
  };
  const handleDelete = (journalId) => {
    if (confirm("Delete this journal? entries belonging to this journal must be deleted first.")) {
      fetch(`/accounting/journals/${journalId}`, {
        method: "DELETE",
        headers: {
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content
        }
      }).then(() => window.location.reload());
    }
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Journals" }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              setEditingJournal(null);
              reset();
              setShowModal(true);
            },
            className: "px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
              "New Journal"
            ]
          }
        )
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Journals Configuration" }),
        /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Code" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Name" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Type" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Status" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: journals.map((journal) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900", children: journal.code }),
            /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: [
              journal.name,
              journal.description && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: journal.description })
            ] }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize", children: journal.type }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("span", { className: `px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${journal.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`, children: journal.is_active ? "Active" : "Inactive" }) }),
            /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleEdit(journal),
                  className: "text-indigo-600 hover:text-indigo-900 mr-4",
                  children: /* @__PURE__ */ jsx(Edit2, { className: "w-4 h-4 inline" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleDelete(journal.id),
                  className: "text-red-600 hover:text-red-900",
                  children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4 inline" })
                }
              )
            ] })
          ] }, journal.id)) })
        ] }) }) }) }) }),
        showModal && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-6 w-full max-w-md", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: editingJournal ? "Edit Journal" : "New Journal" }),
            /* @__PURE__ */ jsx("button", { onClick: () => {
              setShowModal(false);
              setEditingJournal(null);
              reset();
            }, children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }) })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Name *" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: data.name,
                  onChange: (e) => setData("name", e.target.value),
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                  required: true
                }
              ),
              errors.name && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Code * (e.g. VEN)" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: data.code,
                  onChange: (e) => setData("code", e.target.value.toUpperCase()),
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                  maxLength: 10,
                  required: true
                }
              ),
              errors.code && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-xs mt-1", children: errors.code })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Type *" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: data.type,
                  onChange: (e) => setData("type", e.target.value),
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "sale", children: "Sale" }),
                    /* @__PURE__ */ jsx("option", { value: "purchase", children: "Purchase" }),
                    /* @__PURE__ */ jsx("option", { value: "cash", children: "Cash" }),
                    /* @__PURE__ */ jsx("option", { value: "bank", children: "Bank" }),
                    /* @__PURE__ */ jsx("option", { value: "general", children: "General" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Description" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  value: data.description,
                  onChange: (e) => setData("description", e.target.value),
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                  rows: "3"
                }
              )
            ] }),
            editingJournal && /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data.is_active,
                  onChange: (e) => setData("is_active", e.target.checked),
                  className: "mr-2"
                }
              ),
              /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-gray-700", children: "Active" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2 pt-4", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: processing,
                  className: "flex-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700",
                  children: editingJournal ? "Update" : "Create"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setShowModal(false);
                    setEditingJournal(null);
                    reset();
                  },
                  className: "px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300",
                  children: "Cancel"
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
  Journals as default
};
