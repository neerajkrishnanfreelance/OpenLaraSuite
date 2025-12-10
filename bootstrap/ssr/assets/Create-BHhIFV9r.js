import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { A as Authenticated } from "./AuthenticatedLayout-DqVvfPrE.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { T as TextInput } from "./TextInput-Xf9xHrLa.js";
import { I as InputError } from "./InputError-CBvD_6aD.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { S as SecondaryButton } from "./SecondaryButton-C9TQBbBR.js";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function Create({ auth }) {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    email: "",
    phone: "",
    hourly_rate: "",
    company: "",
    address: "",
    description: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("contacts.store"));
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Add Contact" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Add Contact" }),
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
                required: true,
                isFocused: true
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
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end mt-6", children: [
            /* @__PURE__ */ jsx(Link, { href: route("contacts.index"), children: /* @__PURE__ */ jsx(SecondaryButton, { className: "mr-3", children: "Cancel" }) }),
            /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Save Contact" })
          ] })
        ] }) }) }) }) })
      ]
    }
  );
}
export {
  Create as default
};
