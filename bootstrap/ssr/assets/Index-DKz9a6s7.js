import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { A as Authenticated } from "./AuthenticatedLayout-DHAmaW8y.js";
import { Head, Link, router } from "@inertiajs/react";
import { Eye, Edit, Trash2 } from "lucide-react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function Index({ auth, resumes }) {
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this resume?")) {
      router.delete(route("resumes.destroy", id));
    }
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "My Resumes" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "My Resumes" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Resume List" }),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("resumes.create"),
                className: "inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150",
                children: "Create Resume"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: resumes.length > 0 ? resumes.map((resume) => /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-200 hover:shadow-md transition", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
            /* @__PURE__ */ jsx("div", { className: "flex justify-between items-start", children: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-gray-900 truncate", title: resume.title, children: resume.title }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1 line-clamp-2", children: resume.summary || "No summary provided." }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400 mt-2", children: [
                "Last updated: ",
                new Date(resume.updated_at).toLocaleDateString()
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end space-x-3", children: [
              /* @__PURE__ */ jsxs(
                Link,
                {
                  href: route("resumes.show", resume.id),
                  className: "text-gray-600 hover:text-gray-900 inline-flex items-center text-sm font-medium",
                  title: "View/Print",
                  children: [
                    /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4 mr-1" }),
                    "View"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  href: route("resumes.edit", resume.id),
                  className: "text-indigo-600 hover:text-indigo-900 inline-flex items-center text-sm font-medium",
                  title: "Edit in Builder",
                  children: [
                    /* @__PURE__ */ jsx(Edit, { className: "w-4 h-4 mr-1" }),
                    "Edit"
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleDelete(resume.id),
                  className: "text-red-600 hover:text-red-900 inline-flex items-center text-sm font-medium",
                  children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                }
              )
            ] })
          ] }) }, resume.id)) : /* @__PURE__ */ jsxs("div", { className: "col-span-full text-center py-12 bg-white rounded-lg border border-dashed border-gray-300", children: [
            /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "You haven't created any resumes yet." }),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("resumes.create"),
                className: "mt-4 inline-block text-indigo-600 hover:underline",
                children: "Create your first resume"
              }
            )
          ] }) })
        ] }) })
      ]
    }
  );
}
export {
  Index as default
};
