import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { A as Authenticated } from "./AuthenticatedLayout-__gkNP0U.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { T as TextInput } from "./TextInput-Xf9xHrLa.js";
import { I as InputError } from "./InputError-CBvD_6aD.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { S as SecondaryButton } from "./SecondaryButton-C9TQBbBR.js";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function Edit({ auth, contact, users = [] }) {
  const { data, setData, put, processing, errors } = useForm({
    name: contact.name || "",
    email: contact.email || "",
    phone: contact.phone || "",
    hourly_rate: contact.hourly_rate || "",
    company: contact.company || "",
    address: contact.address || "",
    description: contact.description || "",
    status: contact.status || "prospect",
    assigned_to: contact.assigned_to || "",
    source: contact.source || "",
    tags: contact.tags || []
  });
  const submit = (e) => {
    e.preventDefault();
    put(route("contacts.update", contact.id));
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsxs("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: [
        "Edit Contact: ",
        contact.name
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `Edit Contact: ${contact.name}` }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-2xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "p-6 bg-white border-b border-gray-200", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
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
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { forInput: "email", value: "Email" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "email",
                type: "email",
                className: "mt-1 block w-full",
                value: data.email,
                onChange: (e) => setData("email", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { forInput: "phone", value: "Phone" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "phone",
                type: "text",
                className: "mt-1 block w-full",
                value: data.phone,
                onChange: (e) => setData("phone", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.phone, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { forInput: "company", value: "Company" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "company",
                type: "text",
                className: "mt-1 block w-full",
                value: data.company,
                onChange: (e) => setData("company", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.company, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { forInput: "hourly_rate", value: "Hourly Rate ($)" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "hourly_rate",
                type: "number",
                step: "0.01",
                className: "mt-1 block w-full",
                value: data.hourly_rate,
                onChange: (e) => setData("hourly_rate", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.hourly_rate, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { forInput: "address", value: "Address" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                id: "description",
                className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                rows: "3",
                value: data.address,
                onChange: (e) => setData("address", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.address, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { forInput: "status", value: "Status" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  id: "status",
                  className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                  value: data.status,
                  onChange: (e) => setData("status", e.target.value),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "prospect", children: "Prospect" }),
                    /* @__PURE__ */ jsx("option", { value: "active", children: "Active" }),
                    /* @__PURE__ */ jsx("option", { value: "converted", children: "Converted" }),
                    /* @__PURE__ */ jsx("option", { value: "lost", children: "Lost" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.status, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { forInput: "assigned_to", value: "Assigned To" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  id: "assigned_to",
                  className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                  value: data.assigned_to,
                  onChange: (e) => setData("assigned_to", e.target.value),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "Unassigned" }),
                    users.map((user) => /* @__PURE__ */ jsx("option", { value: user.id, children: user.name }, user.id))
                  ]
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.assigned_to, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { forInput: "source", value: "Source" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "source",
                  type: "text",
                  className: "mt-1 block w-full",
                  value: data.source,
                  onChange: (e) => setData("source", e.target.value),
                  placeholder: "e.g. Website, Referral"
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.source, className: "mt-2" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end mt-6", children: [
            /* @__PURE__ */ jsx(Link, { href: route("contacts.index"), children: /* @__PURE__ */ jsx(SecondaryButton, { className: "mr-3", children: "Cancel" }) }),
            /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Update Contact" })
          ] })
        ] }) }) }) }) })
      ]
    }
  );
}
export {
  Edit as default
};
