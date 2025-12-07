import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-hQdgXqic.js";
import { Head } from "@inertiajs/react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
/* empty css                            */
import { F as FormHeader } from "./FormHeader-CQAGRAnh.js";
import "react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
const localizer = momentLocalizer(moment);
function Index({ auth, events }) {
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsx(FormHeader, { title: "Calendar" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Calendar" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg p-6", children: /* @__PURE__ */ jsx("div", { style: { height: "700px" }, children: /* @__PURE__ */ jsx(
          Calendar,
          {
            localizer,
            events,
            startAccessor: "start",
            endAccessor: "end",
            style: { height: "100%" },
            eventPropGetter: (event) => {
              const backgroundColor = event.type === "meeting" ? "#9333ea" : "#16a34a";
              return { style: { backgroundColor } };
            }
          }
        ) }) }) }) })
      ]
    }
  );
}
export {
  Index as default
};
