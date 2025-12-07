import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-hQdgXqic.js";
import { router, Head, Link } from "@inertiajs/react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, PieChart, Pie, Cell } from "recharts";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
/* empty css                            */
import { S as StatusBadge } from "./StatusBadge-CQKRwizJ.js";
import { useState, useEffect } from "react";
import { Clock, Play, Square } from "lucide-react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function TimerWidget({ tasks = [], users = [], currentUser }) {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [selectedTask, setSelectedTask] = useState("");
  const [selectedUser, setSelectedUser] = useState(currentUser?.id || "");
  useEffect(() => {
    const savedTimer = localStorage.getItem("activeTimer");
    if (savedTimer) {
      const timer = JSON.parse(savedTimer);
      setIsRunning(true);
      setStartTime(new Date(timer.startTime));
      setSelectedTask(timer.taskId);
      setSelectedUser(timer.userId);
    }
  }, []);
  useEffect(() => {
    let interval;
    if (isRunning && startTime) {
      interval = setInterval(() => {
        const now = /* @__PURE__ */ new Date();
        const diff = Math.floor((now - new Date(startTime)) / 1e3);
        setElapsedTime(diff);
      }, 1e3);
    }
    return () => clearInterval(interval);
  }, [isRunning, startTime]);
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor(seconds % 3600 / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  const handleStart = () => {
    if (!selectedTask || !selectedUser) {
      alert("Please select a task and user before starting the timer");
      return;
    }
    const now = /* @__PURE__ */ new Date();
    setStartTime(now);
    setIsRunning(true);
    setElapsedTime(0);
    localStorage.setItem("activeTimer", JSON.stringify({
      startTime: now.toISOString(),
      taskId: selectedTask,
      userId: selectedUser
    }));
  };
  const handleStop = () => {
    if (!startTime) return;
    const endTime = /* @__PURE__ */ new Date();
    const start = new Date(startTime);
    const hours = ((endTime - start) / (1e3 * 60 * 60)).toFixed(2);
    const task = tasks.find((t) => t.id == selectedTask);
    if (task) {
      router.post(route("tasks.timesheets.store", task.id), {
        user_id: selectedUser,
        date: start.toISOString().split("T")[0],
        start_time: start.toTimeString().substring(0, 5),
        end_time: endTime.toTimeString().substring(0, 5),
        hours,
        description: `Timer tracked work on ${task.title}`,
        is_overtime: false
      }, {
        preserveScroll: true,
        onSuccess: () => {
          setIsRunning(false);
          setStartTime(null);
          setElapsedTime(0);
          localStorage.removeItem("activeTimer");
          alert("Timesheet entry created successfully!");
        }
      });
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg border border-gray-200 p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-sm font-bold text-gray-800 flex items-center", children: [
        /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 mr-2 text-indigo-600" }),
        "Time Tracker"
      ] }),
      isRunning && /* @__PURE__ */ jsx("span", { className: "text-2xl font-mono font-bold text-indigo-600", children: formatTime(elapsedTime) })
    ] }),
    !isRunning ? /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-700 mb-1", children: "Task" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            className: "w-full text-sm border-gray-300 rounded-md shadow-sm",
            value: selectedTask,
            onChange: (e) => setSelectedTask(e.target.value),
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Select Task" }),
              tasks.map((task) => /* @__PURE__ */ jsxs("option", { value: task.id, children: [
                task.title,
                " (",
                task.project?.name,
                ")"
              ] }, task.id))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-700 mb-1", children: "User" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            className: "w-full text-sm border-gray-300 rounded-md shadow-sm",
            value: selectedUser,
            onChange: (e) => setSelectedUser(e.target.value),
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Select User" }),
              users.map((user) => /* @__PURE__ */ jsx("option", { value: user.id, children: user.name }, user.id))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: handleStart,
          className: "w-full flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition",
          children: [
            /* @__PURE__ */ jsx(Play, { className: "w-4 h-4 mr-2" }),
            "Start Timer"
          ]
        }
      )
    ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-600", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Task:" }),
          " ",
          tasks.find((t) => t.id == selectedTask)?.title
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Started:" }),
          " ",
          startTime ? new Date(startTime).toLocaleTimeString() : "-"
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: handleStop,
          className: "w-full flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition",
          children: [
            /* @__PURE__ */ jsx(Square, { className: "w-4 h-4 mr-2" }),
            "Stop & Save"
          ]
        }
      )
    ] })
  ] });
}
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
function Dashboard({ auth, stats, charts, todays_tasks, calendar_events, tasks, users }) {
  const COLORS = ["#9333ea", "#10b981", "#f59e0b", "#ef4444"];
  const taskData = charts.task_status.map((item) => ({
    name: item.status.replace("_", " ").toUpperCase(),
    value: item.count
  }));
  const hoursData = charts.hours_trend.map((item) => ({
    date: new Date(item.date).toLocaleDateString(void 0, { weekday: "short", day: "numeric" }),
    hours: parseFloat(item.total_hours)
  }));
  const events = calendar_events.map((ev) => ({
    ...ev,
    start: new Date(ev.start),
    end: new Date(ev.end)
  }));
  return /* @__PURE__ */ jsxs(Authenticated, { header: "Dashboard", children: [
    /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-8", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm rounded-xl p-5 border border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "p-3 rounded-full bg-purple-50 text-purple-600", children: /* @__PURE__ */ jsx("svg", { className: "h-8 w-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "ml-4", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-500", children: "My Pending Tasks" }),
          /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-gray-800", children: stats.my_pending_tasks })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm rounded-xl p-5 border border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "p-3 rounded-full bg-emerald-50 text-emerald-600", children: /* @__PURE__ */ jsx("svg", { className: "h-8 w-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "ml-4", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-500", children: "Hours (Month)" }),
          /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-gray-800", children: stats.my_hours_month })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm rounded-xl p-5 border border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "p-3 rounded-full bg-blue-50 text-blue-600", children: /* @__PURE__ */ jsx("svg", { className: "h-8 w-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "ml-4", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-500", children: "Active Projects" }),
          /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-gray-800", children: stats.active_projects })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm rounded-xl p-5 border border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "p-3 rounded-full bg-amber-50 text-amber-600", children: /* @__PURE__ */ jsx("svg", { className: "h-8 w-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "ml-4", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-500", children: "Approvals" }),
          /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-gray-800", children: stats.pending_approvals || 0 })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-xl shadow-sm border border-gray-100", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-gray-800 mb-4 flex items-center", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 mr-2 text-purple-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }),
            "Meeting Schedule"
          ] }),
          /* @__PURE__ */ jsx("div", { style: { height: 500 }, children: /* @__PURE__ */ jsx(
            Calendar,
            {
              localizer,
              events,
              startAccessor: "start",
              endAccessor: "end",
              style: { height: 500 },
              views: ["month", "week", "day"],
              defaultView: "week"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-xl shadow-sm border border-gray-100", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 mb-4", children: "Hours Logged Trend" }),
          /* @__PURE__ */ jsx("div", { className: "h-64", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(BarChart, { data: hoursData, children: [
            /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "#E5E7EB" }),
            /* @__PURE__ */ jsx(XAxis, { dataKey: "date", axisLine: false, tickLine: false, tick: { fill: "#6B7280" }, dy: 10 }),
            /* @__PURE__ */ jsx(YAxis, { axisLine: false, tickLine: false, tick: { fill: "#6B7280" } }),
            /* @__PURE__ */ jsx(
              Tooltip,
              {
                cursor: { fill: "#F3F4F6" },
                contentStyle: { borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }
              }
            ),
            /* @__PURE__ */ jsx(Bar, { dataKey: "hours", fill: "#10B981", radius: [4, 4, 0, 0], barSize: 40 })
          ] }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsx(
          TimerWidget,
          {
            tasks: tasks || [],
            users: users || [],
            currentUser: auth.user
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-96 overflow-y-auto", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800", children: "Today's Tasks" }),
            /* @__PURE__ */ jsx("span", { className: "bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full", children: todays_tasks.length })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-3", children: todays_tasks.length > 0 ? todays_tasks.map((task) => /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition duration-150 flex items-start justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Link, { href: route("tasks.edit", task.id), className: "font-medium text-gray-900 hover:text-purple-600 block", children: task.title }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: task.project?.name })
            ] }),
            /* @__PURE__ */ jsx(StatusBadge, { status: task.status })
          ] }, task.id)) : /* @__PURE__ */ jsxs("div", { className: "text-center py-8 text-gray-400 text-sm", children: [
            "No tasks due today. ",
            /* @__PURE__ */ jsx("br", {}),
            " Great job! 🎉"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-xl shadow-sm border border-gray-100", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 mb-4", children: "Task Distribution" }),
          /* @__PURE__ */ jsxs("div", { className: "h-64", children: [
            /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(PieChart, { children: [
              /* @__PURE__ */ jsx(
                Pie,
                {
                  data: taskData,
                  cx: "50%",
                  cy: "50%",
                  innerRadius: 60,
                  outerRadius: 80,
                  paddingAngle: 5,
                  dataKey: "value",
                  children: taskData.map((entry, index) => /* @__PURE__ */ jsx(Cell, { fill: COLORS[index % COLORS.length] }, `cell-${index}`))
                }
              ),
              /* @__PURE__ */ jsx(Tooltip, {})
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "flex justify-center space-x-4 mt-2", children: taskData.map((entry, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full mr-1", style: { backgroundColor: COLORS[index % COLORS.length] } }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-600 capitalize", children: entry.name.toLowerCase() })
            ] }, index)) })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  Dashboard as default
};
