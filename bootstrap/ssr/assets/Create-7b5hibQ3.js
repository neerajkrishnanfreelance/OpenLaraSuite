import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-CHpdAQnP.js";
import { useForm, Head } from "@inertiajs/react";
import { F as FormHeader } from "./FormHeader-CQAGRAnh.js";
import { F as FormPageLayout } from "./FormPageLayout-CCQJltRs.js";
import { T as TaskStepper } from "./TaskStepper-iRLRBtsr.js";
import { useState } from "react";
import "./TextInput-Xf9xHrLa.js";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
import "./Chatter-QayPlM-X.js";
import "./PrimaryButton-BMCZH-oa.js";
import "./InputError-CBvD_6aD.js";
import "./Checkbox-5PHg8iNz.js";
import "./SecondaryButton-C9TQBbBR.js";
import "./InputLabel-CE_n4Upz.js";
function Create({ auth, projects, users, contacts = [], lead_stages = [] }) {
  const { data, setData, post, processing, errors } = useForm({
    project_id: "",
    assigned_to: "",
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    due_date: "",
    // Lead fields
    contact_id: "",
    lead_stage_id: "",
    contact_name: "",
    // specific override or legacy
    mobile: "",
    expected_revenue: "",
    stage: "",
    // legacy
    source: "",
    // Extras
    initial_chatter: "",
    create_meeting: false,
    meeting_details: {
      title: "",
      start_time: "",
      end_time: "",
      description: ""
    }
  });
  const [files, setFiles] = useState([]);
  const submit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    post(route("tasks.store"), {
      onSuccess: (page) => {
      }
    });
  };
  const handleFilesChange = (newFiles) => {
    setData("files", newFiles);
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsx(FormHeader, { title: "Create Task", backRoute: "tasks.index" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Create Task" }),
        /* @__PURE__ */ jsx(FormPageLayout, { isCreate: true, children: /* @__PURE__ */ jsx(
          TaskStepper,
          {
            data,
            setData,
            errors,
            projects,
            users,
            contacts,
            lead_stages,
            isCreate: true,
            submit,
            processing,
            onFilesChange: handleFilesChange
          }
        ) })
      ]
    }
  );
}
export {
  Create as default
};
