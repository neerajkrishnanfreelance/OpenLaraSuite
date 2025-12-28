import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DksizGbA.js";
import { Head } from "@inertiajs/react";
import { useState, useRef } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { S as SecondaryButton } from "./SecondaryButton-C9TQBbBR.js";
import { D as DangerButton } from "./DangerButton-B7to2Tbx.js";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}
function ImageCropper({ onCropComplete, onCancel }) {
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const imgRef = useRef(null);
  const hiddenFileInput = useRef(null);
  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(void 0);
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  function onImageLoad(e) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 16 / 9));
  }
  async function onDownloadCropClick() {
    const image = imgRef.current;
    const previewCanvas = document.createElement("canvas");
    if (!image || !completedCrop) {
      return;
    }
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = previewCanvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;
    previewCanvas.width = completedCrop.width * pixelRatio * scaleX;
    previewCanvas.height = completedCrop.height * pixelRatio * scaleY;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );
    previewCanvas.toBlob((blob) => {
      if (!blob) {
        console.error("Canvas is empty");
        return;
      }
      const previewUrl = window.URL.createObjectURL(blob);
      onCropComplete(previewUrl, blob);
    }, "image/jpeg");
  }
  return /* @__PURE__ */ jsxs("div", { className: "p-4 bg-gray-50 rounded-lg border", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "file",
          accept: "image/*",
          onChange: onSelectFile,
          ref: hiddenFileInput,
          className: "hidden"
        }
      ),
      /* @__PURE__ */ jsx(SecondaryButton, { disabled: false, onClick: () => hiddenFileInput.current.click(), children: "Upload Image" })
    ] }),
    imgSrc && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsx(
        ReactCrop,
        {
          crop,
          onChange: (_, percentCrop) => setCrop(percentCrop),
          onComplete: (c) => setCompletedCrop(c),
          aspect: void 0,
          children: /* @__PURE__ */ jsx(
            "img",
            {
              ref: imgRef,
              alt: "Crop me",
              src: imgSrc,
              style: { transform: `scale(1) rotate(0deg)` },
              onLoad: onImageLoad,
              className: "max-h-[500px]"
            }
          )
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex gap-2", children: [
        /* @__PURE__ */ jsx(PrimaryButton, { onClick: onDownloadCropClick, disabled: !completedCrop?.width || !completedCrop?.height, children: "Crop & Save" }),
        /* @__PURE__ */ jsx(SecondaryButton, { onClick: onCancel, children: "Cancel" })
      ] })
    ] })
  ] });
}
function ImageCropperDemo({ auth }) {
  const [croppedImage, setCroppedImage] = useState(null);
  const handleCropComplete = (url, blob) => {
    setCroppedImage(url);
  };
  const handleClear = () => {
    setCroppedImage(null);
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Image Cropper Demo" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Image Cropper" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "p-6 bg-white border-b border-gray-200", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-4", children: "Upload and Crop Image" }),
          !croppedImage ? /* @__PURE__ */ jsx(
            ImageCropper,
            {
              onCropComplete: handleCropComplete,
              onCancel: () => console.log("Cancelled")
            }
          ) : /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-md font-medium text-gray-900 mb-2", children: "Cropped Result:" }),
            /* @__PURE__ */ jsx("div", { className: "border p-2 inline-block rounded", children: /* @__PURE__ */ jsx("img", { src: croppedImage, alt: "Cropped Result", className: "max-h-[400px]" }) }),
            /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(DangerButton, { onClick: handleClear, children: "Delete / Reset" }) })
          ] })
        ] }) }) }) })
      ]
    }
  );
}
export {
  ImageCropperDemo as default
};
