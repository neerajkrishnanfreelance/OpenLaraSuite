import { jsxs, jsx } from "react/jsx-runtime";
import { useRef, useState, useEffect } from "react";
import { A as Authenticated } from "./AuthenticatedLayout-DHAmaW8y.js";
import { useForm, Head, Link, router } from "@inertiajs/react";
import { F as FabricCanvas } from "./FabricCanvas-o9Jhirq6.js";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { T as TextInput } from "./TextInput-Xf9xHrLa.js";
import { T as TextArea } from "./TextArea-DrhkzIc8.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { I as InputError } from "./InputError-CBvD_6aD.js";
import axios from "axios";
import { Mic, StopCircle, Play, Trash, Download, Paperclip, FileText, Plus, Youtube, PenTool, Eraser, Square, Circle, Triangle, Minus, Type, ArrowLeft, ArrowRight, Minimize, Expand, Save } from "lucide-react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
import "fabric";
function Edit({ auth, note, projects = [], preselected_project_id = null }) {
  const canvasRef = useRef(null);
  const [pages, setPages] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const containerRef = useRef(null);
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 800, height: 600 });
  const [activeTool, setActiveTool] = useState("pencil");
  const [brushColor, setBrushColor] = useState("#000000");
  const [brushWidth, setBrushWidth] = useState(2);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [recordings, setRecordings] = useState(note ? note.recordings || [] : []);
  const timerRef = useRef(null);
  const [availableTasks, setAvailableTasks] = useState([]);
  const { data, setData, post, put, processing, errors } = useForm({
    title: note ? note.title : "",
    content: note ? note.content : "",
    drawing_data: note ? note.drawing_data : "",
    project_id: note ? note.project_id : preselected_project_id || "",
    task_id: note ? note.task_id : ""
  });
  useEffect(() => {
    if (data.project_id) {
      const project = projects.find((p) => p.id == data.project_id);
      setAvailableTasks(project ? project.tasks : []);
    } else {
      setAvailableTasks([]);
    }
  }, [data.project_id, projects]);
  useEffect(() => {
    if (note && note.drawing_data) {
      try {
        const parsed = JSON.parse(note.drawing_data);
        if (parsed.version === 2 && Array.isArray(parsed.pages)) {
          setPages(parsed.pages);
          setCurrentPageIndex(0);
        } else {
          setPages([{}]);
        }
      } catch (e) {
        setPages([{}]);
      }
    } else {
      setPages([{}]);
    }
  }, [note]);
  useEffect(() => {
    if (pages.length > 0 && canvasRef.current) {
      const pageData = pages[currentPageIndex];
      canvasRef.current.clear();
      if (pageData && Object.keys(pageData).length > 0) {
        canvasRef.current.loadFromJSON(pageData);
      }
      handleToolChange(activeTool);
      canvasRef.current.setBrushColor(brushColor);
      canvasRef.current.setBrushWidth(brushWidth);
    }
  }, [currentPageIndex, pages.length]);
  useEffect(() => {
    const updateDimensions = () => {
      if (isFullScreen) {
        setCanvasDimensions({ width: window.innerWidth, height: window.innerHeight });
      } else if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        setCanvasDimensions({ width, height: 600 });
      }
    };
    window.addEventListener("resize", updateDimensions);
    updateDimensions();
    setTimeout(updateDimensions, 100);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [isFullScreen]);
  const saveCurrentPage = () => {
    if (canvasRef.current) {
      const json = canvasRef.current.toJSON();
      const newPages = [...pages];
      newPages[currentPageIndex] = json;
      setPages(newPages);
      return newPages;
    }
    return pages;
  };
  const handleAddPage = () => {
    const currentPages = saveCurrentPage();
    setPages([...currentPages, {}]);
    setCurrentPageIndex(currentPages.length);
  };
  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      saveCurrentPage();
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPageIndex < pages.length - 1) {
      saveCurrentPage();
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };
  const handleDeletePage = () => {
    if (pages.length <= 1) {
      alert("Cannot delete the last page.");
      return;
    }
    if (confirm("Delete this slide?")) {
      const newPages = pages.filter((_, index) => index !== currentPageIndex);
      setPages(newPages);
      if (currentPageIndex >= newPages.length) {
        setCurrentPageIndex(newPages.length - 1);
      }
    }
  };
  const [attachments, setAttachments] = useState(note?.attachments || []);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const handleFileUpload = async (e) => {
    if (!note || !note.id) {
      alert("Please save the note before adding attachments.");
      e.target.value = null;
      return;
    }
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("type", "file");
    formData.append("file", file);
    setIsUploading(true);
    try {
      const res = await axios.post(route("notes.attachments.store", note.id), formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setAttachments([...attachments, res.data]);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed");
    }
    setIsUploading(false);
    e.target.value = null;
  };
  const handleAddYoutube = async () => {
    if (!note || !note.id) {
      alert("Please save the note before adding attachments.");
      return;
    }
    if (!youtubeUrl) return;
    setIsUploading(true);
    try {
      const res = await axios.post(route("notes.attachments.store", note.id), {
        type: "youtube",
        youtube_url: youtubeUrl
      });
      setAttachments([...attachments, res.data]);
      setYoutubeUrl("");
    } catch (error) {
      console.error("Add link failed", error);
      alert("Failed to add link");
    }
    setIsUploading(false);
  };
  const deleteAttachment = async (id) => {
    if (!confirm("Delete this attachment?")) return;
    try {
      await axios.delete(route("notes.attachments.destroy", id));
      setAttachments(attachments.filter((a) => a.id !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };
  const handleToolChange = (tool) => {
    setActiveTool(tool);
    if (canvasRef.current) {
      if (tool === "pencil") {
        canvasRef.current.setDrawingMode(true);
        canvasRef.current.setBrushColor(brushColor);
        canvasRef.current.setBrushWidth(brushWidth);
        canvasRef.current.setEraserMode(false);
      } else if (tool === "eraser") {
        canvasRef.current.setDrawingMode(true);
        canvasRef.current.setEraserMode(true);
      } else {
        canvasRef.current.setDrawingMode(false);
        canvasRef.current.setEraserMode(false);
        if (tool !== "select") {
          canvasRef.current.addShape(tool, { stroke: brushColor, strokeWidth: parseInt(brushWidth) });
          setActiveTool("select");
        }
      }
    }
  };
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const finalPages = saveCurrentPage();
    const payload = {
      title: data.title,
      content: data.content,
      drawing_data: JSON.stringify({ version: 2, pages: finalPages }),
      project_id: data.project_id,
      task_id: data.task_id
    };
    const options = {
      onSuccess: () => {
      },
      // No auto-save status update needed
      preserveScroll: true,
      preserveState: true
    };
    if (note) {
      router.put(route("notes.update", note.id), payload, options);
    } else {
      router.post(route("notes.store"), payload, options);
    }
  };
  const handleCanvasChange = () => {
  };
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        const file = new File([blob], "recording.webm", { type: "audio/webm" });
        const formData = new FormData();
        formData.append("audio", file);
        formData.append("duration", recordingDuration);
        try {
          if (note && note.id) {
            const res = await axios.post(route("notes.recordings.store", note.id), formData, {
              headers: { "Content-Type": "multipart/form-data" }
            });
            setRecordings([...recordings, res.data]);
          } else {
            alert("Please save the note at least once before recording.");
          }
        } catch (err) {
          console.error("Upload failed", err);
          alert("Failed to upload recording.");
        }
        stream.getTracks().forEach((track) => track.stop());
        setRecordingDuration(0);
        clearInterval(timerRef.current);
      };
      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      timerRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1e3);
    } catch (err) {
      console.error("Microphone access denied", err);
      alert("Could not access microphone.");
    }
  };
  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };
  const deleteRecording = async (recordingId) => {
    if (confirm("Delete this recording?")) {
      try {
        await axios.delete(route("notes.recordings.destroy", recordingId));
        setRecordings(recordings.filter((r) => r.id !== recordingId));
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };
  const formatDuration = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };
  const handleFullScreenToggle = () => {
    if (!document.fullscreenElement) {
      const el = document.getElementById("edit-canvas-container");
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
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: note ? "Edit Note (V2)" : "Create Note (V2)" }),
        note && /* @__PURE__ */ jsx("div", { className: "text-sm font-medium flex items-center gap-2" })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: note ? "Edit Note" : "Create Note" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "p-6 text-gray-900", children: [
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(InputLabel, { htmlFor: "title", value: "Title" }),
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      id: "title",
                      className: "mt-1 block w-full",
                      value: data.title,
                      onChange: (e) => setData("title", e.target.value),
                      placeholder: "Note Title..."
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.title })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(InputLabel, { htmlFor: "content", value: "Notes" }),
                  /* @__PURE__ */ jsx(
                    TextArea,
                    {
                      id: "content",
                      className: "mt-1 block w-full h-32 font-mono text-sm",
                      value: data.content,
                      onChange: (e) => setData("content", e.target.value),
                      placeholder: "Type your notes here..."
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.content })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "md:col-span-1 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-lg border border-gray-200", children: [
                /* @__PURE__ */ jsx("h3", { className: "font-medium text-gray-700 mb-3 block border-b pb-2", children: "Link To" }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(InputLabel, { htmlFor: "project_id", value: "Project" }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        id: "project_id",
                        className: "mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-sm",
                        value: data.project_id,
                        onChange: (e) => setData("project_id", e.target.value),
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "", children: "Select Project..." }),
                          projects.map((p) => /* @__PURE__ */ jsx("option", { value: p.id, children: p.name }, p.id))
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(InputLabel, { htmlFor: "task_id", value: "Task" }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        id: "task_id",
                        className: "mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-sm",
                        value: data.task_id,
                        onChange: (e) => setData("task_id", e.target.value),
                        disabled: !data.project_id,
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "", children: "Select Task..." }),
                          availableTasks.map((t) => /* @__PURE__ */ jsx("option", { value: t.id, children: t.title }, t.id))
                        ]
                      }
                    )
                  ] })
                ] })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-200 pt-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ jsxs("h3", { className: "text-lg font-medium text-gray-900 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Mic, { className: "w-5 h-5 text-indigo-600" }),
                  "Voice Notes"
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: isRecording ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 bg-red-50 text-red-600 px-4 py-2 rounded-full border border-red-100 animate-pulse", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-red-600 rounded-full" }),
                  /* @__PURE__ */ jsx("span", { className: "font-mono font-bold", children: formatDuration(recordingDuration) }),
                  /* @__PURE__ */ jsx("button", { type: "button", onClick: stopRecording, className: "ml-2 hover:bg-red-100 p-1 rounded-full", children: /* @__PURE__ */ jsx(StopCircle, { className: "w-6 h-6" }) })
                ] }) : /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: startRecording,
                    disabled: !note,
                    className: "flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow",
                    children: [
                      /* @__PURE__ */ jsx(Mic, { className: "w-4 h-4" }),
                      /* @__PURE__ */ jsx("span", { children: "Record" })
                    ]
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                recordings.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 italic", children: "No voice notes attached." }),
                recordings.map((rec) => /* @__PURE__ */ jsx("div", { className: "flex items-start gap-3", children: /* @__PURE__ */ jsxs("div", { className: "bg-indigo-50 border border-indigo-100 rounded-2xl p-3 rounded-tl-none max-w-sm flex-1", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "bg-indigo-100 p-2 rounded-full", children: /* @__PURE__ */ jsx(Play, { className: "w-4 h-4 text-indigo-600" }) }),
                    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                      /* @__PURE__ */ jsx("audio", { src: `/storage/${rec.file_path}`, controls: true, className: "h-8 w-full max-w-[200px]" }),
                      /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center mt-1", children: /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-500", children: [
                        rec.duration ? formatDuration(rec.duration) : "Voice Note",
                        " • ",
                        new Date(rec.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                      ] }) })
                    ] }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => deleteRecording(rec.id),
                        className: "text-gray-400 hover:text-red-500 p-1",
                        title: "Delete Recording",
                        children: /* @__PURE__ */ jsx(Trash, { className: "w-4 h-4" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "mt-2 flex justify-end", children: /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: `/storage/${rec.file_path}`,
                      download: `recording-${rec.id}.webm`,
                      className: "text-xs flex items-center gap-1 text-indigo-600 hover:text-indigo-800",
                      children: [
                        /* @__PURE__ */ jsx(Download, { className: "w-3 h-3" }),
                        " Download"
                      ]
                    }
                  ) })
                ] }) }, rec.id))
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-6 border-b border-gray-100 pb-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-medium text-gray-900 mb-4 flex items-center", children: [
                /* @__PURE__ */ jsx(Paperclip, { className: "w-5 h-5 mr-2" }),
                "Attachments"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium text-gray-700 mb-2", children: "Files" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "file",
                        onChange: handleFileUpload,
                        className: "block w-full text-sm text-gray-500\n                                                        file:mr-4 file:py-2 file:px-4\n                                                        file:rounded-full file:border-0\n                                                        file:text-sm file:font-semibold\n                                                        file:bg-indigo-50 file:text-indigo-700\n                                                        hover:file:bg-indigo-100",
                        disabled: isUploading
                      }
                    ),
                    isUploading && /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: "Uploading..." })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    attachments.filter((a) => a.type === "file").map((att) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-200", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 overflow-hidden", children: [
                        /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4 text-gray-500 shrink-0" }),
                        /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-700 truncate", children: att.name })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsx(
                          "a",
                          {
                            href: `/storage/${att.file_path}`,
                            download: true,
                            className: "text-gray-400 hover:text-indigo-600 p-1",
                            title: "Download",
                            children: /* @__PURE__ */ jsx(Download, { className: "w-4 h-4" })
                          }
                        ),
                        /* @__PURE__ */ jsx("button", { onClick: () => deleteAttachment(att.id), className: "text-gray-400 hover:text-red-500 p-1", title: "Delete", children: /* @__PURE__ */ jsx(Trash, { className: "w-4 h-4" }) })
                      ] })
                    ] }, att.id)),
                    attachments.filter((a) => a.type === "file").length === 0 && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 italic", children: "No files attached." })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium text-gray-700 mb-2", children: "YouTube Links" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        placeholder: "Paste YouTube URL",
                        value: youtubeUrl,
                        onChange: (e) => setYoutubeUrl(e.target.value),
                        className: "flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: handleAddYoutube,
                        disabled: !youtubeUrl || isUploading,
                        className: "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50",
                        children: [
                          /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
                          " Add"
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    attachments.filter((a) => a.type === "youtube").map((att) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-200", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 overflow-hidden", children: [
                        /* @__PURE__ */ jsx(Youtube, { className: "w-4 h-4 text-red-500 shrink-0" }),
                        /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-700 truncate", children: att.name })
                      ] }),
                      /* @__PURE__ */ jsx("button", { onClick: () => deleteAttachment(att.id), className: "text-gray-400 hover:text-red-500 p-1", children: /* @__PURE__ */ jsx(Trash, { className: "w-4 h-4" }) })
                    ] }, att.id)),
                    attachments.filter((a) => a.type === "youtube").length === 0 && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 italic", children: "No videos linked." })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { ref: containerRef, className: "w-full relative", children: [
              /* @__PURE__ */ jsxs("div", { id: "edit-canvas-container", className: `border-x border-b border-gray-300 bg-gray-50 shadow-inner overflow-hidden flex flex-col items-center justify-center relative ${isFullScreen ? "h-screen w-screen fixed top-0 left-0 z-50" : "h-[600px] min-h-[500px]"}`, children: [
                /* @__PURE__ */ jsxs("div", { className: `absolute top-4 left-4 z-30 flex flex-col gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-gray-200 transition-opacity duration-300 max-h-[calc(100%-2rem)] overflow-y-auto ${isFullScreen ? "opacity-100" : "opacity-100"}`, children: [
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-1 w-20 sm:w-24", children: [
                    /* @__PURE__ */ jsx(ToolBtn, { icon: PenTool, active: activeTool === "pencil", onClick: () => handleToolChange("pencil"), title: "Pencil" }),
                    /* @__PURE__ */ jsx(ToolBtn, { icon: Eraser, active: activeTool === "eraser", onClick: () => handleToolChange("eraser"), title: "Eraser Brush" }),
                    /* @__PURE__ */ jsx(ToolBtn, { icon: Square, active: activeTool === "rect", onClick: () => handleToolChange("rect"), title: "Rectangle" }),
                    /* @__PURE__ */ jsx(ToolBtn, { icon: Circle, active: activeTool === "circle", onClick: () => handleToolChange("circle"), title: "Circle" }),
                    /* @__PURE__ */ jsx(ToolBtn, { icon: Triangle, active: activeTool === "triangle", onClick: () => handleToolChange("triangle"), title: "Triangle" }),
                    /* @__PURE__ */ jsx(ToolBtn, { icon: Minus, active: activeTool === "line", onClick: () => handleToolChange("line"), title: "Line" }),
                    /* @__PURE__ */ jsx(ToolBtn, { icon: Type, active: activeTool === "text", onClick: () => handleToolChange("text"), title: "Text" }),
                    /* @__PURE__ */ jsx(ToolBtn, { icon: Trash, onClick: () => canvasRef.current?.deleteSelected(), title: "Delete Selected" })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "w-full h-px bg-gray-200 my-1" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1 justify-center px-1", children: [
                    ["#000000", "#FF0000", "#0000FF", "#008000"].map((c) => /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        className: `w-5 h-5 rounded-full border border-gray-300 ${brushColor === c ? "ring-2 ring-offset-1 ring-gray-400" : ""}`,
                        style: { backgroundColor: c },
                        onClick: () => setBrushColor(c)
                      },
                      c
                    )),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "color",
                        value: brushColor,
                        onChange: (e) => setBrushColor(e.target.value),
                        className: "w-5 h-5 p-0 border-0 rounded overflow-hidden",
                        title: "Custom Color"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "w-full h-px bg-gray-200 my-1" }),
                  /* @__PURE__ */ jsx("div", { className: "px-2", children: /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "range",
                      min: "1",
                      max: "20",
                      value: brushWidth,
                      onChange: (e) => setBrushWidth(e.target.value),
                      className: "w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer",
                      title: `Brush Size: ${brushWidth}px`
                    }
                  ) }),
                  /* @__PURE__ */ jsx("div", { className: "w-full h-px bg-gray-200 my-1" }),
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        if (confirm("Clear this entire slide?")) {
                          canvasRef.current?.clear();
                        }
                      },
                      className: "w-full flex items-center justify-center gap-2 p-2 text-xs text-red-600 hover:bg-red-50 rounded",
                      children: [
                        /* @__PURE__ */ jsx(Eraser, { className: "w-3 h-3" }),
                        " Clear"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "absolute top-4 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md border border-gray-200 whitespace-nowrap", children: [
                  /* @__PURE__ */ jsx("button", { type: "button", onClick: handlePrevPage, disabled: currentPageIndex === 0, className: "p-1 rounded-full hover:bg-gray-100 disabled:opacity-30", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 text-gray-600" }) }),
                  /* @__PURE__ */ jsxs("span", { className: "text-xs font-bold text-gray-700 min-w-[40px] text-center", children: [
                    currentPageIndex + 1,
                    " / ",
                    pages.length
                  ] }),
                  /* @__PURE__ */ jsx("button", { type: "button", onClick: handleNextPage, disabled: currentPageIndex === pages.length - 1, className: "p-1 rounded-full hover:bg-gray-100 disabled:opacity-30", children: /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 text-gray-600" }) }),
                  /* @__PURE__ */ jsx("div", { className: "w-px h-4 bg-gray-300 mx-1" }),
                  /* @__PURE__ */ jsx("button", { type: "button", onClick: handleAddPage, className: "p-1 rounded-full hover:bg-green-50 text-green-600", title: "Add Slide", children: /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }) }),
                  /* @__PURE__ */ jsx("button", { type: "button", onClick: handleDeletePage, className: "p-1 rounded-full hover:bg-red-50 text-red-500", title: "Delete Slide", children: /* @__PURE__ */ jsx(Trash, { className: "w-4 h-4" }) })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 z-20", children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleFullScreenToggle,
                    className: "bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md border border-gray-200 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition-all",
                    title: isFullScreen ? "Exit Full Screen" : "Full Screen",
                    children: isFullScreen ? /* @__PURE__ */ jsx(Minimize, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Expand, { className: "w-5 h-5" })
                  }
                ) }),
                /* @__PURE__ */ jsx(
                  FabricCanvas,
                  {
                    ref: canvasRef,
                    width: canvasDimensions.width,
                    height: canvasDimensions.height,
                    className: "bg-white shadow-lg",
                    onChange: handleCanvasChange
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-2 text-center md:text-left", children: "Use tools to draw. Tip: Double click text objects to edit." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-200 p-4 md:static md:bg-transparent md:border-t-0 md:p-0 z-50 flex items-center justify-between md:justify-end gap-4 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] md:shadow-none", children: [
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: route("notes.index"),
                  className: "text-gray-500 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors md:text-gray-600 md:underline md:hover:bg-transparent md:hover:text-gray-900",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxs(PrimaryButton, { disabled: processing, className: "flex-1 md:flex-none justify-center py-3 md:py-2 text-base rounded-xl shadow-lg shadow-indigo-500/30", children: [
                /* @__PURE__ */ jsx(Save, { className: "w-5 h-5 mr-2" }),
                note ? "Save Changes" : "Create Note"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-24 md:hidden" })
        ] }) }) }) })
      ]
    }
  );
}
const ToolBtn = ({ icon: Icon, active, onClick, title }) => /* @__PURE__ */ jsx(
  "button",
  {
    type: "button",
    onClick,
    title,
    className: `p-1.5 sm:p-2 rounded flex items-center justify-center transition-colors ${active ? "bg-indigo-600 text-white shadow-sm" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`,
    children: /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4 sm:w-5 sm:h-5" })
  }
);
export {
  Edit as default
};
