import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DksizGbA.js";
import { useForm, Head } from "@inertiajs/react";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { T as TextInput } from "./TextInput-Xf9xHrLa.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { Transition } from "@headlessui/react";
import "react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
function EmailConfiguration({ auth, config }) {
  const { data, setData, patch, processing, recentlySuccessful, errors } = useForm({
    driver: config?.driver || "smtp",
    host: config?.host || "",
    port: config?.port || "",
    username: config?.username || "",
    password: config?.password || "",
    // Password remains hidden/placeholder if needed, but for now simple
    encryption: config?.encryption || "tls",
    from_address: config?.from_address || "",
    from_name: config?.from_name || ""
  });
  const submit = (e) => {
    e.preventDefault();
    patch(route("settings.email.update"));
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Email Configuration" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Email Configuration" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "p-6 bg-white border-b border-gray-200", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "mt-6 space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "host", value: "SMTP Host" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "host",
                className: "mt-1 block w-full",
                value: data.host,
                onChange: (e) => setData("host", e.target.value),
                required: true,
                isFocused: true,
                autoComplete: "host"
              }
            ),
            errors.host && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.host })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "port", value: "SMTP Port" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "port",
                className: "mt-1 block w-full",
                value: data.port,
                onChange: (e) => setData("port", e.target.value),
                required: true
              }
            ),
            errors.port && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.port })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "username", value: "SMTP Username" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "username",
                className: "mt-1 block w-full",
                value: data.username,
                onChange: (e) => setData("username", e.target.value)
              }
            ),
            errors.username && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.username })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "SMTP Password" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "password",
                type: "password",
                className: "mt-1 block w-full",
                value: data.password,
                onChange: (e) => setData("password", e.target.value)
              }
            ),
            errors.password && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.password })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "encryption", value: "Encryption (tls/ssl)" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "encryption",
                className: "mt-1 block w-full",
                value: data.encryption,
                onChange: (e) => setData("encryption", e.target.value)
              }
            ),
            errors.encryption && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.encryption })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "from_address", value: "From Address" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "from_address",
                type: "email",
                className: "mt-1 block w-full",
                value: data.from_address,
                onChange: (e) => setData("from_address", e.target.value),
                required: true
              }
            ),
            errors.from_address && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.from_address })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "from_name", value: "From Name" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "from_name",
                className: "mt-1 block w-full",
                value: data.from_name,
                onChange: (e) => setData("from_name", e.target.value),
                required: true
              }
            ),
            errors.from_name && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1", children: errors.from_name })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Save" }),
            /* @__PURE__ */ jsx(
              Transition,
              {
                show: recentlySuccessful,
                enter: "transition ease-in-out",
                enterFrom: "opacity-0",
                leave: "transition ease-in-out",
                leaveTo: "opacity-0",
                children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Saved." })
              }
            )
          ] })
        ] }) }) }) }) })
      ]
    }
  );
}
export {
  EmailConfiguration as default
};
