/* eslint-disable react/prop-types */
import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Copyright from '../dashboardLayout/subComponents/footer/Copyright';
import DesktopAppBar from './subComponents/appBar/DesktopAppBar';
import Hidden from '@mui/material/Hidden';
import TabletMobileAppBar from './subComponents/appBar/TabletMobileAppBar';
import DesktopDrawer from './subComponents/drawer/DesktopDrawer';
import TabletMobileDrawer from './subComponents/drawer/TabletMobileDrawer';

export default function DashboardLayout({ children }) {
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex', overflow: 'hidden', maxHeight: '100vh' }}>
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
          backgroundColor: (theme) => (theme.palette.mode === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark),
          flexGrow: 1,
        }}>
        <PerfectScrollbar>
          <Toolbar sx={{ my: 1 }} />
          <Container maxWidth="xl">
            <Box
              sx={{
                padding: '10px',
                width: '100%',
                minHeight: '85vh',
                my: 3,
              }}>
              {children}
            </Box>
          </Container>
          <Copyright />
        </PerfectScrollbar>
      </Box>
    </Box>
  );
}
