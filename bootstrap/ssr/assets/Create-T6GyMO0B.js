import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-BuXJMMFe.js";
import { useForm, Head } from "@inertiajs/react";
import "react";
import "./ApplicationLogo-xMpxFOcX.js";
import "@headlessui/react";
function Create({ auth, accounts, journals }) {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    description: "",
    price: "",
    is_expense: true,
    // Default to true since we are in Expenses
    expense_account_id: "",
    journal_id: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("expense-products.store"));
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Create Expense" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Create Expense" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "p-6 text-gray-900", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "name", children: "Name" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "name",
                type: "text",
                className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                value: data.name,
                onChange: (e) => setData("name", e.target.value),
                required: true
              }
            ),
            errors.name && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-xs italic", children: errors.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "description", children: "Description" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                id: "description",
                className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                value: data.description,
                onChange: (e) => setData("description", e.target.value)
              }
            ),
            errors.description && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-xs italic", children: errors.description })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "price", children: "Price" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "price",
                type: "number",
                step: "0.01",
                className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                value: data.price,
                onChange: (e) => setData("price", e.target.value)
              }
            ),
            errors.price && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-xs italic", children: errors.price })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mb-4 hidden", children: /* @__PURE__ */ jsxs("label", { className: "block text-gray-700 text-sm font-bold mb-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                className: "mr-2 leading-tight",
                checked: data.is_expense,
                onChange: (e) => setData("is_expense", e.target.checked)
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Is Expense Product" })
          ] }) }),
          data.is_expense && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "expense_account_id", children: "Expense Account" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  id: "expense_account_id",
                  className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                  value: data.expense_account_id,
                  onChange: (e) => setData("expense_account_id", e.target.value),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "Select Account" }),
                    accounts.map((account) => /* @__PURE__ */ jsxs("option", { value: account.id, children: [
                      account.code,
                      " - ",
                      account.name
                    ] }, account.id))
                  ]
                }
              ),
              errors.expense_account_id && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-xs italic", children: errors.expense_account_id })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "journal_id", children: "Default Journal" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  id: "journal_id",
                  className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                  value: data.journal_id,
                  onChange: (e) => setData("journal_id", e.target.value),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "Select Journal" }),
                    journals.map((journal) => /* @__PURE__ */ jsxs("option", { value: journal.id, children: [
                      journal.name,
                      " (",
                      journal.code,
                      ")"
                    ] }, journal.id))
                  ]
                }
              ),
              errors.journal_id && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-xs italic", children: errors.journal_id })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end", children: /* @__PURE__ */ jsx(
            "button",
            {
              className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
              type: "submit",
              disabled: processing,
              children: "Create Expense"
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
