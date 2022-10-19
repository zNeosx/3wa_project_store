import React from "react";
import { NavLink } from "react-router-dom";
import Avatar, { genConfig } from 'react-nice-avatar'
import {IoMdAddCircle} from 'react-icons/io'

const NavBar = () => {
  const config = genConfig(JSON.parse(localStorage.getItem("avatar") || "{}"));

  return (
    <nav id="nav">
      <div className="nav-container page-container">
      <div className="logo">
        <NavLink to="/">
          Creative Blog
        </NavLink>
      </div>
      <ul>
          <li>
            <NavLink to="/add_post" className={'add-link'}>
              <IoMdAddCircle className="add-icon" />
              <span>Publication</span>
            </NavLink>
        </li>
        <li className='avatar-block'>
          <NavLink to="/dashboard" className={'avatar-link'}>
            <Avatar className="avatar" {...config} />
          </NavLink>
        </li>
      </ul>
      </div>
    </nav>
  );
};

export default NavBar;
