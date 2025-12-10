import { jsx } from "react/jsx-runtime";
function PriorityLabel({ priority }) {
  const colors = {
    low: "text-gray-500",
    medium: "text-yellow-600",
    high: "text-red-600 font-bold"
  };
  return /* @__PURE__ */ jsx("span", { className: `text-xs font-medium uppercase ${colors[priority]}`, children: priority });
}
export {
  PriorityLabel as P
};
