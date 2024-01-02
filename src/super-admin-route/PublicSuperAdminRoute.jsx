import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicSuperAdminRoute = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/super-admin/dashboard" />;
  }
  return <Outlet />;
};

export default PublicSuperAdminRoute;
