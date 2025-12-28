import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DksizGbA.js";
import { useForm, Head } from "@inertiajs/react";
import { Plus, Trash2, Save, Send } from "lucide-react";
import "react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function Create({ auth, products, journals, paymentAccounts }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    journal_id: journals[0]?.id || "",
    payment_account_id: "",
    description: "",
    // Voucher description
    reference: "",
    items: [
      { product_id: "", amount: "", description: "" }
    ],
    action: "save_draft"
    // Default action
  });
  const addItem = () => {
    setData("items", [...data.items, { product_id: "", amount: "", description: "" }]);
  };
  const removeItem = (index) => {
    const newItems = data.items.filter((_, i) => i !== index);
    setData("items", newItems);
  };
  const updateItem = (index, field, value) => {
    const newItems = [...data.items];
    newItems[index][field] = value;
    if (field === "product_id") {
      const product = products.find((p) => p.id == value);
      if (product) {
        newItems[index]["description"] = product.name;
        newItems[index]["amount"] = product.price || "";
      }
    }
    setData("items", newItems);
  };
  const totalAmount = data.items.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
  const submit = (e, actionType = "save_draft") => {
    e.preventDefault();
    post(route("expenses.store"), {
      data: {
        ...data,
        action: actionType
      },
      onSuccess: () => reset("items", "description", "reference")
    });
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Log Expense Voucher" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Log Expense" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg border-t-4 border-indigo-500", children: /* @__PURE__ */ jsx("div", { className: "p-6 text-gray-900", children: /* @__PURE__ */ jsxs("form", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Date" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "date",
                  value: data.date,
                  onChange: (e) => setData("date", e.target.value),
                  className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                  required: true
                }
              ),
              errors.date && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.date })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Reference" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: data.reference,
                  onChange: (e) => setData("reference", e.target.value),
                  className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                  placeholder: "Receipt # / INV-001"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Voucher Description" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: data.description,
                  onChange: (e) => setData("description", e.target.value),
                  className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                  placeholder: "e.g. Office Supplies for Dec"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Expense Items" }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: addItem,
                  className: "flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-900 font-semibold",
                  children: [
                    /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
                    " Add Item"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "overflow-x-auto border rounded-md", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
              /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("th", { className: "px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3", children: "Type (Product)" }),
                /* @__PURE__ */ jsx("th", { className: "px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3", children: "Description" }),
                /* @__PURE__ */ jsx("th", { className: "px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6", children: "Amount" }),
                /* @__PURE__ */ jsx("th", { className: "px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12", children: "Action" })
              ] }) }),
              /* @__PURE__ */ jsxs("tbody", { className: "bg-white divide-y divide-gray-200", children: [
                data.items.map((item, index) => /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsxs("td", { className: "px-3 py-2 bg-white", children: [
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        value: item.product_id,
                        onChange: (e) => updateItem(index, "product_id", e.target.value),
                        className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm",
                        required: true,
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "", children: "Select Type" }),
                          products.map((p) => /* @__PURE__ */ jsx("option", { value: p.id, children: p.name }, p.id))
                        ]
                      }
                    ),
                    errors[`items.${index}.product_id`] && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors[`items.${index}.product_id`] })
                  ] }),
                  /* @__PURE__ */ jsx("td", { className: "px-3 py-2 bg-white", children: /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: item.description,
                      onChange: (e) => updateItem(index, "description", e.target.value),
                      className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                    }
                  ) }),
                  /* @__PURE__ */ jsxs("td", { className: "px-3 py-2 bg-white", children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        step: "0.01",
                        min: "0",
                        value: item.amount,
                        onChange: (e) => updateItem(index, "amount", e.target.value),
                        className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm text-right font-mono",
                        required: true
                      }
                    ),
                    errors[`items.${index}.amount`] && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors[`items.${index}.amount`] })
                  ] }),
                  /* @__PURE__ */ jsx("td", { className: "px-3 py-2 text-center bg-white", children: data.items.length > 1 && /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => removeItem(index),
                      className: "text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded",
                      children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                    }
                  ) })
                ] }, index)),
                /* @__PURE__ */ jsxs("tr", { className: "bg-gray-100 font-bold border-t-2 border-gray-200", children: [
                  /* @__PURE__ */ jsx("td", { colSpan: "2", className: "px-3 py-3 text-right text-gray-700", children: "Total Payable:" }),
                  /* @__PURE__ */ jsxs("td", { className: "px-3 py-3 text-right text-indigo-700 text-lg font-mono", children: [
                    "$",
                    totalAmount.toFixed(2)
                  ] }),
                  /* @__PURE__ */ jsx("td", {})
                ] })
              ] })
            ] }) }),
            errors.items && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.items })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 pt-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Journal" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: data.journal_id,
                  onChange: (e) => setData("journal_id", e.target.value),
                  className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                  required: true,
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "Select Journal" }),
                    journals.map((j) => /* @__PURE__ */ jsx("option", { value: j.id, children: j.name }, j.id))
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Paid Via (Credit Account)" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: data.payment_account_id,
                  onChange: (e) => setData("payment_account_id", e.target.value),
                  className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                  required: true,
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "Select Payment Account" }),
                    paymentAccounts.map((a) => /* @__PURE__ */ jsxs("option", { value: a.id, children: [
                      a.code,
                      " - ",
                      a.name
                    ] }, a.id))
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-end pt-6 gap-3 border-t", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: (e) => submit(e, "save_draft"),
                disabled: processing,
                className: "inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150",
                children: [
                  /* @__PURE__ */ jsx(Save, { className: "w-4 h-4 mr-2" }),
                  "Save Draft"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: (e) => submit(e, "save_post"),
                disabled: processing,
                className: "inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 shadow-lg",
                children: [
                  /* @__PURE__ */ jsx(Send, { className: "w-4 h-4 mr-2" }),
                  "Save & Post"
                ]
              }
            )
          ] })
        ] }) }) }) }) })
      ]
    }
  );
}
export {
  Create as default
};
