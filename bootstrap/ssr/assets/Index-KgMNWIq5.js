import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-Cre_3-uQ.js";
import { Head, Link } from "@inertiajs/react";
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";
import moment from "moment";
import "react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function Index({ auth, projects }) {
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Learning Projects" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Learning Projects" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: projects.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-12 bg-white rounded-lg shadow-sm", children: [
          /* @__PURE__ */ jsx(BookOpen, { className: "mx-auto h-12 w-12 text-gray-400" }),
          /* @__PURE__ */ jsx("h3", { className: "mt-2 text-sm font-medium text-gray-900", children: "No learning projects" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500", children: 'Get started by creating a new project marked as "Learning".' }),
          /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
            Link,
            {
              href: route("projects.create"),
              className: "inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700",
              children: "Create Project"
            }
          ) })
        ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", children: projects.map((project) => /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("div", { className: "rounded-md bg-indigo-50 p-3", children: /* @__PURE__ */ jsx(BookOpen, { className: "h-6 w-6 text-indigo-600", "aria-hidden": "true" }) }) }),
              /* @__PURE__ */ jsxs("div", { className: "ml-5 w-0 flex-1", children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-500 truncate", children: project.status.toUpperCase() }),
                /* @__PURE__ */ jsx("div", { className: "text-lg font-medium text-gray-900 truncate", children: project.name })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 line-clamp-2", children: project.description || "No description provided." }) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between text-sm text-gray-500", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx(Calendar, { className: "flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" }),
                /* @__PURE__ */ jsxs("p", { children: [
                  "Due ",
                  project.end_date ? moment(project.end_date).format("MMM D") : "N/A"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx(Clock, { className: "flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" }),
                /* @__PURE__ */ jsxs("p", { children: [
                  project.tasks.length,
                  " recent tasks"
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "bg-gray-50 px-5 py-3", children: /* @__PURE__ */ jsxs(
            Link,
            {
              href: route("projects.show", project.id),
              className: "text-sm font-medium text-indigo-700 hover:text-indigo-900 flex items-center justify-center gap-2",
              children: [
                "View Details ",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
              ]
            }
          ) })
        ] }, project.id)) }) }) })
      ]
    }
  );
}
export {
  Index as default
};
