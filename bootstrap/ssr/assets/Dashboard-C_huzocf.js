import { jsx, jsxs } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DksizGbA.js";
import { Head, Link as Link$1, router } from "@inertiajs/react";
import "react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
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
function Dashboard({ auth, activeCrops, rndCrops, recentLogs, upcomingSchedules }) {
  const markScheduleComplete = (scheduleId) => {
    if (confirm("Mark this schedule as done?")) {
      router.patch(route("agriculture.crops.schedules.complete", scheduleId), {}, {
        preserveScroll: true
      });
    }
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Agriculture Dashboard" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Agriculture" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6", children: [
            /* @__PURE__ */ jsx(StatCard, { title: "Active Crops", value: activeCrops, icon: "plant", color: "green" }),
            /* @__PURE__ */ jsx(StatCard, { title: "R&D Projects", value: rndCrops, icon: "flask", color: "blue" }),
            /* @__PURE__ */ jsx(Link$1, { href: route("agriculture.crops.create"), children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 flex items-center justify-center h-full hover:bg-gray-50 cursor-pointer border-2 border-dashed border-gray-300", children: /* @__PURE__ */ jsx("span", { className: "text-gray-500 font-medium", children: "Add New Crop" }) }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx("div", { className: "flex gap-4", children: /* @__PURE__ */ jsx(Link$1, { href: route("agriculture.crops.index"), className: "bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md", children: "View All Crops" }) }) }),
          upcomingSchedules && upcomingSchedules.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-8 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r shadow-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-4", children: [
              /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-blue-400", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z", clipRule: "evenodd" }) }) }),
              /* @__PURE__ */ jsx("div", { className: "ml-3", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-blue-800", children: "Upcoming Schedules" }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4", children: [
              upcomingSchedules.filter((s) => !s.completed_at).length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 italic", children: "No pending schedules." }),
              upcomingSchedules.filter((s) => !s.completed_at).map((schedule) => /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-md shadow-sm border border-blue-100 flex justify-between items-center", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("p", { className: "text-sm font-bold text-gray-800 capitalize", children: [
                    schedule.activity_type,
                    " for ",
                    schedule.crop.name
                  ] }),
                  /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mt-1", children: [
                    "Scheduled for: ",
                    new Date(schedule.scheduled_date).toLocaleDateString()
                  ] }),
                  schedule.notes && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600 mt-1 italic", children: schedule.notes })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-end gap-2", children: [
                  /* @__PURE__ */ jsx(Link$1, { href: route("agriculture.crops.show", schedule.crop_id), className: "text-blue-600 hover:text-blue-800 text-sm font-medium", children: "View Crop" }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => markScheduleComplete(schedule.id),
                      className: "text-xs bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded shadow-sm",
                      children: "Mark Done"
                    }
                  )
                ] })
              ] }, schedule.id))
            ] }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-4", children: "Recent Monitoring Logs" }),
            /* @__PURE__ */ jsx("div", { className: "flow-root", children: /* @__PURE__ */ jsxs("ul", { role: "list", className: "-mb-8", children: [
              recentLogs.map((log, logIdx) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("div", { className: "relative pb-8", children: [
                logIdx !== recentLogs.length - 1 ? /* @__PURE__ */ jsx("span", { className: "absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200", "aria-hidden": "true" }) : null,
                /* @__PURE__ */ jsxs("div", { className: "relative flex space-x-3", children: [
                  /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("span", { className: "h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }) }),
                  /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1 pt-1.5 flex justify-between space-x-4", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
                        "Checked ",
                        /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900", children: log.crop?.name })
                      ] }),
                      log.notes && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: log.notes }),
                      log.image_path && /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsx("img", { src: `/storage/${log.image_path}`, alt: "Log entry", className: "h-32 w-auto rounded-md object-cover shadow-sm" }) })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "text-right text-sm whitespace-nowrap text-gray-500", children: /* @__PURE__ */ jsx("time", { dateTime: log.log_date, children: log.log_date }) })
                  ] })
                ] })
              ] }) }, log.id)),
              recentLogs.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm", children: "No recent logs found." })
            ] }) })
          ] }) })
        ] }) })
      ]
    }
  );
}
export {
  Dashboard as default
};
