import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateSuperAdminRoute = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/super-admin/" />;
  }
  return <Outlet />;
};

export default PrivateSuperAdminRoute;
