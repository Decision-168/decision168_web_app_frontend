import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../components/dashboard";
import DashboardLayout from "../components/layouts/dashboardLayout";
import Login from "../components/auth/login";
import Register from "../components/auth/register";
import ResetPassword from "../components/auth/resetpassword";
import ChangePassword from "../components/auth/changepassword";
import Profile from "../components/profile";
import UpdateProfile from "../components/updateprofile";
import PortfolioView from "../components/portfolio/viewporfolio/";
import CreatePortfolio from "../components/portfolio/createportfolio";
import EditPortfolio from "../components/portfolio/editPortfolio";
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
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
  {
    path: "/profile",
    element: (
      <DashboardLayout>
        <Profile />
      </DashboardLayout>
    ),
  },
  {
    path: "/update-profile",
    element: (
      <DashboardLayout>
        <UpdateProfile />
      </DashboardLayout>
    ),
  },
  {
    path: "/portfolio-view",
    element: (
      <DashboardLayout>
        <PortfolioView />
      </DashboardLayout>
    ),
  },
  {
    path: "/portfolio-create",
    element: (
      <DashboardLayout>
        <CreatePortfolio />
      </DashboardLayout>
    ),
  },
  {
    path: "/portfolio-edit",
    element: (
      <DashboardLayout>
        <EditPortfolio />
      </DashboardLayout>
    ),
  },

  {
    path: "*",
    element: <h1>Page not found</h1>,
  },
]);
