import React, { useState } from "react";
import "./SearchOrder.css";

const SearchOrder = ({ setSearchInput, setSearchField, searchField }) => {
  const options = [
    "Invoice_No",
    "Name",
    "Date",
    "Email",
    "Mobile",
    "Product",
    "Address",
    "Update",
  ];
  //   const [selectedOption, setSelectedOption] = useState("");
  return (
    <div className="searchArea">
      <input
        className="searchInput"
        placeholder="Search"
        onChange={(event) => setSearchInput(event.target.value)}
      />
      <select
        className="searchOption select"
        value={searchField}
        onChange={(e) => setSearchField(e.target.value)}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
export default SearchOrder;
