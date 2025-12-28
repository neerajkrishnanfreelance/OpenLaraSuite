import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DksizGbA.js";
import { useForm, Head } from "@inertiajs/react";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { T as TextInput } from "./TextInput-Xf9xHrLa.js";
import { T as TextArea } from "./TextArea-DrhkzIc8.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { I as InputError } from "./InputError-CBvD_6aD.js";
import "react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function SendEmail({ auth }) {
  const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
    to: "",
    subject: "",
    body: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("settings.email.post-send"), {
      onSuccess: () => reset()
    });
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Send Test Email" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Send Email" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "p-6 text-gray-900", children: [
          /* @__PURE__ */ jsxs("header", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Compose Email" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Send a test email using your configured SMTP settings." })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6 max-w-2xl", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "to", value: "To Address" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "to",
                  type: "email",
                  className: "mt-1 block w-full",
                  value: data.to,
                  onChange: (e) => setData("to", e.target.value),
                  required: true,
                  placeholder: "recipient@example.com"
                }
              ),
              /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.to })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "subject", value: "Subject" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "subject",
                  type: "text",
                  className: "mt-1 block w-full",
                  value: data.subject,
                  onChange: (e) => setData("subject", e.target.value),
                  required: true,
                  placeholder: "Test Email Subject"
                }
              ),
              /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.subject })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "body", value: "Message Body" }),
              /* @__PURE__ */ jsx(
                TextArea,
                {
                  id: "body",
                  className: "mt-1 block w-full",
                  value: data.body,
                  onChange: (e) => setData("body", e.target.value),
                  required: true,
                  rows: "6",
                  placeholder: "Enter your message here..."
                }
              ),
              /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.body })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Send Email" }),
              recentlySuccessful && /* @__PURE__ */ jsx("p", { className: "text-sm text-green-600", children: "Email sent successfully." })
            ] })
          ] })
        ] }) }) }) })
      ]
    }
  );
}
export {
  SendEmail as default
};
