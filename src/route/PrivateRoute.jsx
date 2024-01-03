import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  const adminToken = localStorage.getItem("adminToken");
  // const userType = localStorage.getItem("userType");
  if (token === undefined) {
    return <Navigate to="/" />;
  }
  if (adminToken === undefined) {
    return <Navigate to="/super-admin" />;
  }
  return <Outlet />;
};

export default PrivateRoute;
