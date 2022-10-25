import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [sidebarState, setSidebarState] = useState(false);

  const toggleSidebar = () => {
    setSidebarState(!sidebarState);
  };

  return (
    <div id="sidebar" className={sidebarState ? "sidebar-open" : ""}>
      <div className="sidebar_header">
        <h1>Administration</h1>
      </div>
      <ul className="sidebar_link_container">
        <li>
          <NavLink
            to="/admin/users"
            className="sidebar_link"
            onClick={() => toggleSidebar()}
          >
            Utilisateurs
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/foods"
            className="sidebar_link"
            onClick={() => toggleSidebar()}
          >
            Burgers
          </NavLink>
        </li>
      </ul>

      <div className="sidebar_btn" onClick={() => toggleSidebar()}>
        <div className="sidebar_btn_line"></div>
        <div className="sidebar_btn_line"></div>
      </div>
    </div>
  );
}
