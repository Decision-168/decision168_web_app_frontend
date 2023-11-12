import React from "react";
import { Box, Button, Grid, Typography, Paper } from "@mui/material";
import BasicBreadcrumbs from "../../common/BasicBreadcrumbs";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import OverviewCard from "./subComponents/OverviewCard";
import {taskOverviewStyles} from "./styles"

export default function TaskOverview() {
  const styles = taskOverviewStyles();
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <BasicBreadcrumbs currentPage="Overview" showBackButton={true} />
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Paper elevation={0}>
            {/* <Typography variant="h6">Task Section</Typography> */}
            <OverviewCard styles={styles}/>
          </Paper>
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
