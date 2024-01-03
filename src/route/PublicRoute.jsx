import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = localStorage.getItem("token");
  const adminToken = localStorage.getItem("adminToken");
  const userType = localStorage.getItem("userType");

  if (token) {
    return <Navigate to="/dashboard" />;
  }
  if (adminToken) {
    return <Navigate to="/super-admin/dashboard" />;
  }
  return <Outlet />;
};

export default PublicRoute;
