import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { usePage, useForm } from "@inertiajs/react";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { I as InputError } from "./InputError-CBvD_6aD.js";
import { C as Checkbox } from "./Checkbox-5PHg8iNz.js";
function Chatter({ messages = [], chatterableId, chatterableType }) {
  const { auth } = usePage().props;
  const { data, setData, post, processing, reset, errors } = useForm({
    message: "",
    chatterable_id: chatterableId,
    chatterable_type: chatterableType,
    notify_email: false,
    documents: []
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("chatter.store"), {
      onSuccess: () => {
        reset("message", "documents");
      },
      preserveScroll: true,
      forceFormData: true
    });
  };
  const handleFileChange = (e) => {
    setData("documents", Array.from(e.target.files));
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white shadow sm:rounded-lg p-6 h-full flex flex-col", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-4", children: "Chatter" }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto mb-4 space-y-4 max-h-[600px] pr-2", children: messages.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 text-center py-4", children: "No messages yet." }) : messages.map((msg) => /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("span", { className: "inline-flex items-center justify-center h-8 w-8 rounded-full bg-purple-100", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-medium leading-none text-purple-700", children: msg.user.name.charAt(0) }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-gray-900", children: msg.user.name }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: new Date(msg.created_at).toLocaleString() })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700 whitespace-pre-wrap", children: msg.message }),
        msg.documents && msg.documents.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-2 text-xs flex flex-wrap gap-2", children: msg.documents.map((doc) => /* @__PURE__ */ jsxs(
          "a",
          {
            href: `/storage/${doc.path}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex items-center bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-purple-600 truncate max-w-xs transition-colors",
            children: [
              /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 mr-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" }) }),
              doc.name
            ]
          },
          doc.id
        )) })
      ] })
    ] }, msg.id)) }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "mt-auto", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          "textarea",
          {
            value: data.message,
            onChange: (e) => setData("message", e.target.value),
            className: "w-full border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm",
            rows: "3",
            placeholder: "Type a message...",
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.message, className: "mt-1" })
      ] }),
      data.documents.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-2 text-xs text-gray-600 flex flex-wrap gap-2", children: data.documents.map((f, i) => /* @__PURE__ */ jsxs("span", { className: "bg-gray-100 px-2 py-1 rounded flex items-center", children: [
        /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 mr-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" }) }),
        f.name
      ] }, i)) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
          /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(
              Checkbox,
              {
                name: "notify_email",
                checked: data.notify_email,
                onChange: (e) => setData("notify_email", e.target.checked)
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm text-gray-600", children: "Notify via Email" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "cursor-pointer text-gray-500 hover:text-purple-600 transition-colors", title: "Attach Files", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" }) }),
            /* @__PURE__ */ jsx("input", { type: "file", multiple: true, className: "hidden", onChange: handleFileChange })
          ] })
        ] }),
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, className: "text-xs px-6 py-2 bg-purple-600 border border-transparent rounded-md font-bold text-white uppercase tracking-widest hover:bg-purple-500 active:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition ease-in-out duration-150", children: "POST" })
      ] })
    ] })
  ] });
}
export {
  Chatter as C
};
