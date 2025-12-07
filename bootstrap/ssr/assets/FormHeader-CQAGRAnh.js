import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
function FormHeader({ title, backRoute, backUrl, children }) {
  const backLink = backUrl || (backRoute ? route(backRoute) : "#");
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsxs(
      Link,
      {
        href: backLink,
        className: "flex items-center text-purple-600 hover:text-purple-800 transition-colors font-medium text-sm group",
        children: [
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: "h-5 w-5 mr-1 group-hover:-translate-x-1 transition-transform",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: "2",
              children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M10 19l-7-7m0 0l7-7m-7 7h18" })
            }
          ),
          "Back"
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 text-center", children: /* @__PURE__ */ jsx("h2", { className: "font-bold text-xl text-gray-800 leading-tight", children: title }) }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children })
  ] });
}
export {
  FormHeader as F
};
