import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { foodsRequest, cartRequest } from "../api";
import { init } from "../features/cartSlice";
import CartModal from "./CartModal";
import NavBar from "./NavBar";

const ClientLayout = ({ setIsLoading, setFoods }) => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart.cart);
  const [cartModalState, setCartModalState] = useState(false);

  let location = useLocation();

  const getAllFoods = async () => {
    foodsRequest
      .getAll()
      .then((res) => {
        setFoods(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCartUser = async () => {
    cartRequest
      .getOne()
      .then((res) => {
        dispatch(init(res.data.foods));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (sessionStorage.getItem("token") && cartState.length === 0) {
      getAllFoods();
      getCartUser();
    }
  }, []);

  useEffect(() => {
    setCartModalState(false);
  }, [location]);

  useEffect(() => {
    if (cartState.length === 0) {
      setCartModalState(false);
    }
  }, [cartState]);
  return (
    <div className="client-layout">
      <ToastContainer />
      <NavBar
        setCartModalState={setCartModalState}
        cartModalState={cartModalState}
      />
      <CartModal
        cartModalState={cartModalState}
        setCartModalState={setCartModalState}
      />
      <Outlet />
    </div>
  );
};

export default ClientLayout;
