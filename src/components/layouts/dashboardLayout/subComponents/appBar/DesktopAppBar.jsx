import React, { useEffect } from "react";
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
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LogoutMenu from "./LogoutMenu";
import PortfolioMenu from "./PortfolioMenu";
import { useTheme } from "@mui/material/styles";
import { Button, Hidden } from "@mui/material";
import screenfull from "screenfull";
// import SelectMenu from "./SelectMenu";

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

  const [isFullscreen, setIsFullscreen] = React.useState(screenfull.isFullscreen);

  const toggleFullScreen = () => {
    if (screenfull.isEnabled) {
      if (screenfull.isFullscreen) {
        screenfull.exit();
      } else {
        screenfull.request();
      }
    }
  };

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(screenfull.isFullscreen);
    };

    screenfull.on("change", handleFullscreenChange);

    return () => {
      screenfull.off("change", handleFullscreenChange);
    };
  }, []);

  return (
    <AppBar elevation={3} position="absolute" open={open} sx={{ backgroundColor: "white" }}>
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

          {/* <SelectMenu/> */}

          <Hidden lgDown>
            <Typography component="h1" variant="h6" color="black" noWrap sx={{ flexGrow: 0 }}>
              Welcome Back !
            </Typography>
          </Hidden>

          <Box sx={{ display: "flex", justifyContent: "end", alignItems: "center" }} gap={2}>
            <Button variant="contained" size="small">
              Upgrade
            </Button>
            <Stack direction="row" spacing={1}>
              <IconButton onClick={toggleFullScreen} color="black" sx={{ width: "50px", height: "50px" }}>
                {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
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
