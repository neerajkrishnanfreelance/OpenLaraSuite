import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { A as Authenticated } from "./AuthenticatedLayout-DHAmaW8y.js";
import { usePage, Head, Link, router } from "@inertiajs/react";
import { Mic, Paperclip, Youtube, FileText, Download, Edit, Trash2 } from "lucide-react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function Index({ auth, notes }) {
  const { flash } = usePage().props;
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this note?")) {
      router.delete(route("notes.destroy", id));
    }
  };
  const handleDownload = (e, note) => {
    e.preventDefault();
    if (!note.drawing_data) return;
    const isJson = note.drawing_data.trim().startsWith("{");
    const link = document.createElement("a");
    if (isJson) {
      const blob = new Blob([note.drawing_data], { type: "application/json" });
      link.href = URL.createObjectURL(blob);
      link.download = `drawing-${note.id}.json`;
    } else {
      link.href = note.drawing_data;
      link.download = `drawing-${note.id}.png`;
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (isJson) {
      URL.revokeObjectURL(link.href);
    }
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "My Notes & Drawings" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Notes" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsx("div", { className: "flex justify-end mb-6", children: /* @__PURE__ */ jsx(
            Link,
            {
              href: route("notes.create"),
              className: "inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150",
              children: "Create Note"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: notes.length > 0 ? notes.map((note) => /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm rounded-lg flex flex-col h-full border border-gray-100", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-4 flex-1", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-2", children: [
                /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg text-gray-900 truncate pr-2", children: /* @__PURE__ */ jsx(Link, { href: route("notes.show", note.id), className: "hover:text-indigo-600 hover:underline", children: note.title || "Untitled Note" }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  note.recordings && note.recordings.length > 0 && /* @__PURE__ */ jsx(Mic, { className: "w-4 h-4 text-indigo-500", title: "Has Voice Note" }),
                  note.attachments && note.attachments.some((a) => a.type === "file") && /* @__PURE__ */ jsx(Paperclip, { className: "w-4 h-4 text-gray-500", title: "Has Attachments" }),
                  note.attachments && note.attachments.some((a) => a.type === "youtube") && /* @__PURE__ */ jsx(Youtube, { className: "w-4 h-4 text-red-500", title: "Has Video" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 whitespace-nowrap", children: new Date(note.created_at).toLocaleDateString() })
                ] })
              ] }),
              (note.project || note.task) && /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 mb-3", children: [
                note.project && /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800", children: note.project.name }),
                note.task && /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800", children: note.task.title })
              ] }),
              note.drawing_data ? note.drawing_data.startsWith("data:") || note.drawing_data.startsWith("http") ? /* @__PURE__ */ jsx("div", { className: "mb-4 bg-gray-50 rounded border border-gray-200 overflow-hidden h-40 flex items-center justify-center", children: /* @__PURE__ */ jsx("img", { src: note.drawing_data, alt: "Drawing", className: "max-h-full max-w-full object-contain" }) }) : /* @__PURE__ */ jsxs("div", { className: "mb-4 bg-yellow-50 rounded border border-yellow-200 h-40 flex flex-col items-center justify-center text-yellow-600", children: [
                /* @__PURE__ */ jsx(FileText, { className: "w-12 h-12 mb-2" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold", children: "Drawing Attached" })
              ] }) : /* @__PURE__ */ jsx("div", { className: "mb-4 bg-gray-50 rounded border border-gray-200 h-40 flex items-center justify-center text-gray-300", children: /* @__PURE__ */ jsx(FileText, { className: "w-12 h-12" }) }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm line-clamp-3", children: note.content || "No text content." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 px-4 py-3 flex justify-between items-center border-t border-gray-100", children: [
              /* @__PURE__ */ jsx("div", { children: note.drawing_data && /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: (e) => handleDownload(e, note),
                  className: "text-gray-500 hover:text-gray-700 mr-3",
                  title: "Download Drawing",
                  children: /* @__PURE__ */ jsx(Download, { className: "w-4 h-4" })
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
                /* @__PURE__ */ jsx(Link, { href: route("notes.edit", note.id), className: "text-indigo-600 hover:text-indigo-900", children: /* @__PURE__ */ jsx(Edit, { className: "w-4 h-4" }) }),
                /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(note.id), className: "text-red-600 hover:text-red-900", children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" }) })
              ] })
            ] })
          ] }, note.id)) : /* @__PURE__ */ jsx("div", { className: "col-span-full text-center py-12 text-gray-500 bg-white rounded-lg border border-dashed border-gray-300", children: "No notes found. Create one to get started!" }) })
        ] }) })
      ]
    }
  );
}
export {
  Index as default
};
