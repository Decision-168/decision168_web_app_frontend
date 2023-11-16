import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
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
import { Avatar, Button, Grid, Hidden, MenuList } from "@mui/material";
import screenfull from "screenfull";
import { Link } from "react-router-dom";
// import SelectMenu from "./SelectMenu";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { stringAvatar } from "../../../../../helpers/stringAvatar";
import CloseIcon from '@mui/icons-material/Close';
import EventIcon from '@mui/icons-material/Event';
import { useDispatch } from "react-redux";
import { openCnfModal } from "../../../../../redux/action/confirmationModalSlice";
import ConfirmationDialog from "../../../../common/ConfirmationDialog";
import CustomDialog from "../../../../common/CustomDialog";
import ViewGoalsPopup from "../../../../GoalsAndStrategies/subComponents/ViewGoalsPopup";
import { menu_data } from "../../../../../helpers/notificationData";
import ViewKpiPopup from "../../../../GoalsAndStrategies/subComponents/ViewKpiPopup";
import ViewProjectPopup from "../../../../GoalsAndStrategies/subComponents/ViewProjectPopup";
import TaskPreview from "../../../../Tasks/taskOverview/subComponents/TaskPreview";
import { taskOverviewStyles } from "../../../../Tasks/taskOverview/styles";
import SubtaskPreview from "../../../../Tasks/subtaskOverview/subComponent/SubtaskPreview";

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

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 300,
    maxWidth: 320,
    maxHeight: 400,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function DesktopAppBar({ open, toggleDrawer }) {
  const theme = useTheme();

  const [isFullscreen, setIsFullscreen] = useState(screenfull.isFullscreen);

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

  const [filteredTask, setFilterTask] = useState([]);
  const [filteredSubTask, setFilteredSubTask] = useState([]);
  const styles = taskOverviewStyles();

  const [openModule, setOpenModule] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const handleModuleClose = () => {
    setOpenModule(false);
  };

  const handleModuleOpen = (index) => {
    setOpenModule(true);
    setNotificationData(index);
  };

  const dispatch = useDispatch();
  const handleClearAll = () => {
    dispatch(
      openCnfModal({
        modalName: "clearAll",
        title: "Are you sure?",
        description: "You want to Clear All Notifications",
      })
    );
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open_menu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      elevation={0}
      position="absolute"
      open={open}
      sx={{ backgroundColor: "white" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "10vh",
        }}
      >
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
          }}
        >
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
          }}
        >
          <MenuIcon />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <PortfolioMenu />

          {/* <SelectMenu/> */}

          {/* <Hidden lgDown>
            <Typography
              component="h1"
              variant="h6"
              color="black"
              noWrap
              sx={{ flexGrow: 0 }}
            >
              Welcome Back !
            </Typography>
          </Hidden> */}

          <Box sx={{ display: "flex", justifyContent: "end", alignItems: "center" }} gap={2}>
            <Button component={Link} to="/pricing-packages" variant="contained" size="small">
              Upgrade
            </Button>
            <Stack direction="row" spacing={1}>
              <IconButton
                onClick={toggleFullScreen}
                color="black"
                sx={{ width: "50px", height: "50px" }}
              >
                {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </IconButton>

              <IconButton
                id="demo-customized-button"
                aria-controls={open_menu ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open_menu ? "true" : undefined}
                onClick={handleClick}
                color="black"
                sx={{ width: "50px", height: "50px", cursor: "pointer" }}
              >
                <Badge badgeContent={4} color="primary">
                  <NotificationsNoneIcon />
                </Badge>
              </IconButton>
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open_menu}
                onClose={handleClose}
                sx={{
                  '& .MuiMenuItem-root:last-child':{borderBottom: 0}
                }}
              >
                <MenuList sx={{ p: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={6}>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 700,
                          textAlign: "justify",
                        }}
                      >
                        Notifications
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 500,
                          textAlign: "right",
                          color: "#c7df19",
                          cursor: "pointer"
                        }}
                        onClick={() => handleClearAll()}
                      >
                        Clear All
                      </Typography>
                    </Grid>
                  </Grid>
                </MenuList>
                <Divider sx={{ my: 0.5 }} />
                {menu_data.map((index) => (
                  <MenuItem
                    key={index.id}
                    sx={{ borderBottom: "1px solid #0000001f", p: 2 }}
                  >
                    <Grid container spacing={2}  onClick={() => handleModuleOpen(index)}>
                      <Grid item xs={12} md={2} lg={2}>
                            <Avatar
                              sx={{
                                bgcolor: index.color === "light" ? (theme.palette.primary.main) : (theme.palette.secondary.main),
                                mr: 1,
                                fontSize: 14,
                                width: 30,
                          height: 30,
                              }}
                              aria-label={index.type}
                            >
                              O{...stringAvatar(index.type.toUpperCase())}
                            </Avatar>
                      </Grid>
                      <Grid item xs={12} md={8} lg={8} sx={{ textWrap: "wrap", color: "#74788d" }}>
                        <Typography variant="body1"
                          sx={{ fontSize: "12px", textAlign: "left" }}
                        >
                          {index.title}
                        </Typography>
                        <Typography variant="body1"
                          sx={{ fontSize: "12px", textAlign: "left" }}
                        >
                          {index.description}
                        </Typography>
                        <Box
                        sx={{
                          display: "flex",
                          alignItems: "center"
                        }}
                        >
                        <EventIcon sx={{ mr:1, fontSize: "12px" }}/>
                        <Typography variant="body1"
                          sx={{ fontSize: "12px", textAlign: "left" }}
                        >
                          {index.date}
                        </Typography>
                        </Box>                        
                      </Grid>
                      <Grid item xs={12} md={2} lg={2}>
                        <Avatar
                        sx={{
                          width: 30,
                          height: 30,
                          bgcolor: "#eff2f7",
                        }}
                        aria-label="Remove"
                        >
                        <CloseIcon sx={{ mr:0, color: "#000", fontSize: "18px" }} />
                        </Avatar>
                      </Grid>
                    </Grid>
                  </MenuItem>
                ))}
              </StyledMenu>
              <LogoutMenu />
            </Stack>
          </Box>
        </Box>
      </Toolbar>
      <ConfirmationDialog value={"clearAll"} />
      <CustomDialog
        handleClose={handleModuleClose}
        open={openModule}
        modalTitle={notificationData.title}
        redirectPath={notificationData.link}
        showModalButton={true}
        modalSize="md"
      >
        {(notificationData.type === 'goal') && (<ViewGoalsPopup />)}
        {(notificationData.type === 'kpi') && (<ViewKpiPopup />)}
        {(notificationData.type === 'project') && (<ViewProjectPopup />)}
        {(notificationData.type === 'task') && (<TaskPreview styles={styles} filteredRow={filteredTask}/>)}
        {(notificationData.type === 'subtask') && (<SubtaskPreview styles={styles} filteredRow={filteredSubTask} />)}
      </CustomDialog>
    </AppBar>
  );
}
