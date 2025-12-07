import { jsx, jsxs } from "react/jsx-runtime";
import { A as ApplicationLogo } from "./ApplicationLogo-xMpxFOcX.js";
import { Link } from "@inertiajs/react";
function GuestLayout({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen flex-col items-center bg-gray-50 pt-6 sm:justify-center sm:pt-0", children: /* @__PURE__ */ jsxs("div", { className: "w-full overflow-hidden bg-white shadow-xl sm:max-w-md sm:rounded-lg", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-purple-900 py-8 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx(ApplicationLogo, { className: "h-12 w-12 fill-current text-yellow-400" }) }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white", children: "TaskFlow Pro" }),
      /* @__PURE__ */ jsx("p", { className: "text-purple-200 text-sm mt-1", children: "Access your projects and calendar." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "px-6 py-8", children })
  ] }) });
}
export {
  GuestLayout as G
};
