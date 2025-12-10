import { jsx, jsxs } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DkmIA3xH.js";
import { useForm, router, Head, Link } from "@inertiajs/react";
import { S as StatusBadge } from "./StatusBadge-CQKRwizJ.js";
import { C as CreateTaskModal } from "./CreateTaskModal-CvqU1cVd.js";
import { C as CreateMeetingModal } from "./CreateMeetingModal-D6h_4n-j.js";
import { useEffect, useRef, useState } from "react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
import "./Modal-BeSeEOS3.js";
import "./InputLabel-CE_n4Upz.js";
import "./TextInput-Xf9xHrLa.js";
import "./InputError-CBvD_6aD.js";
import "./PrimaryButton-BMCZH-oa.js";
import "./SecondaryButton-C9TQBbBR.js";
function CreateRequirementModal({ show, onClose, projectId, requirement = null }) {
  const { data, setData, post, put, processing, errors, reset } = useForm({
    project_id: projectId,
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending"
  });
  useEffect(() => {
    if (requirement) {
      setData({
        project_id: projectId,
        title: requirement.title,
        description: requirement.description || "",
        priority: requirement.priority,
        status: requirement.status
      });
    } else {
      reset();
      setData("project_id", projectId);
    }
  }, [requirement, show]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (requirement) {
      put(route("requirements.update", requirement.id), {
        onSuccess: () => {
          reset();
          onClose();
        }
      });
    } else {
      post(route("requirements.store"), {
        onSuccess: () => {
          reset();
          onClose();
        }
      });
    }
  };
  if (!show) return null;
  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 50
    },
    modal: {
      backgroundColor: "white",
      borderRadius: "0.5rem",
      padding: "1.5rem",
      width: "100%",
      maxWidth: "500px",
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1rem"
    },
    title: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#111827"
    },
    formGroup: {
      marginBottom: "1rem"
    },
    label: {
      display: "block",
      fontSize: "0.875rem",
      fontWeight: "500",
      color: "#374151",
      marginBottom: "0.25rem"
    },
    input: {
      width: "100%",
      padding: "0.5rem",
      borderRadius: "0.375rem",
      border: "1px solid #D1D5DB",
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
    },
    select: {
      width: "100%",
      padding: "0.5rem",
      borderRadius: "0.375rem",
      border: "1px solid #D1D5DB",
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      backgroundColor: "white"
    },
    textarea: {
      width: "100%",
      padding: "0.5rem",
      borderRadius: "0.375rem",
      border: "1px solid #D1D5DB",
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      minHeight: "100px"
    },
    error: {
      color: "#EF4444",
      fontSize: "0.75rem",
      marginTop: "0.25rem"
    },
    footer: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "0.5rem",
      marginTop: "1.5rem"
    },
    button: {
      padding: "0.5rem 1rem",
      borderRadius: "0.375rem",
      fontWeight: "500",
      fontSize: "0.875rem",
      cursor: "pointer",
      border: "none"
    },
    cancelButton: {
      backgroundColor: "white",
      border: "1px solid #D1D5DB",
      color: "#374151"
    },
    submitButton: {
      backgroundColor: "#4F46E5",
      color: "white"
    }
  };
  return /* @__PURE__ */ jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsx("h3", { style: styles.title, children: requirement ? "Edit Requirement" : "New Requirement" }),
      /* @__PURE__ */ jsx("button", { onClick: onClose, style: { background: "none", border: "none", cursor: "pointer", fontSize: "1.5rem" }, children: "×" })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxs("div", { style: styles.formGroup, children: [
        /* @__PURE__ */ jsx("label", { style: styles.label, children: "Title" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: data.title,
            onChange: (e) => setData("title", e.target.value),
            style: styles.input,
            required: true
          }
        ),
        errors.title && /* @__PURE__ */ jsx("div", { style: styles.error, children: errors.title })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: styles.formGroup, children: [
        /* @__PURE__ */ jsx("label", { style: styles.label, children: "Priority" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: data.priority,
            onChange: (e) => setData("priority", e.target.value),
            style: styles.select,
            children: [
              /* @__PURE__ */ jsx("option", { value: "Low", children: "Low" }),
              /* @__PURE__ */ jsx("option", { value: "Medium", children: "Medium" }),
              /* @__PURE__ */ jsx("option", { value: "High", children: "High" })
            ]
          }
        ),
        errors.priority && /* @__PURE__ */ jsx("div", { style: styles.error, children: errors.priority })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: styles.formGroup, children: [
        /* @__PURE__ */ jsx("label", { style: styles.label, children: "Status" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: data.status,
            onChange: (e) => setData("status", e.target.value),
            style: styles.select,
            children: [
              /* @__PURE__ */ jsx("option", { value: "Pending", children: "Pending" }),
              /* @__PURE__ */ jsx("option", { value: "In Progress", children: "In Progress" }),
              /* @__PURE__ */ jsx("option", { value: "Completed", children: "Completed" })
            ]
          }
        ),
        errors.status && /* @__PURE__ */ jsx("div", { style: styles.error, children: errors.status })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: styles.formGroup, children: [
        /* @__PURE__ */ jsx("label", { style: styles.label, children: "Description" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            value: data.description,
            onChange: (e) => setData("description", e.target.value),
            style: styles.textarea
          }
        ),
        errors.description && /* @__PURE__ */ jsx("div", { style: styles.error, children: errors.description })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: styles.footer, children: [
        /* @__PURE__ */ jsx("button", { type: "button", onClick: onClose, style: { ...styles.button, ...styles.cancelButton }, children: "Cancel" }),
        /* @__PURE__ */ jsx("button", { type: "submit", disabled: processing, style: { ...styles.button, ...styles.submitButton, opacity: processing ? 0.7 : 1 }, children: processing ? "Saving..." : "Save" })
      ] })
    ] })
  ] }) });
}
function ImportRequirementsModal({ show, onClose, projectId }) {
  const fileInput = useRef();
  const { data, setData, post, processing, errors, reset } = useForm({
    file: null
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("requirements.import", projectId), {
      onSuccess: () => {
        reset();
        onClose();
      },
      forceFormData: true
    });
  };
  if (!show) return null;
  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 50
    },
    modal: {
      backgroundColor: "white",
      borderRadius: "0.5rem",
      padding: "1.5rem",
      width: "100%",
      maxWidth: "500px",
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1rem"
    },
    title: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#111827"
    },
    formGroup: {
      marginBottom: "1rem"
    },
    label: {
      display: "block",
      fontSize: "0.875rem",
      fontWeight: "500",
      color: "#374151",
      marginBottom: "0.25rem"
    },
    input: {
      width: "100%",
      padding: "0.5rem",
      borderRadius: "0.375rem",
      border: "1px solid #D1D5DB",
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
    },
    footer: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "0.5rem",
      marginTop: "1.5rem"
    },
    button: {
      padding: "0.5rem 1rem",
      borderRadius: "0.375rem",
      fontWeight: "500",
      fontSize: "0.875rem",
      cursor: "pointer",
      border: "none"
    },
    cancelButton: {
      backgroundColor: "white",
      border: "1px solid #D1D5DB",
      color: "#374151"
    },
    submitButton: {
      backgroundColor: "#4F46E5",
      color: "white"
    },
    error: {
      color: "#EF4444",
      fontSize: "0.75rem",
      marginTop: "0.25rem"
    },
    helpText: {
      fontSize: "0.75rem",
      color: "#6B7280",
      marginTop: "0.25rem"
    }
  };
  return /* @__PURE__ */ jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsx("h3", { style: styles.title, children: "Import Requirements" }),
      /* @__PURE__ */ jsx("button", { onClick: onClose, style: { background: "none", border: "none", cursor: "pointer", fontSize: "1.5rem" }, children: "×" })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxs("div", { style: styles.formGroup, children: [
        /* @__PURE__ */ jsx("label", { style: styles.label, children: "Select Excel File" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "file",
            ref: fileInput,
            onChange: (e) => setData("file", e.target.files[0]),
            style: styles.input,
            accept: ".xlsx, .xls, .csv"
          }
        ),
        errors.file && /* @__PURE__ */ jsx("div", { style: styles.error, children: errors.file }),
        /* @__PURE__ */ jsx("p", { style: styles.helpText, children: "Expected columns: Title, Priority, Status, Description" })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: styles.footer, children: [
        /* @__PURE__ */ jsx("button", { type: "button", onClick: onClose, style: { ...styles.button, ...styles.cancelButton }, children: "Cancel" }),
        /* @__PURE__ */ jsx("button", { type: "submit", disabled: processing, style: { ...styles.button, ...styles.submitButton, opacity: processing ? 0.7 : 1 }, children: processing ? "Importing..." : "Import" })
      ] })
    ] })
  ] }) });
}
function RequirementList({ requirements, projectId }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [editingRequirement, setEditingRequirement] = useState(null);
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this requirement?")) {
      router.delete(route("requirements.destroy", id), {
        preserveScroll: true
      });
    }
  };
  const handleEdit = (requirement) => {
    setEditingRequirement(requirement);
    setShowCreateModal(true);
  };
  const closeCreateModal = () => {
    setShowCreateModal(false);
    setEditingRequirement(null);
  };
  const styles = {
    container: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      padding: "24px",
      marginBottom: "24px"
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "24px"
    },
    title: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#111827"
    },
    actions: {
      display: "flex",
      gap: "12px"
    },
    button: {
      padding: "8px 16px",
      borderRadius: "8px",
      fontWeight: "500",
      fontSize: "0.875rem",
      transition: "all 0.2s",
      cursor: "pointer",
      border: "none"
    },
    primaryButton: {
      backgroundColor: "#4F46E5",
      color: "#ffffff"
    },
    secondaryButton: {
      backgroundColor: "#ffffff",
      border: "1px solid #E5E7EB",
      color: "#374151"
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: "0"
    },
    th: {
      textAlign: "left",
      padding: "12px 16px",
      borderBottom: "1px solid #E5E7EB",
      color: "#6B7280",
      fontSize: "0.75rem",
      fontWeight: "500",
      textTransform: "uppercase",
      letterSpacing: "0.05em"
    },
    td: {
      padding: "16px",
      borderBottom: "1px solid #F3F4F6",
      fontSize: "0.875rem",
      color: "#111827"
    },
    statusBadge: (status) => {
      const colors = {
        "Pending": { bg: "#FEF3C7", text: "#92400E" },
        "In Progress": { bg: "#DBEAFE", text: "#1E40AF" },
        "Completed": { bg: "#D1FAE5", text: "#065F46" }
      };
      const style = colors[status] || { bg: "#F3F4F6", text: "#374151" };
      return {
        backgroundColor: style.bg,
        color: style.text,
        padding: "2px 10px",
        borderRadius: "9999px",
        fontSize: "0.75rem",
        fontWeight: "500"
      };
    },
    priorityBadge: (priority) => {
      const colors = {
        "Low": { bg: "#F3F4F6", text: "#374151" },
        "Medium": { bg: "#E0E7FF", text: "#3730A3" },
        "High": { bg: "#FEE2E2", text: "#991B1B" }
      };
      const style = colors[priority] || { bg: "#F3F4F6", text: "#374151" };
      return {
        backgroundColor: style.bg,
        color: style.text,
        padding: "2px 10px",
        borderRadius: "9999px",
        fontSize: "0.75rem",
        fontWeight: "500"
      };
    }
  };
  return /* @__PURE__ */ jsxs("div", { style: styles.container, children: [
    /* @__PURE__ */ jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsx("h2", { style: styles.title, children: "Project Requirements" }),
      /* @__PURE__ */ jsxs("div", { style: styles.actions, children: [
        /* @__PURE__ */ jsx("a", { href: route("requirements.export", projectId), target: "_blank", style: { ...styles.button, ...styles.secondaryButton, textDecoration: "none", display: "inline-block" }, children: "Export" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setShowImportModal(true), style: { ...styles.button, ...styles.secondaryButton }, children: "Import" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setShowCreateModal(true), style: { ...styles.button, ...styles.primaryButton }, children: "+ Add Requirement" })
      ] })
    ] }),
    requirements.length === 0 ? /* @__PURE__ */ jsx("div", { style: { textAlign: "center", padding: "48px", color: "#6B7280" }, children: "No requirements found. Start by adding one!" }) : /* @__PURE__ */ jsx("div", { style: { overflowX: "auto" }, children: /* @__PURE__ */ jsxs("table", { style: styles.table, children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { style: styles.th, children: "Title" }),
        /* @__PURE__ */ jsx("th", { style: styles.th, children: "Priority" }),
        /* @__PURE__ */ jsx("th", { style: styles.th, children: "Status" }),
        /* @__PURE__ */ jsx("th", { style: styles.th, children: "Description" }),
        /* @__PURE__ */ jsx("th", { style: styles.th, children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: requirements.map((req) => /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { style: styles.td, children: /* @__PURE__ */ jsx("div", { style: { fontWeight: "500" }, children: req.title }) }),
        /* @__PURE__ */ jsx("td", { style: styles.td, children: /* @__PURE__ */ jsx("span", { style: styles.priorityBadge(req.priority), children: req.priority }) }),
        /* @__PURE__ */ jsx("td", { style: styles.td, children: /* @__PURE__ */ jsx("span", { style: styles.statusBadge(req.status), children: req.status }) }),
        /* @__PURE__ */ jsx("td", { style: styles.td, title: req.description, children: req.description ? req.description.length > 50 ? req.description.substring(0, 50) + "..." : req.description : "-" }),
        /* @__PURE__ */ jsxs("td", { style: styles.td, children: [
          /* @__PURE__ */ jsx("button", { onClick: () => handleEdit(req), style: { color: "#4F46E5", marginRight: "12px", background: "none", border: "none", cursor: "pointer" }, children: "Edit" }),
          /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(req.id), style: { color: "#EF4444", background: "none", border: "none", cursor: "pointer" }, children: "Delete" })
        ] })
      ] }, req.id)) })
    ] }) }),
    showCreateModal && /* @__PURE__ */ jsx(
      CreateRequirementModal,
      {
        show: showCreateModal,
        onClose: closeCreateModal,
        projectId,
        requirement: editingRequirement
      }
    ),
    showImportModal && /* @__PURE__ */ jsx(
      ImportRequirementsModal,
      {
        show: showImportModal,
        onClose: () => setShowImportModal(false),
        projectId
      }
    )
  ] });
}
function Show({ auth, project, users = [], projects = [] }) {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const Field = ({ label, value, fullWidth = false }) => /* @__PURE__ */ jsxs("div", { className: `mb-4 ${fullWidth ? "col-span-2" : ""}`, children: [
    /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1", children: label }),
    /* @__PURE__ */ jsx("div", { className: "bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-md px-3 py-2", children: value || "-" })
  ] });
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx(Link, { href: route("projects.index"), className: "mr-4 text-gray-400 hover:text-gray-600 transition", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }) }),
          /* @__PURE__ */ jsx("h2", { className: "font-bold text-2xl text-gray-800 leading-tight", children: project.name }),
          /* @__PURE__ */ jsx("span", { className: "ml-4", children: /* @__PURE__ */ jsx(StatusBadge, { status: project.status }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-3", children: [
          /* @__PURE__ */ jsx(Link, { href: route("projects.edit", project.id), className: "px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm", children: "Edit Project" }),
          /* @__PURE__ */ jsx("button", { className: "px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700 transition shadow-sm", children: "Mark Complete" })
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `Project: ${project.name}` }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg border border-gray-200 p-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 mb-6 border-b border-gray-100 pb-2", children: "Project Information" }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                /* @__PURE__ */ jsx(Field, { label: "Project Name", value: project.name }),
                /* @__PURE__ */ jsx(Field, { label: "Status", value: project.status === "active" ? "Active" : "Archived" }),
                /* @__PURE__ */ jsx(Field, { label: "Start Date", value: project.start_date }),
                /* @__PURE__ */ jsx(Field, { label: "End Date", value: project.end_date }),
                /* @__PURE__ */ jsx(Field, { label: "Description", value: project.description, fullWidth: true })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg border border-gray-200 p-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2", children: "Assigned Team" }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: project.users && project.users.length > 0 ? project.users.map((user) => /* @__PURE__ */ jsxs("div", { className: "flex items-center px-3 py-2 bg-gray-50 rounded-full border border-gray-200", children: [
                /* @__PURE__ */ jsx("div", { className: "h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold mr-2", children: user.name.charAt(0) }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-700", children: user.name })
              ] }, user.id)) : /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 italic", children: "No members assigned." }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white shadow-sm rounded-lg border border-gray-200 p-4 h-full", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-gray-800 flex items-center", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 mr-2 text-indigo-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" }) }),
                "Tasks (",
                project.tasks ? project.tasks.length : 0,
                ")"
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setShowTaskModal(true),
                  className: "text-sm text-indigo-600 hover:text-indigo-800 font-medium",
                  children: "+ Add Task"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-4 max-h-[600px] overflow-y-auto pr-2", children: project.tasks && project.tasks.length > 0 ? project.tasks.map((task) => /* @__PURE__ */ jsxs("div", { className: "p-3 bg-gray-50 rounded-lg border border-gray-200 relative group hover:bg-gray-100 transition", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
                /* @__PURE__ */ jsx(Link, { href: route("tasks.edit", task.id), className: "font-semibold text-gray-800 text-sm hover:text-indigo-600 block mb-1", children: task.title }),
                /* @__PURE__ */ jsx(StatusBadge, { status: task.status })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 line-clamp-2 mb-2", children: task.description || "No description" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-2", children: [
                /* @__PURE__ */ jsx("div", { className: "flex items-center text-xs text-gray-400", children: task.assigned_user ? /* @__PURE__ */ jsxs("div", { className: "flex items-center", title: `Assigned to ${task.assigned_user.name}`, children: [
                  /* @__PURE__ */ jsx("div", { className: "h-5 w-5 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center text-[10px] font-bold mr-1", children: task.assigned_user.name.charAt(0) }),
                  /* @__PURE__ */ jsx("span", { children: task.assigned_user.name.split(" ")[0] })
                ] }) : /* @__PURE__ */ jsx("span", { children: "Unassigned" }) }),
                /* @__PURE__ */ jsx("div", { className: "text-[10px] text-gray-400", children: task.due_date ? new Date(task.due_date).toLocaleDateString() : "No Due Date" })
              ] })
            ] }, task.id)) : /* @__PURE__ */ jsxs("div", { className: "text-center py-6", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "No tasks yet." }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Start by adding one!" })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 pt-4 border-t border-gray-100", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Write a note or @mention...",
                  className: "w-full text-sm border-gray-200 rounded-md focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50",
                  disabled: true
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "flex justify-end mt-2", children: /* @__PURE__ */ jsx("button", { disabled: true, className: "px-3 py-1 bg-indigo-600 text-white text-xs rounded opacity-50 cursor-not-allowed", children: "Send" }) })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx(RequirementList, { requirements: project.requirements || [], projectId: project.id }) }),
        /* @__PURE__ */ jsx(
          CreateTaskModal,
          {
            show: showTaskModal,
            onClose: () => setShowTaskModal(false),
            projectId: project.id,
            projects,
            users
          }
        ),
        /* @__PURE__ */ jsx(
          CreateMeetingModal,
          {
            show: showMeetingModal,
            onClose: () => setShowMeetingModal(false),
            users,
            relatedId: project.id,
            relatedType: "App\\\\Models\\\\Project"
          }
        )
      ]
    }
  );
}
export {
  Show as default
};
