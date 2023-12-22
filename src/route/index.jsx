import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { lazy, useState , useEffect} from "react";
import DashboardLayout from "../components/layouts/dashboardLayout";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import PageNotFound from "../utils/PageNotFound";
import SubtaskOverview from "../components/Tasks/subtaskOverview";
import Pricing from "../components/pricing";
import VerifyInviteMember from "../components/portfolio/viewporfolio/subComponents/VerifyInviteMember";

const Login = lazy(() => import("../components/auth/login"));
const Register = lazy(() => import("../components/auth/register"));
const ResetPassword = lazy(() => import("../components/auth/resetpassword"));
const ChangePassword = lazy(() => import("../components/auth/changepassword"));
const Profile = lazy(() => import("../components/profile"));
const Dashboard = lazy(() => import("../components/dashboard"));
const Calendar = lazy(() => import("../components/calendar"));
const Community = lazy(() => import("../components/community"));
const UpdateProfile = lazy(() => import("../components/updateprofile"));
const FileCabinet = lazy(() => import("../components/filecabinet"));
const PortfolioView = lazy(() => import("../components/portfolio/viewporfolio/"));
const AllPortfolios = lazy(() => import("../components/portfolio/portfolios"));

const CreateEditPortfolio = lazy(() => import("../components/portfolio/createEditPortfolio"));
const PortfolioGoals = lazy(() =>
  import("../components/GoalsAndStrategies/portfolio-goals/view-goals")
);
const GoalsOverview = lazy(() => import("../components/GoalsAndStrategies/goals-overview"));
const GoalOverviewRequest = lazy(() =>
  import("../components/GoalsAndStrategies/goal-overview-request")
);
const KPIOverview = lazy(() => import("../components/GoalsAndStrategies/kpi-overview"));
const Project = lazy(() => import("../components/project"));
const ProjectOverview = lazy(() =>
  import("../components/project/projects-overview/ProjectOverview")
);
const ProjectOverviewRequest = lazy(() =>
  import("../components/project/projects-overview-request")
);
const Archive = lazy(() => import("../components/archive"));
const Trash = lazy(() => import("../components/trash"));

const DashboardTasks = lazy(() => import("../components/Tasks/DashboardTasks")); //dashboard
const PortfolioTasksList = lazy(() => import("../components/Tasks")); //side bar
const PortfolioTasks = lazy(() => import("../components/Tasks/PortfolioTasks")); // from the porfolio page

// const CreateEditTask = lazy(() => import("../components/Tasks/createEditTask"));
const TaskOverview = lazy(() => import("../components/Tasks/taskOverview"));
const MyAlert = lazy(() => import("../components/myAlert"));
const AccountVerification = lazy(() =>
  import("../components/auth/accountVerification")
);

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
            path="/pricing-packages"
            element={
              <DashboardLayout>
                <Pricing />
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
            path="/portfolio"
            element={
              <DashboardLayout>
                <AllPortfolios />
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
            path="/portfolio-edit/:id"
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
            path="/goal-overview/:gid"
            element={
              <DashboardLayout>
                <GoalsOverview />
              </DashboardLayout>
            }
          />
          <Route
            path="/goal-overview-request/:gid"
            element={
              <DashboardLayout>
                <GoalOverviewRequest />
              </DashboardLayout>
            }
          />
          <Route
            path="/project-tasks-list"
            element={
              <DashboardLayout>
                <h1>Project's tasks</h1>
              </DashboardLayout>
            }
          />

          <Route
            path="/all-tasks"
            element={
              <DashboardLayout>
                <DashboardTasks />
              </DashboardLayout>
            }
          />
          <Route
            path="/today-tasks"
            element={
              <DashboardLayout>
                <h1>Today's tasks</h1>
              </DashboardLayout>
            }
          />
          <Route
            path="/week-tasks"
            element={
              <DashboardLayout>
                <h1>Week's tasks</h1>
              </DashboardLayout>
            }
          />
           <Route
            path="/portfolio-tasks-list"
            element={
              <DashboardLayout>
              <PortfolioTasksList />
              </DashboardLayout>
            }
          />
          <Route
            path="/portfolio-tasks/:portfolioId"
            element={
              <DashboardLayout>
                <PortfolioTasks/>
              </DashboardLayout>
            }
          />
          <Route
            path="/my-alerts"
            element={
              <DashboardLayout>
                <MyAlert />
              </DashboardLayout>
            }
          />
          {/* <Route
            path="/tasks-create"
            element={
              <DashboardLayout>
                <CreateEditTask />
              </DashboardLayout>
            }
          /> */}
          <Route
            path="/tasks-overview/:taskId"
            element={
              <DashboardLayout>
                <TaskOverview />
              </DashboardLayout>
            }
          />
          <Route
            path="/subtasks-overview/:subTaskId"
            element={
              <DashboardLayout>
                <SubtaskOverview />
              </DashboardLayout>
            }
          />
          <Route
            path="/kpi-overview/:sid"
            element={
              <DashboardLayout>
                <KPIOverview />
              </DashboardLayout>
            }
          />
          <Route
            path="/file-cabinet"
            element={
              <DashboardLayout>
                <FileCabinet />
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
          <Route
            path="/projects-overview/:pid"
            element={
              <DashboardLayout>
                <ProjectOverview />
              </DashboardLayout>
            }
          />
          <Route
            path="/projects-overview-request/:pid"
            element={
              <DashboardLayout>
                <ProjectOverviewRequest />
              </DashboardLayout>
            }
          />

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
          <Route
            exact
            path="/portfolio-invite-request/:portfolioId/:primaryId/:flag"
            element={<VerifyInviteMember />}
          />
        </Route>

        <Route path="/" element={<PublicRoute />}>
          <Route path="/register" element={<Register />} />
          <Route
            exact
            path="/account-verification/:token"
            element={<AccountVerification />}
          />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            exact
            path="/change-password/:id"
            element={<ChangePassword />}
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default RouteIndex;
