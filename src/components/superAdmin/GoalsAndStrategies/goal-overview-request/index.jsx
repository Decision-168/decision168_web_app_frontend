import { Box, Grid } from "@mui/material";
import React from "react";
import PendingPopup from "../subComponents/PendingPopup";
import MembersAccordion from "../goals-overview/subComponents/MembersAccordion";
import BasicBreadcrumbs from "../../common/BasicBreadcrumbs";

const GoalOverviewRequest = () => {
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <BasicBreadcrumbs currentPage="Overview" showBackButton={true} />

      <Grid container spacing={1}>
        <Grid item xs={12} lg={8}>
          <PendingPopup />
        </Grid>
        <Grid item xs={12} lg={4}>
          <MembersAccordion pending={true} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default GoalOverviewRequest;
