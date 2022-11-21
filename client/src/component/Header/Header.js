import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <NavLink className="link" to="/">
        Home
      </NavLink>
      {/* <NavLink className="link" to="/update">
        Update
      </NavLink> */}
      <NavLink className="link" to="/create">
        Cteate
      </NavLink>
    </div>
  );
}
export default Header;
