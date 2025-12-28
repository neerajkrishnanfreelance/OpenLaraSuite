import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { A as Authenticated } from "./AuthenticatedLayout-DksizGbA.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { T as TextInput } from "./TextInput-Xf9xHrLa.js";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { Plus, Trash2, Eye, Save } from "lucide-react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function Builder({ auth, resume }) {
  const { data, setData, put, processing, isDirty } = useForm({
    title: resume.title,
    summary: resume.summary || "",
    content: resume.content || {
      education: [],
      experience: [],
      skills: []
    }
  });
  const [activeSection, setActiveSection] = useState("summary");
  const updateContent = (section, index, field, value) => {
    const newSectionData = [...data.content[section] || []];
    newSectionData[index] = { ...newSectionData[index], [field]: value };
    setData("content", { ...data.content, [section]: newSectionData });
  };
  const addItem = (section, template) => {
    setData("content", {
      ...data.content,
      [section]: [...data.content[section] || [], template]
    });
  };
  const removeItem = (section, index) => {
    const newSectionData = [...data.content[section] || []];
    newSectionData.splice(index, 1);
    setData("content", { ...data.content, [section]: newSectionData });
  };
  const submit = (e) => {
    e.preventDefault();
    put(route("resumes.update", resume.id), {
      preserveScroll: true,
      onSuccess: () => alert("Resume Saved!")
    });
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: [
          "Resume Builder: ",
          data.title
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-3", children: [
          /* @__PURE__ */ jsxs(
            Link,
            {
              href: route("resumes.show", resume.id),
              target: "_blank",
              className: "inline-flex items-center px-4 py-2 bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-300 transition",
              children: [
                /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4 mr-2" }),
                " Preview"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(PrimaryButton, { onClick: submit, disabled: processing || !isDirty, children: [
            /* @__PURE__ */ jsx(Save, { className: "w-4 h-4 mr-2" }),
            " Save Changes"
          ] })
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `Edit ${data.title}` }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-4", children: "Professional Summary" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  className: "w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                  rows: "4",
                  value: data.summary,
                  onChange: (e) => setData("summary", e.target.value),
                  placeholder: "Write a compelling summary of your career..."
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Work Experience" }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => addItem("experience", { company: "", role: "", start: "", end: "", description: "" }),
                    className: "text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center",
                    children: [
                      /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 mr-1" }),
                      " Add Job"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                data.content.experience?.map((job, index) => /* @__PURE__ */ jsxs("div", { className: "border border-gray-200 rounded-md p-4 bg-gray-50", children: [
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 mb-3", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(InputLabel, { value: "Company" }),
                      /* @__PURE__ */ jsx(
                        TextInput,
                        {
                          value: job.company || "",
                          onChange: (e) => updateContent("experience", index, "company", e.target.value),
                          className: "w-full mt-1"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(InputLabel, { value: "Role/Title" }),
                      /* @__PURE__ */ jsx(
                        TextInput,
                        {
                          value: job.role || "",
                          onChange: (e) => updateContent("experience", index, "role", e.target.value),
                          className: "w-full mt-1"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(InputLabel, { value: "Start Date" }),
                      /* @__PURE__ */ jsx(
                        TextInput,
                        {
                          type: "text",
                          value: job.start || "",
                          onChange: (e) => updateContent("experience", index, "start", e.target.value),
                          className: "w-full mt-1",
                          placeholder: "e.g. Jan 2020"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(InputLabel, { value: "End Date" }),
                      /* @__PURE__ */ jsx(
                        TextInput,
                        {
                          type: "text",
                          value: job.end || "",
                          onChange: (e) => updateContent("experience", index, "end", e.target.value),
                          className: "w-full mt-1",
                          placeholder: "Present"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(InputLabel, { value: "Description / Responsibilities" }),
                    /* @__PURE__ */ jsx(
                      "textarea",
                      {
                        className: "w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                        rows: "3",
                        value: job.description || "",
                        onChange: (e) => updateContent("experience", index, "description", e.target.value)
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "flex justify-end mt-2", children: /* @__PURE__ */ jsxs("button", { onClick: () => removeItem("experience", index), className: "text-red-500 hover:text-red-700 text-xs flex items-center", children: [
                    /* @__PURE__ */ jsx(Trash2, { className: "w-3 h-3 mr-1" }),
                    " Remove"
                  ] }) })
                ] }, index)),
                (!data.content.experience || data.content.experience.length === 0) && /* @__PURE__ */ jsx("p", { className: "text-gray-400 italic text-sm", children: "No work experience added." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Education" }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => addItem("education", { school: "", degree: "", year: "" }),
                    className: "text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center",
                    children: [
                      /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 mr-1" }),
                      " Add Education"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                data.content.education?.map((edu, index) => /* @__PURE__ */ jsxs("div", { className: "border border-gray-200 rounded-md p-4 bg-gray-50", children: [
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
                      /* @__PURE__ */ jsx(InputLabel, { value: "School / University" }),
                      /* @__PURE__ */ jsx(
                        TextInput,
                        {
                          value: edu.school || "",
                          onChange: (e) => updateContent("education", index, "school", e.target.value),
                          className: "w-full mt-1"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(InputLabel, { value: "Degree" }),
                      /* @__PURE__ */ jsx(
                        TextInput,
                        {
                          value: edu.degree || "",
                          onChange: (e) => updateContent("education", index, "degree", e.target.value),
                          className: "w-full mt-1"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(InputLabel, { value: "Graduation Year" }),
                      /* @__PURE__ */ jsx(
                        TextInput,
                        {
                          value: edu.year || "",
                          onChange: (e) => updateContent("education", index, "year", e.target.value),
                          className: "w-full mt-1"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "flex justify-end mt-2", children: /* @__PURE__ */ jsxs("button", { onClick: () => removeItem("education", index), className: "text-red-500 hover:text-red-700 text-xs flex items-center", children: [
                    /* @__PURE__ */ jsx(Trash2, { className: "w-3 h-3 mr-1" }),
                    " Remove"
                  ] }) })
                ] }, index)),
                (!data.content.education || data.content.education.length === 0) && /* @__PURE__ */ jsx("p", { className: "text-gray-400 italic text-sm", children: "No educational background added." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Skills" }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => addItem("skills", { name: "", level: "Intermediate" }),
                    className: "text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center",
                    children: [
                      /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 mr-1" }),
                      " Add Skill"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: data.content.skills?.map((skill, index) => /* @__PURE__ */ jsxs("div", { className: "border border-gray-200 rounded-md p-3 bg-gray-50 flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("div", { className: "flex-1 mr-2", children: /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    value: skill.name || "",
                    onChange: (e) => updateContent("skills", index, "name", e.target.value),
                    className: "w-full",
                    placeholder: "Skill Name"
                  }
                ) }),
                /* @__PURE__ */ jsx("button", { onClick: () => removeItem("skills", index), className: "text-red-500 hover:text-red-700", children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" }) })
              ] }, index)) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "hidden lg:block", children: /* @__PURE__ */ jsxs("div", { className: "sticky top-24 bg-white shadow-lg rounded-lg border border-gray-200 p-8 min-h-[600px] overflow-hidden", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 text-center", children: "Live Preview" }),
            /* @__PURE__ */ jsxs("div", { className: "prose prose-sm max-w-none", children: [
              /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900 mb-1 leading-tight", children: auth.user.name }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-4", children: auth.user.email }),
              /* @__PURE__ */ jsx("hr", { className: "my-4 border-gray-300" }),
              data.summary && /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 uppercase border-b-2 border-indigo-500 pb-1 mb-2", children: "Summary" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-700 whitespace-pre-wrap", children: data.summary })
              ] }),
              data.content.experience && data.content.experience.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 uppercase border-b-2 border-indigo-500 pb-1 mb-2", children: "Experience" }),
                data.content.experience.map((job, i) => /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-baseline", children: [
                    /* @__PURE__ */ jsx("h4", { className: "font-bold text-gray-800", children: job.company }),
                    /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-500", children: [
                      job.start,
                      " - ",
                      job.end
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-700 italic", children: job.role }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mt-1 whitespace-pre-wrap", children: job.description })
                ] }, i))
              ] }),
              data.content.education && data.content.education.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 uppercase border-b-2 border-indigo-500 pb-1 mb-2", children: "Education" }),
                data.content.education.map((edu, i) => /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                    /* @__PURE__ */ jsx("h4", { className: "font-bold text-gray-800", children: edu.school }),
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: edu.year })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700", children: edu.degree })
                ] }, i))
              ] }),
              data.content.skills && data.content.skills.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 uppercase border-b-2 border-indigo-500 pb-1 mb-2", children: "Skills" }),
                /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: data.content.skills.map((skill, i) => /* @__PURE__ */ jsx("span", { className: "bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded", children: skill.name }, i)) })
              ] })
            ] })
          ] }) })
        ] }) }) })
      ]
    }
  );
}
export {
  Builder as default
};
