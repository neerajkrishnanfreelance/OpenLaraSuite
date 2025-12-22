import { jsx } from "react/jsx-runtime";
import { forwardRef, useRef, useState, useEffect, useImperativeHandle } from "react";
import * as fabric from "fabric";
const FabricCanvas = forwardRef(({ width = 800, height = 600, className = "", readOnly = false, onChange }, ref) => {
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (!canvasRef.current) return;
    if (fabricRef.current) {
      fabricRef.current.dispose();
    }
    const canvas = new fabric.Canvas(canvasRef.current, {
      width,
      height,
      backgroundColor: "white",
      isDrawingMode: !readOnly,
      selection: !readOnly
    });
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.width = 2;
    canvas.freeDrawingBrush.color = "black";
    const handleChange = () => {
      if (onChange) onChange();
    };
    canvas.on("object:modified", handleChange);
    canvas.on("object:added", handleChange);
    canvas.on("object:removed", handleChange);
    canvas.on("path:created", handleChange);
    fabricRef.current = canvas;
    setIsLoaded(true);
    return () => {
      if (fabricRef.current) {
        fabricRef.current.dispose();
        fabricRef.current = null;
      }
    };
  }, []);
  useEffect(() => {
    if (fabricRef.current) {
      fabricRef.current.setDimensions({ width, height });
    }
  }, [width, height]);
  useEffect(() => {
    if (fabricRef.current) {
      fabricRef.current.isDrawingMode = !readOnly;
      fabricRef.current.selection = !readOnly;
      fabricRef.current.forEachObject((o) => {
        o.selectable = !readOnly;
        o.evented = !readOnly;
      });
      fabricRef.current.requestRenderAll();
    }
  }, [readOnly]);
  useImperativeHandle(ref, () => ({
    // Data Management
    toJSON: () => {
      return fabricRef.current ? fabricRef.current.toJSON() : null;
    },
    loadFromJSON: (json, callback) => {
      if (!fabricRef.current || !json) {
        if (callback) callback();
        return;
      }
      fabricRef.current.loadFromJSON(json).then((canvas) => {
        fabricRef.current.requestRenderAll();
        if (readOnly) {
          fabricRef.current.forEachObject((o) => {
            o.selectable = false;
            o.evented = false;
          });
        }
        if (callback) callback();
      });
    },
    toDataURL: (options) => {
      return fabricRef.current ? fabricRef.current.toDataURL(options || { format: "png", quality: 1 }) : "";
    },
    clear: () => {
      if (fabricRef.current) {
        fabricRef.current.clear();
        fabricRef.current.backgroundColor = "white";
        fabricRef.current.requestRenderAll();
      }
    },
    // Tools
    setDrawingMode: (isDrawing) => {
      if (fabricRef.current) {
        fabricRef.current.isDrawingMode = isDrawing;
      }
    },
    setBrushColor: (color) => {
      if (fabricRef.current) {
        fabricRef.current.freeDrawingBrush.color = color;
      }
    },
    setBrushWidth: (width2) => {
      if (fabricRef.current) {
        fabricRef.current.freeDrawingBrush.width = parseInt(width2, 10);
      }
    },
    setEraserMode: (enabled) => {
      if (fabricRef.current) {
        if (enabled) {
          fabricRef.current.freeDrawingBrush = new fabric.PencilBrush(fabricRef.current);
          fabricRef.current.freeDrawingBrush.color = "white";
          fabricRef.current.freeDrawingBrush.width = 20;
        } else {
          fabricRef.current.freeDrawingBrush = new fabric.PencilBrush(fabricRef.current);
          fabricRef.current.freeDrawingBrush.color = "black";
          fabricRef.current.freeDrawingBrush.width = 2;
        }
      }
    },
    addShape: (type, options = {}) => {
      if (!fabricRef.current) return;
      let shape;
      const center = fabricRef.current.getCenter();
      const defaultOpts = {
        left: center.left,
        top: center.top,
        originX: "center",
        originY: "center",
        fill: "transparent",
        stroke: "black",
        strokeWidth: 2,
        ...options
      };
      if (type === "rect") {
        shape = new fabric.Rect({ width: 100, height: 100, ...defaultOpts });
      } else if (type === "circle") {
        shape = new fabric.Circle({ radius: 50, ...defaultOpts });
      } else if (type === "triangle") {
        shape = new fabric.Triangle({ width: 100, height: 100, ...defaultOpts });
      } else if (type === "line") {
        shape = new fabric.Line([50, 100, 200, 200], { ...defaultOpts });
      } else if (type === "text") {
        shape = new fabric.IText("Double click to edit", {
          ...defaultOpts,
          fill: "black",
          strokeWidth: 0,
          fontSize: 20
        });
      }
      if (shape) {
        fabricRef.current.isDrawingMode = false;
        fabricRef.current.add(shape);
        fabricRef.current.setActiveObject(shape);
        fabricRef.current.requestRenderAll();
      }
    },
    deleteSelected: () => {
      if (fabricRef.current) {
        const activeObjects = fabricRef.current.getActiveObjects();
        if (activeObjects.length) {
          fabricRef.current.discardActiveObject();
          activeObjects.forEach((obj) => {
            fabricRef.current.remove(obj);
          });
        }
      }
    }
  }));
  return /* @__PURE__ */ jsx("div", { className: `border border-gray-300 shadow-sm bg-white ${className}`, children: /* @__PURE__ */ jsx("canvas", { ref: canvasRef }) });
});
export {
  FabricCanvas as F
};
