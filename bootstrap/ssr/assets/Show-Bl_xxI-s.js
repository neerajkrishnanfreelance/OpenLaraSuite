import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DksizGbA.js";
import { useForm, Head, Link, router } from "@inertiajs/react";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { S as SecondaryButton } from "./SecondaryButton-C9TQBbBR.js";
import { T as TextInput } from "./TextInput-Xf9xHrLa.js";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { I as InputError } from "./InputError-CBvD_6aD.js";
import { M as Modal } from "./Modal-BeSeEOS3.js";
import { useState } from "react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function Show({ auth, crop }) {
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [editingLog, setEditingLog] = useState(null);
  const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
    crop_id: crop.id,
    log_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    log_type: "observation",
    stage: "",
    notes: "",
    image: null,
    temperature: "",
    humidity: "",
    input_name: "",
    input_quantity: "",
    input_unit: "kg"
  });
  const { data: scheduleData, setData: setScheduleData, post: postSchedule, processing: scheduleProcessing, errors: scheduleErrors, reset: resetSchedule } = useForm({
    activity_type: "watering",
    scheduled_date: new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() + 1)).toISOString().split("T")[0],
    notes: ""
  });
  const submitLog = (e) => {
    e.preventDefault();
    const options = {
      onSuccess: () => {
        setIsLogModalOpen(false);
        reset("notes", "image", "stage", "temperature", "humidity", "log_type", "input_name", "input_quantity", "input_unit");
        setEditingLog(null);
      }
    };
    if (editingLog) {
      put(route("agriculture.crop-logs.update", editingLog.id), options);
    } else {
      post(route("agriculture.crop-logs.store"), options);
    }
  };
  const editLog = (log) => {
    setEditingLog(log);
    setData({
      crop_id: crop.id,
      log_date: log.log_date,
      log_type: log.log_type,
      stage: log.stage || "",
      notes: log.notes || "",
      image: null,
      temperature: log.temperature || "",
      humidity: log.humidity || "",
      input_name: log.input_name || "",
      input_quantity: log.input_quantity || "",
      input_unit: log.input_unit || "kg"
    });
    clearErrors();
    setIsLogModalOpen(true);
  };
  const submitSchedule = (e) => {
    e.preventDefault();
    postSchedule(route("agriculture.crops.schedules.store", crop.id), {
      onSuccess: () => {
        setIsScheduleModalOpen(false);
        resetSchedule();
      }
    });
  };
  const deleteLog = (logId) => {
    if (confirm("Are you sure you want to delete this log?")) {
      router.delete(route("agriculture.crop-logs.destroy", logId), { preserveScroll: true });
    }
  };
  const deleteCrop = () => {
    if (confirm("Are you sure you want to delete this crop? This will delete all associated logs and schedules.")) {
      router.delete(route("agriculture.crops.destroy", crop.id));
    }
  };
  const openLogModal = () => {
    setEditingLog(null);
    reset("notes", "image", "stage", "temperature", "humidity", "log_type", "input_name", "input_quantity", "input_unit");
    setData("log_date", (/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
    clearErrors();
    setIsLogModalOpen(true);
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center gap-4", children: [
        /* @__PURE__ */ jsxs("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: [
          "Crop Details: ",
          crop.name,
          crop.check_r_n_d && /* @__PURE__ */ jsx("span", { className: "ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full align-middle", children: "R&D" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 flex-wrap justify-center", children: [
          /* @__PURE__ */ jsx(Link, { href: route("agriculture.crops.index"), className: "px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300", children: "Back" }),
          /* @__PURE__ */ jsx(Link, { href: route("agriculture.crops.edit", crop.id), className: "px-4 py-2 bg-yellow-500 text-white rounded-md text-sm font-medium hover:bg-yellow-600", children: "Edit Crop" }),
          /* @__PURE__ */ jsx("button", { onClick: deleteCrop, className: "px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700", children: "Delete" }),
          /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => setIsScheduleModalOpen(true), children: "+ Schedule Activity" }),
          /* @__PURE__ */ jsx(PrimaryButton, { onClick: openLogModal, children: "+ Add Daily Log" })
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `Crop: ${crop.name}` }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-6 grid grid-cols-2 md:grid-cols-4 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Type" }),
                /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900", children: crop.type || "N/A" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Variety" }),
                /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900", children: crop.variety || "N/A" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Planted" }),
                /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900", children: crop.planting_date || "N/A" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Status" }),
                /* @__PURE__ */ jsx("span", { className: `px-2 py-1 text-xs font-bold uppercase rounded ${crop.status === "active" ? "bg-green-100 text-green-800" : crop.status === "harvested" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`, children: crop.status })
              ] })
            ] }),
            crop.notes && /* @__PURE__ */ jsx("div", { className: "px-6 pb-6 border-t pt-4 text-gray-600 text-sm", children: crop.notes })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-4 px-2", children: "Growth Timeline / R&D Log" }),
              /* @__PURE__ */ jsx("div", { className: "space-y-8", children: !crop.logs || crop.logs.length === 0 ? /* @__PURE__ */ jsx("div", { className: "text-center py-10 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300", children: /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "No logs yet. Start monitoring this crop!" }) }) : crop.logs.map((log) => /* @__PURE__ */ jsxs("div", { className: "relative flex items-start gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex-none p-2 bg-white border border-gray-200 rounded-md shadow-sm text-center w-20", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 uppercase font-bold", children: new Date(log.log_date).toLocaleString("default", { month: "short" }) }),
                  /* @__PURE__ */ jsx("div", { className: "text-xl font-bold text-gray-900", children: new Date(log.log_date).getDate() }),
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400", children: new Date(log.log_date).getFullYear() })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex-grow bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden relative group", children: [
                  /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "absolute top-2 right-2 hidden group-hover:flex gap-2", children: [
                      /* @__PURE__ */ jsx("button", { onClick: () => editLog(log), className: "text-yellow-600 hover:text-yellow-800 text-sm", children: "Edit" }),
                      /* @__PURE__ */ jsx("button", { onClick: () => deleteLog(log.id), className: "text-red-500 hover:text-red-700 text-sm", children: "Delete" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mb-2", children: log.stage || log.log_type }),
                        log.notes && /* @__PURE__ */ jsx("p", { className: "text-gray-800", children: log.notes })
                      ] }),
                      (log.temperature || log.humidity) && /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500 text-right", children: [
                        log.temperature && /* @__PURE__ */ jsxs("div", { children: [
                          log.temperature,
                          "°C"
                        ] }),
                        log.humidity && /* @__PURE__ */ jsxs("div", { children: [
                          log.humidity,
                          "% Humidity"
                        ] })
                      ] })
                    ] })
                  ] }),
                  log.image_path && /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-100 border-t border-gray-100", children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: `/storage/${log.image_path}`,
                      alt: `Log for ${crop.name}`,
                      className: "w-full h-auto max-h-96 object-contain mx-auto"
                    }
                  ) })
                ] })
              ] }, log.id)) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-4", children: "Upcoming Schedules" }),
              /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow-sm border border-gray-100 p-4", children: crop.schedules && crop.schedules.length > 0 ? /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: crop.schedules.map((schedule) => /* @__PURE__ */ jsxs("li", { className: "pb-4 border-b last:border-0 last:pb-0", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-800 capitalize", children: schedule.activity_type }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500", children: new Date(schedule.scheduled_date).toLocaleDateString() })
                ] }),
                schedule.notes && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mt-1", children: schedule.notes })
              ] }, schedule.id)) }) : /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500 text-sm py-4", children: "No upcoming schedules." }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Modal, { show: isLogModalOpen, onClose: () => setIsLogModalOpen(false), children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 mb-4", children: editingLog ? "Edit Log" : "Add Daily Monitoring Log" }),
          /* @__PURE__ */ jsxs("form", { onSubmit: submitLog, children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { htmlFor: "log_date", value: "Date" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    id: "log_date",
                    type: "date",
                    className: "mt-1 block w-full",
                    value: data.log_date,
                    onChange: (e) => setData("log_date", e.target.value),
                    required: true
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.log_date, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { htmlFor: "log_type", value: "Activity Type" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    id: "log_type",
                    className: "mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
                    value: data.log_type,
                    onChange: (e) => setData("log_type", e.target.value),
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "observation", children: "Observation / Check" }),
                      /* @__PURE__ */ jsx("option", { value: "nutrition", children: "Nutrition / Fertilizer" }),
                      /* @__PURE__ */ jsx("option", { value: "pesticide", children: "Pesticide / Disease Control" }),
                      /* @__PURE__ */ jsx("option", { value: "water", children: "Watering" }),
                      /* @__PURE__ */ jsx("option", { value: "harvest", children: "Harvest" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.log_type, className: "mt-2" })
              ] })
            ] }),
            ["nutrition", "pesticide"].includes(data.log_type) && /* @__PURE__ */ jsxs("div", { className: `mt-4 p-4 rounded-md border ${data.log_type === "nutrition" ? "bg-purple-50 border-purple-100" : "bg-red-50 border-red-100"}`, children: [
              /* @__PURE__ */ jsx("h4", { className: `text-sm font-bold mb-2 ${data.log_type === "nutrition" ? "text-purple-800" : "text-red-800"}`, children: data.log_type === "nutrition" ? "Nutrition Details" : "Pesticide / Application Details" }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
                  /* @__PURE__ */ jsx(InputLabel, { htmlFor: "input_name", value: "Product Name" }),
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      id: "input_name",
                      type: "text",
                      className: "mt-1 block w-full",
                      value: data.input_name,
                      onChange: (e) => setData("input_name", e.target.value),
                      placeholder: data.log_type === "nutrition" ? "e.g. NPK 20-20-20" : "e.g. Neem Oil"
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.input_name, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(InputLabel, { htmlFor: "input_quantity", value: "Quantity Applied" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex", children: [
                    /* @__PURE__ */ jsx(
                      TextInput,
                      {
                        id: "input_quantity",
                        type: "number",
                        step: "0.01",
                        className: "mt-1 block w-full rounded-r-none",
                        value: data.input_quantity,
                        onChange: (e) => setData("input_quantity", e.target.value),
                        placeholder: "0.00"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      TextInput,
                      {
                        id: "input_unit",
                        type: "text",
                        className: "mt-1 block w-20 rounded-l-none border-l-0 bg-gray-50",
                        value: data.input_unit,
                        onChange: (e) => setData("input_unit", e.target.value),
                        placeholder: "Unit"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx(InputError, { message: errors.input_quantity, className: "mt-2" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "stage", value: "Growth Stage (Optional)" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "stage",
                  type: "text",
                  className: "mt-1 block w-full",
                  value: data.stage,
                  onChange: (e) => setData("stage", e.target.value),
                  placeholder: "e.g. Flowering"
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.stage, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "notes", value: "Observations / Notes" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  id: "notes",
                  className: "mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
                  rows: "3",
                  value: data.notes,
                  onChange: (e) => setData("notes", e.target.value),
                  placeholder: "Leaves looking green..."
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.notes, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "image", value: "Take Photo / Upload Image" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "image",
                  type: "file",
                  accept: "image/*",
                  capture: "environment",
                  className: "mt-1 block w-full text-sm text-gray-500\n                                file:mr-4 file:py-2 file:px-4\n                                file:rounded-md file:border-0\n                                file:text-sm file:font-semibold\n                                file:bg-indigo-50 file:text-indigo-700\n                                hover:file:bg-indigo-100",
                  onChange: (e) => setData("image", e.target.files[0])
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Use camera on mobile to take a daily photo." }),
              /* @__PURE__ */ jsx(InputError, { message: errors.image, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 mt-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { htmlFor: "temperature", value: "Temp (°C) (Opt)" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    id: "temperature",
                    type: "number",
                    step: "0.1",
                    className: "mt-1 block w-full",
                    value: data.temperature,
                    onChange: (e) => setData("temperature", e.target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { htmlFor: "humidity", value: "Humidity (%) (Opt)" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    id: "humidity",
                    type: "number",
                    step: "0.1",
                    className: "mt-1 block w-full",
                    value: data.humidity,
                    onChange: (e) => setData("humidity", e.target.value)
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end", children: [
              /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => setIsLogModalOpen(false), children: "Cancel" }),
              /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-3", disabled: processing, children: editingLog ? "Update Log" : "Save Log" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Modal, { show: isScheduleModalOpen, onClose: () => setIsScheduleModalOpen(false), children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 mb-4", children: "Schedule Activity" }),
          /* @__PURE__ */ jsxs("form", { onSubmit: submitSchedule, children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "activity_type", value: "Activity Type" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  id: "activity_type",
                  className: "mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
                  value: scheduleData.activity_type,
                  onChange: (e) => setScheduleData("activity_type", e.target.value),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "watering", children: "Watering" }),
                    /* @__PURE__ */ jsx("option", { value: "fertilizer", children: "Fertilizer" }),
                    /* @__PURE__ */ jsx("option", { value: "pesticide", children: "Pesticide" }),
                    /* @__PURE__ */ jsx("option", { value: "harvest", children: "Harvest" }),
                    /* @__PURE__ */ jsx("option", { value: "other", children: "Other" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: scheduleErrors.activity_type, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "scheduled_date", value: "Scheduled Date" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "scheduled_date",
                  type: "date",
                  className: "mt-1 block w-full",
                  value: scheduleData.scheduled_date,
                  onChange: (e) => setScheduleData("scheduled_date", e.target.value),
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: scheduleErrors.scheduled_date, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "schedule_notes", value: "Notes" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "schedule_notes",
                  type: "text",
                  className: "mt-1 block w-full",
                  value: scheduleData.notes,
                  onChange: (e) => setScheduleData("notes", e.target.value),
                  placeholder: "E.g. Apply 2kg NPK"
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: scheduleErrors.notes, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end", children: [
              /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => setIsScheduleModalOpen(false), children: "Cancel" }),
              /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-3", disabled: scheduleProcessing, children: "Save Schedule" })
            ] })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  Show as default
};
