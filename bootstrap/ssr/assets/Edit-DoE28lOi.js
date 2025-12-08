import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-SKnxjhft.js";
import { useForm, Head } from "@inertiajs/react";
import { I as InputError } from "./InputError-CBvD_6aD.js";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { T as TextInput } from "./TextInput-Xf9xHrLa.js";
import { F as FormHeader } from "./FormHeader-CQAGRAnh.js";
import { F as FormPageLayout } from "./FormPageLayout-CCQJltRs.js";
import { M as MultiSelect } from "./MultiSelect-CHWvoN7q.js";
import "react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
import "./Chatter-QayPlM-X.js";
import "./Checkbox-5PHg8iNz.js";
import "lucide-react";
function Edit({ auth, project, users, ...props }) {
  const { data, setData, put, processing, errors } = useForm({
    name: project.name || "",
    description: project.description || "",
    status: project.status || "active",
    start_date: project.start_date || "",
    end_date: project.end_date || "",
    user_ids: project.users.map((u) => u.id)
  });
  const submit = (e) => {
    console.log(data);
    e.preventDefault();
    put(route("projects.update", project.id));
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsx(FormHeader, { title: `Edit Project: ${project.name}`, backRoute: "projects.index", children: /* @__PURE__ */ jsx(PrimaryButton, { form: "edit-project-form", disabled: processing, children: "Update Project" }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `Edit Project: ${project.name}` }),
        /* @__PURE__ */ jsx(
          FormPageLayout,
          {
            chatterData: props.chatter_data,
            meetingsData: props.meetings_data,
            chatterableId: project.id,
            chatterableType: "App\\\\Models\\\\Project",
            children: /* @__PURE__ */ jsxs("form", { id: "edit-project-form", onSubmit: submit, children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Project Name" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    id: "name",
                    name: "name",
                    value: data.name,
                    className: "mt-1 block w-full",
                    isFocused: true,
                    onChange: (e) => setData("name", e.target.value),
                    required: true
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
                /* @__PURE__ */ jsx(InputLabel, { htmlFor: "description", value: "Description" }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    id: "description",
                    className: "mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm",
                    value: data.description,
                    onChange: (e) => setData("description", e.target.value)
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.description, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 mt-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(InputLabel, { htmlFor: "start_date", value: "Start Date" }),
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      id: "start_date",
                      type: "date",
                      className: "mt-1 block w-full",
                      value: data.start_date,
                      onChange: (e) => setData("start_date", e.target.value)
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.start_date, className: "mt-2" })
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
                      onChange: (e) => setData("end_date", e.target.value)
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.end_date, className: "mt-2" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
                /* @__PURE__ */ jsx(InputLabel, { htmlFor: "status", value: "Status" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    id: "status",
                    className: "mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm",
                    value: data.status,
                    onChange: (e) => setData("status", e.target.value),
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "active", children: "Active" }),
                      /* @__PURE__ */ jsx("option", { value: "archived", children: "Archived" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.status, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
                /* @__PURE__ */ jsx(
                  MultiSelect,
                  {
                    label: "Assign Employees",
                    options: users.map((u) => ({ value: u.id, label: `${u.name} (${u.email})` })),
                    value: data.user_ids,
                    onChange: (vals) => setData("user_ids", vals)
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.user_ids, className: "mt-2" })
              ] })
            ] })
          }
        )
      ]
    }
  );
}
export {
  Edit as default
};
