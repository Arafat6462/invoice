import React from "react";
import Table from "./Table/Table";

function Body() {
  const columnName = [
    // {
    //   heading: "ID",
    //   value: "id",
    // },
    {
      heading: "Date",
      value: "date",
    },
    {
      heading: "Invoice No",
      value: "invoice_no",
    },
    {
      heading: "Name",
      value: "name",
    },
    {
      heading: "Address",
      value: "address",
    },
    {
      heading: "Email",
      value: "email",
    },
    {
      heading: "Mobile",
      value: "mobile",
    },
    {
      heading: "QTY",
      value: "qty",
    },
    {
      heading: "Product",
      value: "product",
    },
    {
      heading: "Product Price",
      value: "product_price",
    },
    {
      heading: "Advance",
      value: "advance",
    },
    {
      heading: "Update",
      value: "update",
    },
    {
      heading: "Delivery Charge",
      value: "delivery_charge",
    },
    {
      heading: "Delivery Company",
      value: "delivery_company",
    },
    {
      heading: "Remarks",
      value: "remarks",
    },
    {
      heading: "1st Followup",
      value: "first_followup",
    },
    {
      heading: "2st Followup",
      value: "second_followup",
    },
    {
      heading: "3st Followup",
      value: "third_followup",
    },
    {
      heading: "bKash Cost",
      value: "bkash_cost",
    },
    {
      heading: "Others (VAT, TAX, etc.",
      value: "others_vat_tax",
    },
    {
      heading: "Deposit to Accounts",
      value: "deposit_to_accounts",
    },
  ];

  return (
    <div>
      <Table columnName={columnName} />
    </div>
  );
}
export default Body;
