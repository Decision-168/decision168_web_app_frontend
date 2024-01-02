import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  if (!token) {
    if (userType === "Admin") {
      return <Navigate to="/super-admin" />;
    } else {
      return <Navigate to="/" />;
    }
  }
  return <Outlet />;
};

export default PrivateRoute;
