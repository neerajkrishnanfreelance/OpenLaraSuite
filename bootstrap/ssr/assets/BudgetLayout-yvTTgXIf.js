import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DHAmaW8y.js";
import { Head } from "@inertiajs/react";
function BudgetLayout({ children, header }) {
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header,
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Budget" }),
        children
      ]
    }
  );
}
export {
  BudgetLayout as B
};
