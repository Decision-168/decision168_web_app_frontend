import React, { useState } from "react";
import { Box, Button, Link } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ListAltIcon from "@mui/icons-material/ListAlt";
import TimerIcon from "@mui/icons-material/Timer";
import { Avatar, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Notes from "./Notes";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import OtherFeaturesData from "./OtherFeaturesData";
import NoDataFound from "./NoDataFound";
import { useNavigate } from "react-router-dom";
import SubtaskPreview from "../../Tasks/subtaskOverview/subComponent/SubtaskPreview";
import { taskOverviewStyles } from "../../Tasks/taskOverview/styles";
import CustomDialog from "../../common/CustomDialog";

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
  const theme = useTheme();
  const navigate = useNavigate();
   const handleOpenSubTaskPreviewDialog = () => {
     setOpenSubTaskPreviewDialog(true);
   };
  const handleCloseSubTaskPreviewDialog = () => {
    setOpenSubTaskPreviewDialog(false);
  };
  const RenderViewAllButton = ({ path }) => {
    if (Data.length > 0) {
      return (
        <Button
          variant="outlined"
          size="small"
          startIcon={<ArrowForwardIcon />}
          onClick={() => navigate(path)}
        >
          view all
        </Button>
      );
    } else {
      return null;
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={0}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="start"
              spacing={2}
              p={2}
            >
              <Box component="span" flexGrow={1}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                  py={2}
                  sx={{ borderBottom: 1, borderColor: "divider" }}
                >
                  <Typography component="div" variant="subtitle2">
                    My Day
                  </Typography>
                  {/* Below button only visible if My Next 168 events are greater than 0 */}
                  <RenderViewAllButton path={"/today-tasks"} />
                </Stack>
                <Box>
                  {Data.length > 0 ? (
                    Data.map((item, index) => (
                      <OtherFeaturesData
                        key={index}
                        text={`My Day ${index + 1}`}
                        type="My Day"
                        handleOpen={handleOpenSubTaskPreviewDialog}
                      />
                    ))
                  ) : (
                    <NoDataFound message="No Event" />
                  )}
                </Box>
              </Box>

              <Box py={1}>
                <Avatar sx={{ bgcolor: theme.palette.secondary.dark }}>
                  <AssignmentTurnedInIcon />
                </Avatar>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={0}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="start"
              spacing={2}
              p={2}
            >
              <Box component="span" flexGrow={1}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="start"
                  spacing={2}
                  py={2}
                  sx={{ borderBottom: 1, borderColor: "divider" }}
                >
                  <Typography component="div" variant="subtitle2">
                    My Next 168
                  </Typography>
                  {/* Below button only visible if My Next 168 events are greater than 0 */}
                  <RenderViewAllButton path={"/week-tasks"} />
                </Stack>
                <Box>
                  {Data.length > 0 ? (
                    Data.map((item, index) => (
                      <OtherFeaturesData
                        key={index}
                        text={`My Next 168 ${index + 1}`}
                        type="My Next 168"
                        handleOpen={handleOpenSubTaskPreviewDialog}
                      />
                    ))
                  ) : (
                    <NoDataFound message="No Event" />
                  )}
                </Box>
              </Box>
              <Box py={1}>
                <Avatar sx={{ bgcolor: theme.palette.secondary.dark }}>
                  <CalendarMonthIcon />
                </Avatar>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        {/* <Grid item xs={12} md={6}>
          <Paper elevation={0}>
            <Stack direction="row" justifyContent="space-between" alignItems="start" spacing={2} p={2}> */}
        {/* <Box component="span">
                <Typography component="div" variant="subtitle2">My Notes</Typography>
              </Box> */}

        {/* below section is only visible if notes length > 0 */}
        {/* <Box component="span" flexGrow={1}>
                <Notes />
              </Box>

              <Box py={1}>
                <Avatar sx={{ bgcolor: theme.palette.secondary.dark }}>
                  <ListAltIcon />
                </Avatar>
              </Box>
            </Stack>
          </Paper>
        </Grid> */}

        <Grid item xs={12} md={6}>
          <Paper elevation={0}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="start"
              spacing={2}
              p={2}
            >
              <Box component="span" flexGrow={1}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                  py={2}
                  sx={{ borderBottom: 1, borderColor: "divider" }}
                >
                  <Typography component="div" variant="subtitle2">
                    My Alerts
                  </Typography>
                  {/* Below button only visible if My Alerts events are greater than 0 */}
                  <RenderViewAllButton path={"/my-alerts"} />
                </Stack>
                <Box>
                  {Data.length > 0 ? (
                    Data.map((item, index) => (
                      <OtherFeaturesData
                        key={index}
                        text={`My Alert ${index + 1}`}
                        type="My Alerts"
                        handleOpen={handleOpenSubTaskPreviewDialog}
                      />
                    ))
                  ) : (
                    <NoDataFound message="No Alert" />
                  )}
                </Box>
              </Box>

              <Box py={1}>
                <Avatar sx={{ bgcolor: theme.palette.secondary.dark }}>
                  <TimerIcon />
                </Avatar>
              </Box>
            </Stack>
          </Paper>
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
