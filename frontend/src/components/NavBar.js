import React from "react";
import { NavLink } from "react-router-dom";
import Avatar, { genConfig } from "react-nice-avatar";
import { BsFillBagCheckFill } from "react-icons/bs";

const NavBar = ({ setCartModalState, cartModalState }) => {
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
          <li>
            <BsFillBagCheckFill
              className="cart-icon"
              onClick={() => setCartModalState(!cartModalState)}
            />
          </li>
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
