import { jsx } from "react/jsx-runtime";
function Checkbox({ className = "", ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      type: "checkbox",
      className: "rounded border-gray-300 text-purple-600 shadow-sm focus:ring-purple-500 " + className
    }
  );
}
export {
  Checkbox as C
};
