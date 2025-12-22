import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, Printer } from "lucide-react";
function View({ auth, resume }) {
  const { content } = resume;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx(Head, { title: resume.title }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8 flex justify-between items-center no-print", children: [
        /* @__PURE__ */ jsxs(Link, { href: route("resumes.index"), className: "text-gray-600 hover:text-gray-900 flex items-center", children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "w-5 h-5 mr-2" }),
          " Back to List"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-4", children: [
          /* @__PURE__ */ jsx(Link, { href: route("resumes.edit", resume.id), className: "text-indigo-600 hover:text-indigo-900 font-medium", children: "Edit Resume" }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => window.print(),
              className: "bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 flex items-center",
              children: [
                /* @__PURE__ */ jsx(Printer, { className: "w-4 h-4 mr-2" }),
                " Print PDF"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-white shadow-xl rounded-lg overflow-hidden resume-print-container", children: /* @__PURE__ */ jsxs("div", { className: "p-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "border-b-2 border-gray-800 pb-8 mb-8 text-center sm:text-left", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-gray-900 uppercase tracking-widest", children: auth.user.name }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-col sm:flex-row sm:justify-between text-gray-600 text-sm", children: /* @__PURE__ */ jsx("p", { children: auth.user.email }) })
        ] }),
        resume.summary && /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 uppercase tracking-wider mb-3 border-b border-gray-200 pb-1", children: "Professional Profile" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed text-justify", children: resume.summary })
        ] }),
        content.experience && content.experience.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 uppercase tracking-wider mb-4 border-b border-gray-200 pb-1", children: "Experience" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-6", children: content.experience.map((job, i) => /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-baseline mb-1", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-gray-900", children: job.company }),
              /* @__PURE__ */ jsxs("span", { className: "text-gray-600 text-sm font-medium", children: [
                job.start,
                " - ",
                job.end
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-800 font-semibold mb-2 italic", children: job.role }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-700 whitespace-pre-wrap leading-relaxed", children: job.description })
          ] }, i)) })
        ] }),
        content.education && content.education.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 uppercase tracking-wider mb-4 border-b border-gray-200 pb-1", children: "Education" }),
          content.education.map((edu, i) => /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-baseline", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-gray-900", children: edu.school }),
              /* @__PURE__ */ jsx("span", { className: "text-gray-600 text-sm", children: edu.year })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: edu.degree })
          ] }, i))
        ] }),
        content.skills && content.skills.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 uppercase tracking-wider mb-4 border-b border-gray-200 pb-1", children: "Skills" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-x-6 gap-y-2", children: content.skills.map((skill, i) => /* @__PURE__ */ jsxs("span", { className: "text-gray-700 font-medium", children: [
            "• ",
            skill.name
          ] }, i)) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
                @media print {
                    .no-print { display: none !important; }
                    body { background: white; }
                    .min-h-screen { min-height: auto; }
                    .shadow-xl { box-shadow: none !important; }
                    .resume-print-container { width: 100% !important; max-width: none !important; }
                }
                ` })
  ] });
}
export {
  View as default
};
