import Axios from "axios";
import React, { useState } from "react";
import "./Create.css";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Create = () => {
  const navigate = useNavigate();

  let requiredFlag = true;
  const [emptyErrorInvoice, setEmptyErrorInvoice] = useState("");
  const [emptyErrorQty, setEmptyErrorQty] = useState("");
  const [emptyErrorName, setEmptyErrorName] = useState("");
  const [emptyErrorMobile, setEmptyErrorMobile] = useState("");

  //   const [id, setId] = useState(0);
  const [date, setDate] = useState(new Date());
  const [invoice, setInvoice] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [qty, setQty] = useState("");
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
    // Axios.post("http://localhost:3001/create", {
    //   // send it to backend from frontend.
    //   date: date,
    //   invoice: invoice,
    //   name: name,
    //   address: address,
    //   email: email,
    //   mobile: mobile,
    //   qty: qty,
    //   product: product,
    //   productPrice: productPrice,
    //   advance: advance,
    //   update: update,
    //   deliveryCharge: deliveryCharge,
    //   deliveryCompany: deliveryCompany,
    //   remark: remark,
    //   first_followup: first_followup,
    //   second_followup: second_followup,
    //   third_followup: third_followup,
    //   bkashCost: bkashCost,
    //   other: other,
    //   depositToAccount: depositToAccount,
    // }).then(() => {
    //   createStatus = "Invoice Create Success";
    //   console.log(createStatus);
    //   navigate("/");
    // });

    if (invoice == "") {
      requiredFlag = false;
      setEmptyErrorInvoice("Invoice can't be empty");
    }
    if (qty == "") {
      requiredFlag = false;
      setEmptyErrorQty("Qty can't be empty");
    }
    if (mobile == "") {
      requiredFlag = false;
      setEmptyErrorMobile("Mobile can't be empty");
    }
    if (name == "") {
      requiredFlag = false;
      setEmptyErrorName("Name can't be empty");
    }

    if (requiredFlag) {
      addDoc(collection(db, "invoice"), {
        date: date.toDateString(),
        invoice_no: invoice,
        name: name,
        address: address,
        email: email,
        mobile: mobile,
        qty: qty,
        product: product,
        product_price: productPrice,
        advance: advance,
        update: update,
        delivery_charge: deliveryCharge,
        delivery_company: deliveryCompany,
        remark: remark,
        first_followup: first_followup,
        second_followup: second_followup,
        third_followup: third_followup,
        bkash_cost: bkashCost,
        other: other,
        deposit_to_account: depositToAccount,
        time_stamp: serverTimestamp(),
      })
        .then(() => {
          //Data save Successfully
          console.log("data submitted");
          navigate("/");
        })
        .catch((error) => {
          //Failed
          console.log(error);
        });
    } else console.log(emptyErrorInvoice);
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
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          isClearable
          dateFormat="EE, MMMM dd, yyyy "
          placeholderText="Select date"
        />
      </div>
      {/* <div className="field">toISOString
        <label>Date</label>
        <input
          type="date"
          onChange={(event) =>
            setDate(new Date(event.target.value).toDateString())
          }
        />
      </div> */}
      <div className="field">
        <label>Invoice No</label>
        <span className="error"> *</span>
        <input
          type="number"
          placeholder="6"
          onChange={(event) => {
            setInvoice(event.target.value);
            setEmptyErrorInvoice("");
          }}
        />
        <span className="error" aria-live="polite">
          {emptyErrorInvoice}
        </span>
      </div>
      <div className="field">
        <label>Name</label>
        <span className="error"> *</span>
        <input
          type="text"
          placeholder="Arafat"
          onChange={(event) => {
            setName(event.target.value);
            setEmptyErrorName("");
          }}
        />
        <span className="error" aria-live="polite">
          {emptyErrorName}
        </span>
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
        <span className="error"> *</span>
        <input
          type="number"
          placeholder="01777766332"
          onChange={(event) => {
            setMobile(event.target.value);
            setEmptyErrorMobile("");
          }}
        />
        <span className="error" aria-live="polite">
          {emptyErrorMobile}
        </span>
      </div>
      <div className="field">
        <label>QTY</label>
        <span className="error"> *</span>
        <input
          type="number"
          placeholder="3"
          onChange={(event) => {
            setQty(event.target.value);
            setEmptyErrorQty("");
          }}
        />
        <span className="error" aria-live="polite">
          {emptyErrorQty}
        </span>
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
        <label>Order Update</label>
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
        Create Order
      </button>
      <div>
        <label>{createStatus}</label>
      </div>
    </div>
  );
};
export default Create;
