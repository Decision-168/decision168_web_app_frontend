import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { mainListItems } from "./listItems";
import decision168 from "../../assets/images/decision-168.png";
import logo from "../../assets/images/logo.png";
import LogoutMenu from "./LogoutMenu";
import PortfolioMenu from "./PortfolioMenu";
import Copyright from "./Copyright";
import { Hidden } from "@mui/material";

const drawerWidth = 250;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer,

  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex", overflow: "hidden", maxHeight: "100vh" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} sx={{ backgroundColor: "white" }}>
          <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "10vh" }}>
            <IconButton
              edge="start"
              color="black"
              aria-label="close drawer"
              onClick={toggleDrawer}
              sx={{
                marginX: "10px",
                width: "40px",
                height: "40px",
                ...(open && { display: "block" }),
              }}>
              <MenuOpenIcon />
            </IconButton>

            <IconButton
              edge="start"
              color="black"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginX: "10px",
                width: "40px",
                height: "40px",
                ...(open && { display: "none" }),
              }}>
              <MenuIcon />
            </IconButton>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}>
              <PortfolioMenu />

              <Typography component="h1" variant="h6" color="black" noWrap sx={{ flexGrow: 0 }}>
                Welcome Back !
              </Typography>

              <Stack direction="row" spacing={1}>
                <IconButton color="black" sx={{ width: "50px", height: "50px" }}>
                  <FullscreenIcon />
                </IconButton>

                <IconButton color="black" sx={{ width: "50px", height: "50px" }}>
                  <Badge badgeContent={4} color="primary">
                    <NotificationsNoneIcon />
                  </Badge>
                </IconButton>

                <LogoutMenu />
              </Stack>
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <Box sx={{ borderRight: "5px solid #006E3E", maxHeight: "100vh", overflowY: "hidden" }}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#383838",
                height: "10vh",
                px: [1],
              }}>
              {open ? (
                <Box sx={{ display: "flex", justifyContent: "center", padding: "10px 0" }}>
                  <img src={decision168} alt="Decision-168-logo" style={{ width: "65%" }} />
                </Box>
              ) : (
                <Box sx={{ display: "flex", justifyContent: "center", padding: "10px 4px", height: "60px" }}>
                  <img src={logo} alt="logo" style={{ width: "100%" }} />
                </Box>
              )}
            </Toolbar>
            <Divider />
            <List
              component="nav"
              sx={{
                "&::-webkit-scrollbar": {
                  width: "4px",
                },
                "&::-webkit-scrollbar-thumb": {
                  // background: "primary.main", // Change this to your desired color
                  background: "#B9B8B9",
                  borderRadius: "6px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "primary.dark", // Change this to your desired hover color
                },
                "&::-webkit-scrollbar-track": {
                  background: "background.paper", // Change this to your desired background color
                },
                height: "90vh",
                overflow: "auto",
                overflowX:'hidden',
                color: "#B9B8B9",
                backgroundColor: "#383838",
              }}>
              {mainListItems}
            </List>
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900]),
            flexGrow: 1,
            overflow: "auto",
          }}>
          <Toolbar />
          <Container maxWidth="xl" sx={{ padding: "20px" }}>
            <Paper
              sx={{
                padding: "10px",
                width: "100%",
                minHeight: "100vh",
              }}>
              Render Your Component Here
            </Paper>
          </Container>
          <Copyright sx={{ p: 2, backgroundColor: "white" }} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
