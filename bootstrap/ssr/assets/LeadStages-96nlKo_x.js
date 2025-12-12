import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { A as Authenticated } from "./AuthenticatedLayout-D5dyBxod.js";
import { useForm, Head } from "@inertiajs/react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { T as TextInput } from "./TextInput-Xf9xHrLa.js";
import { I as InputError } from "./InputError-CBvD_6aD.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { S as SecondaryButton } from "./SecondaryButton-C9TQBbBR.js";
import { M as Modal } from "./Modal-BeSeEOS3.js";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function LeadStages({ auth, stages }) {
  const [showModal, setShowModal] = useState(false);
  const [editingStage, setEditingStage] = useState(null);
  const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
    name: "",
    color: "",
    order: ""
  });
  const openCreateModal = () => {
    setEditingStage(null);
    reset();
    setShowModal(true);
  };
  const openEditModal = (stage) => {
    setEditingStage(stage);
    setData({
      name: stage.name,
      color: stage.color || "",
      order: stage.order || 0
    });
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    reset();
  };
  const submit = (e) => {
    e.preventDefault();
    if (editingStage) {
      put(route("lead-stages.update", editingStage.id), {
        onSuccess: () => closeModal()
      });
    } else {
      post(route("lead-stages.store"), {
        onSuccess: () => closeModal()
      });
    }
  };
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this stage?")) {
      destroy(route("lead-stages.destroy", id));
    }
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Lead Stages" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Lead Stages" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Manage Stages" }),
            /* @__PURE__ */ jsxs(PrimaryButton, { onClick: openCreateModal, children: [
              /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 mr-2" }),
              "Add Stage"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
            /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Name" }),
              /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Color" }),
              /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Order" }),
              /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ jsxs("tbody", { className: "bg-white divide-y divide-gray-200", children: [
              stages.map((stage) => /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium", children: stage.name }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-4 h-4 rounded-full mr-2", style: { backgroundColor: stage.color || "#ccc" } }),
                  stage.color
                ] }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: stage.order }),
                /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: [
                  /* @__PURE__ */ jsx("button", { onClick: () => openEditModal(stage), className: "text-indigo-600 hover:text-indigo-900 mr-3", children: /* @__PURE__ */ jsx(Edit, { className: "w-4 h-4" }) }),
                  /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(stage.id), className: "text-red-600 hover:text-red-900", children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" }) })
                ] })
              ] }, stage.id)),
              stages.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "4", className: "px-6 py-4 text-center text-gray-500", children: "No stages defined." }) })
            ] })
          ] }) })
        ] }) }) }),
        /* @__PURE__ */ jsx(Modal, { show: showModal, onClose: closeModal, children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 mb-4", children: editingStage ? "Edit Stage" : "Create Stage" }),
          /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { forInput: "name", value: "Name" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "name",
                  className: "mt-1 block w-full",
                  value: data.name,
                  onChange: (e) => setData("name", e.target.value),
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
              /* @__PURE__ */ jsx(InputLabel, { forInput: "color", value: "Color (Hex or Class)" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "color",
                  className: "mt-1 block w-full",
                  value: data.color,
                  onChange: (e) => setData("color", e.target.value),
                  placeholder: "#3B82F6"
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.color, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
              /* @__PURE__ */ jsx(InputLabel, { forInput: "order", value: "Order" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "order",
                  type: "number",
                  className: "mt-1 block w-full",
                  value: data.order,
                  onChange: (e) => setData("order", e.target.value)
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.order, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end", children: [
              /* @__PURE__ */ jsx(SecondaryButton, { onClick: closeModal, className: "mr-3", children: "Cancel" }),
              /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: editingStage ? "Update" : "Create" })
            ] })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  LeadStages as default
};
