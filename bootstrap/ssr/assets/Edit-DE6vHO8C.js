import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DkmIA3xH.js";
import { useForm, Head } from "@inertiajs/react";
import { I as InputError } from "./InputError-CBvD_6aD.js";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { T as TextInput } from "./TextInput-Xf9xHrLa.js";
import { F as FormHeader } from "./FormHeader-CQAGRAnh.js";
import "react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function Edit({ auth, meeting, users }) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().slice(0, 16);
  };
  const { data, setData, put, processing, errors } = useForm({
    title: meeting.title || "",
    description: meeting.description || "",
    start_time: formatDate(meeting.start_time),
    end_time: formatDate(meeting.end_time),
    location_link: meeting.location_link || "",
    participant_ids: meeting.participants ? meeting.participants.map((p) => p.id) : []
  });
  const submit = (e) => {
    e.preventDefault();
    put(route("meetings.update", meeting.id));
  };
  const handleParticipantSelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => parseInt(option.value));
    setData("participant_ids", selectedOptions);
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsx(FormHeader, { title: "Edit Meeting", backRoute: "meetings.index", children: /* @__PURE__ */ jsx(PrimaryButton, { form: "edit-meeting-form", disabled: processing, children: "Save Changes" }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Edit Meeting" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-2xl mx-auto sm:px-6 lg:px-8 bg-white shadow-sm sm:rounded-lg p-6", children: /* @__PURE__ */ jsxs("form", { id: "edit-meeting-form", onSubmit: submit, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "title", value: "Title" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "title",
                value: data.title,
                className: "mt-1 block w-full",
                onChange: (e) => setData("title", e.target.value),
                required: true
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.title, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "description", value: "Description" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                id: "description",
                className: "mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm",
                value: data.description,
                onChange: (e) => setData("description", e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 mt-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "start_time", value: "Start Time" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "start_time",
                  type: "datetime-local",
                  className: "mt-1 block w-full",
                  value: data.start_time,
                  onChange: (e) => setData("start_time", e.target.value),
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.start_time, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "end_time", value: "End Time" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "end_time",
                  type: "datetime-local",
                  className: "mt-1 block w-full",
                  value: data.end_time,
                  onChange: (e) => setData("end_time", e.target.value),
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.end_time, className: "mt-2" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "location_link", value: "Location / Video Link" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "location_link",
                value: data.location_link,
                className: "mt-1 block w-full",
                onChange: (e) => setData("location_link", e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "participants", value: "Participants (Ctrl/Cmd to select)" }),
            /* @__PURE__ */ jsx(
              "select",
              {
                id: "participants",
                multiple: true,
                className: "mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm h-32",
                value: data.participant_ids,
                onChange: handleParticipantSelect,
                children: users.map((u) => /* @__PURE__ */ jsx("option", { value: u.id, children: u.name }, u.id))
              }
            )
          ] })
        ] }) }) })
      ]
    }
  );
}
export {
  Edit as default
};
