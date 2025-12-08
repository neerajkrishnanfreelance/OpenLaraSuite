import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-CGySncB_.js";
import { useForm, Head, router } from "@inertiajs/react";
import { I as InputError } from "./InputError-CBvD_6aD.js";
import { F as FormHeader } from "./FormHeader-CQAGRAnh.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { useState } from "react";
import { PenTool, Smile, Meh, Frown, Sparkles, Save, X, Edit2, Trash2 } from "lucide-react";
import moment from "moment";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function Index({ auth, entries }) {
  const journalNav = [
    { name: "Back to Hub", route: "dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { name: "My Journal", route: "journal.index", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" }
  ];
  const { data, setData, post, processing, errors, reset } = useForm({
    content: "",
    date: moment().format("YYYY-MM-DD"),
    mood: "",
    improvement_list: ""
  });
  const [editingEntry, setEditingEntry] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [editMood, setEditMood] = useState("");
  const [editImprovement, setEditImprovement] = useState("");
  const submit = (e) => {
    e.preventDefault();
    post(route("journal.store"), {
      onSuccess: () => reset()
    });
  };
  const handleEdit = (entry) => {
    setEditingEntry(entry.id);
    setEditContent(entry.content);
    setEditMood(entry.mood);
    setEditImprovement(entry.improvement_list || "");
  };
  const handleUpdate = (entry) => {
    router.put(route("journal.update", entry.id), {
      content: editContent,
      mood: editMood,
      improvement_list: editImprovement
    }, {
      onSuccess: () => setEditingEntry(null)
    });
  };
  const handleDelete = (entry) => {
    if (confirm("Are you sure you want to delete this entry?")) {
      router.delete(route("journal.destroy", entry.id));
    }
  };
  const MoodIcon = ({ mood, className }) => {
    switch (mood) {
      case "positive":
        return /* @__PURE__ */ jsx(Smile, { className: `text-green-500 ${className}` });
      case "neutral":
        return /* @__PURE__ */ jsx(Meh, { className: `text-gray-500 ${className}` });
      case "negative":
        return /* @__PURE__ */ jsx(Frown, { className: `text-red-500 ${className}` });
      default:
        return null;
    }
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsx(FormHeader, { title: "Journaling" }),
      customNav: journalNav,
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Journaling" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6", children: [
          /* @__PURE__ */ jsx("div", { className: "w-full lg:w-1/3", children: /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 sticky top-24", children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(PenTool, { className: "w-5 h-5 text-indigo-600" }),
              "New Entry"
            ] }),
            /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Date" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "date",
                    value: data.date,
                    onChange: (e) => setData("date", e.target.value),
                    className: "w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.date, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Mood" }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setData("mood", "positive"),
                      className: `p-2 rounded-lg border ${data.mood === "positive" ? "border-green-500 bg-green-50" : "border-gray-200 hover:bg-gray-50"}`,
                      title: "Positive",
                      children: /* @__PURE__ */ jsx(Smile, { className: `w-6 h-6 ${data.mood === "positive" ? "text-green-600" : "text-gray-400"}` })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setData("mood", "neutral"),
                      className: `p-2 rounded-lg border ${data.mood === "neutral" ? "border-gray-500 bg-gray-50" : "border-gray-200 hover:bg-gray-50"}`,
                      title: "Neutral",
                      children: /* @__PURE__ */ jsx(Meh, { className: `w-6 h-6 ${data.mood === "neutral" ? "text-gray-600" : "text-gray-400"}` })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setData("mood", "negative"),
                      className: `p-2 rounded-lg border ${data.mood === "negative" ? "border-red-500 bg-red-50" : "border-gray-200 hover:bg-gray-50"}`,
                      title: "Negative",
                      children: /* @__PURE__ */ jsx(Frown, { className: `w-6 h-6 ${data.mood === "negative" ? "text-red-600" : "text-gray-400"}` })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(InputError, { message: errors.mood, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Reflection" }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    value: data.content,
                    onChange: (e) => setData("content", e.target.value),
                    rows: "8",
                    placeholder: "How was your day?",
                    className: "w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm resize-none"
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.content, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 text-yellow-500" }),
                  "Improvement List"
                ] }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    value: data.improvement_list,
                    onChange: (e) => setData("improvement_list", e.target.value),
                    rows: "3",
                    placeholder: "What can go better?",
                    className: "w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm resize-none"
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.improvement_list, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Save Entry" }) })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "w-full lg:w-2/3", children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            entries.data.map((entry) => /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 transition-all hover:shadow-md relative", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-6 right-6 flex items-center gap-2", children: editingEntry !== entry.id && /* @__PURE__ */ jsx(MoodIcon, { mood: entry.mood, className: "w-6 h-6" }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-4 pr-10", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900", children: moment(entry.date).format("MMMM Do, YYYY") }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: moment(entry.created_at).format("h:mm A") })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: editingEntry === entry.id ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => handleUpdate(entry),
                      className: "text-green-600 hover:text-green-800 p-1",
                      title: "Save",
                      children: /* @__PURE__ */ jsx(Save, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setEditingEntry(null),
                      className: "text-gray-500 hover:text-gray-700 p-1",
                      title: "Cancel",
                      children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
                    }
                  )
                ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => handleEdit(entry),
                      className: "text-indigo-600 hover:text-indigo-800 p-1",
                      title: "Edit",
                      children: /* @__PURE__ */ jsx(Edit2, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => handleDelete(entry),
                      className: "text-red-600 hover:text-red-800 p-1",
                      title: "Delete",
                      children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                    }
                  )
                ] }) })
              ] }),
              editingEntry === entry.id ? /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsx("div", { className: "flex gap-4 mb-2", children: ["positive", "neutral", "negative"].map((m) => /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setEditMood(m),
                    className: `p-1 rounded ${editMood === m ? "bg-gray-100 ring-2 ring-indigo-500" : ""}`,
                    children: /* @__PURE__ */ jsx(MoodIcon, { mood: m, className: "w-5 h-5" })
                  },
                  m
                )) }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    value: editContent,
                    onChange: (e) => setEditContent(e.target.value),
                    rows: "5",
                    className: "w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    value: editImprovement,
                    onChange: (e) => setEditImprovement(e.target.value),
                    rows: "2",
                    placeholder: "Improvements...",
                    className: "w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                  }
                )
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("div", { className: "prose max-w-none text-gray-700 whitespace-pre-wrap mb-4", children: entry.content }),
                entry.improvement_list && /* @__PURE__ */ jsxs("div", { className: "mt-4 p-3 bg-yellow-50 rounded-md border border-yellow-100", children: [
                  /* @__PURE__ */ jsxs("h4", { className: "text-xs font-bold text-yellow-800 uppercase tracking-wider mb-1 flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx(Sparkles, { className: "w-3 h-3" }),
                    "Improvements"
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700 whitespace-pre-wrap", children: entry.improvement_list })
                ] })
              ] })
            ] }, entry.id)),
            entries.data.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center py-12 text-gray-500", children: "No entries yet. Start writing your first reflection!" }),
            entries.links && /* @__PURE__ */ jsx("div", { className: "flex justify-center mt-6", children: entries.links.map((link, key) => link.url ? /* @__PURE__ */ jsx(
              "a",
              {
                href: link.url,
                className: `mx-1 px-3 py-1 rounded-md text-sm ${link.active ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`,
                dangerouslySetInnerHTML: { __html: link.label }
              },
              key
            ) : /* @__PURE__ */ jsx(
              "span",
              {
                className: "mx-1 px-3 py-1 text-gray-400 text-sm",
                dangerouslySetInnerHTML: { __html: link.label }
              },
              key
            )) })
          ] }) })
        ] }) })
      ]
    }
  );
}
export {
  Index as default
};
