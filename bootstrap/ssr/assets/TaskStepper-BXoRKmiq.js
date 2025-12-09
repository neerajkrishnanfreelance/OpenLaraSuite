import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { S as SecondaryButton } from "./SecondaryButton-C9TQBbBR.js";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { T as TextInput, I as InputError } from "./TextInput-mUZk5oTn.js";
import "@inertiajs/react";
function DocumentUpload({ onFilesChange, existingDocuments = [], onDelete, isCreate = false }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles([...selectedFiles, ...files]);
    if (onFilesChange) {
      onFilesChange([...selectedFiles, ...files]);
    }
  };
  const removeSelected = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    if (onFilesChange) {
      onFilesChange(newFiles);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-lg shadow space-y-4", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 border-b pb-2", children: "Attachments" }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-full", children: /* @__PURE__ */ jsxs("label", { htmlFor: "dropzone-file", className: "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-gray-300", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center pt-5 pb-6", children: [
        /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 mb-4 text-gray-500", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 20 16", children: /* @__PURE__ */ jsx("path", { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" }) }),
        /* @__PURE__ */ jsxs("p", { className: "mb-2 text-sm text-gray-500", children: [
          /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Click to upload" }),
          " or drag and drop"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Maximum file size: 10MB" })
      ] }),
      /* @__PURE__ */ jsx("input", { id: "dropzone-file", type: "file", className: "hidden", multiple: true, onChange: handleFileChange })
    ] }) }),
    selectedFiles.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium text-gray-700 mb-2", children: "Selected Files" }),
      /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: selectedFiles.map((file, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-center justify-between p-2 bg-gray-50 rounded", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm truncate", children: file.name }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => removeSelected(index), className: "text-red-500 hover:text-red-700 text-sm", children: "Remove" })
      ] }, index)) })
    ] }),
    !isCreate && existingDocuments.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium text-gray-700 mb-2", children: "Attached Documents" }),
      /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: existingDocuments.map((doc) => /* @__PURE__ */ jsxs("li", { className: "flex items-center justify-between p-2 bg-gray-50 rounded", children: [
        /* @__PURE__ */ jsx("a", { href: `/storage/${doc.path}`, target: "_blank", className: "text-sm text-blue-600 hover:underline truncate", children: doc.name }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => onDelete(doc.id), className: "text-red-500 hover:text-red-700 text-sm", children: "Delete" })
      ] }, doc.id)) })
    ] })
  ] });
}
function StatusStepper({ status, onChange, options = [] }) {
  const defaultOptions = [
    { value: "todo", label: "To Do" },
    { value: "in_progress", label: "In Progress" },
    { value: "review", label: "Review" },
    { value: "done", label: "Done" }
  ];
  const currentOptions = options.length > 0 ? options : defaultOptions;
  const currentIndex = currentOptions.findIndex((o) => o.value === status);
  return /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full relative", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2 rounded" }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute top-1/2 left-0 h-1 bg-purple-600 -z-10 transform -translate-y-1/2 rounded transition-all duration-300",
        style: { width: `${currentIndex / (currentOptions.length - 1) * 100}%` }
      }
    ),
    currentOptions.map((option, index) => {
      const isActive = index <= currentIndex;
      const isCurrent = index === currentIndex;
      return /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => onChange(option.value),
          className: "group flex flex-col items-center focus:outline-none",
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `
                                    w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-200
                                    ${isActive ? "bg-purple-600 border-purple-600 text-white shadow-md" : "bg-white border-gray-300 text-gray-400 group-hover:border-purple-400"}
                                    ${isCurrent ? "ring-2 ring-purple-200 scale-110" : ""}
                                `,
                children: isActive ? /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }) }) : /* @__PURE__ */ jsx("span", { className: "text-xs", children: index + 1 })
              }
            ),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: `
                                    mt-2 text-xs font-medium transition-colors duration-200
                                    ${isCurrent ? "text-purple-700 font-bold" : isActive ? "text-purple-600" : "text-gray-500 group-hover:text-gray-700"}
                                `,
                children: option.label
              }
            )
          ]
        },
        option.value
      );
    })
  ] }) });
}
function TaskStepper({ data, setData, errors, projects, users, isCreate = false, submit, processing, existingDocuments = [], onDeleteDocument, onFilesChange }) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center mb-8", children: [1, 2, 3].map((step) => /* @__PURE__ */ jsxs("div", { className: `flex items-center ${step < 3 ? "w-full" : ""}`, children: [
      /* @__PURE__ */ jsx("div", { className: `flex items-center justify-center w-10 h-10 rounded-full border-2 ${currentStep >= step ? "bg-purple-600 border-purple-600 text-white" : "border-gray-300 text-gray-500"}`, children: step }),
      step < 3 && /* @__PURE__ */ jsx("div", { className: `flex-1 h-1 mx-4 ${currentStep > step ? "bg-purple-600" : "bg-gray-200"}` })
    ] }, step)) }),
    currentStep === 1 && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Basic Information" }),
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
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "project_id", value: "Project" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              id: "project_id",
              className: "mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm",
              value: data.project_id,
              onChange: (e) => setData("project_id", e.target.value),
              required: true,
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Select Project" }),
                projects.map((p) => /* @__PURE__ */ jsx("option", { value: p.id, children: p.name }, p.id))
              ]
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.project_id, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "priority", value: "Priority" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              id: "priority",
              className: "mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm",
              value: data.priority,
              onChange: (e) => setData("priority", e.target.value),
              children: [
                /* @__PURE__ */ jsx("option", { value: "low", children: "Low" }),
                /* @__PURE__ */ jsx("option", { value: "medium", children: "Medium" }),
                /* @__PURE__ */ jsx("option", { value: "high", children: "High" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.priority, className: "mt-2" })
        ] })
      ] })
    ] }),
    currentStep === 2 && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Details & Status" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "description", value: "Description" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            id: "description",
            className: "mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm h-32",
            value: data.description,
            onChange: (e) => setData("description", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.description, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "assigned_to", value: "Assign To" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              id: "assigned_to",
              className: "mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm",
              value: data.assigned_to,
              onChange: (e) => setData("assigned_to", e.target.value),
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Unassigned" }),
                users.map((u) => /* @__PURE__ */ jsx("option", { value: u.id, children: u.name }, u.id))
              ]
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.assigned_to, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "status", value: "Status" }),
          /* @__PURE__ */ jsx(
            StatusStepper,
            {
              status: data.status,
              onChange: (value) => setData("status", value)
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "hidden", children: /* @__PURE__ */ jsxs("select", { value: data.status, onChange: () => {
          }, required: true, children: [
            /* @__PURE__ */ jsx("option", { value: "todo", children: "To Do" }),
            /* @__PURE__ */ jsx("option", { value: "in_progress", children: "In Progress" }),
            /* @__PURE__ */ jsx("option", { value: "review", children: "Review" }),
            /* @__PURE__ */ jsx("option", { value: "done", children: "Done" })
          ] }) }),
          /* @__PURE__ */ jsx(InputError, { message: errors.status, className: "mt-2" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "due_date", value: "Due Date" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "due_date",
            type: "date",
            className: "mt-1 block w-full",
            value: data.due_date,
            onChange: (e) => setData("due_date", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.due_date, className: "mt-2" })
      ] })
    ] }),
    currentStep === 3 && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Attachments & Review" }),
      /* @__PURE__ */ jsx(
        DocumentUpload,
        {
          onFilesChange,
          existingDocuments,
          onDelete: onDeleteDocument,
          isCreate
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-4 rounded-md mt-4", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-2", children: "Review Summary" }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Title:" }),
          " ",
          data.title
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Priority:" }),
          " ",
          data.priority
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Status:" }),
          " ",
          data.status
        ] })
      ] }),
      isCreate && /* @__PURE__ */ jsxs("div", { className: "space-y-6 mt-6 border-t pt-6", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-lg font-medium text-gray-900", children: "Start Collaboration" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "initial_chatter", value: "Initial Comment (Optional)" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "initial_chatter",
              className: "mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm h-24",
              placeholder: "Add a starting comment or instruction...",
              value: data.initial_chatter,
              onChange: (e) => setData("initial_chatter", e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "create_meeting",
              type: "checkbox",
              className: "rounded border-gray-300 text-purple-600 shadow-sm focus:ring-purple-500",
              checked: data.create_meeting,
              onChange: (e) => setData("create_meeting", e.target.checked)
            }
          ),
          /* @__PURE__ */ jsx("label", { htmlFor: "create_meeting", className: "ml-2 block text-sm text-gray-900", children: "Schedule an initial meeting for this task" })
        ] }),
        data.create_meeting && /* @__PURE__ */ jsxs("div", { className: "pl-6 border-l-2 border-purple-200 space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "meeting_title", value: "Meeting Subject" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "meeting_title",
                className: "mt-1 block w-full",
                value: data.meeting_details.title,
                onChange: (e) => setData("meeting_details", { ...data.meeting_details, title: e.target.value }),
                placeholder: "e.g., Kickoff Meeting"
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors["meeting_details.title"], className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "meeting_start", value: "Start Time" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "meeting_start",
                  type: "datetime-local",
                  className: "mt-1 block w-full",
                  value: data.meeting_details.start_time,
                  onChange: (e) => setData("meeting_details", { ...data.meeting_details, start_time: e.target.value })
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors["meeting_details.start_time"], className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "meeting_end", value: "End Time" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "meeting_end",
                  type: "datetime-local",
                  className: "mt-1 block w-full",
                  value: data.meeting_details.end_time,
                  onChange: (e) => setData("meeting_details", { ...data.meeting_details, end_time: e.target.value })
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors["meeting_details.end_time"], className: "mt-2" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "meeting_desc", value: "Meeting Description" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "meeting_desc",
                className: "mt-1 block w-full",
                value: data.meeting_details.description,
                onChange: (e) => setData("meeting_details", { ...data.meeting_details, description: e.target.value })
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between mt-8 pt-4 border-t", children: [
      currentStep > 1 ? /* @__PURE__ */ jsx(SecondaryButton, { onClick: prevStep, type: "button", children: "Previous" }) : /* @__PURE__ */ jsx("div", {}),
      currentStep < totalSteps ? /* @__PURE__ */ jsx(SecondaryButton, { onClick: nextStep, type: "button", children: "Next" }) : /* @__PURE__ */ jsx(PrimaryButton, { onClick: submit, disabled: processing, type: "submit", children: isCreate ? "Create Task" : "Update Task" })
    ] })
  ] });
}
export {
  TaskStepper as T
};
