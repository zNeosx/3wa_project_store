import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import CartModal from "./CartModal";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { cartRequest } from "../api";
import { useDispatch } from "react-redux";
import { init } from "../features/cartSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClientLayout = () => {
  const [cartModalState, setCartModalState] = useState(false);
  const dispatch = useDispatch();

  let location = useLocation();
  useEffect(() => {
    setCartModalState(false);
  }, [location]);
  useEffect(() => {
    // getAllFoods();
    cartRequest
      .getOne()
      .then((res) => {
        dispatch(init(res.data.foods));
      })
      .catch((err) => console.log(err));
  }, [dispatch]);
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
