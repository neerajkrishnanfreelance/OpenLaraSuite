import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { A as Authenticated } from "./AuthenticatedLayout-__gkNP0U.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { S as SecondaryButton } from "./SecondaryButton-C9TQBbBR.js";
import { T as TextInput } from "./TextInput-Xf9xHrLa.js";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { I as InputError } from "./InputError-CBvD_6aD.js";
import { S as SearchableSelect } from "./SearchableSelect-C4FgJwXx.js";
import { ChevronLeft } from "lucide-react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function CreateLead({ auth, contacts, lead_stages, media, users }) {
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    description: "",
    contact_id: "",
    contact_name: "",
    email: "",
    phone: "",
    company: "",
    lead_stage_id: "",
    expected_revenue: "",
    source: "",
    medium_id: "",
    priority: "medium",
    status: "new",
    assigned_to: "",
    expected_close_date: "",
    tags: [],
    notes: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("crm.leads.store"));
  };
  const sourceOptions = [
    { id: "LinkedIn", name: "LinkedIn" },
    { id: "Website", name: "Website" },
    { id: "Referral", name: "Referral" },
    { id: "Cold Call", name: "Cold Call" },
    { id: "Email Campaign", name: "Email Campaign" },
    { id: "Social Media", name: "Social Media" },
    { id: "Trade Show", name: "Trade Show" },
    { id: "Other", name: "Other" }
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxs(Link, { href: route("crm.leads"), className: "mr-4 text-purple-600 hover:text-purple-800 transition flex items-center", children: [
          /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5 mr-1" }),
          "Back to Leads"
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Create New Lead" })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Create Lead" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 mb-4 pb-2 border-b", children: "Lead Information" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
                /* @__PURE__ */ jsx(InputLabel, { forInput: "title", value: "Lead Title *" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    id: "title",
                    type: "text",
                    className: "mt-1 block w-full",
                    value: data.title,
                    onChange: (e) => setData("title", e.target.value),
                    required: true
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.title, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { forInput: "priority", value: "Priority *" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    id: "priority",
                    className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                    value: data.priority,
                    onChange: (e) => setData("priority", e.target.value),
                    required: true,
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "low", children: "Low" }),
                      /* @__PURE__ */ jsx("option", { value: "medium", children: "Medium" }),
                      /* @__PURE__ */ jsx("option", { value: "high", children: "High" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.priority, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { forInput: "status", value: "Status *" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    id: "status",
                    className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                    value: data.status,
                    onChange: (e) => setData("status", e.target.value),
                    required: true,
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "new", children: "New" }),
                      /* @__PURE__ */ jsx("option", { value: "contacted", children: "Contacted" }),
                      /* @__PURE__ */ jsx("option", { value: "qualified", children: "Qualified" }),
                      /* @__PURE__ */ jsx("option", { value: "proposal", children: "Proposal" }),
                      /* @__PURE__ */ jsx("option", { value: "negotiation", children: "Negotiation" }),
                      /* @__PURE__ */ jsx("option", { value: "won", children: "Won" }),
                      /* @__PURE__ */ jsx("option", { value: "lost", children: "Lost" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.status, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  SearchableSelect,
                  {
                    label: "Lead Stage",
                    options: lead_stages,
                    value: data.lead_stage_id,
                    onChange: (val) => setData("lead_stage_id", val),
                    placeholder: "Select Lead Stage"
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.lead_stage_id, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { forInput: "expected_revenue", value: "Expected Revenue" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    id: "expected_revenue",
                    type: "number",
                    step: "0.01",
                    className: "mt-1 block w-full",
                    value: data.expected_revenue,
                    onChange: (e) => setData("expected_revenue", e.target.value)
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.expected_revenue, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { forInput: "expected_close_date", value: "Expected Close Date" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    id: "expected_close_date",
                    type: "date",
                    className: "mt-1 block w-full",
                    value: data.expected_close_date,
                    onChange: (e) => setData("expected_close_date", e.target.value)
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.expected_close_date, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  SearchableSelect,
                  {
                    label: "Assigned To",
                    options: users,
                    value: data.assigned_to,
                    onChange: (val) => setData("assigned_to", val),
                    placeholder: "Select User"
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.assigned_to, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
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
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 mb-4 pb-2 border-b", children: "Contact Information" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  SearchableSelect,
                  {
                    label: "Existing Contact",
                    options: contacts,
                    value: data.contact_id,
                    onChange: (val) => setData("contact_id", val),
                    placeholder: "Select Contact (Optional)"
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.contact_id, className: "mt-2" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Or fill in the details below for a new contact" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { forInput: "contact_name", value: "Contact Name" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    id: "contact_name",
                    type: "text",
                    className: "mt-1 block w-full",
                    value: data.contact_name,
                    onChange: (e) => setData("contact_name", e.target.value)
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.contact_name, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { forInput: "email", value: "Email" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    id: "email",
                    type: "email",
                    className: "mt-1 block w-full",
                    value: data.email,
                    onChange: (e) => setData("email", e.target.value)
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { forInput: "phone", value: "Phone" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    id: "phone",
                    type: "text",
                    className: "mt-1 block w-full",
                    value: data.phone,
                    onChange: (e) => setData("phone", e.target.value)
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.phone, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
                /* @__PURE__ */ jsx(InputLabel, { forInput: "company", value: "Company" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    id: "company",
                    type: "text",
                    className: "mt-1 block w-full",
                    value: data.company,
                    onChange: (e) => setData("company", e.target.value)
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.company, className: "mt-2" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 mb-4 pb-2 border-b", children: "Source & Additional Information" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  SearchableSelect,
                  {
                    label: "Source",
                    options: sourceOptions,
                    value: data.source,
                    onChange: (val) => setData("source", val),
                    placeholder: "Select Source"
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.source, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  SearchableSelect,
                  {
                    label: "Media/Channel",
                    options: media,
                    value: data.medium_id,
                    onChange: (val) => setData("medium_id", val),
                    placeholder: "Select Media Channel"
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.medium_id, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
                /* @__PURE__ */ jsx(InputLabel, { forInput: "notes", value: "Notes" }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    id: "notes",
                    className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 min-h-[100px]",
                    value: data.notes,
                    onChange: (e) => setData("notes", e.target.value),
                    placeholder: "Add any additional notes about this lead..."
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.notes, className: "mt-2" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-4 pt-6 border-t", children: [
            /* @__PURE__ */ jsx(Link, { href: route("crm.leads"), children: /* @__PURE__ */ jsx(SecondaryButton, { type: "button", children: "Cancel" }) }),
            /* @__PURE__ */ jsx(PrimaryButton, { type: "submit", disabled: processing, children: processing ? "Creating..." : "Create Lead" })
          ] })
        ] }) }) }) })
      ]
    }
  );
}
export {
  CreateLead as default
};
