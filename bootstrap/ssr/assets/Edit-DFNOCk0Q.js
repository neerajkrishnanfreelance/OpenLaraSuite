import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useForm, Head } from "@inertiajs/react";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { I as InputError, T as TextInput } from "./TextInput-mUZk5oTn.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { F as FormPageLayout } from "./FormPageLayout-BSXkqO5l.js";
import { F as FormHeader } from "./FormHeader-CQAGRAnh.js";
import "./Chatter-u8Py1g4n.js";
import "./Checkbox-5PHg8iNz.js";
function Edit({ auth, timesheet, projects, tasks, chatter_data, meetings_data }) {
  const { data, setData, put, processing, errors } = useForm({
    project_id: timesheet.project_id,
    task_id: timesheet.task_id || "",
    date: timesheet.date,
    hours: timesheet.hours,
    description: timesheet.description,
    status: timesheet.status
  });
  const [availableTasks, setAvailableTasks] = useState([]);
  useEffect(() => {
    if (data.project_id && tasks[data.project_id]) {
      setAvailableTasks(tasks[data.project_id]);
    } else {
      setAvailableTasks([]);
    }
  }, [data.project_id, tasks]);
  const submit = (e) => {
    e.preventDefault();
    put(route("timesheets.update", timesheet.id));
  };
  const isApprovable = auth.user.roles.some((r) => ["admin", "manager"].includes(r.name));
  return /* @__PURE__ */ jsxs(
    FormPageLayout,
    {
      chatterData: chatter_data,
      meetingsData: meetings_data,
      chatterableId: timesheet.id,
      chatterableType: "App\\Models\\Timesheet",
      children: [
        /* @__PURE__ */ jsx(FormHeader, { title: "Edit Timesheet", backRoute: "timesheets.index", children: /* @__PURE__ */ jsx(PrimaryButton, { form: "edit-timesheet-form", disabled: processing, children: "Update Timesheet" }) }),
        /* @__PURE__ */ jsx(Head, { title: "Edit Timesheet" }),
        /* @__PURE__ */ jsxs("form", { id: "edit-timesheet-form", onSubmit: submit, className: "space-y-6 mt-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "project_id", value: "Project" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  id: "project_id",
                  className: "mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm",
                  value: data.project_id,
                  onChange: (e) => {
                    setData((data2) => ({ ...data2, project_id: e.target.value, task_id: "" }));
                  },
                  required: true,
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "Select Project" }),
                    projects.map((p) => /* @__PURE__ */ jsx("option", { value: p.id, children: p.name }, p.id))
                  ]
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.project_id, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
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
                    /* @__PURE__ */ jsx("option", { value: "", children: "Select Task" }),
                    availableTasks.map((t) => /* @__PURE__ */ jsx("option", { value: t.id, children: t.title }, t.id))
                  ]
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.task_id, className: "mt-2" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
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
                  step: "0.1",
                  min: "0.5",
                  max: "24",
                  className: "mt-1 block w-full",
                  value: data.hours,
                  onChange: (e) => setData("hours", e.target.value),
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.hours, className: "mt-2" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "description", value: "Description" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                id: "description",
                className: "mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm h-32",
                value: data.description,
                onChange: (e) => setData("description", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.description, className: "mt-2" })
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
