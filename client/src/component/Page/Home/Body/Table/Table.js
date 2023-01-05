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

  console.log("length is : " + invoiceList.length);

  // Pagenation
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(3);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = invoiceList.slice(firstPostIndex, lastPostIndex);

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
      <h1>Order List</h1>
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
        currentPage={currentPage}
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
  Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {});
};

export default Body;
