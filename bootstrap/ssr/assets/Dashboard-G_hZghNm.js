import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-CGySncB_.js";
import { Link as Link$1, Head } from "@inertiajs/react";
import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
/* empty css                            */
import { ViewMode, Gantt } from "gantt-task-react";
import { C as CreateTaskModal } from "./CreateTaskModal-CvqU1cVd.js";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
import "./Modal-BeSeEOS3.js";
import "./InputLabel-CE_n4Upz.js";
import "./TextInput-Xf9xHrLa.js";
import "./InputError-CBvD_6aD.js";
import "./PrimaryButton-BMCZH-oa.js";
import "./SecondaryButton-C9TQBbBR.js";
function ProfileCard({ user, stats }) {
  const { daily_progress } = stats;
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - daily_progress / 100 * circumference;
  return /* @__PURE__ */ jsxs(Link$1, { href: route("profile.edit"), className: "block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition duration-200", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-blue-600 p-6 flex items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "h-12 w-12 rounded-full border-2 border-white overflow-hidden bg-gray-200 flex-shrink-0", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff`,
          alt: user.name,
          className: "h-full w-full object-cover"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "ml-4 text-white", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold leading-tight", children: user.name }),
        /* @__PURE__ */ jsx("p", { className: "text-blue-100 text-xs", children: user.email }),
        /* @__PURE__ */ jsx("p", { className: "text-blue-200 text-[10px] mt-1 uppercase tracking-wider", children: user.roles?.[0]?.name || "Employee" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-gray-700", children: "Today's Tasks" }),
        /* @__PURE__ */ jsxs("span", { className: "text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full", children: [
          stats.todays_completed,
          " / ",
          stats.todays_total
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2 mt-4 mb-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center text-xs text-gray-600", children: [
          /* @__PURE__ */ jsx("span", { className: "text-green-500 mr-2 font-bold", children: "Check" }),
          " Client Call (2:00 PM)"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center text-xs text-gray-600", children: [
          /* @__PURE__ */ jsx("span", { className: "text-green-500 mr-2 font-bold", children: "Check" }),
          " Send Proposal"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4 pt-4 border-t border-gray-100", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-gray-700", children: "Pending Overall" }),
        /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full", children: stats.pending_overall })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2 mb-6", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-red-50 text-red-700 text-xs px-2 py-1 rounded border border-red-100", children: "Q4 Report - Overdue" }),
        /* @__PURE__ */ jsx("div", { className: "bg-orange-50 text-orange-700 text-xs px-2 py-1 rounded border border-orange-100", children: "Follow-up Al Jazira - Due Tomorrow" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center mt-4", children: /* @__PURE__ */ jsxs("div", { className: "relative h-24 w-24", children: [
        /* @__PURE__ */ jsxs("svg", { className: "h-full w-full transform -rotate-90", children: [
          /* @__PURE__ */ jsx(
            "circle",
            {
              cx: "50%",
              cy: "50%",
              r: radius,
              stroke: "currentColor",
              strokeWidth: "8",
              fill: "transparent",
              className: "text-gray-100"
            }
          ),
          /* @__PURE__ */ jsx(
            "circle",
            {
              cx: "50%",
              cy: "50%",
              r: radius,
              stroke: "currentColor",
              strokeWidth: "8",
              fill: "transparent",
              strokeDasharray: circumference,
              strokeDashoffset: offset,
              strokeLinecap: "round",
              className: "text-blue-500 transition-all duration-1000 ease-out"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center flex-col", children: /* @__PURE__ */ jsxs("span", { className: "text-xl font-bold text-blue-600", children: [
          daily_progress,
          "%"
        ] }) })
      ] }) })
    ] })
  ] });
}
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
  return /* @__PURE__ */ jsxs(Link$1, { href: route("calendar.index"), className: "block bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full hover:shadow-md transition duration-200", children: [
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
  return /* @__PURE__ */ jsxs(Link$1, { href: route("tasks.index"), className: "block bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full hover:shadow-md transition duration-200", children: [
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
  return /* @__PURE__ */ jsxs(Link$1, { href: route("meetings.index"), className: "block bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full hover:shadow-md transition duration-200", children: [
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
function StatCard({ title, subtitle, value, valueLabel, color = "purple", href }) {
  const colors = {
    purple: { bg: "bg-purple-600", text: "text-white", sub: "text-purple-100" },
    blue: { bg: "bg-blue-600", text: "text-white", sub: "text-blue-100" }
  };
  const theme = colors[color] || colors.purple;
  const Content = () => /* @__PURE__ */ jsxs("div", { className: `block ${theme.bg} p-6 rounded-2xl shadow-sm text-center h-full flex flex-col justify-center items-center hover:shadow-md transition duration-200`, children: [
    /* @__PURE__ */ jsx("div", { className: `text-4xl font-extrabold ${theme.text} mb-2`, children: value }),
    /* @__PURE__ */ jsx("div", { className: `text-sm font-medium ${theme.sub}`, children: valueLabel }),
    /* @__PURE__ */ jsx("div", { className: `text-xs ${theme.sub} mt-4 pt-4 border-t border-white/20 w-full`, children: subtitle })
  ] });
  if (href) {
    return /* @__PURE__ */ jsx(Link, { href, className: "block h-full", children: /* @__PURE__ */ jsx(Content, {}) });
  }
  return /* @__PURE__ */ jsx(Content, {});
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
function Dashboard({ auth, user_stats, todays_calls, todays_tasks, calendar_events, tasks, projects, users }) {
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
          /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsx(ProfileCard, { user: auth.user, stats: user_stats }) }),
          /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsx(TaskWidget, { tasks: todays_tasks }) }),
          /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsx(CallWidget, { calls: todays_calls }) }),
          /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsx(
            ProfileCard,
            {
              user: { name: "Sara Ahmed", email: "Project Coordinator", roles: [{ name: "Coordinator" }] },
              stats: { todays_completed: 9, todays_total: 11, pending_overall: 8, daily_progress: 80 }
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsx(
            StatCard,
            {
              title: "Delivery",
              value: `${user_stats.on_time_percentage}%`,
              valueLabel: "On-Time Delivery",
              subtitle: "This Month • Excellent!",
              color: "purple"
            }
          ) }),
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
