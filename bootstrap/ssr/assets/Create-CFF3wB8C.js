import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { A as Authenticated } from "./AuthenticatedLayout-DksizGbA.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { I as InputError } from "./InputError-CBvD_6aD.js";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { T as TextInput } from "./TextInput-Xf9xHrLa.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function Create({ auth }) {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    status: "Active"
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("hr-contacts.store"));
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Add HR Contact" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Add HR Contact" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "p-6 text-gray-900", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Name" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "name",
                type: "text",
                name: "name",
                value: data.name,
                className: "mt-1 block w-full",
                autoComplete: "name",
                isFocused: true,
                onChange: (e) => setData("name", e.target.value),
                required: true
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "email",
                type: "email",
                name: "email",
                value: data.email,
                className: "mt-1 block w-full",
                autoComplete: "email",
                onChange: (e) => setData("email", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "phone", value: "Phone" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "phone",
                type: "text",
                name: "phone",
                value: data.phone,
                className: "mt-1 block w-full",
                autoComplete: "tel",
                onChange: (e) => setData("phone", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.phone, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "company", value: "Company" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "company",
                type: "text",
                name: "company",
                value: data.company,
                className: "mt-1 block w-full",
                onChange: (e) => setData("company", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.company, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "position", value: "Position" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "position",
                type: "text",
                name: "position",
                value: data.position,
                className: "mt-1 block w-full",
                onChange: (e) => setData("position", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.position, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "status", value: "Status" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                id: "status",
                name: "status",
                value: data.status,
                className: "mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
                onChange: (e) => setData("status", e.target.value),
                children: [
                  /* @__PURE__ */ jsx("option", { value: "Active", children: "Active" }),
                  /* @__PURE__ */ jsx("option", { value: "Contacted", children: "Contacted" }),
                  /* @__PURE__ */ jsx("option", { value: "Hired", children: "Hired" }),
                  /* @__PURE__ */ jsx("option", { value: "Rejected", children: "Rejected" })
                ]
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.status, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end mt-4", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("hr-contacts.index"),
                className: "underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Save Contact" })
          ] })
        ] }) }) }) }) })
      ]
    }
  );
}
export {
  Create as default
};
