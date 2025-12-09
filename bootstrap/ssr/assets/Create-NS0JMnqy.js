import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DqVvfPrE.js";
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
function Create({ auth, projects, tasks }) {
  const { data, setData, post, processing, errors } = useForm({
    project_id: "",
    task_id: "",
    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    hours: "",
    description: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("timesheets.store"));
  };
  const availableTasks = data.project_id ? tasks[data.project_id] || [] : [];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsx(FormHeader, { title: "Log Time", backRoute: "timesheets.index", children: /* @__PURE__ */ jsx(PrimaryButton, { form: "create-timesheet-form", disabled: processing, children: "Submit" }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Log Time" }),
        /* @__PURE__ */ jsx(FormPageLayout, { isCreate: true, children: /* @__PURE__ */ jsxs("form", { id: "create-timesheet-form", onSubmit: submit, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "project_id", value: "Project" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                id: "project_id",
                className: "mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm",
                value: data.project_id,
                onChange: (e) => setData("project_id", e.target.value),
                required: true,
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Select Project" }),
                  projects.map((p) => /* @__PURE__ */ jsx("option", { value: p.id, children: p.name }, p.id))
                ]
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.project_id, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "task_id", value: "Task (Optional)" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                id: "task_id",
                className: "mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm",
                value: data.task_id,
                onChange: (e) => setData("task_id", e.target.value),
                disabled: !data.project_id,
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "General Work" }),
                  availableTasks.map((t) => /* @__PURE__ */ jsx("option", { value: t.id, children: t.title }, t.id))
                ]
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.task_id, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 mt-4", children: [
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
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "hours", value: "Hours" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "hours",
                  type: "number",
                  step: "0.5",
                  className: "mt-1 block w-full",
                  value: data.hours,
                  onChange: (e) => setData("hours", e.target.value),
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.hours, className: "mt-2" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "description", value: "Description" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                id: "description",
                className: "mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm",
                value: data.description,
                onChange: (e) => setData("description", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.description, className: "mt-2" })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  Create as default
};
