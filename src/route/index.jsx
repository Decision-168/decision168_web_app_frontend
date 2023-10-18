import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../components/dashboard";
import DashboardLayout from "../components/layouts/dashboardLayout";
import Login from "../components/auth/login";
import Register from "../components/auth/register";
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <h1>Page not found</h1>,
  },
]);
