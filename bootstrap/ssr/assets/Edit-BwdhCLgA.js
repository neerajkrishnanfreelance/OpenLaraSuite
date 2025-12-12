import { jsx, jsxs } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-D5dyBxod.js";
import { useForm, router, Head } from "@inertiajs/react";
import { F as FormHeader } from "./FormHeader-CQAGRAnh.js";
import { F as FormPageLayout } from "./FormPageLayout-CCQJltRs.js";
import { T as TaskStepper } from "./TaskStepper-iRLRBtsr.js";
import { Play, Square, Clock } from "lucide-react";
import { M as Modal } from "./Modal-BeSeEOS3.js";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { T as TextInput } from "./TextInput-Xf9xHrLa.js";
import { I as InputError } from "./InputError-CBvD_6aD.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { S as SecondaryButton } from "./SecondaryButton-C9TQBbBR.js";
import { useState, useEffect } from "react";
import { C as CreateMeetingModal } from "./CreateMeetingModal-D6h_4n-j.js";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
import "./Chatter-QayPlM-X.js";
import "./Checkbox-5PHg8iNz.js";
function CreateTimesheetModal({ show, onClose, taskId, users = [] }) {
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
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
    let interval;
    if (isTracking && startTime) {
      interval = setInterval(() => {
        const now = /* @__PURE__ */ new Date();
        const diff = Math.floor((now - startTime) / 1e3);
        setElapsedSeconds(diff);
      }, 1e3);
    }
    return () => clearInterval(interval);
  }, [isTracking, startTime]);
  const formatElapsedTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor(seconds % 3600 / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  const handleStart = () => {
    if (!data.user_id) {
      alert("Please select a user first");
      return;
    }
    const now = /* @__PURE__ */ new Date();
    setStartTime(now);
    setIsTracking(true);
    setElapsedSeconds(0);
    setData("start_time", now.toTimeString().substring(0, 5));
  };
  const handleStop = () => {
    const now = /* @__PURE__ */ new Date();
    const endTimeStr = now.toTimeString().substring(0, 5);
    const hours = ((now - startTime) / (1e3 * 60 * 60)).toFixed(2);
    setData({
      ...data,
      end_time: endTimeStr,
      hours
    });
    setIsTracking(false);
  };
  const submit = (e) => {
    e.preventDefault();
    post(route("tasks.timesheets.store", taskId), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        setIsTracking(false);
        setStartTime(null);
        setElapsedSeconds(0);
        onClose();
      }
    });
  };
  const handleClose = () => {
    if (isTracking) {
      if (!confirm("Timer is running. Are you sure you want to close without saving?")) {
        return;
      }
    }
    reset();
    setIsTracking(false);
    setStartTime(null);
    setElapsedSeconds(0);
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
              disabled: isTracking,
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
              onChange: (e) => setData("date", e.target.value),
              disabled: isTracking
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.date, className: "mt-2" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-gray-50 rounded-lg p-4 border border-gray-200", children: !isTracking && !data.hours ? /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-3", children: "Click Start to begin tracking time" }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: handleStart,
            className: "inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition font-medium",
            children: [
              /* @__PURE__ */ jsx(Play, { className: "w-5 h-5 mr-2" }),
              "Start Timer"
            ]
          }
        )
      ] }) : isTracking ? /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-4xl font-mono font-bold text-indigo-600 mb-2", children: formatElapsedTime(elapsedSeconds) }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 mb-3", children: [
          "Started at ",
          data.start_time
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: handleStop,
            className: "inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium",
            children: [
              /* @__PURE__ */ jsx(Square, { className: "w-5 h-5 mr-2" }),
              "Stop Timer"
            ]
          }
        )
      ] }) : /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-2xl font-bold text-gray-800 mb-1", children: [
          data.hours,
          " hours"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
          data.start_time,
          " - ",
          data.end_time
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              setData({
                ...data,
                start_time: "",
                end_time: "",
                hours: ""
              });
            },
            className: "text-sm text-indigo-600 hover:text-indigo-800 mt-2",
            children: "Reset Timer"
          }
        )
      ] }) }),
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
      /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing || isTracking || !data.hours, children: processing ? "Saving..." : "Save Entry" })
    ] })
  ] }) });
}
function TimesheetEntry({ task, timesheets = [], users = [], auth }) {
  const [showModal, setShowModal] = useState(false);
  const [showStartModal, setShowStartModal] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    description: "",
    is_overtime: false
  });
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };
  const formatTimeOnly = (timeString) => {
    if (!timeString) return null;
    const time = timeString.includes("T") ? timeString.split("T")[1].substring(0, 5) : timeString.substring(0, 5);
    return time;
  };
  const handleStartTimer = (e) => {
    e.preventDefault();
    const currentUserId = auth?.user?.id;
    if (!currentUserId) {
      alert("User not authenticated. Please log in again.");
      return;
    }
    const now = /* @__PURE__ */ new Date();
    post(route("tasks.timesheets.store", task.id), {
      user_id: currentUserId,
      date: now.toISOString().split("T")[0],
      start_time: now.toTimeString().substring(0, 5),
      end_time: null,
      hours: 0,
      description: data.description,
      is_overtime: data.is_overtime
    }, {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        setShowStartModal(false);
      }
    });
  };
  const handleEndTimer = (timesheetId, startTime) => {
    const now = /* @__PURE__ */ new Date();
    const start = /* @__PURE__ */ new Date(`${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}T${startTime}`);
    const end = /* @__PURE__ */ new Date(`${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}T${now.toTimeString().substring(0, 5)}`);
    const hours = ((end - start) / (1e3 * 60 * 60)).toFixed(2);
    router.put(route("timesheets.update", timesheetId), {
      end_time: now.toTimeString().substring(0, 5),
      hours
    }, {
      preserveScroll: true
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg border border-gray-200 p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-gray-800 flex items-center", children: [
        /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 mr-2 text-indigo-600" }),
        "Timesheet Entries"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowStartModal(true),
            className: "flex items-center text-sm bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition font-medium",
            children: "Start Timer"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowModal(true),
            className: "flex items-center text-sm bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition",
            children: "+ Add Entry"
          }
        )
      ] })
    ] }),
    timesheets.length > 0 ? /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Date" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "User" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Time" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Hours" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Description" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Status" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Action" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: timesheets.map((timesheet) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 whitespace-nowrap text-sm text-gray-900", children: formatDate(timesheet.date) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 whitespace-nowrap text-sm text-gray-900", children: timesheet.user?.name || "N/A" }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 whitespace-nowrap text-sm text-gray-600", children: timesheet.start_time && timesheet.end_time ? /* @__PURE__ */ jsxs("span", { children: [
          formatTimeOnly(timesheet.start_time),
          " - ",
          formatTimeOnly(timesheet.end_time)
        ] }) : timesheet.start_time ? /* @__PURE__ */ jsxs("span", { className: "text-green-600 font-medium", children: [
          "Started: ",
          formatTimeOnly(timesheet.start_time)
        ] }) : /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "-" }) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 whitespace-nowrap text-sm", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-gray-900 font-medium", children: [
            timesheet.hours,
            "h"
          ] }),
          timesheet.is_overtime && /* @__PURE__ */ jsx("span", { className: "ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800", children: "OT" })
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm text-gray-600", children: timesheet.description || "-" }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 whitespace-nowrap", children: /* @__PURE__ */ jsx("span", { className: `inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${timesheet.status === "approved" ? "bg-green-100 text-green-800" : timesheet.status === "rejected" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`, children: timesheet.status }) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 whitespace-nowrap text-sm", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          timesheet.start_time && !timesheet.end_time && /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => handleEndTimer(timesheet.id, timesheet.start_time),
              className: "inline-flex items-center px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition text-xs font-medium",
              children: [
                /* @__PURE__ */ jsx(Square, { className: "w-3 h-3 mr-1" }),
                "End"
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                if (confirm("Are you sure you want to delete this timesheet entry?")) {
                  router.delete(route("timesheets.destroy", timesheet.id));
                }
              },
              className: "text-red-600 hover:text-red-900 text-xs font-medium",
              children: "Delete"
            }
          )
        ] }) })
      ] }, timesheet.id)) }),
      /* @__PURE__ */ jsx("tfoot", { className: "bg-gray-50 border-t-2 border-gray-300", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { colSpan: "3", className: "px-4 py-3 text-right text-sm font-bold text-gray-900", children: "Total Hours:" }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 whitespace-nowrap text-sm", children: /* @__PURE__ */ jsxs("span", { className: "font-bold text-indigo-600 text-lg", children: [
          timesheets.reduce((sum, ts) => sum + parseFloat(ts.hours || 0), 0).toFixed(2),
          "h"
        ] }) }),
        /* @__PURE__ */ jsx("td", { colSpan: "3" })
      ] }) })
    ] }) }) : /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm italic text-center py-8", children: "No timesheet entries yet." }),
    /* @__PURE__ */ jsx(Modal, { show: showStartModal, onClose: () => setShowStartModal(false), children: /* @__PURE__ */ jsxs("form", { onSubmit: handleStartTimer, className: "p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-gray-900 mb-6", children: "Start Timer" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "description", value: "Description" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "description",
              className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
              rows: "3",
              value: data.description,
              onChange: (e) => setData("description", e.target.value),
              placeholder: "What will you work on?"
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
        /* @__PURE__ */ jsx(SecondaryButton, { type: "button", onClick: () => setShowStartModal(false), children: "Cancel" }),
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: processing ? "Starting..." : "Start Timer" })
      ] })
    ] }) }),
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
                  users,
                  auth
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
