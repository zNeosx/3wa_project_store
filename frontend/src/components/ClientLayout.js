import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const ClientLayout = () => {
  return (
    <div className="client-layout">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default ClientLayout;
