import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DHAmaW8y.js";
import { Head, Link, router } from "@inertiajs/react";
import { P as PriorityLabel } from "./PriorityLabel-CPBMCKmp.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { useState } from "react";
import { Filter } from "lucide-react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function Leads({ auth, leads, lead_stages = [], users, filters }) {
  const [kanbanGroupBy, setKanbanGroupBy] = useState("stage");
  const [filterData, setFilterData] = useState({
    assigned_to: filters.assigned_to || "",
    status: filters.status || "",
    lead_stage_id: filters.lead_stage_id || "",
    search: filters.search || ""
  });
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filterData, [key]: value };
    setFilterData(newFilters);
    router.get(route("crm.leads"), newFilters, { preserveState: true, replace: true });
  };
  const getKanbanColumns = () => {
    if (kanbanGroupBy === "stage" && lead_stages.length > 0) {
      return lead_stages.map((stage) => ({
        id: stage.id,
        key: stage.id.toString(),
        label: stage.name,
        color: stage.color
      }));
    }
    return [
      { id: "new", key: "new", label: "New", color: "#3b82f6" },
      { id: "contacted", key: "contacted", label: "Contacted", color: "#8b5cf6" },
      { id: "qualified", key: "qualified", label: "Qualified", color: "#06b6d4" },
      { id: "proposal", key: "proposal", label: "Proposal", color: "#f59e0b" },
      { id: "negotiation", key: "negotiation", label: "Negotiation", color: "#f97316" },
      { id: "won", key: "won", label: "Won", color: "#10b981" },
      { id: "lost", key: "lost", label: "Lost", color: "#ef4444" }
    ];
  };
  const currentKanbanColumns = getKanbanColumns();
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center gap-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "CRM Leads - Pipeline View" }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-2 items-center", children: [
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: kanbanGroupBy,
              onChange: (e) => setKanbanGroupBy(e.target.value),
              className: "bg-white border-gray-300 text-gray-700 text-sm rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block p-1.5",
              children: [
                /* @__PURE__ */ jsx("option", { value: "status", children: "By Status" }),
                /* @__PURE__ */ jsx("option", { value: "stage", children: "By Lead Stage" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(Link, { href: route("crm.leads.create"), children: /* @__PURE__ */ jsx(PrimaryButton, { children: "New Lead" }) })
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "CRM Leads" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-wrap gap-4 items-end", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-gray-700 font-medium", children: [
              /* @__PURE__ */ jsx(Filter, { className: "w-5 h-5" }),
              /* @__PURE__ */ jsx("span", { children: "Filters:" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-[200px]", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-700 mb-1", children: "Search" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  className: "w-full border-gray-300 rounded-md shadow-sm text-sm",
                  placeholder: "Search leads...",
                  value: filterData.search,
                  onChange: (e) => handleFilterChange("search", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-[200px]", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-700 mb-1", children: "Assigned To" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  className: "w-full border-gray-300 rounded-md shadow-sm text-sm",
                  value: filterData.assigned_to,
                  onChange: (e) => handleFilterChange("assigned_to", e.target.value),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "All Users" }),
                    users.map((u) => /* @__PURE__ */ jsx("option", { value: u.id, children: u.name }, u.id))
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-[200px]", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-700 mb-1", children: "Status" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  className: "w-full border-gray-300 rounded-md shadow-sm text-sm",
                  value: filterData.status,
                  onChange: (e) => handleFilterChange("status", e.target.value),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "All Statuses" }),
                    /* @__PURE__ */ jsx("option", { value: "new", children: "New" }),
                    /* @__PURE__ */ jsx("option", { value: "contacted", children: "Contacted" }),
                    /* @__PURE__ */ jsx("option", { value: "qualified", children: "Qualified" }),
                    /* @__PURE__ */ jsx("option", { value: "proposal", children: "Proposal" }),
                    /* @__PURE__ */ jsx("option", { value: "negotiation", children: "Negotiation" }),
                    /* @__PURE__ */ jsx("option", { value: "won", children: "Won" }),
                    /* @__PURE__ */ jsx("option", { value: "lost", children: "Lost" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex space-x-4 overflow-x-auto pb-4 items-start min-h-[500px]", children: currentKanbanColumns.map((col) => /* @__PURE__ */ jsxs("div", { className: "w-80 flex-shrink-0 bg-gray-100 rounded-lg p-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                col.color && /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "w-3 h-3 rounded-full mr-2",
                    style: { backgroundColor: col.color }
                  }
                ),
                /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-700 uppercase text-xs tracking-wider", children: col.label })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded-full font-bold", children: leads.filter((l) => {
                if (kanbanGroupBy === "stage") {
                  return l.lead_stage_id == col.id;
                }
                return l.status === col.id;
              }).length })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              leads.filter((l) => {
                if (kanbanGroupBy === "stage") {
                  return l.lead_stage_id == col.id;
                }
                return l.status === col.id;
              }).map((lead) => /* @__PURE__ */ jsxs("div", { className: "bg-white p-3 rounded shadow-sm border border-gray-200 hover:shadow-md transition-shadow group relative", children: [
                kanbanGroupBy !== "stage" && lead.lead_stage && /* @__PURE__ */ jsx("div", { className: "absolute left-0 top-3 bottom-3 w-1 rounded-r", style: { backgroundColor: lead.lead_stage.color } }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-2 pl-2", children: [
                  /* @__PURE__ */ jsx(PriorityLabel, { priority: lead.priority }),
                  /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-gray-400 font-mono", children: [
                    "#",
                    lead.id
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: route("crm.leads.show", lead.id),
                    className: "font-medium text-gray-900 hover:text-indigo-600 block mb-1 text-sm pl-2",
                    children: lead.title
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 mb-2 pl-2", children: lead.contact ? /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-green-400" }),
                  lead.contact.name
                ] }) : lead.contact_name ? /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-blue-400" }),
                  lead.contact_name
                ] }) : /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "No contact" }) }),
                /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center mt-3 pt-2 border-t border-gray-50 pl-2", children: /* @__PURE__ */ jsxs("div", { className: "text-xs font-semibold text-gray-600 flex items-center", children: [
                  lead.assigned_user ? /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-[10px] mr-1", children: lead.assigned_user.name.charAt(0) }) : /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-[10px] mr-1", children: "?" }),
                  lead.expected_revenue > 0 ? /* @__PURE__ */ jsxs("span", { className: "text-green-600 ml-1 font-mono", children: [
                    "$",
                    parseFloat(lead.expected_revenue).toLocaleString()
                  ] }) : null
                ] }) })
              ] }, lead.id)),
              leads.filter((l) => {
                if (kanbanGroupBy === "stage") return l.lead_stage_id == col.id;
                return l.status === col.id;
              }).length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center text-gray-400 text-xs py-8 border-2 border-dashed border-gray-200 rounded-lg", children: "Empty" })
            ] })
          ] }, col.key)) })
        ] }) })
      ]
    }
  );
}
export {
  Leads as default
};
