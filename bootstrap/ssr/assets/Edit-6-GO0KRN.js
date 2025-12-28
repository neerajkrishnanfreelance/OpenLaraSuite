import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useForm, router, Head } from "@inertiajs/react";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { T as TextInput } from "./TextInput-Xf9xHrLa.js";
import { I as InputError } from "./InputError-CBvD_6aD.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { F as FormPageLayout } from "./FormPageLayout-CCQJltRs.js";
import { F as FormHeader } from "./FormHeader-CQAGRAnh.js";
import "./Chatter-QayPlM-X.js";
import "./Checkbox-5PHg8iNz.js";
function TimeInput12Hour({ value, onChange, className = "", id, required }) {
  const parseTime = (timeStr) => {
    if (!timeStr) return { hour: "12", minute: "00", period: "AM" };
    const [h, m] = timeStr.split(":");
    let hourInt = parseInt(h);
    const minute = m || "00";
    const period = hourInt >= 12 ? "PM" : "AM";
    let hour12 = hourInt % 12;
    if (hour12 === 0) hour12 = 12;
    return {
      hour: hour12.toString(),
      minute,
      period
    };
  };
  const [timeState, setTimeState] = useState(parseTime(value));
  useEffect(() => {
    setTimeState(parseTime(value));
  }, [value]);
  const handleChange = (part, newVal) => {
    let newState = { ...timeState, [part]: newVal };
    setTimeState(newState);
    let h = parseInt(newState.hour || "0");
    const m = newState.minute || "00";
    if (newState.period === "PM" && h !== 12) h += 12;
    if (newState.period === "AM" && h === 12) h = 0;
    const hStr = h.toString().padStart(2, "0");
    const mStr = m.toString().padStart(2, "0");
    onChange(`${hStr}:${mStr}`);
  };
  return /* @__PURE__ */ jsxs("div", { className: `flex items-center space-x-2 ${className}`, children: [
    /* @__PURE__ */ jsx("div", { className: "relative w-20", children: /* @__PURE__ */ jsx(
      "input",
      {
        id: id ? `${id}_hour` : void 0,
        type: "number",
        min: "1",
        max: "12",
        className: "w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-center",
        placeholder: "HH",
        value: timeState.hour,
        onChange: (e) => {
          let val = e.target.value;
          if (parseInt(val) > 12) val = "12";
          if (parseInt(val) < 1) val = "1";
          handleChange("hour", val);
        },
        onBlur: (e) => {
          let val = parseInt(e.target.value || "12");
          if (val < 1) val = 1;
          if (val > 12) val = 12;
          handleChange("hour", val.toString());
        },
        required
      }
    ) }),
    /* @__PURE__ */ jsx("span", { className: "text-gray-500 font-bold", children: ":" }),
    /* @__PURE__ */ jsx("div", { className: "relative w-20", children: /* @__PURE__ */ jsx(
      "input",
      {
        id: id ? `${id}_minute` : void 0,
        type: "number",
        min: "0",
        max: "59",
        className: "w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-center",
        placeholder: "MM",
        value: timeState.minute,
        onChange: (e) => {
          let val = e.target.value;
          if (parseInt(val) > 59) val = "59";
          if (parseInt(val) < 0) val = "0";
          handleChange("minute", val);
        },
        onBlur: (e) => {
          let val = parseInt(e.target.value || "0");
          const valStr = val.toString().padStart(2, "0");
          handleChange("minute", valStr);
        },
        required
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "relative w-24", children: /* @__PURE__ */ jsxs(
      "select",
      {
        id: id ? `${id}_period` : void 0,
        className: "w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500",
        value: timeState.period,
        onChange: (e) => handleChange("period", e.target.value),
        children: [
          /* @__PURE__ */ jsx("option", { value: "AM", children: "AM" }),
          /* @__PURE__ */ jsx("option", { value: "PM", children: "PM" })
        ]
      }
    ) })
  ] });
}
function Edit({ auth, timesheet, projects, tasks, chatter_data, meetings_data }) {
  const extractTime = (datetime) => {
    if (!datetime) return "";
    if (typeof datetime === "string" && datetime.match(/^\d{2}:\d{2}$/)) {
      return datetime;
    }
    if (typeof datetime === "string") {
      const date = new Date(datetime);
      if (!isNaN(date.getTime())) {
        return date.toTimeString().substring(0, 5);
      }
      const timeMatch = datetime.match(/(\d{2}):(\d{2})/);
      if (timeMatch) {
        return `${timeMatch[1]}:${timeMatch[2]}`;
      }
    }
    return "";
  };
  const extractDate = (date) => {
    if (!date) return "";
    if (typeof date === "string" && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return date;
    }
    const dateObj = new Date(date);
    if (!isNaN(dateObj.getTime())) {
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return "";
  };
  const { data, setData, put, processing, errors } = useForm({
    project_id: timesheet.project_id,
    task_id: timesheet.task_id || "",
    date: extractDate(timesheet.date),
    start_time: extractTime(timesheet.start_time),
    end_time: extractTime(timesheet.end_time),
    hours: timesheet.hours,
    description: timesheet.description,
    status: timesheet.status,
    is_overtime: Boolean(timesheet.is_overtime)
  });
  const [availableTasks, setAvailableTasks] = useState([]);
  useEffect(() => {
    if (data.project_id && tasks[data.project_id]) {
      setAvailableTasks(tasks[data.project_id]);
    } else {
      setAvailableTasks([]);
    }
  }, [data.project_id, tasks]);
  useEffect(() => {
    if (data.start_time && data.end_time) {
      const d1 = /* @__PURE__ */ new Date(`2000-01-01T${data.start_time}`);
      const d2 = /* @__PURE__ */ new Date(`2000-01-01T${data.end_time}`);
      if (!isNaN(d1.getTime()) && !isNaN(d2.getTime())) {
        if (d2 < d1) {
          d2.setDate(d2.getDate() + 1);
        }
        const diffMs = d2 - d1;
        const hours = (diffMs / (1e3 * 60 * 60)).toFixed(2);
        if (!isNaN(hours) && hours >= 0) {
          setData((d) => ({ ...d, hours }));
        }
      }
    }
  }, [data.start_time, data.end_time]);
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
        /* @__PURE__ */ jsx(FormHeader, { title: "Edit Timesheet", backRoute: "timesheets.index", children: /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                if (confirm("Are you sure you want to delete this timesheet?")) {
                  router.delete(route("timesheets.destroy", timesheet.id));
                }
              },
              className: "inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150",
              children: "Delete"
            }
          ),
          /* @__PURE__ */ jsx(PrimaryButton, { form: "edit-timesheet-form", disabled: processing, children: "Update Timesheet" })
        ] }) }),
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
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "hours", value: "Duration (Hours)" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "hours",
                  type: "number",
                  step: "0.01",
                  min: "0.01",
                  max: "24",
                  className: "mt-1 block w-full bg-gray-50",
                  value: data.hours,
                  onChange: (e) => setData("hours", e.target.value),
                  readOnly: !!(data.start_time && data.end_time)
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.hours, className: "mt-2" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "start_time", value: "Start Time (Optional)" }),
              /* @__PURE__ */ jsx(
                TimeInput12Hour,
                {
                  id: "start_time",
                  className: "mt-1 block w-full",
                  value: data.start_time,
                  onChange: (val) => setData("start_time", val)
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.start_time, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "end_time", value: "End Time (Optional)" }),
              /* @__PURE__ */ jsx(
                TimeInput12Hour,
                {
                  id: "end_time",
                  className: "mt-1 block w-full",
                  value: data.end_time,
                  onChange: (val) => setData("end_time", val)
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.end_time, className: "mt-2" })
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
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("label", { className: "flex items-center cursor-pointer", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                className: "rounded border-gray-300 text-purple-600 shadow-sm focus:ring-purple-500",
                checked: data.is_overtime,
                onChange: (e) => setData("is_overtime", e.target.checked)
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm text-gray-700 font-medium", children: "Mark as Overtime" })
          ] }) }),
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
