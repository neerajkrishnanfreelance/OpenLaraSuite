import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-Cre_3-uQ.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { Plus, Trash2 } from "lucide-react";
import "react";
import "./ApplicationLogo-xMpxFOcX.js";
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
    ]
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
  const submit = (e) => {
    e.preventDefault();
    post(route("expenses.store"), {
      onSuccess: () => reset("items", "description", "reference")
    });
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Log Expense" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Log Expense" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "p-6 text-gray-900", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", children: [
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
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Reference (Optional)" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: data.reference,
                  onChange: (e) => setData("reference", e.target.value),
                  className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
                  placeholder: "Receipt #"
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
                  className: "flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-900",
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
                  /* @__PURE__ */ jsxs("td", { className: "px-3 py-2", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
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
                      /* @__PURE__ */ jsx(Link, { href: route("expense-products.create"), className: "px-2 py-1 bg-gray-100 rounded text-gray-500 hover:bg-gray-200 flex items-center justify-center", children: "+" })
                    ] }),
                    errors[`items.${index}.product_id`] && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors[`items.${index}.product_id`] })
                  ] }),
                  /* @__PURE__ */ jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: item.description,
                      onChange: (e) => updateItem(index, "description", e.target.value),
                      className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                    }
                  ) }),
                  /* @__PURE__ */ jsxs("td", { className: "px-3 py-2", children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        step: "0.01",
                        min: "0",
                        value: item.amount,
                        onChange: (e) => updateItem(index, "amount", e.target.value),
                        className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm text-right",
                        required: true
                      }
                    ),
                    errors[`items.${index}.amount`] && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors[`items.${index}.amount`] })
                  ] }),
                  /* @__PURE__ */ jsx("td", { className: "px-3 py-2 text-center", children: data.items.length > 1 && /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => removeItem(index),
                      className: "text-red-600 hover:text-red-800",
                      children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                    }
                  ) })
                ] }, index)),
                /* @__PURE__ */ jsxs("tr", { className: "bg-gray-50 font-semibold", children: [
                  /* @__PURE__ */ jsx("td", { colSpan: "2", className: "px-3 py-2 text-right", children: "Total:" }),
                  /* @__PURE__ */ jsxs("td", { className: "px-3 py-2 text-right", children: [
                    "$",
                    totalAmount.toFixed(2)
                  ] }),
                  /* @__PURE__ */ jsx("td", {})
                ] })
              ] })
            ] }) }),
            errors.items && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.items })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Select Journal" }),
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
              ),
              errors.journal_id && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.journal_id })
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
              ),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Select Cash, Bank, or Accounts Payable." }),
              errors.payment_account_id && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.payment_account_id })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-end pt-4", children: /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: processing,
              className: "bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 font-medium shadow",
              children: "Record Expense"
            }
          ) })
        ] }) }) }) }) })
      ]
    }
  );
}
export {
  Create as default
};
