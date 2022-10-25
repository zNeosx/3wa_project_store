import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRequest } from "../api/index.js";
import { initFoodState, initUserState } from "../features/adminSlice.js";
import Sidebar from "./Sidebar.jsx";

export default function AdminLayout() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const adminGetAllUsers = async () => {
    adminRequest
      .getUsers()
      .then((res) => {
        dispatch(initUserState(res.data));
      })
      .catch((err) => console.log(err));
  };

  const adminGetAllFoods = async () => {
    adminRequest
      .getFoods()
      .then((res) => {
        dispatch(initFoodState(res.data));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      adminGetAllUsers();
      adminGetAllFoods();
    }
  }, []);

  return (
    <div className="admin-layout">
      <ToastContainer />
      {/* <Sidebar /> */}
      <Outlet />
    </div>
  );
}
