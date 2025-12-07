import { jsx } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
function ClickableLink({ routeName, params, children, className = "" }) {
  const baseClasses = "text-indigo-600 hover:text-indigo-900 hover:underline transition-colors duration-150 cursor-pointer font-medium";
  return /* @__PURE__ */ jsx(
    Link,
    {
      href: route(routeName, params),
      className: `${baseClasses} ${className}`,
      children
    }
  );
}
export {
  ClickableLink as C
};
