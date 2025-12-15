import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-Bg39NUCY.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { S as SecondaryButton } from "./SecondaryButton-C9TQBbBR.js";
import { T as TextInput } from "./TextInput-Xf9xHrLa.js";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { I as InputError } from "./InputError-CBvD_6aD.js";
import { S as SearchableSelect } from "./SearchableSelect-C4FgJwXx.js";
import { S as ScheduledActivities } from "./ScheduledActivities-BVSQ5ZVE.js";
import { C as Chatter } from "./Chatter-QayPlM-X.js";
import { ChevronLeft } from "lucide-react";
import "react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
import "./Modal-BeSeEOS3.js";
import "./Checkbox-5PHg8iNz.js";
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
