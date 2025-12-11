import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-C8XsLlAW.js";
import { Head, Link } from "@inertiajs/react";
import "react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function Show({ auth, meeting }) {
  const Field = ({ label, value, fullWidth = false }) => /* @__PURE__ */ jsxs("div", { className: `mb-4 ${fullWidth ? "col-span-2" : ""}`, children: [
    /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1", children: label }),
    /* @__PURE__ */ jsx("div", { className: "bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-md px-3 py-2", children: value || "-" })
  ] });
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString([], { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(Link, { href: route("meetings.index"), className: "mr-4 text-gray-400 hover:text-gray-600 transition", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }) }),
        /* @__PURE__ */ jsx("h2", { className: "font-bold text-2xl text-gray-800 leading-tight", children: meeting.title }),
        /* @__PURE__ */ jsx("span", { className: "ml-4 bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded border border-indigo-200", children: "Scheduled" })
      ] }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `Meeting: ${meeting.title}` }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
          /* @__PURE__ */ jsx("div", { className: "lg:col-span-2 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg border border-gray-200 p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 mb-6 border-b border-gray-100 pb-2", children: "Meeting Details" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsx(Field, { label: "Organizer", value: meeting.organizer ? meeting.organizer.name : "Unknown" }),
              /* @__PURE__ */ jsx(Field, { label: "Location/Link", value: meeting.location }),
              /* @__PURE__ */ jsx(Field, { label: "Start Time", value: formatDate(meeting.start_time) }),
              /* @__PURE__ */ jsx(Field, { label: "End Time", value: formatDate(meeting.end_time) }),
              /* @__PURE__ */ jsx(Field, { label: "Description", value: meeting.description, fullWidth: true })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg border border-gray-200 p-4", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-gray-800 mb-4 flex items-center border-b border-gray-100 pb-2", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 mr-2 text-indigo-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" }) }),
                "Participants"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "space-y-3", children: meeting.participants && meeting.participants.length > 0 ? meeting.participants.map((user) => /* @__PURE__ */ jsxs("div", { className: "flex items-center px-3 py-2 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition", children: [
                /* @__PURE__ */ jsx("div", { className: "h-8 w-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold mr-3 border border-indigo-200", children: user.name.charAt(0) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-800", children: user.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: user.email })
                ] })
              ] }, user.id)) : /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 italic", children: "No participants added." }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg border border-gray-200 p-4", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-gray-800 mb-4 flex items-center border-b border-gray-100 pb-2", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 mr-2 text-yellow-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }) }),
                "Notes"
              ] }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  className: "w-full text-sm border-gray-200 rounded-md focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50 h-32",
                  placeholder: "Add meeting notes here...",
                  disabled: true
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  Show as default
};
