import { jsx, jsxs } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-hQdgXqic.js";
import { useForm, Head, router } from "@inertiajs/react";
import { F as FormHeader } from "./FormHeader-CQAGRAnh.js";
import { F as FormPageLayout } from "./FormPageLayout-BSXkqO5l.js";
import { T as TaskStepper } from "./TaskStepper-BXoRKmiq.js";
import { Clock } from "lucide-react";
import { M as Modal } from "./Modal-BeSeEOS3.js";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { I as InputError, T as TextInput } from "./TextInput-mUZk5oTn.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { S as SecondaryButton } from "./SecondaryButton-C9TQBbBR.js";
import { useEffect, useState } from "react";
import { C as CreateMeetingModal } from "./CreateMeetingModal-BpL3dkvm.js";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
import "./Chatter-u8Py1g4n.js";
import "./Checkbox-5PHg8iNz.js";
function CreateTimesheetModal({ show, onClose, taskId, users = [] }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    user_id: "",
    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    start_time: "",
    end_time: "",
    hours: "",
    description: "",
    is_overtime: false
  });
  useEffect(() => {
    if (data.start_time && data.end_time) {
      const start = /* @__PURE__ */ new Date(`2000-01-01T${data.start_time}`);
      const end = /* @__PURE__ */ new Date(`2000-01-01T${data.end_time}`);
      const diffMs = end - start;
      const diffHours = diffMs / (1e3 * 60 * 60);
      if (diffHours > 0) {
        setData("hours", diffHours.toFixed(2));
      }
    }
  }, [data.start_time, data.end_time]);
  const submit = (e) => {
    e.preventDefault();
    post(route("tasks.timesheets.store", taskId), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        onClose();
      }
    });
  };
  const handleClose = () => {
    reset();
    onClose();
  };
  return /* @__PURE__ */ jsx(Modal, { show, onClose: handleClose, maxWidth: "2xl", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "p-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-gray-900 mb-6", children: "Add Timesheet Entry" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "user_id", value: "User *" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              id: "user_id",
              className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
              value: data.user_id,
              onChange: (e) => setData("user_id", e.target.value),
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Select User" }),
                users.map((user) => /* @__PURE__ */ jsx("option", { value: user.id, children: user.name }, user.id))
              ]
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.user_id, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "date", value: "Date *" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "date",
              type: "date",
              className: "mt-1 block w-full",
              value: data.date,
              onChange: (e) => setData("date", e.target.value)
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.date, className: "mt-2" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "start_time", value: "Start Time" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "start_time",
              type: "time",
              className: "mt-1 block w-full",
              value: data.start_time,
              onChange: (e) => setData("start_time", e.target.value)
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.start_time, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "end_time", value: "End Time" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "end_time",
              type: "time",
              className: "mt-1 block w-full",
              value: data.end_time,
              onChange: (e) => setData("end_time", e.target.value)
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.end_time, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "hours", value: "Hours *" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "hours",
              type: "number",
              step: "0.25",
              min: "0.25",
              max: "24",
              className: "mt-1 block w-full",
              value: data.hours,
              onChange: (e) => setData("hours", e.target.value),
              placeholder: "Auto-calculated"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.hours, className: "mt-2" }),
          data.start_time && data.end_time && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-gray-500", children: "Auto-calculated from time range" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { forInput: "description", value: "Description (Optional)" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            id: "description",
            className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
            rows: "3",
            value: data.description,
            onChange: (e) => setData("description", e.target.value),
            placeholder: "What did you work on?"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.description, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center cursor-pointer", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            className: "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500",
            checked: data.is_overtime,
            onChange: (e) => setData("is_overtime", e.target.checked)
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm text-gray-700 font-medium", children: "Mark as Overtime" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end space-x-3", children: [
      /* @__PURE__ */ jsx(SecondaryButton, { type: "button", onClick: handleClose, children: "Cancel" }),
      /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: processing ? "Saving..." : "Save Entry" })
    ] })
  ] }) });
}
function TimesheetEntry({ task, timesheets = [], users = [] }) {
  const [showModal, setShowModal] = useState(false);
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };
  const formatTime = (timeString) => {
    if (!timeString) return null;
    const time = timeString.includes("T") ? timeString.split("T")[1].substring(0, 5) : timeString.substring(0, 5);
    return time;
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg border border-gray-200 p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-gray-800 flex items-center", children: [
        /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 mr-2 text-indigo-600" }),
        "Timesheet Entries"
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setShowModal(true),
          className: "flex items-center text-sm bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition",
          children: "+ Add Entry"
        }
      )
    ] }),
    timesheets.length > 0 ? /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Date" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "User" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Time" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Hours" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Description" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: timesheets.map((timesheet) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 whitespace-nowrap text-sm text-gray-900", children: formatDate(timesheet.date) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 whitespace-nowrap text-sm text-gray-900", children: timesheet.user?.name || "N/A" }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 whitespace-nowrap text-sm text-gray-600", children: timesheet.start_time && timesheet.end_time ? /* @__PURE__ */ jsxs("span", { children: [
          formatTime(timesheet.start_time),
          " - ",
          formatTime(timesheet.end_time)
        ] }) : /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "-" }) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 whitespace-nowrap text-sm", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-gray-900 font-medium", children: [
            timesheet.hours,
            "h"
          ] }),
          timesheet.is_overtime && /* @__PURE__ */ jsx("span", { className: "ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800", children: "Overtime" })
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm text-gray-600", children: timesheet.description || "-" }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 whitespace-nowrap", children: /* @__PURE__ */ jsx("span", { className: `inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${timesheet.status === "approved" ? "bg-green-100 text-green-800" : timesheet.status === "rejected" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`, children: timesheet.status }) })
      ] }, timesheet.id)) })
    ] }) }) : /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm italic text-center py-8", children: "No timesheet entries yet." }),
    /* @__PURE__ */ jsx(
      CreateTimesheetModal,
      {
        show: showModal,
        onClose: () => setShowModal(false),
        taskId: task.id,
        users
      }
    )
  ] });
}
function Edit({ auth, task, projects, users, chatter_data, meetings_data, documents, timesheets_data }) {
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const { data, setData, put, processing, errors } = useForm({
    project_id: task.project_id || "",
    assigned_to: task.assigned_to || "",
    title: task.title || "",
    description: task.description || "",
    priority: task.priority || "medium",
    status: task.status || "todo",
    due_date: task.due_date || ""
  });
  const submit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    put(route("tasks.update", task.id));
  };
  const handleDeleteDocument = (docId) => {
    if (confirm("Are you sure you want to delete this document?")) {
      router.delete(route("documents.destroy", docId), {
        preserveScroll: true
      });
    }
  };
  const handleFilesChange = (newFiles) => {
    if (newFiles.length > 0) {
      const formData = new FormData();
      newFiles.forEach((file) => formData.append("files[]", file));
      formData.append("documentable_id", task.id);
      formData.append("documentable_type", "App\\Models\\Task");
      router.post(route("documents.store"), formData, {
        onSuccess: () => {
        }
      });
    }
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsx(FormHeader, { title: "Edit Task", backRoute: "tasks.index" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Edit Task" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs(
          FormPageLayout,
          {
            chatterData: chatter_data,
            meetingsData: meetings_data,
            chatterableId: task.id,
            chatterableType: "App\\Models\\Task",
            children: [
              /* @__PURE__ */ jsx(
                TaskStepper,
                {
                  data,
                  setData,
                  errors,
                  projects,
                  users,
                  isCreate: false,
                  submit,
                  processing,
                  existingDocuments: documents,
                  onDeleteDocument: handleDeleteDocument,
                  onFilesChange: handleFilesChange
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
                TimesheetEntry,
                {
                  task,
                  timesheets: timesheets_data || [],
                  users
                }
              ) })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(
          CreateMeetingModal,
          {
            show: showMeetingModal,
            onClose: () => setShowMeetingModal(false),
            users,
            relatedId: task.id,
            relatedType: "App\\\\Models\\\\Task"
          }
        )
      ]
    }
  );
}
export {
  Edit as default
};
