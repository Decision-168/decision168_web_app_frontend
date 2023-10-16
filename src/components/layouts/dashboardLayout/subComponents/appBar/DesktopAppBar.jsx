import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LogoutMenu from "./LogoutMenu";
import PortfolioMenu from "./PortfolioMenu";
import { useTheme } from "@mui/material/styles";
import { Button, Hidden } from "@mui/material";

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

export default function DesktopAppBar({ open, toggleDrawer }) {
  const theme = useTheme();

  return (
    <AppBar position="absolute" open={open} sx={{ backgroundColor: theme.palette.secondary.light }}>
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

          <Hidden lgDown>
            <Typography component="h1" variant="h6" color="black" noWrap sx={{ flexGrow: 0 }}>
              Welcome Back !
            </Typography>
          </Hidden>

          <Box sx={{ display: "flex", justifyContent: "end", alignItems: "center" }} gap={2}>
            <Button variant="contained" size="medium">
              Upgrade
            </Button>
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
        </Box>
      </Toolbar>
    </AppBar>
  );
}
