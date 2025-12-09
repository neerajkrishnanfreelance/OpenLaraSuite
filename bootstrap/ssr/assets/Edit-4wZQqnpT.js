import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { useForm, Head } from "@inertiajs/react";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { T as TextInput, I as InputError } from "./TextInput-mUZk5oTn.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { F as FormPageLayout } from "./FormPageLayout-BSXkqO5l.js";
import { F as FormHeader } from "./FormHeader-CQAGRAnh.js";
import "./Chatter-u8Py1g4n.js";
import "./Checkbox-5PHg8iNz.js";
function Edit({ auth, request: overtimeRequest, chatter_data, meetings_data }) {
  const { data, setData, put, processing, errors } = useForm({
    date: overtimeRequest.date,
    start_time: overtimeRequest.start_time,
    end_time: overtimeRequest.end_time,
    reason: overtimeRequest.reason,
    status: overtimeRequest.status
  });
  const submit = (e) => {
    e.preventDefault();
    put(route("overtime-requests.update", overtimeRequest.id));
  };
  const isApprovable = auth.user.roles.some((r) => ["admin", "manager"].includes(r.name));
  return /* @__PURE__ */ jsxs(
    FormPageLayout,
    {
      chatterData: chatter_data,
      meetingsData: meetings_data,
      chatterableId: overtimeRequest.id,
      chatterableType: "App\\Models\\OvertimeRequest",
      children: [
        /* @__PURE__ */ jsx(FormHeader, { title: "Edit Overtime Request", backRoute: "overtime-requests.index", children: /* @__PURE__ */ jsx(PrimaryButton, { form: "edit-overtime-form", disabled: processing, children: "Update Request" }) }),
        /* @__PURE__ */ jsx(Head, { title: "Edit Overtime Request" }),
        /* @__PURE__ */ jsxs("form", { id: "edit-overtime-form", onSubmit: submit, className: "space-y-6 mt-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
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
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "reason", value: "Reason" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                id: "reason",
                className: "mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm h-32",
                value: data.reason,
                onChange: (e) => setData("reason", e.target.value),
                required: true
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.reason, className: "mt-2" })
          ] }),
          isApprovable && /* @__PURE__ */ jsxs("div", { className: "bg-purple-50 p-4 rounded-lg border border-purple-100", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-purple-900 mb-2", children: "Approval Action" }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
              /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "radio",
                    name: "status",
                    value: "pending",
                    checked: data.status === "pending",
                    onChange: (e) => setData("status", e.target.value),
                    className: "text-purple-600 focus:ring-purple-500"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm text-gray-700", children: "Pending" })
              ] }),
              /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "radio",
                    name: "status",
                    value: "approved",
                    checked: data.status === "approved",
                    onChange: (e) => setData("status", e.target.value),
                    className: "text-purple-600 focus:ring-purple-500"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm text-gray-700", children: "Approve" })
              ] }),
              /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "radio",
                    name: "status",
                    value: "rejected",
                    checked: data.status === "rejected",
                    onChange: (e) => setData("status", e.target.value),
                    className: "text-purple-600 focus:ring-purple-500"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm text-gray-700", children: "Reject" })
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  Edit as default
};
