import { jsx, jsxs } from "react/jsx-runtime";
import { useForm } from "@inertiajs/react";
import { M as Modal } from "./Modal-BeSeEOS3.js";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { T as TextInput } from "./TextInput-Xf9xHrLa.js";
import { I as InputError } from "./InputError-CBvD_6aD.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { S as SecondaryButton } from "./SecondaryButton-C9TQBbBR.js";
function CreateMeetingModal({ show, onClose, users = [], relatedId = null, relatedType = null }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    title: "",
    start_time: "",
    end_time: "",
    description: "",
    participants: []
  });
  const submit = (e) => {
    e.preventDefault();
    const formData = {
      ...data,
      meetingable_id: relatedId,
      meetingable_type: relatedType
    };
    post(route("meetings.store"), {
      data: formData,
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
  const handleParticipantToggle = (userId) => {
    const newParticipants = data.participants.includes(userId) ? data.participants.filter((id) => id !== userId) : [...data.participants, userId];
    setData("participants", newParticipants);
  };
  return /* @__PURE__ */ jsx(Modal, { show, onClose: handleClose, maxWidth: "2xl", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "p-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-gray-900 mb-6", children: "Schedule Meeting" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { forInput: "title", value: "Meeting Title *" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "title",
            className: "mt-1 block w-full",
            value: data.title,
            onChange: (e) => setData("title", e.target.value),
            placeholder: "Enter meeting title"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.title, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "start_time", value: "Start Time *" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "start_time",
              type: "datetime-local",
              className: "mt-1 block w-full",
              value: data.start_time,
              onChange: (e) => setData("start_time", e.target.value)
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.start_time, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "end_time", value: "End Time *" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "end_time",
              type: "datetime-local",
              className: "mt-1 block w-full",
              value: data.end_time,
              onChange: (e) => setData("end_time", e.target.value)
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.end_time, className: "mt-2" })
        ] })
      ] }),
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
            placeholder: "Meeting agenda or notes..."
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.description, className: "mt-2" })
      ] }),
      users.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { value: "Participants" }),
        /* @__PURE__ */ jsx("div", { className: "mt-2 max-h-40 overflow-y-auto border border-gray-300 rounded-md p-3 space-y-2", children: users.map((user) => /* @__PURE__ */ jsxs("label", { className: "flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              className: "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500",
              checked: data.participants.includes(user.id),
              onChange: () => handleParticipantToggle(user.id)
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm text-gray-700", children: user.name })
        ] }, user.id)) }),
        /* @__PURE__ */ jsx(InputError, { message: errors.participants, className: "mt-2" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end space-x-3", children: [
      /* @__PURE__ */ jsx(SecondaryButton, { type: "button", onClick: handleClose, children: "Cancel" }),
      /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: processing ? "Scheduling..." : "Schedule Meeting" })
    ] })
  ] }) });
}
export {
  CreateMeetingModal as C
};
