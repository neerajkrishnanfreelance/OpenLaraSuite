import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-__gkNP0U.js";
import { useForm, router, Head } from "@inertiajs/react";
import { I as InputError } from "./InputError-CBvD_6aD.js";
import { F as FormHeader } from "./FormHeader-CQAGRAnh.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { useState, useEffect } from "react";
import { Plus, Trash2, Tag, ChevronLeft, ChevronRight, CalendarDays, PenTool, Edit2, Calendar, Sparkles, Search, Filter, Frown, Meh, Smile } from "lucide-react";
import moment from "moment";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function Index({ auth, entries, categories, view, filters }) {
  const journalNav = [
    { name: "Back to Hub", route: "dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { name: "My Journal", route: "journal.index", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" }
  ];
  const [selectedEntryId, setSelectedEntryId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState(filters.search || "");
  const [categoryFilter, setCategoryFilter] = useState(filters.category || "");
  const [moodFilter, setMoodFilter] = useState(filters.mood || "");
  const [dateFromFilter, setDateFromFilter] = useState(filters.date_from || "");
  const [dateToFilter, setDateToFilter] = useState(filters.date_to || "");
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(null);
  const { data, setData, post, processing, errors, reset } = useForm({
    title: "",
    content: "",
    date: moment().format("YYYY-MM-DD"),
    mood: "",
    improvement_list: "",
    journal_category_id: ""
  });
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const { data: catData, setData: setCatData, post: postCat, reset: resetCat } = useForm({ name: "", color: "bg-indigo-100 text-indigo-800" });
  useEffect(() => {
    const timer = setTimeout(() => {
      applyFilters();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);
  const applyFilters = () => {
    router.get(route("journal.index"), {
      search: searchQuery,
      category: categoryFilter,
      mood: moodFilter,
      date_from: dateFromFilter,
      date_to: dateToFilter
    }, {
      preserveState: true,
      preserveScroll: true
    });
  };
  const clearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("");
    setMoodFilter("");
    setDateFromFilter("");
    setDateToFilter("");
    router.get(route("journal.index"));
  };
  const selectedEntry = selectedEntryId ? (entries.data || entries).find((e) => e.id === selectedEntryId) : null;
  const handleSelectEntry = (entry) => {
    setSelectedEntryId(entry.id);
    setIsEditing(false);
    setData({
      title: entry.title || "",
      content: entry.content,
      date: entry.date,
      mood: entry.mood || "",
      improvement_list: entry.improvement_list || "",
      journal_category_id: entry.journal_category_id || ""
    });
  };
  const handleNewEntry = () => {
    setSelectedEntryId(null);
    setIsEditing(true);
    reset();
    setData("date", moment().format("YYYY-MM-DD"));
  };
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleCancelEdit = () => {
    if (selectedEntryId) {
      setIsEditing(false);
      if (selectedEntry) {
        setData({
          title: selectedEntry.title || "",
          content: selectedEntry.content,
          date: selectedEntry.date,
          mood: selectedEntry.mood || "",
          improvement_list: selectedEntry.improvement_list || "",
          journal_category_id: selectedEntry.journal_category_id || ""
        });
      }
    } else {
      setSelectedEntryId(null);
      setIsEditing(false);
      reset();
    }
  };
  const submit = (e) => {
    e.preventDefault();
    if (selectedEntryId) {
      router.put(route("journal.update", selectedEntryId), data, {
        onSuccess: () => {
          setIsEditing(false);
        }
      });
    } else {
      post(route("journal.store"), {
        onSuccess: () => {
          reset();
          setIsEditing(false);
        }
      });
    }
  };
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this entry?")) {
      router.delete(route("journal.destroy", selectedEntryId), {
        onSuccess: () => {
          setSelectedEntryId(null);
          setIsEditing(false);
          reset();
        }
      });
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
  const generateCalendarDays = () => {
    const startOfMonth = currentMonth.clone().startOf("month");
    const endOfMonth = currentMonth.clone().endOf("month");
    const startDate = startOfMonth.clone().startOf("week");
    const endDate = endOfMonth.clone().endOf("week");
    const days = [];
    let day = startDate.clone();
    while (day.isSameOrBefore(endDate)) {
      days.push(day.clone());
      day.add(1, "day");
    }
    return days;
  };
  const getEntriesForDate = (date) => {
    const entriesList2 = entries.data || entries;
    return entriesList2.filter(
      (entry) => moment(entry.date).format("YYYY-MM-DD") === date.format("YYYY-MM-DD")
    );
  };
  const handleDateClick = (date) => {
    setSelectedDate(date);
    const dateStr = date.format("YYYY-MM-DD");
    const dateEntries = getEntriesForDate(date);
    if (dateEntries.length > 0) {
      handleSelectEntry(dateEntries[0]);
    } else {
      setSelectedEntryId(null);
      setIsEditing(true);
      reset();
      setData("date", dateStr);
    }
  };
  const goToPreviousMonth = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, "month"));
  };
  const goToNextMonth = () => {
    setCurrentMonth(currentMonth.clone().add(1, "month"));
  };
  const goToToday = () => {
    setCurrentMonth(moment());
    setSelectedDate(moment());
    handleDateClick(moment());
  };
  const entriesList = entries.data || entries;
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx(FormHeader, { title: "Journaling" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 bg-white p-1 rounded-lg border shadow-sm", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => router.get(route("journal.index", { view: "list" })),
              className: `px-3 py-2 rounded flex items-center gap-2 ${view === "list" ? "bg-indigo-100 text-indigo-700" : "text-gray-500 hover:bg-gray-50"}`,
              title: "List View",
              children: [
                /* @__PURE__ */ jsx(Search, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "List" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => router.get(route("journal.index", { view: "calendar" })),
              className: `px-3 py-2 rounded flex items-center gap-2 ${view === "calendar" ? "bg-indigo-100 text-indigo-700" : "text-gray-500 hover:bg-gray-50"}`,
              title: "Calendar View",
              children: [
                /* @__PURE__ */ jsx(CalendarDays, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Calendar" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => router.get(route("journal.index", { view: "kanban" })),
              className: `px-3 py-2 rounded flex items-center gap-2 ${view === "kanban" ? "bg-indigo-100 text-indigo-700" : "text-gray-500 hover:bg-gray-50"}`,
              title: "Kanban View",
              children: [
                /* @__PURE__ */ jsx(Tag, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Kanban" })
              ]
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
        /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: view === "calendar" ? (
          /* CALENDAR VIEW */
          /* @__PURE__ */ jsxs("div", { className: "flex gap-6 h-[calc(100vh-140px)]", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1 bg-white rounded-lg shadow-sm flex flex-col overflow-hidden", children: [
              /* @__PURE__ */ jsxs("div", { className: "p-4 border-b flex justify-between items-center", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-900", children: currentMonth.format("MMMM YYYY") }),
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      onClick: () => setShowCategoryModal(true),
                      className: "text-xs text-indigo-600 hover:underline flex items-center gap-1",
                      children: [
                        /* @__PURE__ */ jsx(Tag, { className: "w-3 h-3" }),
                        " Masters"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: goToToday,
                      className: "px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700",
                      children: "Today"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: goToPreviousMonth,
                      className: "p-2 hover:bg-gray-100 rounded-lg",
                      children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: goToNextMonth,
                      className: "p-2 hover:bg-gray-100 rounded-lg",
                      children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5" })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 p-4 overflow-auto", children: [
                /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 gap-2 mb-2", children: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => /* @__PURE__ */ jsx("div", { className: "text-center text-sm font-semibold text-gray-600 py-2", children: day }, day)) }),
                /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 gap-2", children: generateCalendarDays().map((day, index) => {
                  const dayEntries = getEntriesForDate(day);
                  const isToday = day.isSame(moment(), "day");
                  const isCurrentMonth = day.month() === currentMonth.month();
                  const isSelected = selectedDate && day.isSame(selectedDate, "day");
                  return /* @__PURE__ */ jsxs(
                    "div",
                    {
                      onClick: () => handleDateClick(day),
                      className: `
                                                        min-h-[100px] p-2 border rounded-lg cursor-pointer transition-all
                                                        ${isCurrentMonth ? "bg-white hover:bg-indigo-50" : "bg-gray-50 text-gray-400"}
                                                        ${isToday ? "border-indigo-600 border-2" : "border-gray-200"}
                                                        ${isSelected ? "ring-2 ring-indigo-600 bg-indigo-50" : ""}
                                                        hover:shadow-md
                                                    `,
                      children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-1", children: [
                          /* @__PURE__ */ jsx("span", { className: `text-sm font-semibold ${isToday ? "text-indigo-600" : ""}`, children: day.format("D") }),
                          dayEntries.length > 0 && /* @__PURE__ */ jsx("span", { className: "text-xs bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center", children: dayEntries.length })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                          dayEntries.slice(0, 3).map((entry) => /* @__PURE__ */ jsxs(
                            "div",
                            {
                              className: "text-xs p-1 bg-indigo-100 text-indigo-800 rounded truncate",
                              title: entry.title || entry.content.substring(0, 50),
                              children: [
                                entry.title || entry.content.substring(0, 20),
                                "..."
                              ]
                            },
                            entry.id
                          )),
                          dayEntries.length > 3 && /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500 pl-1", children: [
                            "+",
                            dayEntries.length - 3,
                            " more"
                          ] })
                        ] })
                      ]
                    },
                    index
                  );
                }) })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "w-1/3 bg-white rounded-lg shadow-sm overflow-hidden", children: selectedEntryId === null && !isEditing ? (
              // Empty State
              /* @__PURE__ */ jsx("div", { className: "h-full flex items-center justify-center text-gray-400", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx(CalendarDays, { className: "w-16 h-16 mx-auto mb-4 opacity-50" }),
                /* @__PURE__ */ jsx("p", { className: "text-lg font-medium", children: "Select a date" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm mt-2", children: "Click on a calendar date to view or create entries" })
              ] }) })
            ) : /* @__PURE__ */ jsxs("div", { className: "h-full flex flex-col", children: [
              /* @__PURE__ */ jsxs("div", { className: "p-6 border-b flex justify-between items-center", children: [
                /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-gray-900 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(PenTool, { className: "w-5 h-5 text-indigo-600" }),
                  selectedEntryId ? isEditing ? "Edit Entry" : "View Entry" : "New Entry"
                ] }),
                selectedEntryId && !isEditing && /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      onClick: handleEdit,
                      className: "px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2",
                      children: [
                        /* @__PURE__ */ jsx(Edit2, { className: "w-4 h-4" }),
                        "Edit"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      onClick: handleDelete,
                      className: "px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2",
                      children: [
                        /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" }),
                        "Delete"
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto p-6", children: !isEditing && selectedEntry ? (
                // View Mode
                /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-900 mb-2", children: selectedEntry.title || moment(selectedEntry.date).format("MMMM Do, YYYY") }),
                    /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center text-sm text-gray-500", children: [
                      /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" }),
                        moment(selectedEntry.date).format("dddd, MMMM Do, YYYY")
                      ] }),
                      selectedEntry.category && /* @__PURE__ */ jsx("span", { className: `px-2 py-1 rounded font-semibold ${selectedEntry.category.color}`, children: selectedEntry.category.name }),
                      selectedEntry.mood && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsx(MoodIcon, { mood: selectedEntry.mood, className: "w-5 h-5" }),
                        /* @__PURE__ */ jsx("span", { className: "capitalize", children: selectedEntry.mood })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "prose max-w-none", children: /* @__PURE__ */ jsx("div", { className: "whitespace-pre-wrap text-gray-700 leading-relaxed", children: selectedEntry.content }) }),
                  selectedEntry.improvement_list && /* @__PURE__ */ jsxs("div", { className: "bg-yellow-50 border border-yellow-200 rounded-lg p-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                      /* @__PURE__ */ jsx(Sparkles, { className: "w-5 h-5 text-yellow-600" }),
                      /* @__PURE__ */ jsx("h4", { className: "font-semibold text-gray-900", children: "Improvement List" })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "text-gray-700 whitespace-pre-wrap", children: selectedEntry.improvement_list })
                  ] })
                ] })
              ) : (
                // Edit/Create Mode - Same form as list view
                /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Title (Optional)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: data.title,
                        onChange: (e) => setData("title", e.target.value),
                        className: "w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
                        placeholder: "Give your entry a title..."
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Date" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "date",
                          value: data.date,
                          onChange: (e) => setData("date", e.target.value),
                          className: "w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
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
                          className: "w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
                          children: [
                            /* @__PURE__ */ jsx("option", { value: "", children: "None" }),
                            categories.map((c) => /* @__PURE__ */ jsx("option", { value: c.id, children: c.name }, c.id))
                          ]
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Mood" }),
                    /* @__PURE__ */ jsx("div", { className: "flex gap-4", children: ["positive", "neutral", "negative"].map((m) => /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setData("mood", m),
                        className: `p-3 rounded-lg border ${data.mood === m ? m === "positive" ? "border-green-500 bg-green-50" : m === "neutral" ? "border-gray-500 bg-gray-50" : "border-red-500 bg-red-50" : "border-gray-200 hover:bg-gray-50"}`,
                        children: /* @__PURE__ */ jsx(MoodIcon, { mood: m, className: `w-6 h-6 ${data.mood === m ? m === "positive" ? "text-green-600" : m === "neutral" ? "text-gray-600" : "text-red-600" : "text-gray-400"}` })
                      },
                      m
                    )) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Reflection" }),
                    /* @__PURE__ */ jsx(
                      "textarea",
                      {
                        value: data.content,
                        onChange: (e) => setData("content", e.target.value),
                        rows: "10",
                        className: "w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm resize-none",
                        placeholder: "Write your thoughts...",
                        required: true
                      }
                    ),
                    /* @__PURE__ */ jsx(InputError, { message: errors.content, className: "mt-2" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 text-yellow-500" }),
                      " Improvement List"
                    ] }),
                    /* @__PURE__ */ jsx(
                      "textarea",
                      {
                        value: data.improvement_list,
                        onChange: (e) => setData("improvement_list", e.target.value),
                        rows: "4",
                        className: "w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm resize-none",
                        placeholder: "What can you improve?"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 pt-4 border-t", children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: handleCancelEdit,
                        className: "px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50",
                        children: "Cancel"
                      }
                    ),
                    /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: selectedEntryId ? "Update Entry" : "Save Entry" })
                  ] })
                ] })
              ) })
            ] }) })
          ] })
        ) : /* @__PURE__ */ jsxs("div", { className: "flex gap-6 h-[calc(100vh-140px)]", children: [
          /* @__PURE__ */ jsxs("div", { className: "w-1/3 bg-white rounded-lg shadow-sm flex flex-col overflow-hidden", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-4 border-b space-y-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: searchQuery,
                    onChange: (e) => setSearchQuery(e.target.value),
                    placeholder: "Search entries...",
                    className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => setShowFilters(!showFilters),
                    className: `flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm ${showFilters ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-700"} hover:bg-indigo-100 hover:text-indigo-700`,
                    children: [
                      /* @__PURE__ */ jsx(Filter, { className: "w-4 h-4" }),
                      "Filters"
                    ]
                  }
                ),
                (categoryFilter || moodFilter || dateFromFilter || dateToFilter) && /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: clearFilters,
                    className: "text-xs text-red-600 hover:underline",
                    children: "Clear"
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => setShowCategoryModal(true),
                    className: "ml-auto text-xs text-indigo-600 hover:underline flex items-center gap-1",
                    children: [
                      /* @__PURE__ */ jsx(Tag, { className: "w-3 h-3" }),
                      " Masters"
                    ]
                  }
                )
              ] }),
              showFilters && /* @__PURE__ */ jsxs("div", { className: "space-y-2 pt-2 border-t", children: [
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: categoryFilter,
                    onChange: (e) => {
                      setCategoryFilter(e.target.value);
                      applyFilters();
                    },
                    className: "w-full text-sm border-gray-300 rounded-lg",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "", children: "All Categories" }),
                      categories.map((c) => /* @__PURE__ */ jsx("option", { value: c.id, children: c.name }, c.id))
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: moodFilter,
                    onChange: (e) => {
                      setMoodFilter(e.target.value);
                      applyFilters();
                    },
                    className: "w-full text-sm border-gray-300 rounded-lg",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "", children: "All Moods" }),
                      /* @__PURE__ */ jsx("option", { value: "positive", children: "Positive" }),
                      /* @__PURE__ */ jsx("option", { value: "neutral", children: "Neutral" }),
                      /* @__PURE__ */ jsx("option", { value: "negative", children: "Negative" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "date",
                      value: dateFromFilter,
                      onChange: (e) => {
                        setDateFromFilter(e.target.value);
                        applyFilters();
                      },
                      placeholder: "From",
                      className: "text-sm border-gray-300 rounded-lg"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "date",
                      value: dateToFilter,
                      onChange: (e) => {
                        setDateToFilter(e.target.value);
                        applyFilters();
                      },
                      placeholder: "To",
                      className: "text-sm border-gray-300 rounded-lg"
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto", children: entriesList.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "p-8 text-center text-gray-400", children: [
              /* @__PURE__ */ jsx(PenTool, { className: "w-12 h-12 mx-auto mb-2 opacity-50" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm", children: "No entries found" })
            ] }) : /* @__PURE__ */ jsx("div", { className: "divide-y", children: entriesList.map((entry) => /* @__PURE__ */ jsxs(
              "div",
              {
                onClick: () => handleSelectEntry(entry),
                className: `p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedEntryId === entry.id ? "bg-indigo-50 border-l-4 border-indigo-600" : ""}`,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-2", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                      /* @__PURE__ */ jsx("h4", { className: "font-semibold text-gray-900 text-sm line-clamp-1", children: entry.title || moment(entry.date).format("MMMM Do, YYYY") }),
                      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-0.5", children: moment(entry.date).format("ddd, MMM Do") })
                    ] }),
                    /* @__PURE__ */ jsx(MoodIcon, { mood: entry.mood, className: "w-4 h-4 flex-shrink-0 ml-2" })
                  ] }),
                  entry.category && /* @__PURE__ */ jsx("span", { className: `text-xs px-2 py-0.5 rounded font-semibold ${entry.category.color}`, children: entry.category.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600 mt-2 line-clamp-2", children: entry.content })
                ]
              },
              entry.id
            )) }) }),
            /* @__PURE__ */ jsx("div", { className: "p-4 border-t", children: /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: handleNewEntry,
                className: "w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 font-medium",
                children: [
                  /* @__PURE__ */ jsx(Plus, { className: "w-5 h-5" }),
                  "New Entry"
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 bg-white rounded-lg shadow-sm overflow-hidden", children: selectedEntryId === null && !isEditing ? (
            // Empty State
            /* @__PURE__ */ jsx("div", { className: "h-full flex items-center justify-center text-gray-400", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx(PenTool, { className: "w-16 h-16 mx-auto mb-4 opacity-50" }),
              /* @__PURE__ */ jsx("p", { className: "text-lg font-medium", children: "Select an entry or create a new one" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm mt-2", children: "Your journal entries will appear here" })
            ] }) })
          ) : /* @__PURE__ */ jsxs("div", { className: "h-full flex flex-col", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-6 border-b flex justify-between items-center", children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-gray-900 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(PenTool, { className: "w-5 h-5 text-indigo-600" }),
                selectedEntryId ? isEditing ? "Edit Entry" : "View Entry" : "New Entry"
              ] }),
              selectedEntryId && !isEditing && /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: handleEdit,
                    className: "px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2",
                    children: [
                      /* @__PURE__ */ jsx(Edit2, { className: "w-4 h-4" }),
                      "Edit"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: handleDelete,
                    className: "px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2",
                    children: [
                      /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" }),
                      "Delete"
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto p-6", children: !isEditing && selectedEntry ? (
              // View Mode
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-900 mb-2", children: selectedEntry.title || moment(selectedEntry.date).format("MMMM Do, YYYY") }),
                  /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center text-sm text-gray-500", children: [
                    /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" }),
                      moment(selectedEntry.date).format("dddd, MMMM Do, YYYY")
                    ] }),
                    selectedEntry.category && /* @__PURE__ */ jsx("span", { className: `px-2 py-1 rounded font-semibold ${selectedEntry.category.color}`, children: selectedEntry.category.name }),
                    selectedEntry.mood && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsx(MoodIcon, { mood: selectedEntry.mood, className: "w-5 h-5" }),
                      /* @__PURE__ */ jsx("span", { className: "capitalize", children: selectedEntry.mood })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "prose max-w-none", children: /* @__PURE__ */ jsx("div", { className: "whitespace-pre-wrap text-gray-700 leading-relaxed", children: selectedEntry.content }) }),
                selectedEntry.improvement_list && /* @__PURE__ */ jsxs("div", { className: "bg-yellow-50 border border-yellow-200 rounded-lg p-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                    /* @__PURE__ */ jsx(Sparkles, { className: "w-5 h-5 text-yellow-600" }),
                    /* @__PURE__ */ jsx("h4", { className: "font-semibold text-gray-900", children: "Improvement List" })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "text-gray-700 whitespace-pre-wrap", children: selectedEntry.improvement_list })
                ] })
              ] })
            ) : (
              // Edit/Create Mode
              /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Title (Optional)" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: data.title,
                      onChange: (e) => setData("title", e.target.value),
                      className: "w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
                      placeholder: "Give your entry a title..."
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Date" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "date",
                        value: data.date,
                        onChange: (e) => setData("date", e.target.value),
                        className: "w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
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
                        className: "w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "", children: "None" }),
                          categories.map((c) => /* @__PURE__ */ jsx("option", { value: c.id, children: c.name }, c.id))
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Mood" }),
                  /* @__PURE__ */ jsx("div", { className: "flex gap-4", children: ["positive", "neutral", "negative"].map((m) => /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setData("mood", m),
                      className: `p-3 rounded-lg border ${data.mood === m ? m === "positive" ? "border-green-500 bg-green-50" : m === "neutral" ? "border-gray-500 bg-gray-50" : "border-red-500 bg-red-50" : "border-gray-200 hover:bg-gray-50"}`,
                      children: /* @__PURE__ */ jsx(MoodIcon, { mood: m, className: `w-6 h-6 ${data.mood === m ? m === "positive" ? "text-green-600" : m === "neutral" ? "text-gray-600" : "text-red-600" : "text-gray-400"}` })
                    },
                    m
                  )) })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Reflection" }),
                  /* @__PURE__ */ jsx(
                    "textarea",
                    {
                      value: data.content,
                      onChange: (e) => setData("content", e.target.value),
                      rows: "10",
                      className: "w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm resize-none",
                      placeholder: "Write your thoughts...",
                      required: true
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.content, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 text-yellow-500" }),
                    " Improvement List"
                  ] }),
                  /* @__PURE__ */ jsx(
                    "textarea",
                    {
                      value: data.improvement_list,
                      onChange: (e) => setData("improvement_list", e.target.value),
                      rows: "4",
                      className: "w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm resize-none",
                      placeholder: "What can you improve?"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 pt-4 border-t", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: handleCancelEdit,
                      className: "px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50",
                      children: "Cancel"
                    }
                  ),
                  /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: selectedEntryId ? "Update Entry" : "Save Entry" })
                ] })
              ] })
            ) })
          ] }) })
        ] }) }) })
      ]
    }
  );
}
export {
  Index as default
};
