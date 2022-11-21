// npm init
// npm install mysql express
// node index.js
// yarn add cors

const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// DB connection
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "arafat64",
  database: "invoiceSystem",
});

// post into database
app.post("/create", (req, res) => {
  const date = req.body.date;
  const invoice = req.body.invoice;
  const name = req.body.name;
  const address = req.body.address;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const qty = req.body.qty;
  const product = req.body.product;
  const productPrice = req.body.productPrice;
  const advance = req.body.advance;
  const update = req.body.update;
  const deliveryCharge = req.body.deliveryCharge;
  const deliveryCompany = req.body.deliveryCompany;
  const remark = req.body.remark;
  const first_followup = req.body.first_followup;
  const second_followup = req.body.second_followup;
  const third_followup = req.body.third_followup;
  const bkashCost = req.body.bkashCost;
  const other = req.body.other;
  const depositToAccount = req.body.depositToAccount;
  const id = null;

  db.query(
    "INSERT INTO invoice VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    // "INSERT INTO invoice (`date`,`invoice_no`,`name`,`address`,`email`,`mobile`,`qty`,`product`,`product_price`,`advance`,`update`,`delivery_charge`,`delivery_company`,`remarks`,`first_followup`,`second_followup`,`third_followup`,`bkash_cost`,`others_vat_tax`,`deposit_to_accounts`) VALUES( ''2022/4/4', '123', 'pqr', 'gulshan', 'arafatdf@uashfjm.com', '34567', '34', 'edgfdm', '34', '43', 'na', '34', 'sdfvcx', 'dsf', 'dfs', 'dsf', 'sadf', '3', '3', '4')",
    // (id,date,invoice_no,name,address,email,mobile,qty,product,product_price,advance,update,delivery_charge,delivery_company,remarks,first_followup,second_followup,third_followup,bkash_cost,others_vat_tax,deposit_to_accounts)
    [
      id,
      date,
      invoice,
      name,
      address,
      email,
      mobile,
      qty,
      product,
      productPrice,
      advance,
      update,
      deliveryCharge,
      deliveryCompany,
      remark,
      first_followup,
      second_followup,
      third_followup,
      bkashCost,
      other,
      depositToAccount,
    ],
    (err, result) => {
      if (err) {
        console.log("error is : " + err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

// Update
app.put("/update/:id", (req, res) => {
  let id = req.params.id;

  console.log("id is : " + id);
  const date = req.body.date;
  const invoice = req.body.invoice;
  const name = req.body.name;
  const address = req.body.address;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const qty = req.body.qty;
  const product = req.body.product;
  const productPrice = req.body.productPrice;
  const advance = req.body.advance;
  const update = req.body.update;
  const deliveryCharge = req.body.deliveryCharge;
  const deliveryCompany = req.body.deliveryCompany;
  const remark = req.body.remark;
  const first_followup = req.body.first_followup;
  const second_followup = req.body.second_followup;
  const third_followup = req.body.third_followup;
  const bkashCost = req.body.bkashCost;
  const other = req.body.other;
  const depositToAccount = req.body.depositToAccount;
  console.log("calling Update " + update);
  console.log("calling Update " + typeof update);

  db.query(
    "UPDATE invoice SET date=?,invoice_no=?,name=?,address=?,email=?,mobile=?,qty=?,product=?,product_price=?,advance=? ,`update`=?,delivery_charge=?,delivery_company=?,remarks=?,first_followup=?,second_followup=?,third_followup=?,bkash_cost=?,others_vat_tax=?,deposit_to_accounts=?  WHERE id=?",
    // "INSERT INTO invoice (`date`,`invoice_no`,`name`,`address`,`email`,`mobile`,`qty`,`product`,`product_price`,`advance`,`update`,`delivery_charge`,`delivery_company`,`remarks`,`first_followup`,`second_followup`,`third_followup`,`bkash_cost`,`others_vat_tax`,`deposit_to_accounts`) VALUES( ''2022/4/4', '123', 'pqr', 'gulshan', 'arafatdf@uashfjm.com', '34567', '34', 'edgfdm', '34', '43', 'na', '34', 'sdfvcx', 'dsf', 'dfs', 'dsf', 'sadf', '3', '3', '4')",
    // (id,date,invoice_no,name,address,email,mobile,qty,product,product_price,advance,update,delivery_charge,delivery_company,remarks,first_followup,second_followup,third_followup,bkash_cost,others_vat_tax,deposit_to_accounts)

    [
      date,
      invoice,
      name,
      address,
      email,
      mobile,
      qty,
      product,
      productPrice,
      advance,
      update,
      deliveryCharge,
      deliveryCompany,
      remark,
      first_followup,
      second_followup,
      third_followup,
      bkashCost,
      other,
      depositToAccount,
      id,
    ],
    (err, result) => {
      if (err) {
        console.log("error is : " + err);
      } else {
        res.send(result);
      }
    }
  );
});

// get request
app.get("/invoice", (req, res) => {
  db.query("SELECT * FROM invoice", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});

// Delete
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM invoice WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Search
app.get("/search/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM invoice where id=?", id, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.listen(3001, () => {
  console.log("Invoice server is running on port 3001");
});
