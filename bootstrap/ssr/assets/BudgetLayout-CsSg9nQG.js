import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DqVvfPrE.js";
import { usePage, Head, Link } from "@inertiajs/react";
import { LayoutDashboard, FolderKanban, Calendar, Tags } from "lucide-react";
function BudgetLayout({ children, header }) {
  const { url } = usePage();
  const navigation = [
    {
      name: "Dashboard",
      href: "/budget/dashboard",
      icon: LayoutDashboard,
      current: url.startsWith("/budget/dashboard")
    },
    {
      name: "Budget Plans",
      href: "/budget/plans",
      icon: FolderKanban,
      current: url.startsWith("/budget/plans")
    },
    {
      name: "Daily Entries",
      href: "/budget/entries",
      icon: Calendar,
      current: url.startsWith("/budget/entries")
    },
    {
      name: "Categories",
      href: "/budget/categories",
      icon: Tags,
      current: url.startsWith("/budget/categories")
    }
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      customNav: /* @__PURE__ */ jsx("div", { className: "bg-white border-b border-gray-200", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "flex space-x-8 overflow-x-auto", children: navigation.map((item) => {
        const Icon = item.icon;
        return /* @__PURE__ */ jsxs(
          Link,
          {
            href: item.href,
            className: `
                                            inline-flex items-center px-1 pt-4 pb-3 border-b-2 text-sm font-medium whitespace-nowrap
                                            ${item.current ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"}
                                        `,
            children: [
              /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4 mr-2" }),
              item.name
            ]
          },
          item.name
        );
      }) }) }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Budget" }),
        header && /* @__PURE__ */ jsx("header", { className: "bg-white shadow", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8", children: header }) }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children }) })
      ]
    }
  );
}
export {
  BudgetLayout as B
};
