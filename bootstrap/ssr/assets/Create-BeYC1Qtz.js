import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-SKnxjhft.js";
import { useForm, Head } from "@inertiajs/react";
import { I as InputError } from "./InputError-CBvD_6aD.js";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { T as TextInput } from "./TextInput-Xf9xHrLa.js";
import { F as FormHeader } from "./FormHeader-CQAGRAnh.js";
import { F as FormPageLayout } from "./FormPageLayout-CCQJltRs.js";
import "react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
import "./Chatter-QayPlM-X.js";
import "./Checkbox-5PHg8iNz.js";
function Create({ auth }) {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "employee"
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("employees.store"));
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsx(FormHeader, { title: "Add New Employee", backRoute: "employees.index", children: /* @__PURE__ */ jsx(PrimaryButton, { form: "create-employee-form", disabled: processing, children: "Create Employee" }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Add Employee" }),
        /* @__PURE__ */ jsx(FormPageLayout, { isCreate: true, children: /* @__PURE__ */ jsxs("form", { id: "create-employee-form", onSubmit: submit, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Name" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "name",
                value: data.name,
                className: "mt-1 block w-full",
                onChange: (e) => setData("name", e.target.value),
                required: true
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "email",
                type: "email",
                value: data.email,
                className: "mt-1 block w-full",
                onChange: (e) => setData("email", e.target.value),
                required: true
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "password",
                  type: "password",
                  value: data.password,
                  className: "mt-1 block w-full",
                  onChange: (e) => setData("password", e.target.value),
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password_confirmation", value: "Confirm Password" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "password_confirmation",
                  type: "password",
                  value: data.password_confirmation,
                  className: "mt-1 block w-full",
                  onChange: (e) => setData("password_confirmation", e.target.value),
                  required: true
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "role", value: "Role" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                id: "role",
                className: "mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm",
                value: data.role,
                onChange: (e) => setData("role", e.target.value),
                children: [
                  /* @__PURE__ */ jsx("option", { value: "employee", children: "Employee" }),
                  /* @__PURE__ */ jsx("option", { value: "manager", children: "Manager" }),
                  /* @__PURE__ */ jsx("option", { value: "admin", children: "Admin" })
                ]
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.role, className: "mt-2" })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  Create as default
};
