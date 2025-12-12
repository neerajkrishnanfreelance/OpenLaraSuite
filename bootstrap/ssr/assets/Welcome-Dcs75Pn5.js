import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { Users, Calculator, GraduationCap, PiggyBank, Heart, Receipt, BookOpen, Calendar, CheckSquare, PenTool, Database } from "lucide-react";
function Welcome({ auth }) {
  const tools = [
    {
      title: "CRM",
      description: "Manage your contacts",
      icon: Users,
      color: "bg-indigo-100 text-indigo-600",
      href: "/contacts"
    },
    {
      title: "Accounting",
      description: "Financial overview",
      icon: Calculator,
      color: "bg-green-100 text-green-600",
      href: "/accounting"
    },
    {
      title: "Projects",
      description: "Track your progress",
      icon: GraduationCap,
      color: "bg-blue-100 text-blue-600",
      href: "/projects"
    },
    {
      title: "Budget",
      description: "Plan your finances",
      icon: PiggyBank,
      color: "bg-yellow-100 text-yellow-600",
      href: "/budget"
    },
    {
      title: "Health",
      description: "Monitor wellness",
      icon: Heart,
      color: "bg-red-100 text-red-600",
      href: "/health"
    },
    {
      title: "Expense",
      description: "Log your spends",
      icon: Receipt,
      color: "bg-teal-100 text-teal-600",
      href: "/expenses"
    },
    {
      title: "Learning Projects",
      description: "Advanced courses",
      icon: BookOpen,
      color: "bg-cyan-100 text-cyan-600",
      href: "/learning"
    },
    {
      title: "Calendar",
      description: "Schedule events",
      icon: Calendar,
      color: "bg-pink-100 text-pink-600",
      href: "/calendar"
    },
    {
      title: "Todo",
      description: "Daily checklists",
      icon: CheckSquare,
      color: "bg-orange-100 text-orange-600",
      href: "/todos"
    },
    {
      title: "Journaling",
      description: "Reflect daily",
      icon: PenTool,
      color: "bg-violet-100 text-violet-600",
      href: "/journal"
    },
    {
      title: "Backups",
      description: "Data protection",
      icon: Database,
      color: "bg-slate-100 text-slate-600",
      href: "/settings/backups"
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "My Personal Hub" }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 font-sans text-gray-900", children: [
      /* @__PURE__ */ jsx("header", { className: "bg-white border-b border-gray-100 sticky top-0 z-10 transition-shadow hover:shadow-sm", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center h-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-200" }),
          /* @__PURE__ */ jsx("span", { className: "text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600", children: "OpenSuite" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 font-medium hidden sm:block", children: "All tools in one place" })
      ] }) }) }),
      /* @__PURE__ */ jsx("main", { className: "py-12 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-6", children: tools.map((tool, index) => /* @__PURE__ */ jsxs(
        Link,
        {
          href: tool.href,
          className: "group relative flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-indigo-50/50 hover:border-indigo-100 hover:-translate-y-1 transition-all duration-300 w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] xl:w-[calc(25%-1.5rem)] min-h-[200px]",
          children: [
            /* @__PURE__ */ jsx("div", { className: `p-4 rounded-2xl mb-4 ${tool.color} bg-opacity-20 group-hover:scale-110 transition-transform duration-300 ring-4 ring-white`, children: /* @__PURE__ */ jsx(tool.icon, { className: "w-8 h-8", strokeWidth: 2.5 }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors", children: tool.title }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 text-center font-medium", children: tool.description }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 w-2 h-2 rounded-full bg-gray-100 group-hover:bg-indigo-400 transition-colors" })
          ]
        },
        index
      )) }) }) }),
      /* @__PURE__ */ jsxs("footer", { className: "py-8 text-center text-sm text-gray-400", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        "  All rights reserved."
      ] })
    ] })
  ] });
}
export {
  Welcome as default
};
