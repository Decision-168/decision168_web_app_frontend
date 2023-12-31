import React, { useState, useEffect , useCallback} from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import PerfectScrollbar from "react-perfect-scrollbar";
import Copyright from "../dashboardLayout/subComponents/footer/Copyright";
import DesktopAppBar from "./subComponents/appBar/DesktopAppBar";
import Hidden from "@mui/material/Hidden";
import TabletMobileAppBar from "./subComponents/appBar/TabletMobileAppBar";
import DesktopDrawer from "./subComponents/drawer/DesktopDrawer";
import TabletMobileDrawer from "./subComponents/drawer/TabletMobileDrawer";
import {
  getUserDetailsAsync,
  selectUserDetails,
} from "../../../redux/action/userSlice";
import { getAlertNotificationsAsync } from "../../../redux/action/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

export default function DashboardLayout({ children }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUserDetails);
  const token = localStorage.getItem("token");
  const [decodedToken, setDecodedToken] = useState(null);
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    // Check if a valid token exists
    if (token) {
      try {
        // Attempt to decode the token
        const decoded = jwtDecode(token);
        setDecodedToken(decoded); // Set the decoded token in state
      } catch (error) {}
    }
  }, [token]);

  useEffect(() => {
    if (decodedToken) {
      dispatch(getUserDetailsAsync(decodedToken?.id));
    }
  }, [dispatch, decodedToken?.id]);

  const alerts = useCallback(async () => {
    try {
      const userId = user?.reg_id;
      if (userId) {
        dispatch(getAlertNotificationsAsync(userId));
      }
    } catch (error) {
      console.error('Error while fetching alert notifications:', error);
      // Handle error as needed
    }
  }, [dispatch, user]);
  
  useEffect(() => {
    alerts();
  }, [alerts]);
  

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box
      sx={{
        display: "flex",
        overflow: "hidden",
        maxHeight: "100vh",
        minHeight: "100vh",
        maxWidth: "100vw",
        overflowX: "hidden",
      }}
    >
      {/* Render Desktop App Bar for larger screens */}
      <Hidden mdDown>
        <DesktopAppBar open={open} toggleDrawer={toggleDrawer} />
      </Hidden>

      {/* Render Tablet/Mobile App Bar for smaller screens */}
      <Hidden mdUp>
        <TabletMobileAppBar open={open} toggleDrawer={toggleDrawer} />
      </Hidden>

      {/* Render Desktop Drawer for larger screens */}
      <Hidden mdDown>
        <DesktopDrawer open={open} toggleDrawer={toggleDrawer} />
      </Hidden>

      {/* Render Tablet/Mobile Drawer for smaller screens */}
      <Hidden mdUp>
        <TabletMobileDrawer open={open} toggleDrawer={toggleDrawer} />
      </Hidden>

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.secondary.light
              : theme.palette.secondary.dark,
          flexGrow: 1,
        }}
      >
        <PerfectScrollbar>
          {/* <Toolbar sx={{ my: 1 }} /> */}
          {/* <Container maxWidth="xl"> */}
          <Box
            sx={{
              minHeight: "90vh",
              marginTop: "10vh",
              padding: "0",
              boxSizing: "border-box",
            }}
          >
            <Box
              sx={{
                width: "100%",
                minHeight: "90vh",
                overflowX: "auto",
                p: 2.5,
              }}
            >
              {children}
            </Box>

            <Copyright />
          </Box>
          {/* </Container> */}
        </PerfectScrollbar>
      </Box>
    </Box>
  );
}
