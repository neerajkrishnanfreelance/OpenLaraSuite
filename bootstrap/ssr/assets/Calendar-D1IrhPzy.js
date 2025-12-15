import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-CHpdAQnP.js";
import { Head } from "@inertiajs/react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
/* empty css                            */
import "react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
const localizer = momentLocalizer(moment);
function TodoCalendar({ auth, events, categories }) {
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Todo Calendar" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Todo Calendar" }),
        /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-6", children: /* @__PURE__ */ jsx("div", { style: { height: "700px" }, children: /* @__PURE__ */ jsx(
          Calendar,
          {
            localizer,
            events,
            startAccessor: "start",
            endAccessor: "end",
            style: { height: "100%" },
            eventPropGetter: (event) => ({
              style: { backgroundColor: event.backgroundColor }
            })
          }
        ) }) }) }) })
      ]
    }
  );
}
export {
  TodoCalendar as default
};
