import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-hQdgXqic.js";
import { useForm, Head, router } from "@inertiajs/react";
import { F as FormHeader } from "./FormHeader-CQAGRAnh.js";
import { F as FormPageLayout } from "./FormPageLayout-BSXkqO5l.js";
import { T as TaskStepper } from "./TaskStepper-BXoRKmiq.js";
import "react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
import "./Chatter-u8Py1g4n.js";
import "./PrimaryButton-BMCZH-oa.js";
import "./TextInput-mUZk5oTn.js";
import "./Checkbox-5PHg8iNz.js";
import "./SecondaryButton-C9TQBbBR.js";
import "./InputLabel-CE_n4Upz.js";
function Edit({ auth, task, projects, users, chatter_data, meetings_data, documents }) {
  const { data, setData, put, processing, errors } = useForm({
    project_id: task.project_id || "",
    assigned_to: task.assigned_to || "",
    title: task.title || "",
    description: task.description || "",
    priority: task.priority || "medium",
    status: task.status || "todo",
    due_date: task.due_date || ""
  });
  const submit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    put(route("tasks.update", task.id));
  };
  const handleDeleteDocument = (docId) => {
    if (confirm("Are you sure you want to delete this document?")) {
      router.delete(route("documents.destroy", docId), {
        preserveScroll: true
      });
    }
  };
  const handleFilesChange = (newFiles) => {
    if (newFiles.length > 0) {
      const formData = new FormData();
      newFiles.forEach((file) => formData.append("files[]", file));
      formData.append("documentable_id", task.id);
      formData.append("documentable_type", "App\\Models\\Task");
      router.post(route("documents.store"), formData, {
        onSuccess: () => {
        }
      });
    }
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsx(FormHeader, { title: "Edit Task", backRoute: "tasks.index" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Edit Task" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx(
          FormPageLayout,
          {
            chatterData: chatter_data,
            meetingsData: meetings_data,
            chatterableId: task.id,
            chatterableType: "App\\Models\\Task",
            children: /* @__PURE__ */ jsx(
              TaskStepper,
              {
                data,
                setData,
                errors,
                projects,
                users,
                isCreate: false,
                submit,
                processing,
                existingDocuments: documents,
                onDeleteDocument: handleDeleteDocument,
                onFilesChange: handleFilesChange
              }
            )
          }
        ) })
      ]
    }
  );
}
export {
  Edit as default
};
