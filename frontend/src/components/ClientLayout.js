import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import CartModal from "./CartModal";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClientLayout = () => {
  const [cartModalState, setCartModalState] = useState(false);
  let location = useLocation();
  useEffect(() => {
    setCartModalState(false);
  }, [location]);

  return (
    <div className="client-layout">
      <ToastContainer />

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
