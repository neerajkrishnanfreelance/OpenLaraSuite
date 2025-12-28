import { jsxs, jsx } from "react/jsx-runtime";
import { useRef, useState, useEffect } from "react";
import { A as Authenticated } from "./AuthenticatedLayout-DksizGbA.js";
import { Head, Link, router } from "@inertiajs/react";
import { Calendar, Download, Play, Paperclip, FileText, Youtube, ArrowLeft, ArrowRight, Minimize, Expand, Edit, Trash2 } from "lucide-react";
import { F as FabricCanvas } from "./FabricCanvas-o9Jhirq6.js";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
import "fabric";
function Show({ auth, note }) {
  const canvasRef = useRef(null);
  const [pages, setPages] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  useEffect(() => {
    if (note && note.drawing_data) {
      try {
        const parsed = JSON.parse(note.drawing_data);
        if (parsed.version === 2 && Array.isArray(parsed.pages)) {
          setPages(parsed.pages);
        } else if (typeof note.drawing_data === "string" && note.drawing_data.startsWith("data:")) {
          setPages([{}]);
        } else {
          setPages([{}]);
        }
      } catch (e) {
        setPages([{}]);
      }
    }
  }, [note]);
  useEffect(() => {
    if (pages.length > 0 && canvasRef.current) {
      const pageData = pages[currentPageIndex];
      if (pageData) {
        canvasRef.current.clear();
        canvasRef.current.loadFromJSON(pageData);
      }
    }
  }, [currentPageIndex, pages.length]);
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this note?")) {
      router.delete(route("notes.destroy", note.id));
    }
  };
  const handleFullScreenToggle = () => {
    if (!document.fullscreenElement) {
      const el = document.getElementById("canvas-container");
      if (el) {
        el.requestFullscreen().then(() => setIsFullScreen(true)).catch((err) => console.log(err));
      }
    } else {
      document.exitFullscreen().then(() => setIsFullScreen(false));
    }
  };
  useEffect(() => {
    const handleFSChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFSChange);
    return () => document.removeEventListener("fullscreenchange", handleFSChange);
  }, []);
  const handleDownloadPDF = async () => {
    setIsFullScreen(false);
    const images = [];
    if (pages.length > 0 && canvasRef.current) {
      for (let i = 0; i < pages.length; i++) {
        const pageData = pages[i];
        if (!pageData || Object.keys(pageData).length === 0) continue;
        await new Promise((resolve) => {
          canvasRef.current.clear();
          canvasRef.current.loadFromJSON(pageData, () => {
            resolve();
          });
        });
        const imgData = canvasRef.current.toDataURL({ format: "png", quality: 1, multiplier: 2 });
        images.push(imgData);
      }
      if (pages[currentPageIndex]) {
        canvasRef.current.clear();
        canvasRef.current.loadFromJSON(pages[currentPageIndex]);
      }
    }
    try {
      const response = await axios.post(route("notes.pdf", note.id), {
        images
      }, {
        responseType: "blob"
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `note-${note.id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("PDF generation failed", error);
      alert("Failed to generate PDF");
    }
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("h2", { className: "font-semibold text-xl text-gray-800 leading-tight flex items-center", children: [
          /* @__PURE__ */ jsx(Link, { href: route("notes.index"), className: "mr-3 text-gray-500 hover:text-gray-700", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-5 h-5" }) }),
          "View Note"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-3", children: [
          /* @__PURE__ */ jsxs(
            Link,
            {
              href: route("notes.edit", note.id),
              className: "inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150",
              children: [
                /* @__PURE__ */ jsx(Edit, { className: "w-4 h-4 mr-2" }),
                "Edit"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleDelete,
              className: "inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-red-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150",
              children: [
                /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4 mr-2" }),
                "Delete"
              ]
            }
          )
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: note.title || "View Note" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "p-6 text-gray-900", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-6 pb-6 border-b border-gray-100 flex justify-between items-start", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: note.title || "Untitled Note" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-gray-500", children: [
                /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 mr-1" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "Created ",
                  new Date(note.created_at).toLocaleDateString(),
                  " at ",
                  new Date(note.created_at).toLocaleTimeString()
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-2", children: [
                note.project && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800", children: [
                  "Project: ",
                  note.project.name
                ] }),
                note.task && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800", children: [
                  "Task: ",
                  note.task.title
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: handleDownloadPDF,
                className: "flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors",
                children: [
                  /* @__PURE__ */ jsx(Download, { className: "w-5 h-5" }),
                  "Download PDF"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-gray-500 uppercase tracking-wider mb-2", children: "Notes" }),
              /* @__PURE__ */ jsx("div", { className: "bg-gray-50 p-4 rounded-lg text-gray-800 whitespace-pre-wrap min-h-[5rem]", children: note.content || /* @__PURE__ */ jsx("span", { className: "text-gray-400 italic", children: "No text content." }) })
            ] }),
            note.recordings && note.recordings.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-gray-500 uppercase tracking-wider mb-2", children: "Voice Notes" }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-4", children: note.recordings.map((rec) => /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Play, { className: "w-4 h-4 text-gray-600" }),
                /* @__PURE__ */ jsxs("div", { className: "text-sm font-medium text-gray-700 mr-2", children: [
                  "Recording ",
                  rec.id
                ] }),
                /* @__PURE__ */ jsx("audio", { src: `/storage/${rec.file_path}`, controls: true, className: "h-8 w-48" }),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: `/storage/${rec.file_path}`,
                    download: `recording-${rec.id}.webm`,
                    className: "p-1 text-gray-500 hover:text-indigo-600 rounded bg-white border border-gray-200 shadow-sm",
                    title: "Download Audio",
                    children: /* @__PURE__ */ jsx(Download, { className: "w-4 h-4" })
                  }
                )
              ] }) }, rec.id)) })
            ] }),
            note.attachments && note.attachments.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-sm font-medium text-gray-500 uppercase tracking-wider mb-2 flex items-center", children: [
                /* @__PURE__ */ jsx(Paperclip, { className: "w-4 h-4 mr-1" }),
                " Attachments"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                note.attachments.filter((a) => a.type === "file").length > 0 && /* @__PURE__ */ jsx("div", { className: "space-y-2", children: note.attachments.filter((a) => a.type === "file").map((att) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg border border-gray-200", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 overflow-hidden", children: [
                    /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4 text-gray-500 shrink-0" }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-700 truncate", children: att.name })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: `/storage/${att.file_path}`,
                      download: true,
                      className: "text-indigo-600 hover:text-indigo-800 p-1",
                      children: /* @__PURE__ */ jsx(Download, { className: "w-4 h-4" })
                    }
                  )
                ] }, att.id)) }),
                note.attachments.filter((a) => a.type === "youtube").length > 0 && /* @__PURE__ */ jsx("div", { className: "md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4", children: note.attachments.filter((a) => a.type === "youtube").map((att) => {
                  const videoId = att.url.split("v=")[1]?.split("&")[0] || att.url.split("/").pop();
                  return /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-lg border border-gray-200 overflow-hidden", children: [
                    /* @__PURE__ */ jsxs("div", { className: "p-2 border-b border-gray-200 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx(Youtube, { className: "w-4 h-4 text-red-500" }),
                      /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-700 truncate", children: att.name })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "aspect-w-16 aspect-h-9", children: /* @__PURE__ */ jsx(
                      "iframe",
                      {
                        src: `https://www.youtube.com/embed/${videoId}`,
                        frameBorder: "0",
                        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                        allowFullScreen: true,
                        className: "w-full h-64"
                      }
                    ) })
                  ] }, att.id);
                }) })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2 px-2", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-sm font-medium text-gray-500 uppercase tracking-wider", children: [
                "Slide ",
                currentPageIndex + 1,
                " of ",
                pages.length
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setCurrentPageIndex(Math.max(0, currentPageIndex - 1)),
                    disabled: currentPageIndex === 0,
                    className: "p-1 rounded hover:bg-gray-200 disabled:opacity-50",
                    children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-5 h-5" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setCurrentPageIndex(Math.min(pages.length - 1, currentPageIndex + 1)),
                    disabled: currentPageIndex === pages.length - 1 || pages.length === 0,
                    className: "p-1 rounded hover:bg-gray-200 disabled:opacity-50",
                    children: /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5" })
                  }
                )
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { id: "canvas-container", className: `border border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex flex-col items-center justify-center p-4 relative ${isFullScreen ? "h-screen w-screen fixed top-0 left-0 z-50 p-0 bg-white" : ""}`, children: [
              isFullScreen && /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 z-50", children: /* @__PURE__ */ jsx("button", { onClick: handleFullScreenToggle, className: "bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700", children: /* @__PURE__ */ jsx(Minimize, { className: "w-5 h-5" }) }) }),
              !isFullScreen && /* @__PURE__ */ jsx("div", { className: "absolute top-2 right-2 z-10", children: /* @__PURE__ */ jsx("button", { onClick: handleFullScreenToggle, className: "text-gray-500 hover:text-indigo-600 bg-white p-1 rounded shadow-sm border border-gray-200", children: /* @__PURE__ */ jsx(Expand, { className: "w-4 h-4" }) }) }),
              /* @__PURE__ */ jsx(
                FabricCanvas,
                {
                  ref: canvasRef,
                  width: isFullScreen ? window.innerWidth : 800,
                  height: isFullScreen ? window.innerHeight : 600,
                  readOnly: true,
                  className: "bg-white shadow-lg pointer-events-none"
                }
              )
            ] })
          ] })
        ] }) }) }) })
      ]
    }
  );
}
export {
  Show as default
};
