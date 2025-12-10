import { jsxs, jsx, Fragment as Fragment$1 } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DqVvfPrE.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { S as SecondaryButton } from "./SecondaryButton-C9TQBbBR.js";
import { T as TextInput } from "./TextInput-Xf9xHrLa.js";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { I as InputError } from "./InputError-CBvD_6aD.js";
import { useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronDown, Check, Clock, Plus, X, ChevronLeft } from "lucide-react";
import { M as Modal } from "./Modal-BeSeEOS3.js";
import { C as Chatter } from "./Chatter-QayPlM-X.js";
import "./ApplicationLogo-xMpxFOcX.js";
import "./Checkbox-5PHg8iNz.js";
function SearchableSelect({ label, value, onChange, options = [], placeholder = "Select..." }) {
  const [query, setQuery] = useState("");
  const filteredPeople = query === "" ? options : options.filter(
    (person) => person.name.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, ""))
  );
  const selectedPerson = options.find((p) => p.name === value || p.id === value) || null;
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    label && /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1", children: label }),
    /* @__PURE__ */ jsx(Combobox, { value: selectedPerson, onChange: (person) => onChange(person ? person.name : null), children: /* @__PURE__ */ jsxs("div", { className: "relative mt-1", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative w-full cursor-default overflow-hidden rounded-md bg-gray-50 border border-gray-200 text-left focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm", children: [
        /* @__PURE__ */ jsx(
          Combobox.Input,
          {
            className: "w-full border-none bg-transparent py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 placeholder-gray-400",
            displayValue: (person) => person ? person.name : "",
            onChange: (event) => setQuery(event.target.value),
            placeholder
          }
        ),
        /* @__PURE__ */ jsx(Combobox.Button, { className: "absolute inset-y-0 right-0 flex items-center pr-2", children: /* @__PURE__ */ jsx(
          ChevronDown,
          {
            className: "h-4 w-4 text-gray-400",
            "aria-hidden": "true"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(
        Transition,
        {
          as: Fragment,
          leave: "transition ease-in duration-100",
          leaveFrom: "opacity-100",
          leaveTo: "opacity-0",
          afterLeave: () => setQuery(""),
          children: /* @__PURE__ */ jsx(Combobox.Options, { className: "absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50", children: filteredPeople.length === 0 && query !== "" ? /* @__PURE__ */ jsx("div", { className: "relative cursor-default select-none py-2 px-4 text-gray-700", children: "Nothing found." }) : filteredPeople.map((person) => /* @__PURE__ */ jsx(
            Combobox.Option,
            {
              className: ({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-indigo-600 text-white" : "text-gray-900"}`,
              value: person,
              children: ({ selected, active }) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: `block truncate ${selected ? "font-medium" : "font-normal"}`,
                    children: person.name
                  }
                ),
                selected ? /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: `absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-indigo-600"}`,
                    children: /* @__PURE__ */ jsx(Check, { className: "h-5 w-5", "aria-hidden": "true" })
                  }
                ) : null
              ] })
            },
            person.id
          )) })
        }
      )
    ] }) })
  ] });
}
function ScheduledActivities({ task, activities = [] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    type: "call",
    // call, email, meeting
    subject: "",
    due_at: "",
    description: ""
  });
  const toggleForm = useForm({});
  const submitActivity = (e) => {
    e.preventDefault();
    post(route("tasks.activities.store", task.id), {
      onSuccess: () => {
        setIsModalOpen(false);
        reset();
      }
    });
  };
  const handleToggle = (activity) => {
    toggleForm.setData({ is_completed: !activity.is_completed });
    toggleForm.put(route("tasks.activities.update", [task.id, activity.id]), {
      preserveScroll: true
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg border border-gray-200 p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-gray-800 flex items-center", children: [
        /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 mr-2 text-indigo-500" }),
        "Scheduled Activities"
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setIsModalOpen(true),
          className: "flex items-center text-xs font-semibold text-purple-600 hover:text-purple-700",
          children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 mr-1" }),
            "Schedule Activity"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      activities.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 text-center py-4", children: "No scheduled activities." }),
      activities.map((activity) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: `flex items-start p-3 rounded-lg border ${activity.is_completed ? "bg-gray-50 border-gray-100" : "bg-green-50/50 border-green-100"} ${activity.type === "email" ? "bg-yellow-50/50 border-yellow-100" : ""}`,
          children: [
            /* @__PURE__ */ jsx("div", { className: `mt-0.5 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mr-3 ${activity.type === "call" ? "bg-green-500 text-white" : activity.type === "email" ? "bg-yellow-500 text-white" : "bg-blue-500 text-white"}`, children: activity.type.charAt(0).toUpperCase() }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("h4", { className: `text-sm font-semibold ${activity.is_completed ? "text-gray-500 line-through" : "text-gray-800"}`, children: activity.subject }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: new Date(activity.due_at).toLocaleString() })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleToggle(activity),
                className: `p-1 rounded-full ${activity.is_completed ? "text-gray-400 hover:text-gray-600" : "text-green-500 hover:text-green-600"}`,
                children: activity.is_completed ? /* @__PURE__ */ jsx(X, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Check, { className: "w-4 h-4" })
              }
            )
          ]
        },
        activity.id
      ))
    ] }),
    /* @__PURE__ */ jsx(Modal, { show: isModalOpen, onClose: () => setIsModalOpen(false), children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 mb-4", children: "Schedule Activity" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submitActivity, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { value: "Type" }),
          /* @__PURE__ */ jsx("div", { className: "flex space-x-4 mt-1", children: ["call", "meeting", "email"].map((t) => /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "radio",
                checked: data.type === t,
                onChange: () => setData("type", t),
                className: "text-indigo-600 focus:ring-indigo-500"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "capitalize text-sm text-gray-700", children: t })
          ] }, t)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "subject", value: "Subject" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "subject",
              type: "text",
              className: "mt-1 block w-full",
              value: data.subject,
              onChange: (e) => setData("subject", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.subject, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "due_at", value: "Due Date & Time" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "due_at",
              type: "datetime-local",
              className: "mt-1 block w-full",
              value: data.due_at,
              onChange: (e) => setData("due_at", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.due_at, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "description", value: "Description" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "description",
              className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
              value: data.description,
              onChange: (e) => setData("description", e.target.value)
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.description, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end space-x-3 mt-6", children: [
          /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => setIsModalOpen(false), children: "Cancel" }),
          /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Schedule" })
        ] })
      ] })
    ] }) })
  ] });
}
function Show({ auth, task, contacts = [], lead_stages = [] }) {
  const { data, setData, put, post, processing, errors } = useForm({
    contact_id: task.contact_id || "",
    contact_name: task.contact_name || "",
    title: task.title || "",
    // Project Name
    mobile: task.mobile || "",
    expected_revenue: task.expected_revenue || "",
    lead_stage_id: task.lead_stage_id || "",
    stage: task.stage || "",
    source: task.source || "",
    description: task.description || ""
  });
  const updateLead = (e) => {
    e.preventDefault();
    put(route("tasks.update", task.id), {
      preserveScroll: true
    });
  };
  const convertToProject = () => {
    if (confirm("Are you sure you want to convert this lead to a project? It will be marked as Won.")) {
      post(route("tasks.convert-to-project", task.id));
    }
  };
  const sourceOptions = [
    { id: "LinkedIn", name: "LinkedIn" },
    { id: "Website", name: "Website" },
    { id: "Referral", name: "Referral" },
    { id: "Cold Call", name: "Cold Call" }
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs(Link, { href: route("tasks.index"), className: "mr-4 text-purple-600 hover:text-purple-800 transition flex items-center", children: [
        /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5 mr-1" }),
        "Back"
      ] }) }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `Lead: ${task.contact_name || task.title}` }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white border-b border-gray-200 px-8 py-4 mb-6 flex justify-between items-center sticky top-0 z-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-bold text-2xl text-gray-800 leading-tight", children: task.contact_name || task.title }),
          /* @__PURE__ */ jsxs("div", { className: "flex space-x-3", children: [
            /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => window.history.back(), className: "hidden", children: "Cancel" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: convertToProject,
                className: "bg-green-600 border border-transparent text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition",
                children: "Convert to Project"
              }
            ),
            /* @__PURE__ */ jsx(PrimaryButton, { onClick: updateLead, disabled: processing, className: "bg-indigo-600 hover:bg-indigo-700", children: "Save" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg border border-gray-200 p-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 mb-6 pb-2", children: "Lead Information" }),
              /* @__PURE__ */ jsx("form", { onSubmit: updateLead, children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(
                    SearchableSelect,
                    {
                      label: "Contact",
                      options: contacts,
                      value: data.contact_id,
                      onChange: (val) => setData("contact_id", val),
                      placeholder: "Select Contact"
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.contact_id, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(InputLabel, { forInput: "title", value: "Project Name" }),
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      id: "title",
                      className: "mt-1 block w-full",
                      value: data.title,
                      onChange: (e) => setData("title", e.target.value)
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.title, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(InputLabel, { forInput: "mobile", value: "Mobile" }),
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      id: "mobile",
                      className: "mt-1 block w-full",
                      value: data.mobile,
                      onChange: (e) => setData("mobile", e.target.value)
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.mobile, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(InputLabel, { forInput: "expected_revenue", value: "Expected Revenue" }),
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      id: "expected_revenue",
                      type: "number",
                      className: "mt-1 block w-full",
                      value: data.expected_revenue,
                      onChange: (e) => setData("expected_revenue", e.target.value)
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.expected_revenue, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(
                    SearchableSelect,
                    {
                      label: "Stage",
                      options: lead_stages,
                      value: data.lead_stage_id,
                      onChange: (val) => setData("lead_stage_id", val)
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.lead_stage_id, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(
                    SearchableSelect,
                    {
                      label: "Source",
                      options: sourceOptions,
                      value: data.source,
                      onChange: (val) => setData("source", val)
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.source, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "col-span-1 md:col-span-2", children: [
                  /* @__PURE__ */ jsx(InputLabel, { forInput: "description", value: "Description" }),
                  /* @__PURE__ */ jsx(
                    "textarea",
                    {
                      id: "description",
                      className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 min-h-[100px]",
                      value: data.description,
                      onChange: (e) => setData("description", e.target.value)
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.description, className: "mt-2" })
                ] })
              ] }) })
            ] }),
            /* @__PURE__ */ jsx(ScheduledActivities, { task, activities: task.activities || [] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "lg:col-span-1 h-full", children: /* @__PURE__ */ jsx(Chatter, { task, messages: task.chatter_messages || [] }) })
        ] }) })
      ]
    }
  );
}
export {
  Show as default
};
