import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-CHmnEReh.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { X, Plus, Edit2, Trash2 } from "lucide-react";
import "./ApplicationLogo-CtkHIfkt.js";
import "@headlessui/react";
function ChartOfAccounts({ auth, accounts }) {
  const [showModal, setShowModal] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const { data, setData, post, put, processing, reset } = useForm({
    code: "",
    name: "",
    account_type: "asset",
    parent_id: "",
    description: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAccount) {
      put(`/accounting/accounts/${editingAccount.id}`, {
        onSuccess: () => {
          setShowModal(false);
          setEditingAccount(null);
          reset();
        }
      });
    } else {
      post("/accounting/accounts", {
        onSuccess: () => {
          setShowModal(false);
          reset();
        }
      });
    }
  };
  const handleEdit = (account) => {
    setEditingAccount(account);
    setData({
      code: account.code,
      name: account.name,
      account_type: account.account_type,
      parent_id: account.parent_id || "",
      description: account.description || ""
    });
    setShowModal(true);
  };
  const handleDelete = (accountId) => {
    if (confirm("Delete this account?")) {
      fetch(`/accounting/accounts/${accountId}`, {
        method: "DELETE",
        headers: {
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content
        }
      }).then(() => window.location.reload());
    }
  };
  const getAccountsByType = (type) => {
    return accounts.filter((a) => a.account_type === type);
  };
  const AccountSection = ({ title, type, color }) => {
    const typeAccounts = getAccountsByType(type);
    return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow mb-6", children: [
      /* @__PURE__ */ jsx("div", { className: `p-4 border-b border-gray-200 bg-${color}-50`, children: /* @__PURE__ */ jsxs("h3", { className: `font-semibold text-${color}-900`, children: [
        title,
        " (",
        typeAccounts.length,
        ")"
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "p-4", children: typeAccounts.length > 0 ? /* @__PURE__ */ jsxs("table", { className: "min-w-full", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b", children: [
          /* @__PURE__ */ jsx("th", { className: "text-left py-2", children: "Code" }),
          /* @__PURE__ */ jsx("th", { className: "text-left py-2", children: "Name" }),
          /* @__PURE__ */ jsx("th", { className: "text-right py-2", children: "Balance" }),
          /* @__PURE__ */ jsx("th", { className: "text-right py-2", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: typeAccounts.map((account) => /* @__PURE__ */ jsxs("tr", { className: "border-b hover:bg-gray-50", children: [
          /* @__PURE__ */ jsx("td", { className: "py-2", children: account.code }),
          /* @__PURE__ */ jsx("td", { className: "py-2", children: /* @__PURE__ */ jsx(
            Link,
            {
              href: `/accounting/accounts/${account.id}`,
              className: "text-indigo-600 hover:text-indigo-800",
              children: account.name
            }
          ) }),
          /* @__PURE__ */ jsxs("td", { className: "py-2 text-right font-medium", children: [
            "$",
            account.balance?.toLocaleString() || "0.00"
          ] }),
          /* @__PURE__ */ jsxs("td", { className: "py-2 text-right", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleEdit(account),
                className: "text-blue-600 hover:text-blue-800 mr-3",
                children: /* @__PURE__ */ jsx(Edit2, { className: "w-4 h-4 inline" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleDelete(account.id),
                className: "text-red-600 hover:text-red-800",
                children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4 inline" })
              }
            )
          ] })
        ] }, account.id)) })
      ] }) : /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-center py-4", children: [
        "No ",
        title.toLowerCase(),
        " accounts"
      ] }) })
    ] });
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Chart of Accounts" }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              setEditingAccount(null);
              reset();
              setShowModal(true);
            },
            className: "px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
              "New Account"
            ]
          }
        )
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Chart of Accounts" }),
        /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsx(AccountSection, { title: "Assets", type: "asset", color: "green" }),
          /* @__PURE__ */ jsx(AccountSection, { title: "Liabilities", type: "liability", color: "red" }),
          /* @__PURE__ */ jsx(AccountSection, { title: "Equity", type: "equity", color: "blue" }),
          /* @__PURE__ */ jsx(AccountSection, { title: "Income", type: "income", color: "indigo" }),
          /* @__PURE__ */ jsx(AccountSection, { title: "Expenses", type: "expense", color: "orange" })
        ] }) }),
        showModal && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-6 w-full max-w-md", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: editingAccount ? "Edit Account" : "New Account" }),
            /* @__PURE__ */ jsx("button", { onClick: () => {
              setShowModal(false);
              setEditingAccount(null);
              reset();
            }, children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }) })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Code *" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: data.code,
                  onChange: (e) => setData("code", e.target.value),
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Name *" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: data.name,
                  onChange: (e) => setData("name", e.target.value),
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Type *" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: data.account_type,
                  onChange: (e) => setData("account_type", e.target.value),
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "asset", children: "Asset" }),
                    /* @__PURE__ */ jsx("option", { value: "liability", children: "Liability" }),
                    /* @__PURE__ */ jsx("option", { value: "equity", children: "Equity" }),
                    /* @__PURE__ */ jsx("option", { value: "income", children: "Income" }),
                    /* @__PURE__ */ jsx("option", { value: "expense", children: "Expense" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Description" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  value: data.description,
                  onChange: (e) => setData("description", e.target.value),
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md",
                  rows: "3"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2 pt-4", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: processing,
                  className: "flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700",
                  children: editingAccount ? "Update" : "Create"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setShowModal(false);
                    setEditingAccount(null);
                    reset();
                  },
                  className: "px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300",
                  children: "Cancel"
                }
              )
            ] })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  ChartOfAccounts as default
};
