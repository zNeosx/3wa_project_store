import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { decodeToken, isExpired } from "react-jwt";

const PrivateRoutes = () => {
  const token = localStorage.getItem("token");
  const myDecodedToken = decodeToken(token);
  const isMyExpiredToken = isExpired(token);
  return token && myDecodedToken.role === "user" && !isMyExpiredToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
