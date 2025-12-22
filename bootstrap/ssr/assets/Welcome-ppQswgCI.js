import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Smartphone, GraduationCap, Users, Calendar, CheckSquare, Calculator, Compass, PiggyBank, Receipt, Sprout, Heart, BookOpen, PenTool, Database, StickyNote } from "lucide-react";
function Welcome({ auth }) {
  const suites = [
    {
      name: "Business & CRM",
      description: "Manage projects, tasks, and client relationships",
      tools: [
        {
          title: "Projects",
          description: "Track your progress",
          icon: GraduationCap,
          color: "bg-blue-100 text-blue-600",
          href: "/projects"
        },
        {
          title: "CRM",
          description: "Manage your contacts",
          icon: Users,
          color: "bg-indigo-100 text-indigo-600",
          href: "/contacts"
        },
        {
          title: "Calendar",
          description: "Schedule events",
          icon: Calendar,
          color: "bg-pink-100 text-pink-600",
          href: "/calendar"
        },
        {
          title: "Tasks",
          description: "Daily checklists",
          icon: CheckSquare,
          color: "bg-orange-100 text-orange-600",
          href: "/todos"
        }
      ]
    },
    {
      name: "Finance & Markets",
      description: "Accounting, buckets, and investments",
      tools: [
        {
          title: "Accounting",
          description: "Financial overview",
          icon: Calculator,
          color: "bg-green-100 text-green-600",
          href: "/accounting"
        },
        {
          title: "Stock Market",
          description: "Track investments",
          icon: Compass,
          color: "bg-purple-100 text-purple-600",
          href: "/stocks"
        },
        {
          title: "Budget",
          description: "Plan your finances",
          icon: PiggyBank,
          color: "bg-yellow-100 text-yellow-600",
          href: "/budget"
        },
        {
          title: "Expense",
          description: "Log your spends",
          icon: Receipt,
          color: "bg-teal-100 text-teal-600",
          href: "/expenses"
        },
        {
          title: "Agriculture",
          description: "Monitor your crops",
          icon: Sprout,
          color: "bg-lime-100 text-lime-600",
          href: "/agriculture"
        }
      ]
    },
    {
      name: "Personal & Growth",
      description: "Health, learning, and reflection",
      tools: [
        {
          title: "Health",
          description: "Monitor wellness",
          icon: Heart,
          color: "bg-red-100 text-red-600",
          href: "/health"
        },
        {
          title: "Learning",
          description: "Advanced courses",
          icon: BookOpen,
          color: "bg-cyan-100 text-cyan-600",
          href: "/learning"
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
        },
        {
          title: "Notes & Drawing",
          description: "Sketch and take notes",
          icon: StickyNote,
          color: "bg-amber-100 text-amber-600",
          href: "/notes"
        }
      ]
    },
    {
      name: "HR & Recruitment",
      description: "Talent acquisition and resume management",
      tools: [
        {
          title: "HR Contacts",
          description: "Recruitment outreach",
          icon: Users,
          color: "bg-pink-100 text-pink-600",
          href: "/hr/contacts"
        },
        {
          title: "Resume Builder",
          description: "Build professional CVs",
          icon: PenTool,
          color: "bg-blue-100 text-blue-600",
          href: "/resumes"
        }
      ]
    }
  ];
  const [uaeTime, setUaeTime] = useState(/* @__PURE__ */ new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setUaeTime(/* @__PURE__ */ new Date());
    }, 1e3);
    return () => clearInterval(timer);
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "My Personal Hub" }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 font-sans text-gray-900", children: [
      /* @__PURE__ */ jsx("header", { className: "bg-white border-b border-gray-100 sticky top-0 z-10 transition-shadow hover:shadow-sm", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center h-16", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx("span", { className: "text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600", children: "OpenLaraSuite" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxs(
            Link,
            {
              href: route("qrcode.index"),
              className: "hidden sm:flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-indigo-600 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full transition-colors",
              children: [
                /* @__PURE__ */ jsx(Smartphone, { className: "w-4 h-4" }),
                "Mobile Access"
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-500 font-medium hidden sm:flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { children: "UAE Time:" }),
            /* @__PURE__ */ jsx("span", { className: "font-mono bg-gray-100 px-2 py-1 rounded", children: uaeTime.toLocaleTimeString("en-US", {
              timeZone: "Asia/Dubai",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true
            }) })
          ] })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx("main", { className: "py-12 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto space-y-16", children: suites.map((suite, suiteIndex) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6 border-l-4 border-indigo-500 pl-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900", children: suite.name }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: suite.description })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: suite.tools.map((tool, index) => /* @__PURE__ */ jsxs(
          Link,
          {
            href: tool.href,
            className: "group relative flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-indigo-50/50 hover:border-indigo-100 hover:-translate-y-1 transition-all duration-300 min-h-[200px]",
            children: [
              /* @__PURE__ */ jsx("div", { className: `p-4 rounded-2xl mb-4 ${tool.color} bg-opacity-20 group-hover:scale-110 transition-transform duration-300 ring-4 ring-white`, children: /* @__PURE__ */ jsx(tool.icon, { className: "w-8 h-8", strokeWidth: 2.5 }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors", children: tool.title }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 text-center font-medium", children: tool.description }),
              /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 w-2 h-2 rounded-full bg-gray-100 group-hover:bg-indigo-400 transition-colors" })
            ]
          },
          index
        )) })
      ] }, suiteIndex)) }) }),
      /* @__PURE__ */ jsxs("footer", { className: "py-8 text-center text-sm text-gray-400", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " All rights reserved."
      ] })
    ] })
  ] });
}
export {
  Welcome as default
};
