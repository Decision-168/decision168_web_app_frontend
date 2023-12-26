import React, { useState, useEffect } from "react";
import { Box, Button, Link } from "@mui/material";
import Grid from "@mui/material/Grid";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ListAltIcon from "@mui/icons-material/ListAlt";
import TimerIcon from "@mui/icons-material/Timer";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import SubtaskPreview from "../../Tasks/subtaskOverview/subComponent/SubtaskPreview";
import { taskOverviewStyles } from "../../Tasks/taskOverview/styles";
import CustomDialog from "../../common/CustomDialog";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { useSelector } from "react-redux";
import { getRecentNotifications } from "../../../api/modules/dashboardModule";
import MyDayCard from "./MyDayCard";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import MyNext168Card from "./MyNext168Card";
import MyAlertsCard from "./MyAlertsCard";

const items = [
  {
    label: "My Day",
    icon: <AssignmentTurnedInIcon />,
  },
  {
    label: "My Next 168",
    icon: <CalendarMonthIcon />,
  },
  {
    label: "My Notes",
    icon: <ListAltIcon />,
  },
  {
    label: "My Alerts",
    icon: <TimerIcon />,
  },
];

const Data = [1, 2, 3, 4, 5];

export default function ResponsiveGrid() {
  const styles = taskOverviewStyles();
  const [filteredSubTask, setFilterSubTask] = useState(null);
  const [openSubTaskPreviewDialog, setOpenSubTaskPreviewDialog] =
    useState(false);

  const user = useSelector(selectUserDetails);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const recentNotifications = async () => {
      try {
        // const id = user?.reg_id;
        const id = 1;
        const response = await getRecentNotifications(id);
        setData(response);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    recentNotifications();
  }, []);

  const handleOpenSubTaskPreviewDialog = () => {
    setOpenSubTaskPreviewDialog(true);
  };
  const handleCloseSubTaskPreviewDialog = () => {
    setOpenSubTaskPreviewDialog(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} md={6}>
          <MyDayCard
            TodayTasksResult={data.TodayTasksResult}
            TodaySubtasksResult={data?.TodaySubtasksResult}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <MyNext168Card
            WeekTasksResult={data.WeekTasksResult}
            WeekSubtasksResult={data?.WeekSubtasksResult}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <MyAlertsCard />
        </Grid>
      </Grid>
      <CustomDialog
        handleClose={handleCloseSubTaskPreviewDialog}
        open={openSubTaskPreviewDialog}
        modalTitle="Subtask"
        redirectPath={"/subtasks-overview"}
        showModalButton={true}
        modalSize="lg"
      >
        <SubtaskPreview styles={styles} filteredRow={filteredSubTask} />
      </CustomDialog>
    </Box>
  );
}
