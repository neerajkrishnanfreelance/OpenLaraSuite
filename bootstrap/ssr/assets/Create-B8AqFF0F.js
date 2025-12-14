import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-Db-Yuz5f.js";
import { useForm, Head } from "@inertiajs/react";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function CreateJournalEntry({ auth, journals, accounts, products = [] }) {
  const [lines, setLines] = useState([
    { account_id: "", product_id: "", description: "", debit: 0, credit: 0 },
    { account_id: "", product_id: "", description: "", debit: 0, credit: 0 }
  ]);
  const { data, setData, post, processing } = useForm({
    journal_id: journals[0]?.id || "",
    reference: "",
    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    notes: "",
    lines
  });
  const addLine = () => {
    const newLines = [...lines, { account_id: "", product_id: "", description: "", debit: 0, credit: 0 }];
    setLines(newLines);
    setData("lines", newLines);
  };
  const removeLine = (index) => {
    const newLines = lines.filter((_, i) => i !== index);
    setLines(newLines);
    setData("lines", newLines);
  };
  const updateLine = (index, field, value) => {
    const newLines = [...lines];
    newLines[index][field] = value;
    if (field === "product_id") {
      const product = products.find((p) => p.id == value);
      if (product) {
        if (product.expense_account_id) {
          newLines[index]["account_id"] = product.expense_account_id;
        }
        if (!newLines[index]["description"]) {
          newLines[index]["description"] = product.name;
        }
        if (product.price && parseFloat(product.price) > 0) {
          if (newLines[index]["debit"] == 0 && newLines[index]["credit"] == 0) {
            newLines[index]["debit"] = product.price;
          }
        }
      }
    }
    setLines(newLines);
    setData("lines", newLines);
  };
  const totalDebit = lines.reduce((sum, line) => sum + parseFloat(line.debit || 0), 0);
  const totalCredit = lines.reduce((sum, line) => sum + parseFloat(line.credit || 0), 0);
  const difference = totalDebit - totalCredit;
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/accounting/entries");
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Create Journal Entry" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Create Journal Entry" }),
        /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-6", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Journal *" }),
              /* @__PURE__ */ jsx(
                "select",
                {
                  value: data.journal_id,
                  onChange: (e) => setData("journal_id", e.target.value),
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                  required: true,
                  children: journals.map((journal) => /* @__PURE__ */ jsx("option", { value: journal.id, children: journal.name }, journal.id))
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Reference" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: data.reference,
                  onChange: (e) => setData("reference", e.target.value),
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                  placeholder: "e.g., INV/2025/001"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Date *" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "date",
                  value: data.date,
                  onChange: (e) => setData("date", e.target.value),
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                  required: true
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900", children: "Journal Entry Lines" }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: addLine,
                  className: "px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm flex items-center gap-1",
                  children: [
                    /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
                    "Add Line"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full border", children: [
              /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left text-sm font-medium text-gray-700", children: "Product" }),
                /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left text-sm font-medium text-gray-700", children: "Account" }),
                /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left text-sm font-medium text-gray-700", children: "Description" }),
                /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-right text-sm font-medium text-gray-700", children: "Debit" }),
                /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-right text-sm font-medium text-gray-700", children: "Credit" }),
                /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-center text-sm font-medium text-gray-700", children: "Action" })
              ] }) }),
              /* @__PURE__ */ jsxs("tbody", { children: [
                lines.map((line, index) => /* @__PURE__ */ jsxs("tr", { className: "border-t", children: [
                  /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: /* @__PURE__ */ jsxs(
                    "select",
                    {
                      value: line.product_id || "",
                      onChange: (e) => updateLine(index, "product_id", e.target.value),
                      className: "w-full px-2 py-1 border border-gray-300 rounded text-sm",
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "", children: "Select Product (Optional)" }),
                        products.map((product) => /* @__PURE__ */ jsx("option", { value: product.id, children: product.name }, product.id))
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: /* @__PURE__ */ jsxs(
                    "select",
                    {
                      value: line.account_id,
                      onChange: (e) => updateLine(index, "account_id", e.target.value),
                      className: "w-full px-2 py-1 border border-gray-300 rounded text-sm",
                      required: true,
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "", children: "Select Account" }),
                        accounts.map((account) => /* @__PURE__ */ jsxs("option", { value: account.id, children: [
                          account.code,
                          " - ",
                          account.name
                        ] }, account.id))
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: line.description,
                      onChange: (e) => updateLine(index, "description", e.target.value),
                      className: "w-full px-2 py-1 border border-gray-300 rounded text-sm",
                      required: true
                    }
                  ) }),
                  /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "number",
                      step: "0.01",
                      value: line.debit,
                      onChange: (e) => updateLine(index, "debit", e.target.value),
                      className: "w-full px-2 py-1 border border-gray-300 rounded text-sm text-right"
                    }
                  ) }),
                  /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "number",
                      step: "0.01",
                      value: line.credit,
                      onChange: (e) => updateLine(index, "credit", e.target.value),
                      className: "w-full px-2 py-1 border border-gray-300 rounded text-sm text-right"
                    }
                  ) }),
                  /* @__PURE__ */ jsx("td", { className: "px-4 py-2 text-center", children: lines.length > 2 && /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => removeLine(index),
                      className: "text-red-600 hover:text-red-800",
                      children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                    }
                  ) })
                ] }, index)),
                /* @__PURE__ */ jsxs("tr", { className: "border-t-2 bg-gray-50 font-semibold", children: [
                  /* @__PURE__ */ jsx("td", { colSpan: "3", className: "px-4 py-2 text-right", children: "Totals:" }),
                  /* @__PURE__ */ jsxs("td", { className: "px-4 py-2 text-right", children: [
                    "$",
                    totalDebit.toFixed(2)
                  ] }),
                  /* @__PURE__ */ jsxs("td", { className: "px-4 py-2 text-right", children: [
                    "$",
                    totalCredit.toFixed(2)
                  ] }),
                  /* @__PURE__ */ jsx("td", { className: "px-4 py-2" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: `border-t ${difference !== 0 ? "bg-red-50" : "bg-green-50"}`, children: [
                  /* @__PURE__ */ jsx("td", { colSpan: "3", className: "px-4 py-2 text-right font-semibold", children: "Difference:" }),
                  /* @__PURE__ */ jsxs("td", { colSpan: "2", className: `px-4 py-2 text-right font-semibold ${difference !== 0 ? "text-red-700" : "text-green-700"}`, children: [
                    "$",
                    Math.abs(difference).toFixed(2),
                    " ",
                    difference !== 0 && "(Unbalanced!)"
                  ] }),
                  /* @__PURE__ */ jsx("td", { className: "px-4 py-2" })
                ] })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Notes" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                value: data.notes,
                onChange: (e) => setData("notes", e.target.value),
                className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                rows: "3"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: processing || difference !== 0,
                className: "px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-300",
                children: "Save as Draft"
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "/accounting/entries",
                className: "px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300",
                children: "Cancel"
              }
            )
          ] }),
          difference !== 0 && /* @__PURE__ */ jsx("p", { className: "mt-4 text-red-600 text-sm", children: "⚠️ Entry is unbalanced. Debit and Credit must be equal to save." })
        ] }) }) }) })
      ]
    }
  );
}
export {
  CreateJournalEntry as default
};
