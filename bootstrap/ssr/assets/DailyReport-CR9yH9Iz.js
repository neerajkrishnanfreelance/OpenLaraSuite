import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import "react";
function DailyReport({ start_date, end_date, logs }) {
  const handlePrint = () => {
    window.print();
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white min-h-screen font-sans text-gray-900", children: [
    /* @__PURE__ */ jsx(Head, { title: `Report - ${start_date} to ${end_date}` }),
    /* @__PURE__ */ jsxs("div", { className: "print:hidden bg-gray-100 p-4 border-b flex justify-between items-center sticky top-0", children: [
      /* @__PURE__ */ jsx("a", { href: route("agriculture.reports.index"), className: "text-indigo-600 hover:text-indigo-800 font-medium", children: "← Back to Reports" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handlePrint,
          className: "bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700",
          children: "Print / Save as PDF"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto p-8", id: "printable-area", children: [
      /* @__PURE__ */ jsxs("div", { className: "border-b-2 border-gray-800 pb-4 mb-8 flex justify-between items-end", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold uppercase tracking-wide", children: "Agriculture Report" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 mt-1", children: "OpenLaraSuite Agriculture Module" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 uppercase", children: "Period" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xl font-bold", children: [
            new Date(start_date).toLocaleDateString(),
            " - ",
            new Date(end_date).toLocaleDateString()
          ] })
        ] })
      ] }),
      logs.length === 0 ? /* @__PURE__ */ jsx("div", { className: "text-center py-12 bg-gray-50 border border-gray-200 rounded", children: /* @__PURE__ */ jsx("p", { className: "text-gray-500 italic", children: "No activity logs recorded for this date." }) }) : /* @__PURE__ */ jsx("div", { className: "space-y-6", children: logs.map((log) => /* @__PURE__ */ jsxs("div", { className: "border border-gray-200 rounded-lg p-4 break-inside-avoid", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: `px-2 py-1 text-xs font-bold uppercase rounded ${log.log_type === "nutrition" ? "bg-purple-100 text-purple-800" : log.log_type === "pesticide" ? "bg-red-100 text-red-800" : log.log_type === "water" ? "bg-blue-100 text-blue-800" : log.log_type === "harvest" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"}`, children: log.log_type }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold", children: log.crop?.name }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-500", children: [
              "(",
              log.crop?.variety,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-right text-sm text-gray-500", children: log.stage && /* @__PURE__ */ jsxs("span", { className: "block", children: [
            "Stage: ",
            log.stage
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
            log.notes ? /* @__PURE__ */ jsx("p", { className: "text-gray-800 whitespace-pre-line", children: log.notes }) : /* @__PURE__ */ jsx("p", { className: "text-gray-400 italic", children: "No notes." }),
            ["nutrition", "pesticide"].includes(log.log_type) && log.input_name && /* @__PURE__ */ jsxs("div", { className: `mt-2 text-sm p-2 rounded border inline-block ${log.log_type === "nutrition" ? "bg-purple-50 border-purple-100 font-bold text-purple-800" : "bg-red-50 border-red-100 font-bold text-red-800"}`, children: [
              /* @__PURE__ */ jsx("span", { className: "font-bold", children: "Input Applied:" }),
              " ",
              log.input_name,
              log.input_quantity && ` - ${log.input_quantity} ${log.input_unit}`
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "border-l pl-4 md:text-right", children: [
            (log.temperature || log.humidity) && /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-600 mb-2", children: [
              log.temperature && /* @__PURE__ */ jsxs("div", { children: [
                "Tmp: ",
                log.temperature,
                "°C"
              ] }),
              log.humidity && /* @__PURE__ */ jsxs("div", { children: [
                "Hum: ",
                log.humidity,
                "%"
              ] })
            ] }),
            log.image_path && /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: `/storage/${log.image_path}`,
                className: "w-24 h-24 object-cover rounded border border-gray-300 ml-auto",
                alt: "Evidence"
              }
            ) })
          ] })
        ] })
      ] }, log.id)) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-12 pt-4 border-t border-gray-200 text-center text-xs text-gray-400", children: [
        "Generated by OpenLaraSuite Agriculture Module • ",
        (/* @__PURE__ */ new Date()).toLocaleString()
      ] })
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
                @media print {
                    @page { margin: 2cm; }
                    body { -webkit-print-color-adjust: exact; }
                }
            ` })
  ] });
}
export {
  DailyReport as default
};
