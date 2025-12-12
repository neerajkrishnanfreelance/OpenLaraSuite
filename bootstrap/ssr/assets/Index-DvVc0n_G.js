import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-D5dyBxod.js";
import { Head, Link } from "@inertiajs/react";
import { D as DataTable } from "./DataTable-Cf56Cbah.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import "react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function Index({ auth, users }) {
  const columns = [
    { key: "name", label: "Name", render: (item) => /* @__PURE__ */ jsx(Link, { href: route("employees.show", item.id), className: "font-semibold text-indigo-600 hover:underline", children: item.name }) },
    { key: "email", label: "Email" },
    { key: "role", label: "Role", render: (item) => /* @__PURE__ */ jsx("span", { className: "capitalize bg-gray-100 rounded px-2 py-1 text-xs font-bold text-gray-600", children: item.roles[0]?.name }) },
    { key: "joined", label: "Joined", render: (item) => new Date(item.created_at).toLocaleDateString() }
  ];
  const actions = (item) => /* @__PURE__ */ jsx("div", { className: "flex space-x-2 justify-end", children: /* @__PURE__ */ jsx(Link, { href: route("employees.edit", item.id), className: "text-gray-600 hover:text-gray-900", children: "Edit" }) });
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Employees" }),
        /* @__PURE__ */ jsx(Link, { href: route("employees.create"), children: /* @__PURE__ */ jsx(PrimaryButton, { children: "Add Employee" }) })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Employees" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx(
          DataTable,
          {
            columns,
            data: users.data,
            pagination: users,
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
