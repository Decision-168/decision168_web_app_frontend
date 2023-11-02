import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { lazy } from "react";
import DashboardLayout from "../components/layouts/dashboardLayout";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import PageNotFound from "../utils/PageNotFound";

const Login = lazy(() => import("../components/auth/login"));
const Register = lazy(() => import("../components/auth/register"));
const ResetPassword = lazy(() => import("../components/auth/resetpassword"));
const ChangePassword = lazy(() => import("../components/auth/changepassword"));
const Profile = lazy(() => import("../components/profile"));
const Dashboard = lazy(() => import("../components/dashboard"));
const Calendar = lazy(() => import("../components/calendar"));
const Community = lazy(() => import("../components/community"));
const UpdateProfile = lazy(() => import("../components/updateprofile"));
const PortfolioView = lazy(() =>
  import("../components/portfolio/viewporfolio/")
);
const ViewGoals = lazy(() =>
  import("../components/GoalsAndStrategies/view-goals")
);
const CreateGoals = lazy(() => import("../components/GoalsAndStrategies/create-goals"));
const CreateEditPortfolio = lazy(() =>
  import("../components/portfolio/createEditPortfolio")
);

const RouteIndex = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route
            path="/dashboard"
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            }
          />
          <Route
            path="/calendar"
            element={
              <DashboardLayout>
                <Calendar />
              </DashboardLayout>
            }
          />
          <Route
            path="/community"
            element={
              <DashboardLayout>
                <Community />
              </DashboardLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            }
          />
          <Route
            path="/update-profile"
            element={
              <DashboardLayout>
                <UpdateProfile />
              </DashboardLayout>
            }
          />
          <Route
            path="/portfolio-view"
            element={
              <DashboardLayout>
                <PortfolioView />
              </DashboardLayout>
            }
          />
          <Route
            path="/portfolio-create"
            element={
              <DashboardLayout>
                <CreateEditPortfolio />
              </DashboardLayout>
            }
          />
          <Route
            path="/portfolio-edit"
            element={
              <DashboardLayout>
                <CreateEditPortfolio />
              </DashboardLayout>
            }
          />
          <Route
            path="/portfolio-goals"
            element={
              <DashboardLayout>
                <ViewGoals />
              </DashboardLayout>
            }
          />
          <Route
            path="/goal-create"
            element={
              <DashboardLayout>
                <CreateGoals />
              </DashboardLayout>
            }
          />
        </Route>
        <Route path="/" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default RouteIndex;
