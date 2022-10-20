import React from "react";
import { Outlet } from "react-router-dom";
import CartModal from "./CartModal";
import NavBar from "./NavBar";
import { useState } from "react";

const ClientLayout = () => {
  const [cartModalState, setCartModalState] = useState(false);

  return (
    <div className="client-layout">
      <NavBar
        setCartModalState={setCartModalState}
        cartModalState={cartModalState}
      />
      <CartModal cartModalState={cartModalState} />
      <Outlet />
    </div>
  );
};

export default ClientLayout;
