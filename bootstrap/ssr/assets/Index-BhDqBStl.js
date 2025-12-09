import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DqVvfPrE.js";
import { useForm, Head, router } from "@inertiajs/react";
import { Clock, CheckCircle, Calendar, Plus, Trash2, BookOpen, ArrowRight } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { I as InputError } from "./InputError-CBvD_6aD.js";
import { M as Modal } from "./Modal-BeSeEOS3.js";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function Index({ auth, subjects, timetable, recentLogs, kpis }) {
  const params = new URLSearchParams(window.location.search);
  const initialTab = params.get("tab") || "dashboard";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [showClassModal, setShowClassModal] = useState(false);
  const changeTab = (tab) => {
    setActiveTab(tab);
    const url = new URL(window.location);
    url.searchParams.set("tab", tab);
    window.history.pushState({}, "", url);
  };
  const { data: subjectData, setData: setSubjectData, post: postSubject, processing: processingSubject, errors: errorsSubject, reset: resetSubject } = useForm({
    name: "",
    description: ""
  });
  const { data: classData, setData: setClassData, post: postClass, processing: processingClass, errors: errorsClass, reset: resetClass } = useForm({
    project_id: "",
    day_of_week: 1,
    // Monday
    start_time: "09:00",
    end_time: "10:00",
    location: "",
    color: "bg-blue-100 text-blue-800"
  });
  const submitSubject = (e) => {
    e.preventDefault();
    postSubject(route("learning.subjects.store"), {
      onSuccess: () => {
        setShowSubjectModal(false);
        resetSubject();
      }
    });
  };
  const submitClass = (e) => {
    e.preventDefault();
    postClass(route("learning.timetable.store"), {
      onSuccess: () => {
        setShowClassModal(false);
        resetClass();
      }
    });
  };
  const deleteClass = (id) => {
    if (confirm("Remove this class?")) {
      router.delete(route("learning.timetable.destroy", id));
    }
  };
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const colors = [
    { name: "Blue", value: "bg-blue-100 text-blue-800" },
    { name: "Green", value: "bg-green-100 text-green-800" },
    { name: "Red", value: "bg-red-100 text-red-800" },
    { name: "Yellow", value: "bg-yellow-100 text-yellow-800" },
    { name: "Purple", value: "bg-purple-100 text-purple-800" }
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("h2", { className: "font-semibold text-xl text-gray-800 leading-tight flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(BookOpen, { className: "w-6 h-6 text-indigo-600" }),
          "Self Learning"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex bg-white rounded-lg p-1 border shadow-sm", children: ["dashboard", "timetable", "subjects", "log"].map((tab) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => changeTab(tab),
            className: `px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${activeTab === tab ? "bg-indigo-100 text-indigo-700" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`,
            children: tab
          },
          tab
        )) })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Self Learning" }),
        /* @__PURE__ */ jsx("div", { className: "py-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: [
          activeTab === "dashboard" && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-white p-6 rounded-xl shadow-sm border border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-500", children: "Hours This Week" }),
                  /* @__PURE__ */ jsxs("h3", { className: "text-3xl font-bold text-gray-900 mt-2", children: [
                    kpis.hoursThisWeek,
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-normal text-gray-400", children: "hrs" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "p-3 bg-indigo-50 rounded-lg", children: /* @__PURE__ */ jsx(Clock, { className: "w-6 h-6 text-indigo-600" }) })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "bg-white p-6 rounded-xl shadow-sm border border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-500", children: "Topics Completed" }),
                  /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold text-gray-900 mt-2", children: kpis.completedTasks })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "p-3 bg-green-50 rounded-lg", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-6 h-6 text-green-600" }) })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "bg-white p-6 rounded-xl shadow-sm border border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-500", children: "Next Class" }),
                  kpis.nextClass ? /* @__PURE__ */ jsxs("div", { className: "mt-2", children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900", children: kpis.nextClass.project.name }),
                    /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
                      moment(kpis.nextClass.start_time, "HH:mm:ss").format("h:mm A"),
                      " • ",
                      ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][kpis.nextClass.day_of_week]
                    ] })
                  ] }) : /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-400 mt-2", children: "No upcoming classes" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "p-3 bg-blue-50 rounded-lg", children: /* @__PURE__ */ jsx(Calendar, { className: "w-6 h-6 text-blue-600" }) })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100", children: [
                /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-b border-gray-100 flex justify-between items-center", children: [
                  /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-800", children: "Today's Schedule" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded", children: moment().format("dddd") })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "p-6", children: timetable.filter((t) => t.day_of_week === moment().day()).length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-4", children: timetable.filter((t) => t.day_of_week === moment().day()).map((entry) => /* @__PURE__ */ jsxs("div", { className: `flex items-center p-3 rounded-lg border-l-4 ${entry.color.replace("bg-", "border-").split(" ")[0]} bg-gray-50`, children: [
                  /* @__PURE__ */ jsx("div", { className: "w-24 flex-shrink-0 text-sm font-bold text-gray-600", children: moment(entry.start_time, "HH:mm:ss").format("h:mm A") }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h4", { className: "font-bold text-gray-900", children: entry.project.name }),
                    entry.location && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: entry.location })
                  ] })
                ] }, entry.id)) }) : /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-center py-4", children: "No classes scheduled for today." }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100", children: [
                /* @__PURE__ */ jsx("div", { className: "px-6 py-4 border-b border-gray-100", children: /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-800", children: "Recent Activity" }) }),
                /* @__PURE__ */ jsxs("div", { className: "p-6 space-y-4", children: [
                  recentLogs.map((log) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center border-b border-gray-50 pb-2 last:border-0 last:pb-0", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("h4", { className: "font-medium text-gray-900", children: log.project.name }),
                      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: log.task ? log.task.title : "General Study" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
                      /* @__PURE__ */ jsxs("span", { className: "font-bold text-indigo-600", children: [
                        log.hours,
                        "h"
                      ] }),
                      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: moment(log.date).fromNow() })
                    ] })
                  ] }, log.id)),
                  recentLogs.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-center text-sm", children: "No recent study logs." })
                ] })
              ] })
            ] })
          ] }),
          activeTab === "timetable" && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-6 border-b border-gray-100 flex justify-between items-center", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg", children: "Weekly Timetable" }),
              /* @__PURE__ */ jsxs(PrimaryButton, { onClick: () => setShowClassModal(true), children: [
                /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 mr-2" }),
                " Add Class"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 divide-x divide-gray-100 min-w-[800px] overflow-x-auto", children: days.map((day, index) => /* @__PURE__ */ jsxs("div", { className: "min-h-[400px]", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-gray-50 py-3 text-center text-sm font-bold text-gray-700 border-b border-gray-100", children: day }),
              /* @__PURE__ */ jsx("div", { className: "p-2 space-y-2", children: timetable.filter((t) => t.day_of_week === index).map((entry) => /* @__PURE__ */ jsxs("div", { className: `p-2 rounded text-xs shadow-sm relative group ${entry.color}`, children: [
                /* @__PURE__ */ jsx("div", { className: "font-bold", children: moment(entry.start_time, "HH:mm:ss").format("h:mm A") }),
                /* @__PURE__ */ jsx("div", { className: "truncate font-semibold", children: entry.project.name }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => deleteClass(entry.id),
                    className: "absolute top-1 right-1 text-red-500 opacity-0 group-hover:opacity-100 hover:text-red-700",
                    children: /* @__PURE__ */ jsx(Trash2, { className: "w-3 h-3" })
                  }
                )
              ] }, entry.id)) })
            ] }, day)) })
          ] }),
          activeTab === "subjects" && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "flex justify-end mb-6", children: /* @__PURE__ */ jsxs(PrimaryButton, { onClick: () => setShowSubjectModal(true), children: [
              /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 mr-2" }),
              " New Subject"
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: subjects.map((subject) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-4", children: [
                /* @__PURE__ */ jsx("div", { className: "bg-indigo-100 p-3 rounded-lg", children: /* @__PURE__ */ jsx(BookOpen, { className: "w-6 h-6 text-indigo-600" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-900", children: subject.name }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full uppercase", children: subject.status })
                ] })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mb-6 h-10 line-clamp-2", children: subject.description || "No description." }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-gray-50", children: [
                /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500", children: [
                  subject.tasks.length,
                  " topics"
                ] }),
                /* @__PURE__ */ jsxs("a", { href: route("projects.show", subject.id), className: "text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center gap-1", children: [
                  "View ",
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3" })
                ] })
              ] })
            ] }, subject.id)) })
          ] }),
          activeTab === "log" && /* @__PURE__ */ jsxs("div", { className: "max-w-md mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-6", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-gray-900 mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 text-indigo-600" }),
              "Log Study Time"
            ] }),
            /* @__PURE__ */ jsx(LogTimeForm, { subjects })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Modal, { show: showSubjectModal, onClose: () => setShowSubjectModal(false), maxWidth: "sm", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 mb-4", children: "Add New Subject" }),
          /* @__PURE__ */ jsxs("form", { onSubmit: submitSubject, children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Subject Name" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: subjectData.name,
                  onChange: (e) => setSubjectData("name", e.target.value),
                  className: "w-full border-gray-300 rounded-md shadow-sm",
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errorsSubject.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Description" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  value: subjectData.description,
                  onChange: (e) => setSubjectData("description", e.target.value),
                  className: "w-full border-gray-300 rounded-md shadow-sm",
                  rows: "3"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setShowSubjectModal(false), className: "text-gray-500 hover:text-gray-700", children: "Cancel" }),
              /* @__PURE__ */ jsx(PrimaryButton, { disabled: processingSubject, children: "Create Subject" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Modal, { show: showClassModal, onClose: () => setShowClassModal(false), maxWidth: "sm", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 mb-4", children: "Add Scheduled Class" }),
          /* @__PURE__ */ jsxs("form", { onSubmit: submitClass, children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Subject" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: classData.project_id,
                  onChange: (e) => setClassData("project_id", e.target.value),
                  className: "w-full border-gray-300 rounded-md shadow-sm",
                  required: true,
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "Select Subject" }),
                    subjects.map((s) => /* @__PURE__ */ jsx("option", { value: s.id, children: s.name }, s.id))
                  ]
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errorsClass.project_id })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Day" }),
              /* @__PURE__ */ jsx(
                "select",
                {
                  value: classData.day_of_week,
                  onChange: (e) => setClassData("day_of_week", parseInt(e.target.value)),
                  className: "w-full border-gray-300 rounded-md shadow-sm",
                  children: days.map((day, i) => /* @__PURE__ */ jsx("option", { value: i, children: day }, day))
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Start Time" }),
                /* @__PURE__ */ jsx("input", { type: "time", value: classData.start_time, onChange: (e) => setClassData("start_time", e.target.value), className: "w-full border-gray-300 rounded-md shadow-sm", required: true })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "End Time" }),
                /* @__PURE__ */ jsx("input", { type: "time", value: classData.end_time, onChange: (e) => setClassData("end_time", e.target.value), className: "w-full border-gray-300 rounded-md shadow-sm", required: true })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Color Tag" }),
              /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: colors.map((c) => /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setClassData("color", c.value),
                  className: `w-6 h-6 rounded-full border ${c.value.split(" ")[0]} ${classData.color === c.value ? "ring-2 ring-offset-2 ring-gray-400" : ""}`
                },
                c.name
              )) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setShowClassModal(false), className: "text-gray-500 hover:text-gray-700", children: "Cancel" }),
              /* @__PURE__ */ jsx(PrimaryButton, { disabled: processingClass, children: "Schedule Class" })
            ] })
          ] })
        ] }) })
      ]
    }
  );
}
function LogTimeForm({ subjects }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    project_id: "",
    date: moment().format("YYYY-MM-DD"),
    hours: "",
    description: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("timesheets.store"), {
      onSuccess: () => reset("hours", "description", "project_id")
    });
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Subject" }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          value: data.project_id,
          onChange: (e) => setData("project_id", e.target.value),
          className: "w-full border-gray-300 rounded-md shadow-sm",
          required: true,
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "Select Subject" }),
            subjects.map((s) => /* @__PURE__ */ jsx("option", { value: s.id, children: s.name }, s.id))
          ]
        }
      ),
      /* @__PURE__ */ jsx(InputError, { message: errors.project_id })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Date" }),
        /* @__PURE__ */ jsx("input", { type: "date", value: data.date, onChange: (e) => setData("date", e.target.value), className: "w-full border-gray-300 rounded-md shadow-sm", required: true }),
        /* @__PURE__ */ jsx(InputError, { message: errors.date })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Hours" }),
        /* @__PURE__ */ jsx("input", { type: "number", step: "0.1", min: "0.1", value: data.hours, onChange: (e) => setData("hours", e.target.value), className: "w-full border-gray-300 rounded-md shadow-sm", required: true }),
        /* @__PURE__ */ jsx(InputError, { message: errors.hours })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "What did you study?" }),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          value: data.description,
          onChange: (e) => setData("description", e.target.value),
          className: "w-full border-gray-300 rounded-md shadow-sm",
          rows: "3",
          placeholder: "Topics covered..."
        }
      ),
      /* @__PURE__ */ jsx(InputError, { message: errors.description })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Log Time" }) })
  ] });
}
export {
  Index as default
};
