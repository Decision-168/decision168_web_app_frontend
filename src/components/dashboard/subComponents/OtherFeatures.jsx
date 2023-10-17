import React from "react";
import { Box, Button } from "@mui/material";
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

const renderViewAllButton = () => {
  if (Data.length > 0) {
    return (
      <Button href="/" variant="outlined" size="small" startIcon={<ArrowForwardIcon />}>
        view all
      </Button>
    );
  } else {
    return null;
  }
};

export default function ResponsiveGrid() {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={0}>
            <Stack direction="row" justifyContent="space-between" alignItems="start" spacing={2} p={2}>
              <Box component="span" flexGrow={1}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} py={2} sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Typography component="div" variant="subtitle2">
                    My Day
                  </Typography>
                  {/* Below button only visible if My Next 168 events are greater than 0 */}
                  {renderViewAllButton()}
                </Stack>
                <Box>{Data.length > 0 ? Data.map((item, index) => <OtherFeaturesData key={index} text={`My Day ${index + 1}`} type="Event" />) : <NoDataFound message="No Event" />}</Box>
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
            <Stack direction="row" justifyContent="space-between" alignItems="start" spacing={2} p={2}>
              <Box component="span" flexGrow={1}>
                <Stack direction="row" justifyContent="space-between" alignItems="start" spacing={2} py={2} sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Typography component="div" variant="subtitle2">
                    My Next 168
                  </Typography>
                  {/* Below button only visible if My Next 168 events are greater than 0 */}
                  {renderViewAllButton()}
                </Stack>
                <Box>{Data.length > 0 ? Data.map((item, index) => <OtherFeaturesData key={index} text={`My Next 168 ${index + 1}`} type="Event" />) : <NoDataFound message="No Event" />}</Box>
              </Box>
              <Box py={1}>
                <Avatar sx={{ bgcolor: theme.palette.secondary.dark }}>
                  <CalendarMonthIcon />
                </Avatar>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={0}>
            <Stack direction="row" justifyContent="space-between" alignItems="start" spacing={2} p={2}>
              {/* <Box component="span">
                <Typography component="div" variant="subtitle2">My Notes</Typography>
              </Box> */}

              {/* below section is only visible if notes length > 0 */}
              <Box component="span" flexGrow={1}>
                <Notes />
              </Box>

              <Box py={1}>
                <Avatar sx={{ bgcolor: theme.palette.secondary.dark }}>
                  <ListAltIcon />
                </Avatar>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={0}>
            <Stack direction="row" justifyContent="space-between" alignItems="start" spacing={2} p={2}>
              <Box component="span" flexGrow={1}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} py={2} sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Typography component="div" variant="subtitle2">
                    My Alerts
                  </Typography>
                  {/* Below button only visible if My Alerts events are greater than 0 */}
                  {renderViewAllButton()}
                </Stack>
                <Box>{Data.length > 0 ? Data.map((item, index) => <OtherFeaturesData key={index} text={`My Alert ${index + 1}`} type="Alert" />) : <NoDataFound message="No Alert" />}</Box>
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
    </Box>
  );
}
