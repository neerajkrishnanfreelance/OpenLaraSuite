import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-Db-Yuz5f.js";
import { useForm, Head } from "@inertiajs/react";
import { I as InputError } from "./InputError-CBvD_6aD.js";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { T as TextInput } from "./TextInput-Xf9xHrLa.js";
import { F as FormHeader } from "./FormHeader-CQAGRAnh.js";
import "react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function Create({ auth, users, meetingable_id, meetingable_type, meetingable_title }) {
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    description: "",
    start_time: "",
    end_time: "",
    location_link: "",
    participant_ids: [],
    meetingable_id: meetingable_id || "",
    meetingable_type: meetingable_type || ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("meetings.store"));
  };
  const handleParticipantSelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => parseInt(option.value));
    setData("participant_ids", selectedOptions);
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsx(FormHeader, { title: "Schedule Meeting", backRoute: "meetings.index", children: /* @__PURE__ */ jsx(PrimaryButton, { form: "create-meeting-form", disabled: processing, children: "Schedule" }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Schedule Meeting" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto sm:px-6 lg:px-8 bg-white shadow-sm sm:rounded-lg p-6", children: [
          meetingable_title && /* @__PURE__ */ jsxs("div", { className: "mb-6 p-4 bg-purple-50 border border-purple-200 rounded-md flex items-start space-x-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-purple-600", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" }) }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-purple-900", children: "Linked to Context" }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-purple-700 mt-1", children: [
                "Scheduling this meeting for ",
                /* @__PURE__ */ jsx("strong", { children: meetingable_title }),
                "."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("form", { id: "create-meeting-form", onSubmit: submit, children: [
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
          ] })
        ] }) })
      ]
    }
  );
}
export {
  Create as default
};
