import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-BuXJMMFe.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { D as DataTable } from "./DataTable-Cf56Cbah.js";
import { S as StatusBadge } from "./StatusBadge-CPwNKsS5.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import "react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function Index({ auth, requests }) {
  const { put } = useForm();
  const isManager = auth.user.roles.some((r) => ["admin", "manager"].includes(r.name));
  const handleAction = (id, status) => {
    if (confirm(`Are you sure you want to ${status} this request?`)) {
      put(route("overtime-requests.update", { overtime_request: id, status }));
    }
  };
  const columns = [
    { key: "date", label: "Date", render: (item) => new Date(item.date).toLocaleDateString() },
    { key: "user", label: "Employee", render: (item) => item.user?.name },
    { key: "time", label: "Time", render: (item) => `${item.start_time} - ${item.end_time}` },
    { key: "reason", label: "Reason" },
    { key: "status", label: "Status", render: (item) => /* @__PURE__ */ jsx(StatusBadge, { status: item.status }) },
    { key: "approver", label: "Approver", render: (item) => item.approver?.name || "-" }
  ];
  const actions = (item) => /* @__PURE__ */ jsx("div", { className: "flex space-x-2 justify-end", children: isManager && item.status === "pending" && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => handleAction(item.id, "approved"),
        className: "text-green-600 hover:text-green-900 font-medium text-xs uppercase",
        children: "Approve"
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => handleAction(item.id, "rejected"),
        className: "text-red-600 hover:text-red-900 font-medium text-xs uppercase",
        children: "Reject"
      }
    )
  ] }) });
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Overtime Requests" }),
        /* @__PURE__ */ jsx(Link, { href: route("overtime-requests.create"), children: /* @__PURE__ */ jsx(PrimaryButton, { children: "Request Overtime" }) })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Overtime Requests" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx(
          DataTable,
          {
            columns,
            data: requests.data,
            pagination: requests,
            actions
          }
        ) }) })
      ]
    }
  );
}
export {
  Index as default
};
