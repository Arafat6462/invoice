import Axios from "axios";
import React, { useState } from "react";
import "./Create.css";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();

  //   const [id, setId] = useState(0);
  const [date, setDate] = useState("");
  const [invoice, setInvoice] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState(0);
  const [qty, setQty] = useState(0);
  const [product, setProduct] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [advance, setAdvance] = useState(0);
  const [update, setUpdate] = useState("");
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [deliveryCompany, setDeliveryCompany] = useState("");
  const [remark, setRemark] = useState("");
  const [first_followup, setFirst_followup] = useState("");
  const [second_followup, setSecond_followupId] = useState("");
  const [third_followup, setThird_followup] = useState("");
  const [bkashCost, setBkashCost] = useState(0);
  const [other, setOther] = useState(0);
  const [depositToAccount, setDepositToAccount] = useState(0);
  var createStatus = "";

  const addInvoice = () => {
    Axios.post("http://localhost:3001/create", {
      // send it to backend from frontend.
      date: date,
      invoice: invoice,
      name: name,
      address: address,
      email: email,
      mobile: mobile,
      qty: qty,
      product: product,
      productPrice: productPrice,
      advance: advance,
      update: update,
      deliveryCharge: deliveryCharge,
      deliveryCompany: deliveryCompany,
      remark: remark,
      first_followup: first_followup,
      second_followup: second_followup,
      third_followup: third_followup,
      bkashCost: bkashCost,
      other: other,
      depositToAccount: depositToAccount,
    }).then(() => {
      createStatus = "Invoice Create Success";
      console.log(createStatus);
      navigate("/");
    });
  };

  return (
    <div>
      {/* <div className="field">
        <label>ID</label>
        <input
          type="number"
          placeholder="ID"
          onChange={(event) => setId(event.target.value)}
        />
      </div> */}
      <div className="field">
        <label>Date</label>
        <input
          type="text"
          placeholder="2022-10-27"
          onChange={(event) => setDate(event.target.value)}
        />
      </div>
      <div className="field">
        <label>Invoice No</label>
        <input
          type="number"
          placeholder="6"
          onChange={(event) => setInvoice(event.target.value)}
        />
      </div>
      <div className="field">
        <label>Name</label>
        <input
          type="text"
          placeholder="Arafat"
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="field">
        <label>Address</label>
        <input
          type="text"
          placeholder="Gulshan-1, Dhaka"
          onChange={(event) => setAddress(event.target.value)}
        />
      </div>
      <div className="field">
        <label>Email</label>
        <input
          type="email"
          placeholder="abc@gmail.com"
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="field">
        <label>Mobile</label>
        <input
          type="number"
          placeholder="01777766332"
          onChange={(event) => setMobile(event.target.value)}
        />
      </div>
      <div className="field">
        <label>QTY</label>
        <input
          type="number"
          placeholder="3"
          onChange={(event) => setQty(event.target.value)}
        />
      </div>
      <div className="field">
        <label>Product</label>
        <input
          type="text"
          placeholder="Head phone"
          onChange={(event) => setProduct(event.target.value)}
        />
      </div>
      <div className="field">
        <label>Product Price</label>
        <input
          type="number"
          placeholder="1020"
          onChange={(event) => setProductPrice(event.target.value)}
        />
      </div>
      <div className="field">
        <label>Advance</label>
        <input
          type="number"
          placeholder="500"
          onChange={(event) => setAdvance(event.target.value)}
        />
      </div>
      <div className="field">
        <label>Update</label>
        <input
          type="text"
          placeholder="Delivered"
          onChange={(event) => setUpdate(event.target.value)}
        />
      </div>
      <div className="field">
        <label>Delivery Charge</label>
        <input
          type="number"
          placeholder="100"
          onChange={(event) => setDeliveryCharge(event.target.value)}
        />
      </div>
      <div className="field">
        <label>Delivery Company</label>
        <input
          type="text"
          placeholder="RedX"
          onChange={(event) => setDeliveryCompany(event.target.value)}
        />
      </div>
      <div className="field">
        <label>Remarks</label>
        <input
          type="text"
          placeholder="Nothing"
          onChange={(event) => setRemark(event.target.value)}
        />
      </div>

      <div className="field">
        <label>1st Followup</label>
        <input
          type="text"
          placeholder="Processing"
          onChange={(event) => setFirst_followup(event.target.value)}
        />
      </div>

      <div className="field">
        <label>2st Followup</label>
        <input
          type="text"
          placeholder="N/A"
          onChange={(event) => setSecond_followupId(event.target.value)}
        />
      </div>

      <div className="field">
        <label>3st Followup</label>
        <input
          type="text"
          placeholder="N/A"
          onChange={(event) => setThird_followup(event.target.value)}
        />
      </div>
      <div className="field">
        <label>bKash Cost</label>
        <input
          type="number"
          placeholder="20"
          onChange={(event) => setBkashCost(event.target.value)}
        />
      </div>
      <div className="field">
        <label>Others (VAT, TAX, etc.)</label>
        <input
          type="number"
          placeholder="10"
          onChange={(event) => setOther(event.target.value)}
        />
      </div>
      <div className="field">
        <label>Deposit to Accounts</label>
        <input
          type="number"
          placeholder="800"
          onChange={(event) => setDepositToAccount(event.target.value)}
        />
      </div>

      <button type="submit" onClick={addInvoice}>
        Create Invoice
      </button>
      <div>
        <label>{createStatus}</label>
      </div>
    </div>
  );
};
export default Create;
