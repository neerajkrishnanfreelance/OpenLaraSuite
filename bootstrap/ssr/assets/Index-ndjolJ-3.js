import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DksizGbA.js";
import { useForm, Head } from "@inertiajs/react";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { T as TextInput } from "./TextInput-Xf9xHrLa.js";
import "react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function Index({ auth, crops }) {
  const { data, setData, get, processing, errors } = useForm({
    start_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    end_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    crop_id: ""
  });
  const submit = (e) => {
    e.preventDefault();
    get(route("agriculture.reports.daily"));
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Agriculture Reports" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Agriculture Reports" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-4", children: "Generate Daily Report" }),
          /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { htmlFor: "start_date", value: "Start Date" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    id: "start_date",
                    type: "date",
                    className: "mt-1 block w-full",
                    value: data.start_date,
                    onChange: (e) => setData("start_date", e.target.value),
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { htmlFor: "end_date", value: "End Date" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    id: "end_date",
                    type: "date",
                    className: "mt-1 block w-full",
                    value: data.end_date,
                    onChange: (e) => setData("end_date", e.target.value),
                    required: true
                  }
                )
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "crop_id", value: "Filter by Crop (Optional)" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  id: "crop_id",
                  className: "mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
                  value: data.crop_id,
                  onChange: (e) => setData("crop_id", e.target.value),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "All Crops" }),
                    crops && crops.map((crop) => /* @__PURE__ */ jsx("option", { value: crop.id, children: crop.name }, crop.id))
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-6 flex justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "View Report" }) })
          ] })
        ] }) }) }) })
      ]
    }
  );
}
export {
  Index as default
};
