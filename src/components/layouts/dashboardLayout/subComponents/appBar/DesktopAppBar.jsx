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
import { Button, Grid, Hidden, MenuList } from "@mui/material";
import screenfull from "screenfull";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import {
  openCnfModal,
  closeCnfModal,
} from "../../../../../redux/action/confirmationModalSlice";
import ConfirmationDialog from "../../../../common/ConfirmationDialog";
import CustomDialog from "../../../../common/CustomDialog";
import ViewGoalsPopup from "../../../../GoalsAndStrategies/subComponents/ViewGoalsPopup";
import ViewKpiPopup from "../../../../GoalsAndStrategies/subComponents/ViewKpiPopup";
import ViewProjectPopup from "../../../../GoalsAndStrategies/subComponents/ViewProjectPopup";
import TaskPreview from "../../../../Tasks/taskOverview/subComponents/TaskPreview";
import { taskOverviewStyles } from "../../../../Tasks/taskOverview/styles";
import SubtaskPreview from "../../../../Tasks/subtaskOverview/subComponent/SubtaskPreview";
import {
  getAlertNotificationsAsync,
  selectAlertNotifications,
} from "../../../../../redux/action/dashboardSlice";
import {
  clearAllNotificaions,
  updateAlertsAndNotifications,
} from "../../../../../api/modules/dashboardModule";
import { useSelector } from "react-redux";
import Notification from "./Notification";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import NoDataFound from "../../../../common/NoDataFound";
import { selectUserDetails } from "../../../../../redux/action/userSlice";

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
  const dispatch = useDispatch();
  const user = useSelector(selectUserDetails);
  const user_id = user?.reg_id;
  const data = useSelector(selectAlertNotifications);
  const arrays = [
    data?.NewTasksResult,
    data?.NewSubtaskResult,
    data?.OverdueTasksResult,
    data?.OverdueSubtaskResult,
    data?.SentToReviewTasksResult,
    data?.ReviewDeniedTasksResult,
    data?.ReviewApprovedTasksResult,
    data?.SentToReviewSubtasksResult,
    data?.ReviewDeniedSubtasksResult,
    data?.ReviewApprovedSubtasksResult,
    data?.ReviewArriveTasksResult,
    data?.ReviewArriveSubtasksResult,
    data?.PendingProjectRequestResult,
    data?.PortfolioAcceptedResult,
    data?.ProjectAcceptedResult,
    data?.ProjectAcceptedInviteResult,
    data?.MembershipRequestedResult,
    data?.PendingGoalRequestResult,
    data?.ProjectFilesResult,
    data?.TasksFilesResult,
    data?.SubtasksFilesResult,
    data?.NewProjectCommentResult,
  ];
  const areAllArraysEmpty = arrays.every((array) => array?.length === 0);

  const totalLength = arrays.reduce((accumulator, array) => {
    return accumulator + array?.length;
  }, 0); // 0 is the initial value of the accumulator

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

  useEffect(() => {
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

  const handleClearAll = () => {
    dispatch(
      openCnfModal({
        modalName: "clearAll",
        title: "Are you sure?",
        description: "You want to Clear All Notifications",
      })
    );
  };

  const handleClearAllNotifications = async () => {
    try {
      const response = await clearAllNotificaions(user_id);
      dispatch(getAlertNotificationsAsync(user_id));
      dispatch(closeCnfModal({ modalName: "clearAll" }));
      toast.success(`${response.message}`);
    } catch (error) {
      dispatch(closeCnfModal({ modalName: "clearAll" }));

      toast.error(`${error.response.data?.error}`);
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open_menu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemove = async (id, userId, type) => {
    const response = await updateAlertsAndNotifications(id, userId, type);
    if (response.status === 200) {
      toast.success(`${response?.data?.message}`);
      dispatch(getAlertNotificationsAsync(userId));
    }
  };

  const isDashboardPage = window.location.pathname === "/dashboard";

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

          {isDashboardPage && (
            <Hidden lgDown>
              <Typography
                component="h1"
                variant="h6"
                color="black"
                noWrap
                sx={{ flexGrow: 0 }}
              >
                Welcome Back !
              </Typography>
            </Hidden>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
            gap={2}
          >
            <Button
              component={Link}
              to="/pricing-packages"
              variant="contained"
              size="small"
            >
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

              {totalLength > 0 && (
                <IconButton
                  id="demo-customized-button"
                  aria-controls={open_menu ? "demo-customized-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open_menu ? "true" : undefined}
                  onClick={handleClick}
                  color="black"
                  size="small"
                  sx={{ width: "50px", height: "50px", cursor: "pointer" }}
                >
                  <Badge
                    badgeContent={totalLength ? totalLength : 0}
                    color="error"
                  >
                    <NotificationsNoneIcon />
                  </Badge>
                </IconButton>
              )}

              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open_menu}
                onClose={handleClose}
                sx={{
                  "& .MuiMenuItem-root:last-child": { borderBottom: 0 },
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
                          cursor: "pointer",
                        }}
                        onClick={() => handleClearAll()}
                      >
                        Clear All
                      </Typography>
                    </Grid>
                  </Grid>
                </MenuList>
                <Divider sx={{ my: 0.5 }} />

                {areAllArraysEmpty ? (
                  <NoDataFound message="No Notifications" />
                ) : (
                  <>
                    {/* NewTasksResult */}
                    <>
                      {data?.NewTasksResult?.length > 0 &&
                        data?.NewTasksResult?.map((task) => (
                          <MenuItem
                            key={task?.tid}
                            sx={{ borderBottom: "1px solid #0000001f", p: 2 }}
                          >
                            <Notification
                              type="New Task"
                              taskCode={task?.tcode}
                              TaskName={task?.tname}
                              ProjectName={task?.pname}
                              taskDueDate={task?.tdue_date}
                              handleRemove={() =>
                                handleRemove(task?.tid, 1, "newtasks")
                              }
                            />
                          </MenuItem>
                        ))}
                    </>
                    {/* NewSubtaskResult */}
                    <>
                      {data?.NewSubtaskResult?.length > 0 &&
                        data?.NewSubtaskResult?.map((subTask) => (
                          <MenuItem
                            key={subTask?.stid}
                            sx={{ borderBottom: "1px solid #0000001f", p: 2 }}
                          >
                            <Notification
                              type="New Subtask"
                              taskCode={subTask?.stcode}
                              TaskName={subTask?.stname}
                              ProjectName={subTask?.pname}
                              taskDueDate={subTask?.stdue_date}
                              handleRemove={() =>
                                handleRemove(subTask?.stid, 1, "newsubtasks")
                              }
                            />
                          </MenuItem>
                        ))}
                    </>
                    {/* OverdueTasksResult */}
                    <>
                      {data?.OverdueTasksResult?.length > 0 &&
                        data?.OverdueTasksResult?.map((task) => (
                          <MenuItem
                            key={task?.tid}
                            sx={{ borderBottom: "1px solid #0000001f", p: 2 }}
                          >
                            <Notification
                              type="Overdue Task"
                              taskCode={task?.tcode}
                              TaskName={task?.tname}
                              ProjectName={task?.pname}
                              taskDueDate={task?.tdue_date}
                              handleRemove={() =>
                                handleRemove(task?.tid, 1, "overduetasks")
                              }
                            />
                          </MenuItem>
                        ))}
                    </>
                    {/* OverdueSubtaskResult */}
                    <>
                      {data?.OverdueSubtaskResult?.length > 0 &&
                        data?.OverdueSubtaskResult?.map((subtask) => (
                          <MenuItem
                            key={subtask?.stid}
                            sx={{ borderBottom: "1px solid #0000001f", p: 2 }}
                          >
                            <Notification
                              type="Overdue Subtask"
                              taskCode={subtask?.stcode}
                              TaskName={subtask?.stname}
                              ProjectName={subtask?.pname}
                              taskDueDate={subtask?.stdue_date}
                              handleRemove={() =>
                                handleRemove(
                                  subtask?.stid,
                                  1,
                                  "overduesubtasks"
                                )
                              }
                            />
                          </MenuItem>
                        ))}
                    </>
                    {/* SentToReviewTasksResult */}
                    <>
                      {data?.SentToReviewTasksResult?.length > 0 &&
                        data?.SentToReviewTasksResult?.map((task) => (
                          <MenuItem
                            key={task?.tid}
                            sx={{ borderBottom: "1px solid #0000001f", p: 2 }}
                          >
                            <Notification
                              type="Review Task"
                              taskCode={task?.tcode}
                              TaskName={task?.tname}
                              ProjectName={task?.pname}
                              taskDueDate={task?.tdue_date}
                              handleRemove={() =>
                                handleRemove(task?.tid, 1, "reviewtasks")
                              }
                            />
                          </MenuItem>
                        ))}
                    </>
                    {/* SentToReviewSubtasksResult */}
                    <>
                      {data?.SentToReviewSubtasksResult?.length > 0 &&
                        data?.SentToReviewSubtasksResult?.map((subtask) => (
                          <MenuItem
                            key={subtask?.stid}
                            sx={{ borderBottom: "1px solid #0000001f", p: 2 }}
                          >
                            <Notification
                              type="Review Subtask"
                              taskCode={subtask?.stcode}
                              TaskName={subtask?.stname}
                              ProjectName={subtask?.pname}
                              taskDueDate={subtask?.stdue_date}
                              handleRemove={() =>
                                handleRemove(subtask?.stid, 1, "reviewsubtasks")
                              }
                            />
                          </MenuItem>
                        ))}
                    </>
                    {/* ReviewArriveTasksResult */}
                    <>
                      {data?.ReviewArriveTasksResult?.length > 0 &&
                        data?.ReviewArriveTasksResult?.map((task) => (
                          <MenuItem
                            key={task?.tid}
                            sx={{ borderBottom: "1px solid #0000001f", p: 2 }}
                          >
                            <Notification
                              type="Review Arrived"
                              taskCode={task?.tcode}
                              TaskName={task?.tname}
                              ProjectName={task?.pname}
                              taskDueDate={task?.tdue_date}
                              handleRemove={() =>
                                handleRemove(task?.stid, 1, "reviewarrivetasks")
                              }
                            />
                          </MenuItem>
                        ))}
                    </>
                    {/* ReviewArriveSubtasksResult */}
                    <>
                      {data?.ReviewArriveSubtasksResult?.length > 0 &&
                        data?.ReviewArriveSubtasksResult?.map((subtask) => (
                          <MenuItem
                            key={subtask?.stid}
                            sx={{ borderBottom: "1px solid #0000001f", p: 2 }}
                          >
                            <Notification
                              type="Review Arrived"
                              taskCode={subtask?.stcode}
                              TaskName={subtask?.stname}
                              ProjectName={subtask?.pname}
                              taskDueDate={subtask?.stdue_date}
                              handleRemove={() =>
                                handleRemove(
                                  subtask?.stid,
                                  1,
                                  "reviewarrivesubtasks"
                                )
                              }
                            />
                          </MenuItem>
                        ))}
                    </>
                    {/* PendingProjectRequestResult */}
                    <>
                      {data?.PendingProjectRequestResult?.length > 0 &&
                        data?.PendingProjectRequestResult?.map((p) => (
                          <MenuItem
                            key={p?.pm_id}
                            sx={{ borderBottom: "1px solid #0000001f", p: 2 }}
                          >
                            <Notification
                              type="Pending Project"
                              taskCode={p?.tcode}
                              TaskName={p?.tname}
                              ProjectName={p?.pname}
                              taskDueDate={p?.tdue_date}
                              handleRemove={() =>
                                handleRemove(
                                  p?.pm_id,
                                  1,
                                  "pendingprojectrequest"
                                )
                              }
                            />
                          </MenuItem>
                        ))}
                    </>
                    {/* PortfolioAcceptedResult */}
                    <>
                      {data?.PortfolioAcceptedResult?.length > 0 &&
                        data?.PortfolioAcceptedResult?.map((p) => (
                          <MenuItem
                            key={p?.pim_id}
                            sx={{ borderBottom: "1px solid #0000001f", p: 2 }}
                          >
                            <Notification
                              type="Accepted Portfolio"
                              taskCode={p?.tcode}
                              TaskName={p?.tname}
                              ProjectName={p?.pname}
                              taskDueDate={p?.tdue_date}
                              handleRemove={() =>
                                handleRemove(p?.pim_id, 1, "portfolioaccepted")
                              }
                            />
                          </MenuItem>
                        ))}
                    </>
                    {/* ProjectAcceptedResult */}
                    <>
                      {data?.PortfolioAcceptedResult?.length > 0 &&
                        data?.PortfolioAcceptedResult?.map((p) => (
                          <MenuItem
                            key={p?.pm_id}
                            sx={{ borderBottom: "1px solid #0000001f", p: 2 }}
                          >
                            <Notification
                              type="Accepted Project"
                              taskCode={p?.tcode}
                              TaskName={p?.tname}
                              ProjectName={p?.pname}
                              taskDueDate={p?.tdue_date}
                              handleRemove={() =>
                                handleRemove(p?.pm_id, 1, "projectaccepted")
                              }
                            />
                          </MenuItem>
                        ))}
                    </>
                    {/* ProjectAcceptedInviteResult */}
                    <>
                      {data?.ProjectAcceptedInviteResult?.length > 0 &&
                        data?.ProjectAcceptedInviteResult?.map((p) => (
                          <MenuItem
                            key={p?.im_id}
                            sx={{ borderBottom: "1px solid #0000001f", p: 2 }}
                          >
                            <Notification
                              type="Accepted Invite"
                              taskCode={p?.tcode}
                              TaskName={p?.tname}
                              ProjectName={p?.pname}
                              taskDueDate={p?.tdue_date}
                              handleRemove={() =>
                                handleRemove(
                                  p?.im_id,
                                  1,
                                  "projectacceptedinvite"
                                )
                              }
                            />
                          </MenuItem>
                        ))}
                    </>
                    {/* MembershipRequestedResult */}
                    <>
                      {data?.MembershipRequestedResult?.length > 0 &&
                        data?.MembershipRequestedResult?.map((p) => (
                          <MenuItem
                            key={p?.req_id}
                            sx={{ borderBottom: "1px solid #0000001f", p: 2 }}
                          >
                            <Notification
                              type="Membership Requeste"
                              taskCode={p?.tcode}
                              TaskName={p?.tname}
                              ProjectName={p?.pname}
                              taskDueDate={p?.tdue_date}
                              handleRemove={() =>
                                handleRemove(
                                  p?.req_id,
                                  1,
                                  "membershiprequested"
                                )
                              }
                            />
                          </MenuItem>
                        ))}
                    </>
                    {/* PendingGoalRequestResult */}
                    <>
                      {data?.PendingGoalRequestResult?.length > 0 &&
                        data?.PendingGoalRequestResult?.map((p) => (
                          <MenuItem
                            key={p?.gmid}
                            sx={{ borderBottom: "1px solid #0000001f", p: 2 }}
                          >
                            <Notification
                              type="Pending Goal"
                              taskCode={p?.tcode}
                              TaskName={p?.gname}
                              ProjectName={p?.pname}
                              taskDueDate={p?.tdue_date}
                              handleRemove={() =>
                                handleRemove(p?.gmid, 1, "pendinggoalrequest")
                              }
                            />
                          </MenuItem>
                        ))}
                    </>
                    {/* ProjectFilesResult */}
                    <>
                      {data?.ProjectFilesResult?.length > 0 &&
                        data?.ProjectFilesResult?.map((p) => (
                          <MenuItem
                            key={p?.pfile_id}
                            sx={{ borderBottom: "1px solid #0000001f", p: 2 }}
                          >
                            <Notification
                              type="Project File"
                              taskCode={p?.tcode}
                              TaskName={p?.pfile}
                              ProjectName={p?.pname}
                              taskDueDate={p?.tdue_date}
                              handleRemove={() =>
                                handleRemove(p?.pfile_id, 1, "projectfiles")
                              }
                            />
                          </MenuItem>
                        ))}
                    </>
                    {/* TasksFilesResult */}
                    <>
                      {data?.TasksFilesResult?.length > 0 &&
                        data?.TasksFilesResult?.map((task) => (
                          <MenuItem
                            key={task?.tid}
                            sx={{ borderBottom: "1px solid #0000001f", p: 2 }}
                          >
                            <Notification
                              type="Task File"
                              taskCode={task?.tcode}
                              TaskName={task?.tfile}
                              ProjectName={task?.pname}
                              taskDueDate={task?.tdue_date}
                              handleRemove={() =>
                                handleRemove(task?.tid, 1, "tasksfiles")
                              }
                            />
                          </MenuItem>
                        ))}
                    </>
                    {/* SubtasksFilesResult */}
                    <>
                      {data?.SubtasksFilesResult?.length > 0 &&
                        data?.SubtasksFilesResult?.map((subTask) => (
                          <MenuItem
                            key={subTask?.stid}
                            sx={{ borderBottom: "1px solid #0000001f", p: 2 }}
                          >
                            <Notification
                              type="Subtask File"
                              taskCode={subTask?.stcode}
                              TaskName={subTask?.stfile}
                              ProjectName={subTask?.pname}
                              taskDueDate={subTask?.stdue_date}
                              handleRemove={() =>
                                handleRemove(subTask?.stid, 1, "subtasksfiles")
                              }
                            />
                          </MenuItem>
                        ))}
                    </>
                    {/* NewProjectCommentResult */}
                    <>
                      {data?.NewProjectCommentResult?.length > 0 &&
                        data?.NewProjectCommentResult?.map((p) => (
                          <MenuItem
                            key={p?.cid}
                            sx={{ borderBottom: "1px solid #0000001f", p: 2 }}
                          >
                            <Notification
                              type="Project Comment"
                              taskCode={p?.stcode}
                              TaskName={p?.message}
                              ProjectName={p?.pname}
                              taskDueDate={p?.stdue_date}
                              handleRemove={() =>
                                handleRemove(p?.cid, 1, "newprojectcomment")
                              }
                            />
                          </MenuItem>
                        ))}
                    </>
                    {/* ReviewDeniedTasksResult */}
                    <>
                      {data?.ReviewDeniedTasksResult?.length > 0 &&
                        data?.ReviewDeniedTasksResult?.map((task) => (
                          <MenuItem
                            key={task?.tid}
                            sx={{ borderBottom: "1px solid #0000001f", p: 2 }}
                          >
                            <Notification
                              type="Review Denied"
                              taskCode={task?.tcode}
                              TaskName={task?.tname}
                              ProjectName={task?.pname}
                              taskDueDate={task?.tdue_date}
                              handleRemove={() =>
                                handleRemove(task?.tid, 1, "reviewtasks")
                              }
                            />
                          </MenuItem>
                        ))}
                    </>
                    {/* ReviewDeniedSubtasksResult */}
                    <>
                      {data?.ReviewDeniedSubtasksResult?.length > 0 &&
                        data?.ReviewDeniedSubtasksResult?.map((subtask) => (
                          <MenuItem
                            key={subtask?.stid}
                            sx={{ borderBottom: "1px solid #0000001f", p: 2 }}
                          >
                            <Notification
                              type="Review Denied"
                              taskCode={subtask?.stcode}
                              TaskName={subtask?.stname}
                              ProjectName={subtask?.pname}
                              taskDueDate={subtask?.stdue_date}
                              handleRemove={() =>
                                handleRemove(subTask?.stid, 1, "reviewsubtasks")
                              }
                            />
                          </MenuItem>
                        ))}
                    </>

                    {/* ReviewApprovedTasksResult */}
                    <>
                      {data?.ReviewApprovedTasksResult?.length > 0 &&
                        data?.ReviewApprovedTasksResult?.map((task) => (
                          <MenuItem
                            key={task?.tid}
                            sx={{ borderBottom: "1px solid #0000001f", p: 2 }}
                          >
                            <Notification
                              type="Review Approved"
                              taskCode={task?.tcode}
                              TaskName={task?.tname}
                              ProjectName={task?.pname}
                              taskDueDate={task?.tdue_date}
                              handleRemove={() =>
                                handleRemove(task?.tid, 1, "reviewtasks")
                              }
                            />
                          </MenuItem>
                        ))}
                    </>

                    {/* ReviewApprovedSubtasksResult */}
                    <>
                      {data?.ReviewApprovedSubtasksResult?.length > 0 &&
                        data?.ReviewApprovedSubtasksResult?.map((subtask) => (
                          <MenuItem
                            key={subtask?.stid}
                            sx={{ borderBottom: "1px solid #0000001f", p: 2 }}
                          >
                            <Notification
                              type="Review Approved"
                              taskCode={subtask?.stcode}
                              TaskName={subtask?.stname}
                              ProjectName={subtask?.pname}
                              taskDueDate={subtask?.stdue_date}
                              handleRemove={() =>
                                handleRemove(subtask?.stid, 1, "reviewsubtasks")
                              }
                            />
                          </MenuItem>
                        ))}
                    </>
                  </>
                )}
              </StyledMenu>
              <LogoutMenu />
            </Stack>
          </Box>
        </Box>
      </Toolbar>
      <ConfirmationDialog
        value={"clearAll"}
        handleYes={handleClearAllNotifications}
      />
      <CustomDialog
        handleClose={handleModuleClose}
        open={openModule}
        modalTitle={notificationData.title}
        redirectPath={notificationData.link}
        showModalButton={true}
        modalSize="md"
      >
        {notificationData.type === "goal" && <ViewGoalsPopup />}
        {notificationData.type === "kpi" && <ViewKpiPopup />}
        {notificationData.type === "project" && <ViewProjectPopup />}
        {notificationData.type === "task" && (
          <TaskPreview styles={styles} filteredRow={filteredTask} />
        )}
        {notificationData.type === "subtask" && (
          <SubtaskPreview styles={styles} filteredRow={filteredSubTask} />
        )}
      </CustomDialog>
    </AppBar>
  );
}
