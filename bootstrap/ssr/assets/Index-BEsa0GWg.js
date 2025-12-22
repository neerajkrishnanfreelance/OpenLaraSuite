import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { A as Authenticated } from "./AuthenticatedLayout-DHAmaW8y.js";
import { useForm, Head, router } from "@inertiajs/react";
import { Edit, Trash2, Plus, X } from "lucide-react";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { S as SecondaryButton } from "./SecondaryButton-C9TQBbBR.js";
import { T as TextInput } from "./TextInput-Xf9xHrLa.js";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { I as InputError } from "./InputError-CBvD_6aD.js";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function Index({ auth, media }) {
  const [showModal, setShowModal] = useState(false);
  const [editingMedia, setEditingMedia] = useState(null);
  const { data, setData, post, put, processing, errors, reset } = useForm({
    name: "",
    description: ""
  });
  const openCreateModal = () => {
    reset();
    setEditingMedia(null);
    setShowModal(true);
  };
  const openEditModal = (medium) => {
    setEditingMedia(medium);
    setData({
      name: medium.name,
      description: medium.description || ""
    });
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setEditingMedia(null);
    reset();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingMedia) {
      put(route("media.update", editingMedia.id), {
        preserveScroll: true,
        onSuccess: () => closeModal()
      });
    } else {
      post(route("media.store"), {
        preserveScroll: true,
        onSuccess: () => closeModal()
      });
    }
  };
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this media source?")) {
      router.delete(route("media.destroy", id));
    }
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Media Sources" }),
        /* @__PURE__ */ jsxs(PrimaryButton, { onClick: openCreateModal, children: [
          /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 mr-2" }),
          "Add Media Source"
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Media Sources" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "p-6", children: media && media.length > 0 ? /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Name" }),
            /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Description" }),
            /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: media.map((medium) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50 transition", children: [
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900", children: medium.name }) }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: medium.description || "-" }) }),
            /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => openEditModal(medium),
                  className: "text-indigo-600 hover:text-indigo-900 mr-4 inline-flex items-center",
                  children: /* @__PURE__ */ jsx(Edit, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleDelete(medium.id),
                  className: "text-red-600 hover:text-red-900 inline-flex items-center",
                  children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                }
              )
            ] })
          ] }, medium.id)) })
        ] }) }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-12", children: [
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 mb-4", children: "No media sources found." }),
          /* @__PURE__ */ jsxs(PrimaryButton, { onClick: openCreateModal, children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 mr-2" }),
            "Add Your First Media Source"
          ] })
        ] }) }) }) }) }),
        showModal && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 overflow-y-auto", "aria-labelledby": "modal-title", role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0", children: [
          /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity", "aria-hidden": "true", onClick: closeModal }),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline-block sm:align-middle sm:h-screen", "aria-hidden": "true", children: "​" }),
          /* @__PURE__ */ jsx("div", { className: "inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", id: "modal-title", children: editingMedia ? "Edit Media Source" : "Add Media Source" }),
                /* @__PURE__ */ jsx("button", { type: "button", onClick: closeModal, className: "text-gray-400 hover:text-gray-500", children: /* @__PURE__ */ jsx(X, { className: "h-6 w-6" }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(InputLabel, { forInput: "name", value: "Name" }),
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      id: "name",
                      type: "text",
                      className: "mt-1 block w-full",
                      value: data.name,
                      onChange: (e) => setData("name", e.target.value),
                      required: true
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(InputLabel, { forInput: "description", value: "Description" }),
                  /* @__PURE__ */ jsx(
                    "textarea",
                    {
                      id: "description",
                      className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                      rows: "3",
                      value: data.description,
                      onChange: (e) => setData("description", e.target.value)
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.description, className: "mt-2" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse", children: [
              /* @__PURE__ */ jsx(PrimaryButton, { type: "submit", disabled: processing, className: "ml-3", children: editingMedia ? "Update" : "Create" }),
              /* @__PURE__ */ jsx(SecondaryButton, { type: "button", onClick: closeModal, children: "Cancel" })
            ] })
          ] }) })
        ] }) })
      ]
    }
  );
}
export {
  Index as default
};
