import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-D7veU2Fe.js";
import { Head } from "@inertiajs/react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
/* empty css                            */
import { F as FormHeader } from "./FormHeader-CQAGRAnh.js";
import { useState } from "react";
import { C as CreateMeetingModal } from "./CreateMeetingModal-BpL3dkvm.js";
import { C as CreateTaskModal } from "./CreateTaskModal-B7IcLk-8.js";
import { M as Modal } from "./Modal-BeSeEOS3.js";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
import "./InputLabel-CE_n4Upz.js";
import "./TextInput-mUZk5oTn.js";
import "./PrimaryButton-BMCZH-oa.js";
import "./SecondaryButton-C9TQBbBR.js";
const localizer = momentLocalizer(moment);
function Index({ auth, events, projects, users }) {
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showTypeSelection, setShowTypeSelection] = useState(false);
  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setShowTypeSelection(true);
  };
  const handleCreateMeeting = () => {
    setShowTypeSelection(false);
    setShowMeetingModal(true);
  };
  const handleCreateTask = () => {
    setShowTypeSelection(false);
    setShowTaskModal(true);
  };
  const handleSelectEvent = (event) => {
    if (event.type === "meeting") {
      window.location.href = route("meetings.edit", event.resource.id);
    } else if (event.type === "task") {
      window.location.href = route("tasks.edit", event.resource.id);
    }
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx(FormHeader, { title: "Calendar" }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setShowMeetingModal(true),
              className: "bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700",
              children: "+ Meeting"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setShowTaskModal(true),
              className: "bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700",
              children: "+ Task"
            }
          )
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Calendar" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg p-6", children: /* @__PURE__ */ jsx("div", { style: { height: "700px" }, children: /* @__PURE__ */ jsx(
          Calendar,
          {
            localizer,
            events,
            startAccessor: "start",
            endAccessor: "end",
            style: { height: "100%" },
            selectable: true,
            onSelectSlot: handleSelectSlot,
            onSelectEvent: handleSelectEvent,
            eventPropGetter: (event) => {
              const backgroundColor = event.type === "meeting" ? "#9333ea" : "#16a34a";
              return { style: { backgroundColor } };
            }
          }
        ) }) }) }) }),
        /* @__PURE__ */ jsx(Modal, { show: showTypeSelection, onClose: () => setShowTypeSelection(false), maxWidth: "sm", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold mb-4", children: "Create New" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleCreateMeeting,
                className: "w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700",
                children: "Schedule Meeting"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleCreateTask,
                className: "w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700",
                children: "Create Task"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setShowTypeSelection(false),
                className: "w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300",
                children: "Cancel"
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(
          CreateMeetingModal,
          {
            show: showMeetingModal,
            onClose: () => {
              setShowMeetingModal(false);
              setSelectedSlot(null);
            },
            users,
            initialDate: selectedSlot?.start
          }
        ),
        /* @__PURE__ */ jsx(
          CreateTaskModal,
          {
            show: showTaskModal,
            onClose: () => {
              setShowTaskModal(false);
              setSelectedSlot(null);
            },
            projects,
            users,
            initialDate: selectedSlot?.start
          }
        )
      ]
    }
  );
}
export {
  Index as default
};
