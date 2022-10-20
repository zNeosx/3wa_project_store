import React from "react";
import { NavLink } from "react-router-dom";
import Avatar, { genConfig } from "react-nice-avatar";
import { IoMdAddCircle } from "react-icons/io";

const NavBar = () => {
  const config = genConfig(
    JSON.parse(sessionStorage.getItem("avatar") || "{}")
  );

  return (
    <nav id="nav">
      <div className="nav-container page-container">
        <div className="logo">
          <NavLink to="/">Burger Land</NavLink>
        </div>
        <ul>
          <li className="avatar-block">
            <NavLink to="/dashboard" className={"avatar-link"}>
              <Avatar className="avatar" {...config} />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
