import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-D7veU2Fe.js";
import { Link, useForm, Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
/* empty css                            */
import { ViewMode, Gantt } from "gantt-task-react";
import { C as CreateTaskModal } from "./CreateTaskModal-B7IcLk-8.js";
import { I as InputError } from "./TextInput-mUZk5oTn.js";
import { ChevronsUpDown, Check, Clock, Square, Play } from "lucide-react";
import moment from "moment";
import { Combobox } from "@headlessui/react";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import "./ApplicationLogo-xMpxFOcX.js";
import "./Modal-BeSeEOS3.js";
import "./PrimaryButton-BMCZH-oa.js";
import "./SecondaryButton-C9TQBbBR.js";
const CustomToolbar = (toolbar) => {
  const goToBack = () => {
    toolbar.onNavigate("PREV");
  };
  const goToNext = () => {
    toolbar.onNavigate("NEXT");
  };
  const label = () => {
    const date = toolbar.date;
    return /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-blue-900", children: format(date, "MMMM yyyy") });
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6 pl-2 pr-2", children: [
    /* @__PURE__ */ jsx("div", { children: label() }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx("button", { onClick: goToBack, className: "p-1 hover:bg-gray-100 rounded text-gray-600 font-bold", children: "<" }),
      /* @__PURE__ */ jsx("button", { onClick: goToNext, className: "p-1 hover:bg-gray-100 rounded text-gray-600 font-bold", children: ">" })
    ] })
  ] });
};
const locales = {
  "en-US": enUS
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});
function CalendarWidget({ events }) {
  const parsedEvents = events.map((ev) => ({
    ...ev,
    start: new Date(ev.start),
    end: new Date(ev.end)
  }));
  return /* @__PURE__ */ jsxs(Link, { href: route("calendar.index"), className: "block bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full hover:shadow-md transition duration-200", children: [
    /* @__PURE__ */ jsx("div", { style: { height: "350px" }, className: "custom-calendar-wrapper", children: /* @__PURE__ */ jsx(
      Calendar,
      {
        localizer,
        events: parsedEvents,
        startAccessor: "start",
        endAccessor: "end",
        views: ["month"],
        defaultView: "month",
        components: {
          toolbar: CustomToolbar
        },
        eventPropGetter: (event) => {
          const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];
          const idx = event.id % colors.length;
          return {
            style: {
              backgroundColor: colors[idx],
              borderRadius: "4px",
              opacity: 0.8,
              color: "white",
              border: "0px",
              display: "block",
              fontSize: "10px"
            }
          };
        }
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-4 mt-6 overflow-x-auto pb-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-shrink-0 w-24 h-24 bg-blue-600 rounded-xl p-3 flex flex-col justify-center items-center text-white relative shadow-lg", children: [
        /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold", children: "2" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 mt-1 w-full", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[8px] bg-blue-500 rounded px-1 block text-center truncate", children: "Call Sarah" }),
          /* @__PURE__ */ jsx("span", { className: "text-[8px] bg-yellow-500 rounded px-1 block text-center truncate text-black", children: "Client Meet" }),
          /* @__PURE__ */ jsx("span", { className: "text-[8px] bg-green-500 rounded px-1 block text-center truncate", children: "Team Sync" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "absolute -bottom-1 w-1 h-1 bg-red-500 rounded-full" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-shrink-0 w-24 h-24 bg-white border border-gray-200 rounded-xl p-3 flex flex-col justify-center items-center text-gray-400", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-gray-800", children: "3" }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px]", children: "Q4 Review" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-24 h-24 bg-white border border-gray-200 rounded-xl p-3 flex flex-col justify-center items-center text-gray-400", children: /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-gray-800", children: "4" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-shrink-0 w-24 h-24 bg-white border border-gray-200 rounded-xl p-3 flex flex-col justify-center items-center text-gray-400", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-gray-800", children: "5" }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] text-blue-500", children: "Follow-up x3" })
      ] })
    ] })
  ] });
}
function TaskWidget({ tasks }) {
  return /* @__PURE__ */ jsxs(Link, { href: route("tasks.index"), className: "block bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full hover:shadow-md transition duration-200", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center mb-6", children: /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-blue-900 flex items-center gap-2", children: [
      "Today's Tasks (",
      tasks.length,
      ")",
      /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      tasks.length > 0 ? tasks.map((task) => /* @__PURE__ */ jsxs("div", { className: `flex items-start p-3 rounded-xl border ${task.priority === "High" ? "bg-blue-600 border-blue-600" : "bg-white border-gray-100 shadow-sm"}`, children: [
        /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 mt-1", children: /* @__PURE__ */ jsx("input", { type: "checkbox", className: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500", readOnly: true, checked: task.status === "done" }) }),
        /* @__PURE__ */ jsxs("div", { className: "ml-3 flex-1", children: [
          /* @__PURE__ */ jsx("h4", { className: `text-sm font-semibold ${task.priority === "High" ? "text-white" : "text-gray-800"}`, children: task.title }),
          /* @__PURE__ */ jsx("p", { className: `text-xs mt-0.5 ${task.priority === "High" ? "text-blue-100" : "text-gray-500"}`, children: task.start_time ? new Date(task.start_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Today" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-shrink-0 ml-2", children: [
          task.priority === "High" && /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold bg-yellow-400 text-yellow-900 px-1.5 py-0.5 rounded", children: "HIGH" }),
          task.assigned_user && /* @__PURE__ */ jsx(
            "img",
            {
              src: `https://ui-avatars.com/api/?name=${encodeURIComponent(task.assigned_user.name)}&background=random`,
              className: "h-6 w-6 rounded-full border border-white mt-1",
              alt: "Avatar"
            }
          )
        ] })
      ] }, task.id)) : /* @__PURE__ */ jsx("div", { className: "text-center py-10 text-gray-400 text-sm", children: "No tasks for today." }),
      tasks.length > 0 && /* @__PURE__ */ jsxs("div", { className: "flex items-center p-3 rounded-xl border border-gray-100 opacity-50", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 mt-1", children: /* @__PURE__ */ jsx("input", { type: "checkbox", className: "h-4 w-4 rounded border-gray-300", disabled: true }) }),
        /* @__PURE__ */ jsx("div", { className: "ml-3", children: /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold text-gray-400", children: "Send Proposal to Marcus Holt" }) })
      ] })
    ] })
  ] });
}
function CallWidget({ calls }) {
  return /* @__PURE__ */ jsxs(Link, { href: route("meetings.index"), className: "block bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full hover:shadow-md transition duration-200", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center mb-6", children: /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-blue-900 flex items-center gap-2", children: [
      "Follow-up Calls Today",
      /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      calls.map((call) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-50 rounded-xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx("div", { className: `h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-white ${call.id % 2 === 0 ? "bg-blue-600" : "bg-gray-500"}`, children: call.organizer ? call.organizer.name.substring(0, 2).toUpperCase() : "ME" }),
          /* @__PURE__ */ jsxs("div", { className: "ml-3", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-sm font-bold text-gray-800", children: call.organizer ? call.organizer.name : "Meeting" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: call.title })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm font-bold text-blue-600", children: call.start_formatted }),
          /* @__PURE__ */ jsx("button", { className: "text-xs text-blue-500 hover:text-blue-700 font-medium", children: "Call Now" })
        ] })
      ] }, call.id)),
      calls.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center py-10 text-gray-400 text-sm", children: "No calls scheduled." })
    ] })
  ] });
}
function GanttWidget({ tasks }) {
  const [viewMode, setViewMode] = useState(ViewMode.Week);
  const ganttTasks = tasks.map((task) => {
    const startDate = task.start_date ? new Date(task.start_date) : /* @__PURE__ */ new Date();
    let endDate = task.due_date ? new Date(task.due_date) : new Date(startDate.getTime() + 864e5);
    if (endDate <= startDate) {
      endDate = new Date(startDate.getTime() + 864e5);
    }
    return {
      start: startDate,
      end: endDate,
      name: task.title,
      id: String(task.id),
      type: "task",
      progress: task.status === "done" ? 100 : task.status === "in_progress" ? 50 : 0,
      isDisabled: true,
      // Disable editing for now, just viewing
      styles: { progressColor: "#4f46e5", progressSelectedColor: "#3730a3" },
      project: task.project?.name || "No Project"
    };
  });
  if (ganttTasks.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex items-center justify-center text-gray-400", children: "No tasks available for Gantt chart." });
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800", children: "Project Timeline" }),
      /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setViewMode(ViewMode.Day),
            className: `px-3 py-1 text-xs rounded-md ${viewMode === ViewMode.Day ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`,
            children: "Day"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setViewMode(ViewMode.Week),
            className: `px-3 py-1 text-xs rounded-md ${viewMode === ViewMode.Week ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`,
            children: "Week"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setViewMode(ViewMode.Month),
            className: `px-3 py-1 text-xs rounded-md ${viewMode === ViewMode.Month ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`,
            children: "Month"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsx(
      Gantt,
      {
        tasks: ganttTasks,
        viewMode,
        columnWidth: viewMode === ViewMode.Month ? 150 : 60,
        listCellWidth: "155px",
        barBackgroundColor: "#e0e7ff",
        barProgressColor: "#4f46e5",
        barProgressSelectedColor: "#3730a3",
        onDateChange: () => {
        },
        onTaskDelete: () => {
        },
        onProgressChange: () => {
        },
        onDoubleClick: () => {
        }
      }
    ) })
  ] });
}
function Select({
  options,
  value,
  onChange,
  label,
  placeholder = "Select an option...",
  disabled = false
}) {
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    const item = options.find((option) => option.value == value);
    setSelectedItem(item || null);
  }, [value, options]);
  const filteredOptions = query === "" ? options : options.filter(
    (option) => option.label.toLowerCase().includes(query.toLowerCase())
  );
  const handleSelect = (item) => {
    onChange(item ? item.value : null);
    setSelectedItem(item);
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    label && /* @__PURE__ */ jsx(InputLabel, { value: label, className: "mb-1" }),
    /* @__PURE__ */ jsx(Combobox, { value: selectedItem, onChange: handleSelect, disabled, nullable: true, children: /* @__PURE__ */ jsxs("div", { className: "relative mt-1", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left border border-gray-300 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 sm:text-sm", children: [
        /* @__PURE__ */ jsx(
          Combobox.Input,
          {
            className: `w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 ${disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""}`,
            onChange: (event) => setQuery(event.target.value),
            displayValue: (item) => item?.label,
            placeholder
          }
        ),
        /* @__PURE__ */ jsx(Combobox.Button, { className: "absolute inset-y-0 right-0 flex items-center pr-2", children: /* @__PURE__ */ jsx(
          ChevronsUpDown,
          {
            className: "h-5 w-5 text-gray-400",
            "aria-hidden": "true"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(Combobox.Options, { className: "absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50", children: options.length === 0 ? /* @__PURE__ */ jsx("div", { className: "relative cursor-default select-none py-2 px-4 text-gray-500", children: disabled ? placeholder : "No options available" }) : filteredOptions.length === 0 && query !== "" ? /* @__PURE__ */ jsx("div", { className: "relative cursor-default select-none py-2 px-4 text-gray-700", children: "Nothing found." }) : filteredOptions.map((option) => /* @__PURE__ */ jsx(
        Combobox.Option,
        {
          className: ({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-indigo-600 text-white" : "text-gray-900"}`,
          value: option,
          children: ({ selected, active }) => /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                className: `block truncate ${selected ? "font-medium" : "font-normal"}`,
                children: option.label
              }
            ),
            selected ? /* @__PURE__ */ jsx(
              "span",
              {
                className: `absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-indigo-600"}`,
                children: /* @__PURE__ */ jsx(Check, { className: "h-5 w-5", "aria-hidden": "true" })
              }
            ) : null
          ] })
        },
        option.value
      )) })
    ] }) })
  ] });
}
function TimesheetTimerWidget({ projects, activeTimer }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    project_id: activeTimer ? activeTimer.project_id : "",
    task_id: activeTimer ? activeTimer.task_id : "",
    description: activeTimer ? activeTimer.description : "",
    is_overtime: activeTimer ? activeTimer.is_overtime : false
  });
  const [elapsed, setElapsed] = useState("00:00:00");
  const availableTasks = data.project_id ? projects.find((p) => p.id == data.project_id)?.tasks || [] : [];
  useEffect(() => {
    let interval = null;
    if (activeTimer) {
      const start = moment(activeTimer.start_time);
      interval = setInterval(() => {
        const now = moment();
        const diff = now.diff(start);
        const duration = moment.duration(diff);
        setElapsed(
          String(Math.floor(duration.asHours())).padStart(2, "0") + ":" + String(duration.minutes()).padStart(2, "0") + ":" + String(duration.seconds()).padStart(2, "0")
        );
      }, 1e3);
    } else {
      setElapsed("00:00:00");
    }
    return () => clearInterval(interval);
  }, [activeTimer]);
  const startTimer = (e) => {
    e.preventDefault();
    post(route("timesheets.timer.start"), {
      preserveScroll: true
    });
  };
  const stopTimer = (e) => {
    e.preventDefault();
    post(route("timesheets.timer.stop"), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        setElapsed("00:00:00");
      }
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg p-6", children: [
    /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 text-indigo-600" }),
      "Quick Timer"
    ] }),
    activeTimer ? /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "text-4xl font-mono font-bold text-gray-800 mb-4", children: elapsed }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4 text-sm text-gray-600 text-left bg-gray-50 p-3 rounded", children: [
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-800", children: projects.find((p) => p.id === activeTimer.project_id)?.name || "Unknown Project" }),
        activeTimer.task_id && /* @__PURE__ */ jsxs("p", { className: "text-xs text-indigo-600 font-medium mb-1", children: [
          "Task: ",
          projects.find((p) => p.id === activeTimer.project_id)?.tasks?.find((t) => t.id === activeTimer.task_id)?.title || "Task #" + activeTimer.task_id
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 italic", children: activeTimer.description || "No description" }),
        activeTimer.is_overtime && /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 mt-1", children: "Overtime" })
      ] }),
      /* @__PURE__ */ jsx("form", { onSubmit: stopTimer, children: /* @__PURE__ */ jsxs(
        "button",
        {
          disabled: processing,
          className: "w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded flex items-center justify-center gap-2",
          children: [
            /* @__PURE__ */ jsx(Square, { className: "w-5 h-5 fill-current" }),
            "Stop Timer & Capture"
          ]
        }
      ) })
    ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: startTimer, children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx(
          Select,
          {
            label: "Project",
            options: projects.map((p) => ({ value: p.id, label: p.name })),
            value: data.project_id,
            onChange: (val) => {
              setData((data2) => ({ ...data2, project_id: val, task_id: "" }));
            },
            placeholder: "Search and select project..."
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.project_id, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx(
          Select,
          {
            label: "Task (Optional)",
            options: availableTasks.map((t) => ({ value: t.id, label: t.title })),
            value: data.task_id,
            onChange: (val) => setData("task_id", val),
            disabled: !data.project_id,
            placeholder: data.project_id ? "Search and select task..." : "Select project first"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.task_id, className: "mt-2" }),
        data.project_id && /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500 mt-1", children: [
          availableTasks.length,
          " task(s) available"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Description (Optional)" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: data.description,
            onChange: (e) => setData("description", e.target.value),
            className: "w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
            placeholder: "What are you working on?"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.description, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            checked: data.is_overtime,
            onChange: (e) => setData("is_overtime", e.target.checked),
            className: "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500",
            id: "overtime_check"
          }
        ),
        /* @__PURE__ */ jsx("label", { htmlFor: "overtime_check", className: "ml-2 block text-sm text-gray-900", children: "Is Overtime?" })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          disabled: processing,
          className: "w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded flex items-center justify-center gap-2",
          children: [
            /* @__PURE__ */ jsx(Play, { className: "w-5 h-5 fill-current" }),
            "Start Timer"
          ]
        }
      )
    ] })
  ] });
}
function Dashboard({ auth, user_stats, todays_calls, todays_tasks, calendar_events, tasks, projects, users, activeTimer }) {
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const styles = `
        .rbc-header { text-transform: uppercase; font-size: 0.75rem; color: #6b7280; font-weight: 500; border-bottom: none; padding: 10px 0; }
        .rbc-month-view { border: none; }
        .rbc-month-row { border: none; min-height: 80px; }
        .rbc-day-bg { border: none; }
        .rbc-off-range-bg { background: transparent; }
        .rbc-date-cell { text-align: center; padding: 5px; font-weight: 500; color: #374151; }
        .rbc-today { background-color: transparent; }
        .rbc-now { font-weight: bold; color: #2563eb; }
        .rbc-current .rbc-button-link { background-color: #f3f4f6; border-radius: 9999px; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; }
    `;
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Dashboard" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowCreateTaskModal(true),
            className: "px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
            children: "+ Create Task"
          }
        )
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
        /* @__PURE__ */ jsx("style", { children: styles }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-6", children: [
          /* @__PURE__ */ jsx("div", { className: "lg:col-span-3", children: /* @__PURE__ */ jsx(CalendarWidget, { events: calendar_events }) }),
          /* @__PURE__ */ jsx("div", { className: "lg:col-span-1 space-y-6", children: /* @__PURE__ */ jsx(TimesheetTimerWidget, { projects, activeTimer }) }),
          /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsx(TaskWidget, { tasks: todays_tasks }) }),
          /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsx(CallWidget, { calls: todays_calls }) }),
          /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsx("a", { href: "/health", className: "block bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "p-4 bg-red-100 rounded-full mb-3", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-red-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" }) }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-indigo-600 mb-1", children: "Health" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Monitor wellness" })
          ] }) }) }),
          /* @__PURE__ */ jsx("div", { className: "lg:col-span-4", children: /* @__PURE__ */ jsx(GanttWidget, { tasks: tasks || [] }) })
        ] }),
        /* @__PURE__ */ jsx(
          CreateTaskModal,
          {
            show: showCreateTaskModal,
            onClose: () => setShowCreateTaskModal(false),
            projects,
            users
          }
        )
      ]
    }
  );
}
export {
  Dashboard as default
};
