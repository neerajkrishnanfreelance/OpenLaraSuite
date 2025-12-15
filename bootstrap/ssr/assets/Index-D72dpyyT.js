import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft, Globe, Wifi } from "lucide-react";
import { useState } from "react";
function QrCodeIndex({ localIp, appPort, ngrokUrl }) {
  const [mode, setMode] = useState(ngrokUrl ? "ngrok" : "local");
  const mobileUrl = mode === "ngrok" && ngrokUrl ? ngrokUrl : `http://${localIp}:${appPort}`;
  const isNgrokActive = !!ngrokUrl;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Mobile Access" }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "sm:mx-auto sm:w-full sm:max-w-md", children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            href: "/",
            className: "flex items-center justify-center gap-2 text-indigo-600 hover:text-indigo-500 mb-6 font-medium",
            children: [
              /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }),
              "Back to Welcome"
            ]
          }
        ),
        /* @__PURE__ */ jsx("h2", { className: "mt-6 text-center text-3xl font-extrabold text-gray-900", children: "Scan to Open" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-center text-sm text-gray-600", children: "Access the application on your mobile device" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 sm:mx-auto sm:w-full sm:max-w-md", children: /* @__PURE__ */ jsxs("div", { className: "bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center", children: [
        isNgrokActive && /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-100 p-1 rounded-lg flex items-center", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setMode("local"),
              className: `px-3 py-1.5 rounded-md text-sm font-medium transition-all ${mode === "local" ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"}`,
              children: "Local Network"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setMode("ngrok"),
              className: `px-3 py-1.5 rounded-md text-sm font-medium transition-all ${mode === "ngrok" ? "bg-white shadow text-indigo-600" : "text-gray-500 hover:text-gray-700"}`,
              children: "Global (Ngrok)"
            }
          )
        ] }) }),
        mode === "ngrok" ? /* @__PURE__ */ jsxs("div", { className: "bg-green-50 p-4 rounded-lg inline-block mb-6", children: [
          /* @__PURE__ */ jsx(Globe, { className: "w-8 h-8 text-green-600 mx-auto mb-2" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-green-800 font-medium", children: "Global Access via Ngrok" })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "bg-indigo-50 p-4 rounded-lg inline-block mb-6", children: [
          /* @__PURE__ */ jsx(Wifi, { className: "w-8 h-8 text-indigo-600 mx-auto mb-2" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-indigo-800 font-medium", children: "Connect phone to same Wi-Fi" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsx("div", { className: `p-4 border-2 border-dashed rounded-xl ${mode === "ngrok" ? "border-green-200" : "border-gray-200"}`, children: /* @__PURE__ */ jsx(QRCodeSVG, { value: mobileUrl, size: 200 }) }) }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1", children: mode === "ngrok" ? "Public URL" : "Local Network URL" }),
          /* @__PURE__ */ jsx("div", { className: "bg-gray-50 p-3 rounded-md border border-gray-200", children: /* @__PURE__ */ jsx("code", { className: "text-sm text-gray-800 font-mono break-allSelect", children: mobileUrl }) })
        ] }) })
      ] }) })
    ] })
  ] });
}
export {
  QrCodeIndex as default
};
