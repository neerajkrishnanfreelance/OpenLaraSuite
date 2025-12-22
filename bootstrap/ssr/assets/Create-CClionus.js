import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DHAmaW8y.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { I as InputError } from "./InputError-CBvD_6aD.js";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { T as TextInput } from "./TextInput-Xf9xHrLa.js";
import { C as Checkbox } from "./Checkbox-5PHg8iNz.js";
import "react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
function Create({ auth, accounts }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    symbol: "",
    name: "",
    sector: "",
    description: "",
    is_active: true,
    asset_account_id: "",
    pnl_account_id: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("stocks-definitions.store"));
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Add New Stock" }),
        /* @__PURE__ */ jsx(Link, { href: route("stocks-definitions.index"), className: "text-indigo-600 hover:text-indigo-900", children: "Back to List" })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Add Stock" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-2xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "symbol", value: "Stock Symbol" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "symbol",
                type: "text",
                name: "symbol",
                value: data.symbol,
                className: "mt-1 block w-full uppercase font-mono",
                isFocused: true,
                onChange: (e) => setData("symbol", e.target.value.toUpperCase()),
                placeholder: "AAPL"
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.symbol, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Stock Name" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "name",
                type: "text",
                name: "name",
                value: data.name,
                className: "mt-1 block w-full",
                onChange: (e) => setData("name", e.target.value),
                placeholder: "Apple Inc."
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "sector", value: "Sector (Optional)" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "sector",
                type: "text",
                name: "sector",
                value: data.sector,
                className: "mt-1 block w-full",
                onChange: (e) => setData("sector", e.target.value),
                placeholder: "Technology"
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.sector, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "description", value: "Description (Optional)" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                id: "description",
                className: "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full",
                rows: "3",
                value: data.description,
                onChange: (e) => setData("description", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.description, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mt-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "asset_account_id", value: "Default Asset Account (Optional)" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  id: "asset_account_id",
                  className: "mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm",
                  value: data.asset_account_id,
                  onChange: (e) => setData("asset_account_id", e.target.value),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "Select Account" }),
                    accounts.filter((a) => a.account_type === "asset").map((acc) => /* @__PURE__ */ jsxs("option", { value: acc.id, children: [
                      acc.name,
                      " (",
                      acc.code,
                      ")"
                    ] }, acc.id))
                  ]
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.asset_account_id, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "pnl_account_id", value: "Default P&L Account (Optional)" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  id: "pnl_account_id",
                  className: "mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm",
                  value: data.pnl_account_id,
                  onChange: (e) => setData("pnl_account_id", e.target.value),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "Select Account" }),
                    accounts.filter((a) => ["income", "expense", "equity"].includes(a.account_type)).map((acc) => /* @__PURE__ */ jsxs("option", { value: acc.id, children: [
                      acc.name,
                      " (",
                      acc.code,
                      ")"
                    ] }, acc.id))
                  ]
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.pnl_account_id, className: "mt-2" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "block mt-4", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(
              Checkbox,
              {
                name: "is_active",
                checked: data.is_active,
                onChange: (e) => setData("is_active", e.target.checked)
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "ms-2 text-sm text-gray-600", children: "Active" })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end mt-4", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Save Stock" }) })
        ] }) }) }) }) })
      ]
    }
  );
}
export {
  Create as default
};
