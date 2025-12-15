import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-Bg39NUCY.js";
import { useForm, Head } from "@inertiajs/react";
import { I as InputError } from "./InputError-CBvD_6aD.js";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { T as TextInput } from "./TextInput-Xf9xHrLa.js";
import { C as Checkbox } from "./Checkbox-5PHg8iNz.js";
import { F as FormHeader } from "./FormHeader-CQAGRAnh.js";
import { F as FormPageLayout } from "./FormPageLayout-CCQJltRs.js";
import "react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
import "./Chatter-QayPlM-X.js";
function Create({ auth }) {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    type: "",
    variety: "",
    planting_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    harvest_date: "",
    status: "active",
    check_r_n_d: false,
    notes: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("agriculture.crops.store"));
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsx(FormHeader, { title: "Add New Crop", backRoute: "agriculture.crops.index" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Add Crop" }),
        /* @__PURE__ */ jsx(FormPageLayout, { isCreate: true, children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Crop Name / Identifier" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "name",
                  type: "text",
                  className: "mt-1 block w-full",
                  value: data.name,
                  onChange: (e) => setData("name", e.target.value),
                  placeholder: "e.g. Tomato Row 1",
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "type", value: "Type" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "type",
                  type: "text",
                  className: "mt-1 block w-full",
                  value: data.type,
                  onChange: (e) => setData("type", e.target.value),
                  placeholder: "Vegetable, Fruit, etc."
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.type, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "variety", value: "Variety" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "variety",
                  type: "text",
                  className: "mt-1 block w-full",
                  value: data.variety,
                  onChange: (e) => setData("variety", e.target.value),
                  placeholder: "Roma, Cherry, etc."
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.variety, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "planting_date", value: "Planting Date" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "planting_date",
                  type: "date",
                  className: "mt-1 block w-full",
                  value: data.planting_date,
                  onChange: (e) => setData("planting_date", e.target.value)
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.planting_date, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "status", value: "Status" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  id: "status",
                  className: "mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
                  value: data.status,
                  onChange: (e) => setData("status", e.target.value),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "active", children: "Active (Growing)" }),
                    /* @__PURE__ */ jsx("option", { value: "harvested", children: "Harvested" }),
                    /* @__PURE__ */ jsx("option", { value: "failed", children: "Failed" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.status, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center mt-6", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx(
                Checkbox,
                {
                  name: "check_r_n_d",
                  checked: data.check_r_n_d,
                  onChange: (e) => setData("check_r_n_d", e.target.checked)
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "ms-2 text-sm text-gray-600", children: "Is R&D Project?" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "notes", value: "Notes" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                id: "notes",
                className: "mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
                rows: "3",
                value: data.notes,
                onChange: (e) => setData("notes", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.notes, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end mt-4", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Save Crop" }) })
        ] }) })
      ]
    }
  );
}
export {
  Create as default
};
