import React, { useState } from "react";
import "./SearchOrder.css";

const SearchOrder = () => {
  const options = [
    "Name",
    "Date",
    "Email",
    "Mobile",
    "Product",
    "Address",
    "Update",
  ];
  const [selectedOption, setSelectedOption] = useState("");
  return (
    <div className="searchArea">
      <input
        className="searchInput"
        placeholder="Search"
        // onChange={(event) => setSearchId(event.target.value)}
      />
      <select
        className="searchOption"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
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
