import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-CGySncB_.js";
import { useForm, Head } from "@inertiajs/react";
import { I as InputError } from "./InputError-CBvD_6aD.js";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { T as TextInput } from "./TextInput-Xf9xHrLa.js";
import { F as FormHeader } from "./FormHeader-CQAGRAnh.js";
import { F as FormPageLayout } from "./FormPageLayout-CCQJltRs.js";
import "react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
import "./Chatter-QayPlM-X.js";
import "./Checkbox-5PHg8iNz.js";
function Create({ auth }) {
  const { data, setData, post, processing, errors } = useForm({
    date: "",
    start_time: "",
    end_time: "",
    reason: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("overtime-requests.store"));
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsx(FormHeader, { title: "Request Overtime", backRoute: "overtime-requests.index", children: /* @__PURE__ */ jsx(PrimaryButton, { form: "create-overtime-form", disabled: processing, children: "Submit Request" }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Request Overtime" }),
        /* @__PURE__ */ jsx(FormPageLayout, { isCreate: true, children: /* @__PURE__ */ jsxs("form", { id: "create-overtime-form", onSubmit: submit, children: [
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "date", value: "Date" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "date",
                type: "date",
                className: "mt-1 block w-full",
                value: data.date,
                onChange: (e) => setData("date", e.target.value),
                required: true
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.date, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 mt-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "start_time", value: "Start Time" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "start_time",
                  type: "time",
                  className: "mt-1 block w-full",
                  value: data.start_time,
                  onChange: (e) => setData("start_time", e.target.value),
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.start_time, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "end_time", value: "End Time" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "end_time",
                  type: "time",
                  className: "mt-1 block w-full",
                  value: data.end_time,
                  onChange: (e) => setData("end_time", e.target.value),
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.end_time, className: "mt-2" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "reason", value: "Reason" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                id: "reason",
                className: "mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm",
                value: data.reason,
                onChange: (e) => setData("reason", e.target.value),
                required: true
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.reason, className: "mt-2" })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  Create as default
};
