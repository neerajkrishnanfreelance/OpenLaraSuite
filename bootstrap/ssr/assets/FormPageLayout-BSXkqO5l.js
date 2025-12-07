import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { C as Chatter } from "./Chatter-u8Py1g4n.js";
import { Link } from "@inertiajs/react";
function MeetingList({ meetings = [], meetingableId = null, meetingableType = null }) {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white shadow sm:rounded-lg p-6 mt-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Linked Meetings" }),
      meetingableId && /* @__PURE__ */ jsx(
        Link,
        {
          href: route("meetings.create", {
            meetingable_id: meetingableId,
            meetingable_type: meetingableType
          }),
          className: "inline-flex items-center px-3 py-1 bg-purple-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-purple-500 focus:bg-purple-500 active:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150",
          children: "Schedule Meeting"
        }
      )
    ] }),
    meetings.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "No meetings scheduled." }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Title" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Start Time" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "End Time" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Organizer" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: meetings.map((meeting) => /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { className: "px-3 py-2 whitespace-nowrap text-sm text-gray-900", children: meeting.title }),
        /* @__PURE__ */ jsx("td", { className: "px-3 py-2 whitespace-nowrap text-sm text-gray-500", children: new Date(meeting.start_time).toLocaleString() }),
        /* @__PURE__ */ jsx("td", { className: "px-3 py-2 whitespace-nowrap text-sm text-gray-500", children: new Date(meeting.end_time).toLocaleString() }),
        /* @__PURE__ */ jsx("td", { className: "px-3 py-2 whitespace-nowrap text-sm text-gray-500", children: meeting.organizer.name })
      ] }, meeting.id)) })
    ] }) })
  ] });
}
function FormPageLayout({
  children,
  chatterData = [],
  meetingsData = [],
  chatterableId,
  chatterableType,
  isCreate = false
}) {
  return /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-2 space-y-6", children: /* @__PURE__ */ jsx("div", { className: "bg-white shadow sm:rounded-lg p-6", children }) }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: isCreate ? /* @__PURE__ */ jsx("div", { className: "bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center h-full flex flex-col justify-center", children: /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm", children: "Save the record first to access Chatter." }) }) : /* @__PURE__ */ jsx(
        Chatter,
        {
          messages: chatterData,
          chatterableId,
          chatterableType
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: isCreate ? /* @__PURE__ */ jsx("div", { className: "bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm", children: "Save the record first to schedule Meetings." }) }) : /* @__PURE__ */ jsx(
      MeetingList,
      {
        meetings: meetingsData,
        meetingableId: chatterableId,
        meetingableType: chatterableType
      }
    ) })
  ] }) });
}
export {
  FormPageLayout as F
};
