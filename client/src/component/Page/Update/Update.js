import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Update.css";

const Update = () => {
  const getId = useParams(); // getting id from Table.js as getId throuth app.js id.
  // console.log(getId.id);
  // setSearchId(getId.id);

  const navigate = useNavigate();
  const [searchId, setSearchId] = useState(getId.id);
  const [searchResult, setSearchResult] = useState([""]);

  // load info
  useEffect(() => {
    searchInvoice();
  }, []);

  const [id, setId] = useState("");
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

  // Update
  const UpdateInvoice = () => {
    console.log("update called" + name);
    Axios.put(`http://localhost:3001/update/${id}`, {
      // send it to backend from frontend.
      // id: id,
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
    }).then((response) => {
      if (response) {
        console.log("success");
        navigate("/");
      }
    });
  };

  // Search
  const searchInvoice = () => {
    Axios.get(`http://localhost:3001/search/${searchId}`).then((Response) => {
      if (Response.data.length != 0) {
        setSearchResult(Response.data);
        console.log(typeof Response.data[0].name);
        console.log("Others : " + Response.data[0].others_vat_tax);

        setId(Response.data[0].id);
        setDate(Response.data[0].date);
        setInvoice(Response.data[0].invoice_no);
        setName(Response.data[0].name);
        setAddress(Response.data[0].address);
        setEmail(Response.data[0].email);
        setMobile(Response.data[0].mobile);
        setQty(Response.data[0].qty);
        setProduct(Response.data[0].product);
        setProductPrice(Response.data[0].product_price);
        setAdvance(Response.data[0].advance);
        setUpdate(Response.data[0].update);
        setDeliveryCharge(Response.data[0].delivery_charge);
        setDeliveryCompany(Response.data[0].delivery_company);
        setRemark(Response.data[0].remarks);
        setFirst_followup(Response.data[0].first_followup);
        setSecond_followupId(Response.data[0].second_followup);
        setThird_followup(Response.data[0].third_followup);
        setBkashCost(Response.data[0].bkash_cost);
        setOther(Response.data[0].others_vat_tax);
        setDepositToAccount(Response.data[0].deposit_to_accounts);
        setTest(Response.data[0].deposit_to_accounts);
        console.log(Response.data[0].deposit_to_accounts);
      } else console.log("Data Not Found");
    });
  };

  return (
    <div>
      {/* <div className="search">
        <label>Search with ID</label>
        <input
          type="number"
          placeholder="ID"
          onChange={(event) => setSearchId(event.target.value)}
        />
        <button type="submit" className="searchBtn" onClick={searchInvoice}>
          {" "}
          Search
        </button>
      </div> */}

      <h1>Update Invoice</h1>
      <div className="field">
        <label>ID</label>
        <input
          type="number"
          placeholder="ID"
          value={id}
          onChange={(event) => setId(event.target.value)}
        />
      </div>
      <div className="field">
        <label>Date</label>
        <input
          type="text"
          placeholder="2022-10-27"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </div>
      <div className="field">
        <label>Invoice No</label>
        <input
          type="number"
          placeholder="6"
          value={invoice}
          onChange={(event) => setInvoice(event.target.value)}
        />
      </div>
      <div className="field">
        <label>Name</label>
        <input
          type="text"
          placeholder="Arafat"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="field">
        <label>Address</label>
        <input
          type="text"
          placeholder="Gulshan-1, Dhaka"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
      </div>
      <div className="field">
        <label>Email</label>
        <input
          type="email"
          placeholder="abc@gmail.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="field">
        <label>Mobile</label>
        <input
          type="number"
          placeholder="01777766332"
          value={mobile}
          onChange={(event) => setMobile(event.target.value)}
        />
      </div>
      <div className="field">
        <label>QTY</label>
        <input
          type="number"
          placeholder="3"
          value={qty}
          onChange={(event) => setQty(event.target.value)}
        />
      </div>
      <div className="field">
        <label>Product</label>
        <input
          type="text"
          placeholder="Head phone"
          value={product}
          onChange={(event) => setProduct(event.target.value)}
        />
      </div>
      <div className="field">
        <label>Product Price</label>
        <input
          type="number"
          placeholder="1020"
          value={productPrice}
          onChange={(event) => setProductPrice(event.target.value)}
        />
      </div>
      <div className="field">
        <label>Advance</label>
        <input
          type="number"
          placeholder="500"
          value={advance}
          onChange={(event) => setAdvance(event.target.value)}
        />
      </div>
      <div className="field">
        <label>Update</label>
        <input
          type="text"
          placeholder="Delivered"
          value={update}
          onChange={(event) => setUpdate(event.target.value)}
        />
      </div>
      <div className="field">
        <label>Delivery Charge</label>
        <input
          type="number"
          placeholder="100"
          value={deliveryCharge}
          onChange={(event) => setDeliveryCharge(event.target.value)}
        />
      </div>
      <div className="field">
        <label>Delivery Company</label>
        <input
          type="text"
          placeholder="RedX"
          value={deliveryCompany}
          onChange={(event) => setDeliveryCompany(event.target.value)}
        />
      </div>
      <div className="field">
        <label>Remarks</label>
        <input
          type="text"
          placeholder="Nothing"
          value={remark}
          onChange={(event) => setRemark(event.target.value)}
        />
      </div>

      <div className="field">
        <label>1st Followup</label>
        <input
          type="text"
          placeholder="Processing"
          value={first_followup}
          onChange={(event) => setFirst_followup(event.target.value)}
        />
      </div>

      <div className="field">
        <label>2st Followup</label>
        <input
          type="text"
          placeholder="N/A"
          value={second_followup}
          onChange={(event) => setSecond_followupId(event.target.value)}
        />
      </div>

      <div className="field">
        <label>3st Followup</label>
        <input
          type="text"
          placeholder="N/A"
          value={third_followup}
          onChange={(event) => setThird_followup(event.target.value)}
        />
      </div>
      <div className="field">
        <label>bKash Cost</label>
        <input
          type="number"
          placeholder="20"
          value={bkashCost}
          onChange={(event) => setBkashCost(event.target.value)}
        />
      </div>
      <div className="field">
        <label>Others (VAT, TAX, etc.)</label>
        <input
          type="number"
          placeholder="10"
          value={other}
          onChange={(event) => setOther(event.target.value)}
        />
      </div>
      <div className="field">
        <label>Deposit to Accounts</label>
        <input
          type="number"
          placeholder="800"
          value={depositToAccount}
          onChange={(event) => setDepositToAccount(event.target.value)}
        />
      </div>

      <button type="submit" onClick={UpdateInvoice}>
        Update Order
      </button>
    </div>
  );
};
export default Update;
