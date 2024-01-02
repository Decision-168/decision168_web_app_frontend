/* eslint-disable react/prop-types */
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LogoutMenu from './LogoutMenu';
import { useTheme } from '@mui/material/styles';
import SystemUpdateIcon from '@mui/icons-material/SystemUpdate';
import logo from '../../../../../assets/images/logo.png';

const drawerWidth = 250;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer,

  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function TabletMobileAppBar({ open, toggleDrawer }) {
  const theme = useTheme();

  return (
    <AppBar position="absolute" open={open} sx={{ backgroundColor: theme.palette.secondary.light }}>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '10vh' }}>
        <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }} gap={2}>
          <Box sx={{ display: 'flex', justifyContent: 'center', widht: '50px', height: '50px' }}>
            <img src={logo} alt="logo" style={{ width: '100%' }} />
          </Box>

          <IconButton
            edge="start"
            color="black"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              width: '40px',
              height: '40px',
            }}>
            <MenuIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }} gap={2}>
          <IconButton sx={{ backgroundColor: theme.palette.primary.main }}>
            <SystemUpdateIcon sx={{ color: 'white' }} />
          </IconButton>

          <IconButton color="black">
            <Badge badgeContent={4} color="primary">
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>

          <LogoutMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
