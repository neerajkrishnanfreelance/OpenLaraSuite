import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-CxZoB_L7.js";
import { usePage, Head, Link, router } from "@inertiajs/react";
import { D as DataTable } from "./DataTable-Cf56Cbah.js";
import { S as StatusBadge } from "./StatusBadge-CPwNKsS5.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { C as ClickableLink } from "./ClickableLink-Du0eMkfO.js";
import "react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function Index({ auth, projects }) {
  const { flash } = usePage().props;
  console.log(flash);
  const columns = [
    { key: "name", label: "Name", render: (item) => /* @__PURE__ */ jsx(ClickableLink, { routeName: "projects.show", params: item.id, children: item.name }) },
    {
      key: "status",
      label: "Status",
      render: (item) => /* @__PURE__ */ jsx(StatusBadge, { status: item.status })
    },
    {
      key: "start_date",
      label: "Start Date",
      render: (item) => item.start_date ? new Date(item.start_date).toLocaleDateString() : "-"
    },
    {
      key: "users",
      label: "Team",
      render: (item) => /* @__PURE__ */ jsx("div", { className: "flex -space-x-2 overflow-hidden", children: item.users && item.users.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
        item.users.slice(0, 3).map((user) => /* @__PURE__ */ jsx("div", { className: "inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-700", title: user?.name, children: user?.name ? user.name.charAt(0) : "?" }, user.id)),
        item.users.length > 3 && /* @__PURE__ */ jsxs("div", { className: "inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500", children: [
          "+",
          item.users.length - 3
        ] })
      ] }) : /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "No Team" }) })
    }
  ];
  const actions = (item) => /* @__PURE__ */ jsxs("div", { className: "flex space-x-4 justify-end", children: [
    /* @__PURE__ */ jsx(Link, { href: route("projects.show", item.id), className: "text-indigo-600 hover:text-indigo-900", children: "View" }),
    /* @__PURE__ */ jsx(Link, { href: route("projects.edit", item.id), className: "text-gray-600 hover:text-gray-900", children: "Edit" }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => {
          if (confirm(`Are you sure you want to delete project "${item.name}"? This will also delete all associated tasks and timesheets.`)) {
            router.delete(route("projects.destroy", item.id));
          }
        },
        className: "text-red-600 hover:text-red-900",
        children: "Delete"
      }
    )
  ] });
  return (
    // <div>ddd</div>
    /* @__PURE__ */ jsxs(
      Authenticated,
      {
        header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Projects" }),
          /* @__PURE__ */ jsx(Link, { href: route("projects.create"), children: /* @__PURE__ */ jsx(PrimaryButton, { children: "New Project" }) })
        ] }),
        children: [
          /* @__PURE__ */ jsx(Head, { title: "Projects" }),
          /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: [
            flash && /* @__PURE__ */ jsx("div", { className: "mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative", role: "alert", children: /* @__PURE__ */ jsx("span", { className: "block sm:inline", children: flash.message }) }),
            /* @__PURE__ */ jsx(
              DataTable,
              {
                columns,
                data: projects.data,
                pagination: projects,
                actions
              }
            )
          ] }) })
        ]
      }
    )
  );
}
export {
  Index as default
};
