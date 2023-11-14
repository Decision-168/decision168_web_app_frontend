import React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import BasicBreadcrumbs from "../../common/BasicBreadcrumbs";
import TaskOverviewCard from "./subComponents/TaskOverviewCard";
import { taskOverviewStyles } from "./styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import TaskLinks from "./subComponents/TaskLinks";
import TaskFiles from "./subComponents/TaskFiles";

export default function TaskOverview() {
  const theme = useTheme();
  const styles = taskOverviewStyles();
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <Grid container>
        <Grid item xs={4} md={2}>
          <BasicBreadcrumbs currentPage="Overview" showBackButton={true} />
        </Grid>
        <Grid item xs={4} md={10}>
          <Box sx={{ height: "100%", display: "flex", justifyContent: "start", alignItems: "center" }}>
            <Button component={Link} to="/projects-overview" startIcon={<ArrowBackIcon />} size="small" variant="contained" sx={{ ml: 2, backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.light, "&:hover": { backgroundColor: theme.palette.secondary.dark } }}>
              Go To Project
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <TaskOverviewCard styles={styles} />
          <TaskLinks styles={styles} />
          <TaskFiles styles={styles} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper elevation={0}>
            <Typography variant="h6">Comments Section</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
