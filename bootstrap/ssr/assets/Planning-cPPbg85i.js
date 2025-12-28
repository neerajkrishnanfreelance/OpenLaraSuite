import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DksizGbA.js";
import { Head } from "@inertiajs/react";
import "react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function Planning({ auth, projects }) {
  const handlePrint = () => {
    window.print();
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Project Planning" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handlePrint,
            className: "px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 print:hidden",
            children: "Print PDF"
          }
        )
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Project Planning" }),
        /* @__PURE__ */ jsx("div", { className: "py-12 print:py-0 print:m-0", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8 print:w-full print:max-w-none print:px-0", children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg print:shadow-none", children: /* @__PURE__ */ jsx("div", { className: "p-6 text-gray-900 print:p-0", children: projects.map((project) => /* @__PURE__ */ jsxs("div", { className: "mb-8 p-4 border rounded-lg print:border-none print:break-inside-avoid", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-2", children: project.name }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-600 mb-4", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              "Status: ",
              /* @__PURE__ */ jsx("span", { className: "uppercase", children: project.status })
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              "Duration: ",
              project.start_date || "N/A",
              " - ",
              project.end_date || "N/A"
            ] })
          ] }),
          /* @__PURE__ */ jsx("h4", { className: "font-semibold mt-4 mb-2 border-b pb-1", children: "Tasks" }),
          project.tasks.length > 0 ? /* @__PURE__ */ jsxs("table", { className: "min-w-full text-sm text-left text-gray-500", children: [
            /* @__PURE__ */ jsx("thead", { className: "text-xs text-gray-700 uppercase bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("th", { className: "px-4 py-2", children: "Task" }),
              /* @__PURE__ */ jsx("th", { className: "px-4 py-2", children: "Assigned To" }),
              /* @__PURE__ */ jsx("th", { className: "px-4 py-2", children: "Status" }),
              /* @__PURE__ */ jsx("th", { className: "px-4 py-2", children: "Due Date" })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { children: project.tasks.map((task) => /* @__PURE__ */ jsxs("tr", { className: "bg-white border-b", children: [
              /* @__PURE__ */ jsx("td", { className: "px-4 py-2 font-medium text-gray-900", children: task.title }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: task.assigned_user ? task.assigned_user.name : "-" }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: task.status }),
              /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: task.due_date || "-" })
            ] }, task.id)) })
          ] }) : /* @__PURE__ */ jsx("p", { className: "text-gray-500 italic", children: "No tasks found." })
        ] }, project.id)) }) }) }) }),
        /* @__PURE__ */ jsx("style", { children: `
                @media print {
                    @page { margin: 20px; }
                    body { margin: 0; padding: 0; }
                    nav { display: none; }
                    .print\\:hidden { display: none !important; }
                    .print\\:p-0 { padding: 0 !important; }
                    .print\\:shadow-none { box-shadow: none !important; }
                    .print\\:break-inside-avoid { break-inside: avoid; }
                }
            ` })
      ]
    }
  );
}
export {
  Planning as default
};
