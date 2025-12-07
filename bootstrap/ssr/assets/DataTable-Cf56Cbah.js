import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
function DataTable({ columns, data, pagination, actions }) {
  return /* @__PURE__ */ jsxs("div", { className: "overflow-hidden bg-white shadow-sm sm:rounded-lg", children: [
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
        columns.map((col, idx) => /* @__PURE__ */ jsx(
          "th",
          {
            scope: "col",
            className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
            children: col.label
          },
          idx
        )),
        actions && /* @__PURE__ */ jsx("th", { scope: "col", className: "relative px-6 py-3", children: /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Actions" }) })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: data.map((item, rowIdx) => /* @__PURE__ */ jsxs("tr", { children: [
        columns.map((col, colIdx) => /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: col.render ? col.render(item) : item[col.key] }, colIdx)),
        actions && /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: actions(item) })
      ] }, item.id || rowIdx)) })
    ] }) }),
    pagination && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-1 justify-between sm:hidden", children: [
        pagination.prev_page_url && /* @__PURE__ */ jsx(Link, { href: pagination.prev_page_url, className: "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50", children: "Previous" }),
        pagination.next_page_url && /* @__PURE__ */ jsx(Link, { href: pagination.next_page_url, className: "relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50", children: "Next" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex sm:flex-1 sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-700", children: [
          "Showing ",
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: pagination.from }),
          " to ",
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: pagination.to }),
          " of",
          " ",
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: pagination.total }),
          " results"
        ] }) }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("nav", { className: "isolate inline-flex -space-x-px rounded-md shadow-sm", "aria-label": "Pagination", children: pagination.links.map((link, idx) => /* @__PURE__ */ jsx(
          Link,
          {
            href: link.url || "#",
            dangerouslySetInnerHTML: { __html: link.label },
            className: `relative inline-flex items-center px-4 py-2 text-sm font-semibold ${link.active ? "z-10 bg-purple-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600" : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"} ${!link.url ? "pointer-events-none opacity-50" : ""}`
          },
          idx
        )) }) })
      ] })
    ] })
  ] });
}
export {
  DataTable as D
};
