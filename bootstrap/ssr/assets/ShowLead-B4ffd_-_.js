import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-BuXJMMFe.js";
import { useForm, Head, Link, router } from "@inertiajs/react";
import { S as StatusBadge } from "./StatusBadge-CPwNKsS5.js";
import { P as PriorityLabel } from "./PriorityLabel-CPBMCKmp.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { T as TextInput } from "./TextInput-Xf9xHrLa.js";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { I as InputError } from "./InputError-CBvD_6aD.js";
import { S as SearchableSelect } from "./SearchableSelect-C4FgJwXx.js";
import { S as ScheduledActivities } from "./ScheduledActivities-BVSQ5ZVE.js";
import { C as Chatter } from "./Chatter-QayPlM-X.js";
import { Briefcase, ChevronLeft } from "lucide-react";
import "react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
import "./Modal-BeSeEOS3.js";
import "./SecondaryButton-C9TQBbBR.js";
import "./Checkbox-5PHg8iNz.js";
function ShowLead({ auth, lead, contacts = [], lead_stages = [], media = [], users = [] }) {
  const { data, setData, put, processing, errors } = useForm({
    title: lead.title || "",
    description: lead.description || "",
    contact_id: lead.contact_id || "",
    contact_name: lead.contact_name || "",
    email: lead.email || "",
    phone: lead.phone || "",
    company: lead.company || "",
    lead_stage_id: lead.lead_stage_id || "",
    expected_revenue: lead.expected_revenue || "",
    source: lead.source || "",
    medium_id: lead.medium_id || "",
    priority: lead.priority || "medium",
    status: lead.status || "new",
    assigned_to: lead.assigned_to || "",
    expected_close_date: lead.expected_close_date || "",
    notes: lead.notes || ""
  });
  const updateLead = (e) => {
    e.preventDefault();
    put(route("crm.leads.update", lead.id), {
      preserveScroll: true
    });
  };
  const convertToProject = () => {
    if (confirm("Are you sure you want to convert this lead to a project? The lead will be marked as Won.")) {
      router.post(route("crm.leads.convert-to-project", lead.id));
    }
  };
  const sourceOptions = [
    { id: "LinkedIn", name: "LinkedIn" },
    { id: "Website", name: "Website" },
    { id: "Referral", name: "Referral" },
    { id: "Cold Call", name: "Cold Call" },
    { id: "Email", name: "Email" },
    { id: "Social Media", name: "Social Media" },
    { id: "Other", name: "Other" }
  ];
  const statusOptions = [
    { id: "new", name: "New" },
    { id: "contacted", name: "Contacted" },
    { id: "qualified", name: "Qualified" },
    { id: "proposal", name: "Proposal" },
    { id: "negotiation", name: "Negotiation" },
    { id: "won", name: "Won" },
    { id: "lost", name: "Lost" }
  ];
  const priorityOptions = [
    { id: "low", name: "Low" },
    { id: "medium", name: "Medium" },
    { id: "high", name: "High" }
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs(Link, { href: route("crm.leads"), className: "mr-4 text-purple-600 hover:text-purple-800 transition flex items-center", children: [
        /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5 mr-1" }),
        "Back to Leads"
      ] }) }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `Lead: ${lead.title}` }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white border-b border-gray-200 px-8 py-4 mb-6 flex justify-between items-center sticky top-0 z-10 shadow-sm", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
              /* @__PURE__ */ jsx("h2", { className: "font-bold text-2xl text-gray-800 leading-tight", children: lead.title }),
              /* @__PURE__ */ jsx(StatusBadge, { status: lead.status }),
              /* @__PURE__ */ jsx(PriorityLabel, { priority: lead.priority })
            ] }),
            lead.company && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: lead.company })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex space-x-3", children: [
            lead.status !== "won" && lead.status !== "lost" && /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: convertToProject,
                className: "bg-green-600 border border-transparent text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition flex items-center gap-2",
                children: [
                  /* @__PURE__ */ jsx(Briefcase, { className: "w-4 h-4" }),
                  "Convert to Project"
                ]
              }
            ),
            /* @__PURE__ */ jsx(PrimaryButton, { onClick: updateLead, disabled: processing, className: "bg-indigo-600 hover:bg-indigo-700", children: "Save Changes" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg border border-gray-200 p-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200", children: "Lead Information" }),
              /* @__PURE__ */ jsx("form", { onSubmit: updateLead, children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
                  /* @__PURE__ */ jsx(InputLabel, { forInput: "title", value: "Lead Title *" }),
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      id: "title",
                      className: "mt-1 block w-full",
                      value: data.title,
                      onChange: (e) => setData("title", e.target.value),
                      required: true
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.title, className: "mt-2" })
                ] }),
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
                  /* @__PURE__ */ jsx(InputLabel, { forInput: "contact_name", value: "Contact Name" }),
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      id: "contact_name",
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
                      className: "mt-1 block w-full",
                      value: data.phone,
                      onChange: (e) => setData("phone", e.target.value)
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.phone, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(InputLabel, { forInput: "company", value: "Company" }),
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      id: "company",
                      className: "mt-1 block w-full",
                      value: data.company,
                      onChange: (e) => setData("company", e.target.value)
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.company, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(InputLabel, { forInput: "expected_revenue", value: "Expected Revenue ($)" }),
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
                  /* @__PURE__ */ jsx(
                    SearchableSelect,
                    {
                      label: "Lead Stage",
                      options: lead_stages,
                      value: data.lead_stage_id,
                      onChange: (val) => setData("lead_stage_id", val),
                      placeholder: "Select Stage"
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.lead_stage_id, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(
                    SearchableSelect,
                    {
                      label: "Status *",
                      options: statusOptions,
                      value: data.status,
                      onChange: (val) => setData("status", val)
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.status, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(
                    SearchableSelect,
                    {
                      label: "Priority *",
                      options: priorityOptions,
                      value: data.priority,
                      onChange: (val) => setData("priority", val)
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.priority, className: "mt-2" })
                ] }),
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
                      label: "Medium",
                      options: media,
                      value: data.medium_id,
                      onChange: (val) => setData("medium_id", val),
                      placeholder: "Select Medium"
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.medium_id, className: "mt-2" })
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
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "col-span-1 md:col-span-2", children: [
                  /* @__PURE__ */ jsx(InputLabel, { forInput: "notes", value: "Notes" }),
                  /* @__PURE__ */ jsx(
                    "textarea",
                    {
                      id: "notes",
                      className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 min-h-[100px]",
                      value: data.notes,
                      onChange: (e) => setData("notes", e.target.value)
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.notes, className: "mt-2" })
                ] })
              ] }) })
            ] }),
            /* @__PURE__ */ jsx(
              ScheduledActivities,
              {
                task: lead,
                activities: lead.activities || []
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "lg:col-span-1 h-full", children: /* @__PURE__ */ jsx(
            Chatter,
            {
              chatterableId: lead.id,
              chatterableType: "App\\\\Models\\\\CrmLead",
              messages: lead.chatter_messages || []
            }
          ) })
        ] }) })
      ]
    }
  );
}
export {
  ShowLead as default
};
