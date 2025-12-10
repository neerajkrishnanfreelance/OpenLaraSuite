import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DkmIA3xH.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { D as DataTable } from "./DataTable-Cf56Cbah.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import "react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function Index({ auth, meetings }) {
  const { delete: destroy } = useForm();
  const user = auth.user;
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to cancel this meeting?")) {
      destroy(route("meetings.destroy", id));
    }
  };
  const columns = [
    { key: "title", label: "Title", render: (item) => /* @__PURE__ */ jsx(Link, { href: route("meetings.show", item.id), className: "font-medium text-indigo-600 hover:underline", children: item.title }) },
    { key: "start_time", label: "Start", render: (item) => new Date(item.start_time).toLocaleString() },
    { key: "organizer", label: "Organizer", render: (item) => item.organizer?.name },
    {
      key: "participants",
      label: "Participants",
      render: (item) => /* @__PURE__ */ jsxs("div", { className: "flex -space-x-1 overflow-hidden", children: [
        item.participants.slice(0, 3).map((p) => /* @__PURE__ */ jsx("div", { className: "inline-block h-6 w-6 rounded-full bg-gray-200 ring-2 ring-white flex items-center justify-center text-xs text-gray-600", title: p.name, children: p.name[0] }, p.id)),
        item.participants.length > 3 && /* @__PURE__ */ jsxs("span", { className: "inline-block h-6 w-6 rounded-full bg-gray-100 ring-2 ring-white flex items-center justify-center text-xs text-gray-500", children: [
          "+",
          item.participants.length - 3
        ] })
      ] })
    }
  ];
  const actions = (item) => /* @__PURE__ */ jsx("div", { className: "flex space-x-2 justify-end", children: item.organizer_id === user.id && /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(item.id), className: "text-red-500 hover:text-red-700 text-xs uppercase font-bold", children: "Cancel" }) });
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Meetings" }),
        /* @__PURE__ */ jsx(Link, { href: route("meetings.create"), children: /* @__PURE__ */ jsx(PrimaryButton, { children: "Schedule Meeting" }) })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Meetings" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx(
          DataTable,
          {
            columns,
            data: meetings.data,
            pagination: meetings,
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
