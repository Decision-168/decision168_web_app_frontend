import React from "react";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ListAltIcon from "@mui/icons-material/ListAlt";
import TimerIcon from "@mui/icons-material/Timer";
import { Avatar, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

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

export default function ResponsiveGrid() {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <Paper elevation={4}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} p={2}>
                <Box component="span">
                  <Typography variant="subtitle2">{item.label}</Typography>
                </Box>
                <Box component="span">
                  <Avatar sx={{ bgcolor: theme.palette.secondary.dark }}>{item.icon}</Avatar>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
