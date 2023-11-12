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
const PortfolioView = lazy(() => import("../components/portfolio/viewporfolio/"));
const CreateEditPortfolio = lazy(() => import("../components/portfolio/createEditPortfolio"));
const PortfolioGoals = lazy(() => import("../components/GoalsAndStrategies/portfolio-goals/view-goals"));
const GoalsOverview = lazy(() => import("../components/GoalsAndStrategies/goals-overview"));
const KPIOverview = lazy(() => import("../components/GoalsAndStrategies/kpi-overview"));
const Project = lazy(() => import("../components/project"));
const Archive = lazy(() => import("../components/archive"));
const Trash = lazy(() => import("../components/trash"));
const Tasks = lazy(() => import("../components/Tasks"));
const CreateEditTask = lazy(() => import("../components/Tasks/createEditTask"));
const TaskOverview = lazy(() => import("../components/Tasks/taskOverview"));

const RouteIndex = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
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
                <PortfolioGoals />
              </DashboardLayout>
            }
          />
          <Route
            path="/goal-overview"
            element={
              <DashboardLayout>
                <GoalsOverview />
              </DashboardLayout>
            }
          />
          <Route
            path="/portfolio-tasks-list"
            element={
              <DashboardLayout>
                <Tasks />
              </DashboardLayout>
            }
          />
          <Route
            path="/tasks-create"
            element={
              <DashboardLayout>
                <CreateEditTask />
              </DashboardLayout>
            }
          />
          <Route
            path="/tasks-overview"
            element={
              <DashboardLayout>
                <TaskOverview />
              </DashboardLayout>
            }
          />
          <Route
            path="/kpi-overview"
            element={
              <DashboardLayout>
                <KPIOverview />
              </DashboardLayout>
            }
          />
          <Route
            path="/portfolio-projects-list"
            element={
              <DashboardLayout>
                <Project />
              </DashboardLayout>
            }
          />
        </Route>
        <Route
          path="/archive"
          element={
            <DashboardLayout>
              <Archive />
            </DashboardLayout>
          }
        />
        <Route
          path="/trash"
          element={
            <DashboardLayout>
              <Trash />
            </DashboardLayout>
          }
        />
        <Route path="/" element={<PublicRoute />}>
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
