import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { A as Authenticated } from "./AuthenticatedLayout-DHAmaW8y.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { I as InputError } from "./InputError-CBvD_6aD.js";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { T as TextInput } from "./TextInput-Xf9xHrLa.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import "./TextArea-DrhkzIc8.js";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function Create({ auth }) {
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    summary: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("resumes.store"));
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Create Resume" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Create Resume" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "p-6 text-gray-900", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "title", value: "Resume Title" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "title",
                type: "text",
                name: "title",
                value: data.title,
                className: "mt-1 block w-full",
                placeholder: "e.g. Software Engineer Resume 2024",
                isFocused: true,
                onChange: (e) => setData("title", e.target.value),
                required: true
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.title, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "summary", value: "Professional Summary" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                id: "summary",
                name: "summary",
                value: data.summary,
                className: "mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm h-32",
                placeholder: "Brief overview of your professional background...",
                onChange: (e) => setData("summary", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.summary, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end mt-4", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("resumes.index"),
                className: "underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Create & Start Building" })
          ] })
        ] }) }) }) }) })
      ]
    }
  );
}
export {
  Create as default
};
