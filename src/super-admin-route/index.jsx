import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import DashboardLayout from "../components/superAdmin/layouts/dashboardLayout";
import PageNotFound from "../utils/PageNotFound";
import PrivateSuperAdminRoute from "./PrivateSuperAdminRoute";

const Login = lazy(() => import("../components/superAdmin/auth/login"));
const Dashboard = lazy(() => import("../components/superAdmin/dashboard"));
const Quotes = lazy(() => import("../components/superAdmin/quotes"));
const RegisteredUsers = lazy(() =>
  import("../components/superAdmin/registeredUsers")
);
const DeactivatedUsers = lazy(() =>
  import(
    "../components/superAdmin/registeredUsers/subComponents/deactivatedUsers"
  )
);
const RefundList = lazy(() =>
  import("../components/superAdmin/registeredUsers/subComponents/refundList")
);
const MenuPricing = lazy(() => import("../components/superAdmin/menuPricing"));
const EnterpriseLeads = lazy(() =>
  import("../components/superAdmin/enterpriseLeads")
);
const AdSetting = lazy(() => import("../components/superAdmin/adSetting"));
const CouponSetting = lazy(() =>
  import("../components/superAdmin/couponSetting")
);
const Community = lazy(() => import("../components/superAdmin/community"));
const Category = lazy(() =>
  import(
    "../components/superAdmin/community/subComponents/decisionMakersCategories"
  )
);
const Agreement = lazy(() =>
  import("../components/superAdmin/community/subComponents/agreement")
);
const TicketManagement = lazy(() =>
  import("../components/superAdmin/ticketManagement")
);
const TicketOverview = lazy(() =>
  import(
    "../components/superAdmin/ticketManagement/subComponents/ticketOverview"
  )
);
const Supporters = lazy(() => import("../components/superAdmin/supporters"));

const SuperAdminRouteIndex = () => {
  return (
    <Router>
      <Routes>
        <Route path="/super-admin/" element={<Login />} />
        <Route path="/super-admin/" element={<PrivateSuperAdminRoute />}>
          <Route
            path="/super-admin/dashboard"
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            }
          />
          {/* <Route
            path="/super-admin/profile"
            element={
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            }
          />
          <Route
            path="/super-admin/update-profile"
            element={
              <DashboardLayout>
                <UpdateProfile />
              </DashboardLayout>
            }
          /> */}
          <Route
            path="/super-admin/quotes-list"
            element={
              <DashboardLayout>
                <Quotes />
              </DashboardLayout>
            }
          />
          <Route
            path="/super-admin/registered-list"
            element={
              <DashboardLayout>
                <RegisteredUsers />
              </DashboardLayout>
            }
          />
          <Route
            path="/super-admin/deactivated-users"
            element={
              <DashboardLayout>
                <DeactivatedUsers />
              </DashboardLayout>
            }
          />
          <Route
            path="/super-admin/refund-list"
            element={
              <DashboardLayout>
                <RefundList />
              </DashboardLayout>
            }
          />
          <Route
            path="/super-admin/pricing-list"
            element={
              <DashboardLayout>
                <MenuPricing />
              </DashboardLayout>
            }
          />
          <Route
            path="/super-admin/contacted-sales-list"
            element={
              <DashboardLayout>
                <EnterpriseLeads />
              </DashboardLayout>
            }
          />
          <Route
            path="/super-admin/ad-list"
            element={
              <DashboardLayout>
                <AdSetting />
              </DashboardLayout>
            }
          />
          <Route
            path="/super-admin/coupon-list"
            element={
              <DashboardLayout>
                <CouponSetting />
              </DashboardLayout>
            }
          />
          <Route
            path="/super-admin/community"
            element={
              <DashboardLayout>
                <Community />
              </DashboardLayout>
            }
          />
          <Route
            path="/super-admin/decision-maker-category"
            element={
              <DashboardLayout>
                <Category />
              </DashboardLayout>
            }
          />
          <Route
            path="/super-admin/agreement"
            element={
              <DashboardLayout>
                <Agreement />
              </DashboardLayout>
            }
          />
          <Route
            path="/super-admin/support-list"
            element={
              <DashboardLayout>
                <TicketManagement />
              </DashboardLayout>
            }
          />
          <Route
            path="/super-admin/ticket-overview/:id"
            element={
              <DashboardLayout>
                <TicketOverview />
              </DashboardLayout>
            }
          />
          <Route
            path="/super-admin/supporters"
            element={
              <DashboardLayout>
                <Supporters />
              </DashboardLayout>
            }
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default SuperAdminRouteIndex;
