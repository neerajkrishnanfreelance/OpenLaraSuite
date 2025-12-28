import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-DksizGbA.js";
import { useForm, Head } from "@inertiajs/react";
import { I as InputLabel } from "./InputLabel-CE_n4Upz.js";
import { T as TextInput } from "./TextInput-Xf9xHrLa.js";
import { I as InputError } from "./InputError-CBvD_6aD.js";
import { P as PrimaryButton } from "./PrimaryButton-BMCZH-oa.js";
import { F as FormHeader } from "./FormHeader-CQAGRAnh.js";
import { F as FormPageLayout } from "./FormPageLayout-CCQJltRs.js";
import { useEffect } from "react";
import "./ApplicationLogo-BcNgH8MP.js";
import "@heroicons/react/24/outline";
import "@headlessui/react";
import "./Chatter-QayPlM-X.js";
import "./Checkbox-5PHg8iNz.js";
function Create({ auth, accounts, stocks }) {
  const { data, setData, post, processing, errors } = useForm({
    type: "buy",
    stock_id: "",
    stock_symbol: "",
    quantity: "",
    price_per_unit: "",
    fees: "",
    trade_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    bank_account_id: "",
    stock_account_id: "",
    pnl_account_id: "",
    cost_basis: "",
    // Only for sell
    notes: ""
  });
  const bankAccounts = accounts.filter((a) => ["asset"].includes(a.account_type));
  const stockAccounts = accounts.filter((a) => a.account_type === "asset");
  const incomeAccounts = accounts.filter((a) => ["income", "equity", "expense"].includes(a.account_type));
  const submit = (e) => {
    e.preventDefault();
    post(route("stocks.store"));
  };
  useEffect(() => {
    if (data.stock_id) {
      const selectedStock = stocks.find((s) => s.id == data.stock_id);
      if (selectedStock) {
        if (selectedStock.asset_account_id) {
          setData((d) => ({ ...d, stock_account_id: selectedStock.asset_account_id }));
        }
        if (selectedStock.pnl_account_id) {
          setData((d) => ({ ...d, pnl_account_id: selectedStock.pnl_account_id }));
        }
      }
    }
  }, [data.stock_id]);
  const total = (parseFloat(data.quantity || 0) * parseFloat(data.price_per_unit || 0)).toFixed(2);
  const net = data.type === "buy" ? (parseFloat(total) + parseFloat(data.fees || 0)).toFixed(2) : (parseFloat(total) - parseFloat(data.fees || 0)).toFixed(2);
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      header: /* @__PURE__ */ jsx(FormHeader, { title: "Record Trade", backRoute: "stocks.index", children: /* @__PURE__ */ jsx(PrimaryButton, { form: "create-stock-form", disabled: processing, children: "Record Transaction" }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "New Trade" }),
        /* @__PURE__ */ jsx(FormPageLayout, { isCreate: true, children: /* @__PURE__ */ jsxs("form", { id: "create-stock-form", onSubmit: submit, children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx(InputLabel, { value: "Transaction Type" }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-4 mt-2", children: [
              /* @__PURE__ */ jsxs("label", { className: "flex items-center cursor-pointer", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "radio",
                    name: "type",
                    value: "buy",
                    checked: data.type === "buy",
                    onChange: (e) => setData("type", e.target.value),
                    className: "text-green-600 focus:ring-green-500"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: `ml-2 px-3 py-1 rounded-full text-sm font-bold ${data.type === "buy" ? "bg-green-100 text-green-800" : "text-gray-600"}`, children: "BUY" })
              ] }),
              /* @__PURE__ */ jsxs("label", { className: "flex items-center cursor-pointer", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "radio",
                    name: "type",
                    value: "sell",
                    checked: data.type === "sell",
                    onChange: (e) => setData("type", e.target.value),
                    className: "text-red-600 focus:ring-red-500"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: `ml-2 px-3 py-1 rounded-full text-sm font-bold ${data.type === "sell" ? "bg-red-100 text-red-800" : "text-gray-600"}`, children: "SELL" })
              ] })
            ] }),
            /* @__PURE__ */ jsx(InputError, { message: errors.type, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "trade_date", value: "Date" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "trade_date",
                  type: "date",
                  className: "mt-1 block w-full",
                  value: data.trade_date,
                  onChange: (e) => setData("trade_date", e.target.value),
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.trade_date, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "stock_id", value: "Stock" }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    id: "stock_id",
                    className: "mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm",
                    value: data.stock_id || "",
                    onChange: (e) => setData("stock_id", e.target.value),
                    required: true,
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "", children: "Select Stock" }),
                      stocks.map((s) => /* @__PURE__ */ jsxs("option", { value: s.id, children: [
                        s.symbol,
                        " - ",
                        s.name
                      ] }, s.id))
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: route("stocks-definitions.create"),
                    target: "_blank",
                    className: "mt-1 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none",
                    children: "+"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(InputError, { message: errors.stock_id, className: "mt-2" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "quantity", value: "Quantity" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "quantity",
                  type: "number",
                  step: "0.0001",
                  className: "mt-1 block w-full",
                  value: data.quantity,
                  onChange: (e) => setData("quantity", e.target.value),
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.quantity, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "price_per_unit", value: "Price Per Unit" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "price_per_unit",
                  type: "number",
                  step: "0.01",
                  className: "mt-1 block w-full",
                  value: data.price_per_unit,
                  onChange: (e) => setData("price_per_unit", e.target.value),
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.price_per_unit, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "fees", value: "Brokerage/Fees" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "fees",
                  type: "number",
                  step: "0.01",
                  className: "mt-1 block w-full",
                  value: data.fees,
                  onChange: (e) => setData("fees", e.target.value)
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.fees, className: "mt-2" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-4 rounded-md mb-6 flex justify-between items-center text-sm font-medium text-gray-700", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "Total: ",
              total
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "text-lg", children: [
              "Net Amount: ",
              net
            ] })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-gray-900 border-b pb-1 mb-4", children: "Accounting Details" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "bank_account_id", value: "Bank / Cash Account" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  id: "bank_account_id",
                  className: "mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm",
                  value: data.bank_account_id,
                  onChange: (e) => setData("bank_account_id", e.target.value),
                  required: true,
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "Select Account" }),
                    bankAccounts.map((acc) => /* @__PURE__ */ jsxs("option", { value: acc.id, children: [
                      acc.name,
                      " (",
                      acc.code,
                      ")"
                    ] }, acc.id))
                  ]
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.bank_account_id, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "stock_account_id", value: "Investment / Stock Account" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  id: "stock_account_id",
                  className: "mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm",
                  value: data.stock_account_id,
                  onChange: (e) => setData("stock_account_id", e.target.value),
                  required: true,
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "Select Account" }),
                    stockAccounts.map((acc) => /* @__PURE__ */ jsxs("option", { value: acc.id, children: [
                      acc.name,
                      " (",
                      acc.code,
                      ")"
                    ] }, acc.id))
                  ]
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.stock_account_id, className: "mt-2" })
            ] })
          ] }),
          data.type === "sell" && /* @__PURE__ */ jsxs("div", { className: "bg-yellow-50 p-4 rounded-md mb-6 border border-yellow-100", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-sm font-bold text-yellow-800 mb-2", children: "Sell Details" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { htmlFor: "cost_basis", value: "Cost Basis (Optional)" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    id: "cost_basis",
                    type: "number",
                    step: "0.01",
                    className: "mt-1 block w-full",
                    value: data.cost_basis,
                    onChange: (e) => setData("cost_basis", e.target.value),
                    placeholder: "Original purchase cost"
                  }
                ),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "If provided, profit/loss will be posted to the P&L account." }),
                /* @__PURE__ */ jsx(InputError, { message: errors.cost_basis, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { htmlFor: "pnl_account_id", value: "Realized Gain/Loss Account" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    id: "pnl_account_id",
                    className: "mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm",
                    value: data.pnl_account_id,
                    onChange: (e) => setData("pnl_account_id", e.target.value),
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "", children: "Select Account" }),
                      incomeAccounts.map((acc) => /* @__PURE__ */ jsxs("option", { value: acc.id, children: [
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
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "notes", value: "Notes" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                id: "notes",
                className: "mt-1 block w-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-md shadow-sm h-24",
                value: data.notes,
                onChange: (e) => setData("notes", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.notes, className: "mt-2" })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  Create as default
};
