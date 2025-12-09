import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DqVvfPrE.js";
import { useForm, Head, router } from "@inertiajs/react";
import { F as FormHeader } from "./FormHeader-CQAGRAnh.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { useState } from "react";
import { Plus, Trash2, PenTool, Tag, Sparkles, Edit2, List, Layout, Frown, Meh, Smile } from "lucide-react";
import moment from "moment";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function Index({ auth, entries, categories, view }) {
  const journalNav = [
    { name: "Back to Hub", route: "dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { name: "My Journal", route: "journal.index", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" }
  ];
  const { data, setData, post, processing, errors, reset } = useForm({
    title: "",
    content: "",
    date: moment().format("YYYY-MM-DD"),
    mood: "",
    improvement_list: "",
    journal_category_id: ""
  });
  const [editingEntry, setEditingEntry] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editMood, setEditMood] = useState("");
  const [editImprovement, setEditImprovement] = useState("");
  const [editCategoryId, setEditCategoryId] = useState("");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const { data: catData, setData: setCatData, post: postCat, reset: resetCat } = useForm({ name: "", color: "bg-indigo-100 text-indigo-800" });
  const submit = (e) => {
    e.preventDefault();
    post(route("journal.store"), {
      onSuccess: () => reset()
    });
  };
  const handleEdit = (entry) => {
    setEditingEntry(entry.id);
    setEditTitle(entry.title || "");
    setEditContent(entry.content);
    setEditMood(entry.mood);
    setEditImprovement(entry.improvement_list || "");
    setEditCategoryId(entry.journal_category_id || "");
  };
  const handleUpdate = (entry) => {
    router.put(route("journal.update", entry.id), {
      title: editTitle,
      content: editContent,
      mood: editMood,
      improvement_list: editImprovement,
      journal_category_id: editCategoryId
    }, {
      onSuccess: () => setEditingEntry(null)
    });
  };
  const handleDelete = (entry) => {
    if (confirm("Are you sure you want to delete this entry?")) {
      router.delete(route("journal.destroy", entry.id));
    }
  };
  const submitCategory = (e) => {
    e.preventDefault();
    postCat(route("journal.categories.store"), {
      onSuccess: () => {
        setShowCategoryModal(false);
        resetCat();
      }
    });
  };
  const deleteCategory = (category) => {
    if (confirm("Delete this category?")) {
      router.delete(route("journal.categories.destroy", category.id));
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
  const kanbanColumns = categories.map((cat) => ({
    ...cat,
    entries: entries.length ? entries.filter((e) => e.journal_category_id === cat.id) : []
  }));
  kanbanColumns.push({
    id: "uncategorized",
    name: "Uncategorized",
    color: "bg-gray-100 text-gray-800",
    entries: entries.length ? entries.filter((e) => !e.journal_category_id) : []
  });
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx(FormHeader, { title: "Journaling" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 bg-white p-1 rounded-lg border shadow-sm", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => router.get(route("journal.index", { view: "list" })),
              className: `p-2 rounded ${view === "list" ? "bg-indigo-100 text-indigo-700" : "text-gray-500 hover:bg-gray-50"}`,
              children: /* @__PURE__ */ jsx(List, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => router.get(route("journal.index", { view: "kanban" })),
              className: `p-2 rounded ${view === "kanban" ? "bg-indigo-100 text-indigo-700" : "text-gray-500 hover:bg-gray-50"}`,
              children: /* @__PURE__ */ jsx(Layout, { className: "w-5 h-5" })
            }
          )
        ] })
      ] }),
      customNav: journalNav,
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Journaling" }),
        showCategoryModal && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-6 w-96 shadow-xl", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold mb-4", children: "Manage Categories" }),
          /* @__PURE__ */ jsx("form", { onSubmit: submitCategory, className: "mb-6", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: catData.name,
                onChange: (e) => setCatData("name", e.target.value),
                placeholder: "New Category...",
                className: "flex-1 rounded border-gray-300 text-sm",
                required: true
              }
            ),
            /* @__PURE__ */ jsx("button", { type: "submit", className: "bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700", children: /* @__PURE__ */ jsx(Plus, { className: "w-5 h-5" }) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "space-y-2", children: categories.map((cat) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center bg-gray-50 p-2 rounded", children: [
            /* @__PURE__ */ jsx("span", { className: `text-xs px-2 py-1 rounded font-bold ${cat.color}`, children: cat.name }),
            /* @__PURE__ */ jsx("button", { onClick: () => deleteCategory(cat), className: "text-red-400 hover:text-red-600", children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" }) })
          ] }, cat.id)) }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 flex justify-end", children: /* @__PURE__ */ jsx("button", { onClick: () => setShowCategoryModal(false), className: "text-gray-500 hover:text-gray-700 text-sm", children: "Close" }) })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsxs("div", { className: `max-w-7xl mx-auto sm:px-6 lg:px-8 ${view === "kanban" ? "h-[calc(100vh-140px)]" : ""}`, children: [
          " ",
          view === "list" ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-6", children: [
            /* @__PURE__ */ jsx("div", { className: "w-full lg:w-1/3", children: /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 sticky top-24", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
                /* @__PURE__ */ jsxs("h2", { className: "text-lg font-semibold text-gray-900 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(PenTool, { className: "w-5 h-5 text-indigo-600" }),
                  " New Entry"
                ] }),
                /* @__PURE__ */ jsxs("button", { onClick: () => setShowCategoryModal(true), className: "text-xs text-indigo-600 hover:underline flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx(Tag, { className: "w-3 h-3" }),
                  " Masters"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Title (Optional)" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: data.title,
                      onChange: (e) => setData("title", e.target.value),
                      className: "w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2 mb-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Date" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "date",
                        value: data.date,
                        onChange: (e) => setData("date", e.target.value),
                        className: "w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-sm"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Category" }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        value: data.journal_category_id,
                        onChange: (e) => setData("journal_category_id", e.target.value),
                        className: "w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-sm",
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "", children: "None" }),
                          categories.map((c) => /* @__PURE__ */ jsx("option", { value: c.id, children: c.name }, c.id))
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Mood" }),
                  /* @__PURE__ */ jsx("div", { className: "flex gap-4", children: ["positive", "neutral", "negative"].map((m) => /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setData("mood", m),
                      className: `p-2 rounded-lg border ${data.mood === m ? m === "positive" ? "border-green-500 bg-green-50" : m === "neutral" ? "border-gray-500 bg-gray-50" : "border-red-500 bg-red-50" : "border-gray-200 hover:bg-gray-50"}`,
                      children: /* @__PURE__ */ jsx(MoodIcon, { mood: m, className: `w-6 h-6 ${data.mood === m ? m === "positive" ? "text-green-600" : m === "neutral" ? "text-gray-600" : "text-red-600" : "text-gray-400"}` })
                    },
                    m
                  )) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Reflection" }),
                  /* @__PURE__ */ jsx(
                    "textarea",
                    {
                      value: data.content,
                      onChange: (e) => setData("content", e.target.value),
                      rows: "8",
                      className: "w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm resize-none"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                  /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 text-yellow-500" }),
                    " Improvement List"
                  ] }),
                  /* @__PURE__ */ jsx(
                    "textarea",
                    {
                      value: data.improvement_list,
                      onChange: (e) => setData("improvement_list", e.target.value),
                      rows: "3",
                      className: "w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm resize-none"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Save Entry" }) })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-2/3 space-y-6", children: [
              entries.data && entries.data.map((entry) => /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 relative group", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute top-6 right-6 flex items-center gap-2", children: editingEntry !== entry.id && /* @__PURE__ */ jsx(MoodIcon, { mood: entry.mood, className: "w-6 h-6" }) }),
                editingEntry !== entry.id && /* @__PURE__ */ jsxs("div", { className: "mb-4 pr-10", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 mb-1", children: entry.title || moment(entry.date).format("MMMM Do, YYYY") }),
                  /* @__PURE__ */ jsxs("div", { className: "flex gap-2 text-xs text-gray-500 mb-3", children: [
                    /* @__PURE__ */ jsx("span", { children: moment(entry.date).format("ddd, MMM Do") }),
                    entry.category && /* @__PURE__ */ jsx("span", { className: `px-2 py-0.5 rounded font-semibold ${entry.category.color}`, children: entry.category.name })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity absolute top-6 right-16", children: [
                    /* @__PURE__ */ jsx("button", { onClick: () => handleEdit(entry), className: "text-indigo-600 p-1", children: /* @__PURE__ */ jsx(Edit2, { className: "w-4 h-4" }) }),
                    /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(entry), className: "text-red-600 p-1", children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" }) })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "prose max-w-none text-gray-700 whitespace-pre-wrap", children: entry.content }),
                  entry.improvement_list && /* @__PURE__ */ jsx("div", { className: "mt-4 p-3 bg-yellow-50 rounded-md border border-yellow-100 text-sm", children: entry.improvement_list })
                ] }),
                editingEntry === entry.id && /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: editTitle,
                      onChange: (e) => setEditTitle(e.target.value),
                      className: "w-full text-lg font-bold border-gray-300 rounded",
                      placeholder: "Title"
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        value: editCategoryId,
                        onChange: (e) => setEditCategoryId(e.target.value),
                        className: "border-gray-300 rounded text-sm w-1/2",
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "", children: "No Category" }),
                          categories.map((c) => /* @__PURE__ */ jsx("option", { value: c.id, children: c.name }, c.id))
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "flex gap-2 items-center", children: ["positive", "neutral", "negative"].map((m) => /* @__PURE__ */ jsx("button", { onClick: () => setEditMood(m), className: `p-1 rounded ${editMood === m ? "bg-gray-200" : ""}`, children: /* @__PURE__ */ jsx(MoodIcon, { mood: m, className: "w-5 h-5" }) }, m)) })
                  ] }),
                  /* @__PURE__ */ jsx("textarea", { value: editContent, onChange: (e) => setEditContent(e.target.value), rows: "5", className: "w-full border-gray-300 rounded" }),
                  /* @__PURE__ */ jsx("textarea", { value: editImprovement, onChange: (e) => setEditImprovement(e.target.value), rows: "2", className: "w-full border-gray-300 rounded", placeholder: "Improvements" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
                    /* @__PURE__ */ jsx("button", { onClick: () => setEditingEntry(null), className: "text-gray-500", children: "Cancel" }),
                    /* @__PURE__ */ jsx("button", { onClick: () => handleUpdate(entry), className: "bg-green-600 text-white px-3 py-1 rounded", children: "Save" })
                  ] })
                ] })
              ] }, entry.id)),
              entries.links && /* @__PURE__ */ jsx("div", { className: "flex justify-center mt-6", children: "..." }),
              " "
            ] })
          ] }) : (
            /* Kanban View */
            /* @__PURE__ */ jsx("div", { className: "flex h-full overflow-x-auto pb-4 gap-6", children: kanbanColumns.map((column) => /* @__PURE__ */ jsxs("div", { className: "min-w-[300px] bg-gray-100 rounded-lg p-4 flex flex-col h-full", children: [
              /* @__PURE__ */ jsxs("div", { className: `font-bold mb-4 flex justify-between items-center ${column.id === "uncategorized" ? "text-gray-600" : "text-gray-800"}`, children: [
                /* @__PURE__ */ jsx("span", { className: `px-2 py-1 rounded ${column.color || "bg-white"}`, children: column.name }),
                /* @__PURE__ */ jsx("span", { className: "text-xs bg-gray-200 px-2 py-1 rounded-full", children: column.entries.length })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin", children: [
                column.entries.map((entry) => /* @__PURE__ */ jsxs("div", { className: "bg-white p-3 rounded shadow-sm hover:shadow-md cursor-pointer group", onClick: () => handleEdit(entry), children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-gray-500", children: moment(entry.date).format("MMM Do") }),
                    /* @__PURE__ */ jsx(MoodIcon, { mood: entry.mood, className: "w-4 h-4" })
                  ] }),
                  /* @__PURE__ */ jsx("h4", { className: "font-bold text-gray-900 text-sm mb-1", children: entry.title || "Journal Entry" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600 line-clamp-3", children: entry.content })
                ] }, entry.id)),
                column.id === "uncategorized" && /* @__PURE__ */ jsxs("button", { onClick: () => setShowCategoryModal(true), className: "w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 hover:border-gray-400 hover:text-gray-500 text-sm flex items-center justify-center gap-1", children: [
                  /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
                  " Manage Categories"
                ] })
              ] })
            ] }, column.id)) })
          )
        ] }) })
      ]
    }
  );
}
export {
  Index as default
};
