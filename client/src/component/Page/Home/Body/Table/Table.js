import React from "react";
import "./Table.css";
import Axios from "axios";
import Pagination from "./Pagination";
import SearchOrder from "./SearchOrder";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
var XLSX = require("xlsx");
import {
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  startAfter,
  getDocs,
  orderBy,
  limit,
  where,
  query,
  startAt,
  endAt,
} from "firebase/firestore";
import { db } from "../../../../config";
import { async } from "@firebase/util";

function Body({ columnName }) {
  const [invoiceList, setInvoiceList] = useState([]);
  const [downloadOrder, setDownloadOrder] = useState([]);
  const navigate = useNavigate(); // to redirect the page
  const [startQueryAfter, setStartQueryAfter] = useState(Object);
  const [lastOrderFlag, setLastOrderFlag] = useState(true);

  const [searchInput, setSearchInput] = useState("");
  const [searchField, setSearchField] = useState("");
  const [filterInvoice, setFilterInvoice] = useState([]);
  const options = [10, 20, 50, 100, 2000];

  // console.log("Order length is : " + invoiceList.length);

  // Pagenation
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = filterInvoice.slice(firstPostIndex, lastPostIndex);

  // GET Data
  const getAllInvoice = async () => {
    // Axios.get("http://localhost:3001/invoice").then((response) => {
    //   setInvoiceList(response.data);
    console.log("get order");
    // });

    const data = await getDocs(
      query(
        collection(db, "invoice"),
        orderBy("time_stamp", "desc"),
        limit(postPerPage)
      )
    );
    // getting last item from limit query
    const lastVisibleOrder = data.docs[data.docs.length - 1];
    setStartQueryAfter(lastVisibleOrder);

    setInvoiceList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setFilterInvoice(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // Getting more order on button click
  const getMoreOrder = async () => {
    if (startQueryAfter) {
      const data = await getDocs(
        query(
          collection(db, "invoice"),
          orderBy("time_stamp", "desc"),
          startAfter(startQueryAfter),
          limit(postPerPage)
        )
      );
      // getting last item from limit query
      const lastVisibleOrder = data.docs[data.docs.length - 1];
      setStartQueryAfter(lastVisibleOrder);

      setInvoiceList([
        ...invoiceList,
        ...data.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
      ]);
      setFilterInvoice([
        ...filterInvoice,
        ...data.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
      ]);
      setLastOrderFlag(true);
    } else setLastOrderFlag(false);
  };

  useEffect(() => {
    getAllInvoice();
  }, [postPerPage]);

  // Query
  const queryOrder = async (searchField, searchInput) => {
    console.log("call query order by : " + searchField + " : " + searchInput);

    const CamelCase =
      searchInput.charAt(0).toUpperCase() + searchInput.slice(1);

    const data = await getDocs(
      query(
        collection(db, "invoice"),
        orderBy(searchField, "asc"),
        // where(searchField, "==", searchInput),
        // startAt(searchInput)
        // startAfter(searchInput)
        // startAt(searchInput),
        // endAt(searchInput)
        // where(searchField, ">=", searchInput.upper()),
        // where(searchField, "<=", searchInput.lower() + "\uf8ff"),
        // stream()
        // where(searchField, "in", [searchInput,"Maruf"])
        // where("search", "array-contains-any", [searchInput,"Maruf"])
        // where("name", startAt(searchInput))
        // where("name", "==", "Arafat")

        // where(searchField, ">=", searchInput),
        // where(searchField, "<=", searchInput + "\uf8ff")
        startAt(searchInput),
        startAt(CamelCase),
        // startAt(searchInput.toLowerCase()),
        // startAt(searchInput.toUpperCase()),
        endAt(searchInput + "~"),
        endAt(CamelCase + "~")
        // endAt(searchInput.toLowerCase() + "~"),
        // endAt(searchInput.toUpperCase() + "~")
        // endAt(searchInput + "~")
        // startAt(searchInputReverse),
        // endAt(searchInputReverse + "~")
      )
    );

    console.log(data);
    setFilterInvoice(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // Filter order inside table
  useEffect(() => {
    if (searchField == "") setSearchField("invoice_no"); // in first load default search field
    if (searchInput == "") setFilterInvoice(invoiceList);
    else {
      // setFilterInvoice(
      //   invoiceList.filter((invoice) => {
      //     return invoice[`${searchField.toLowerCase()}`]
      //       .toString()
      //       .toLowerCase()
      //       .includes(searchInput.toLowerCase());
      //   })
      // );
      queryOrder(searchField.toLowerCase(), searchInput);
      setCurrentPage(1);
    }
  }, [searchInput, searchField]);
  // Download data as XLSX
  const downloadAsXLSX = () => {
    console.log("XLSX");
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(currentPost);
    XLSX.utils.book_append_sheet(wb, ws, "invoice");
    XLSX.writeFile(wb, "Order.xlsx");
  };

  // GET All order to download
  const downloadAllOrder = async () => {
    const data = await getDocs(
      query(collection(db, "invoice"), orderBy("time_stamp", "desc"))
    );
    setDownloadOrder(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // Download data as XLSX
  useEffect(() => {
    if (downloadOrder != "") {
      console.log("use effect");
      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(downloadOrder);
      XLSX.utils.book_append_sheet(wb, ws, "invoice");
      XLSX.writeFile(wb, "Order.xlsx");
    }
  }, [downloadOrder]);

  return (
    <div>
      <h1>Order List</h1>
      {/* Download data as CSV */}
      {/* <CSVLink data={invoiceList} filename="Order" className="button download">
        Download as CSV
      </CSVLink> */}
      {/* Download data as XLSX */}

      <SearchOrder
        setSearchInput={setSearchInput}
        setSearchField={setSearchField}
        searchField={searchField}
      />

      <button className="button download" onClick={downloadAsXLSX}>
        {" "}
        Download Order
      </button>
      <button className="button download" onClick={downloadAllOrder}>
        {" "}
        Download All Order
      </button>
      <div className="orderPerPage">
        <div className="orderPerPageText">Order par page : </div>
        <select
          className="orderPerPageSelect"
          value={postPerPage}
          onChange={(e) => setPostPerPage(e.target.value)}
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <table id="table">
          <thead>
            <tr>
              {columnName.map((headName, index) => (
                <TableHeadName headName={headName} />
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentPost.map((dataObject, index) => (
              <tr key={dataObject.id}>
                {columnName.map((columnsItem, index) => {
                  return <td>{dataObject[`${columnsItem.value}`]}</td>;
                })}

                {
                  <td className="actionButton">
                    <NavLink
                      className="button update"
                      to={`/update/${dataObject.id}`}
                      state={dataObject}
                    >
                      Update
                    </NavLink>
                    <button
                      className="button delete"
                      onClick={() => {
                        // deleteInvoice(dataObject.id);
                        deleteWarning(dataObject.id);
                        getAllInvoice();
                      }}
                    >
                      Delete
                    </button>
                  </td>
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalPost={invoiceList.length}
        postPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
        getMoreOrder={getMoreOrder}
        currentPage={currentPage}
        lastOrderFlag={lastOrderFlag}
      />
    </div>
  );
}

const TableHeadName = ({ headName }) => <th>{headName.heading}</th>;

const deleteWarning = (id) => {
  var result = confirm("Are you sure to delete?");
  if (result) {
    deleteInvoice(id);
  }
};

// Delete
const deleteInvoice = (id) => {
  // Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {});
  deleteDoc(doc(db, "invoice", id));
};

export default Body;
