import React from "react";
import "./Table.css";
import Axios from "axios";
import Pagination from "./Pagination";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
var XLSX = require("xlsx");

function Body({ columnName }) {
  const [invoiceList, setInvoiceList] = useState([]);
  const navigate = useNavigate(); // to redirect the page

  // Pagenation
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(8);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = invoiceList.slice(firstPostIndex, lastPostIndex);
  console.log("pagenation is : " + typeof currentPost);

  // GET Data
  const getAllInvoice = () => {
    Axios.get("http://localhost:3001/invoice").then((response) => {
      setInvoiceList(response.data);
      console.log("get invoice");
    });
  };
  useEffect(() => {
    getAllInvoice();
  }, []);

  // Update
  const Update = () => {
    console.log("Update is : ");
  };

  // Download data as XLSX
  const downloadAsXLSX = () => {
    console.log("XLSX");
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(invoiceList);
    XLSX.utils.book_append_sheet(wb, ws, "invoice");
    XLSX.writeFile(wb, "invoice.xlsx");
  };

  return (
    <div>
      <h1>Data Table</h1>
      {/* Download data as CSV */}
      <CSVLink
        data={invoiceList}
        filename="Invoice"
        className="button download"
      >
        Download as CSV
      </CSVLink>
      {/* Download data as XLS */}
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="button download"
        table="table"
        filename="Invoice"
        sheet="tablexls"
        buttonText="Download as XLS"
      />
      {/* Download data as XLSX */}
      <button className="button download" onClick={downloadAsXLSX}>
        {" "}
        Download as XLSX
      </button>
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
              <TableRow dataObject={dataObject} columnName={columnName} />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalPost={invoiceList.length}
        postPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
}

const TableHeadName = ({ headName }) => <th>{headName.heading}</th>;

const TableRow = ({ dataObject, columnName }) => (
  <tr key={dataObject.id}>
    {columnName.map((columnsItem, index) => {
      return <td>{dataObject[`${columnsItem.value}`]}</td>;
    })}

    {
      <td>
        <button
          className="button delete"
          onClick={() => {
            deleteInvoice(dataObject.id);
          }}
        >
          Delete
        </button>
        <NavLink
          // onClick={() => {
          //   updateInvoice(dataObject);
          // }}
          className="button update"
          to={`/update/${dataObject.id}`}
          state={dataObject}
        >
          Update
        </NavLink>
      </td>
    }
  </tr>
);

// Delete
const deleteInvoice = (id) => {
  Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
    setInvoiceList(response.data);
  });
};

//Update
const updateInvoice = (dataObject) => {
  console.log("update : " + dataObject.id);
  console.log(dataObject);
};

export default Body;
