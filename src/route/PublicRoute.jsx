import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  if (token) {
    if (userType) {
      return <Navigate to="/super-admin/dashboard" />;
    } else {
      return <Navigate to="/dashboard" />;
    }
  }
  return <Outlet />;
};

export default PublicRoute;
