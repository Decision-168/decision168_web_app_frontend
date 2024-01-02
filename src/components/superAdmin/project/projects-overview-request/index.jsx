import { Box, Grid } from "@mui/material";
import React from "react";
import PendingProjectPopup from "../portfolio-projects-list/PendingProjectPopup";
import MembersAccordion from "../../GoalsAndStrategies/goals-overview/subComponents/MembersAccordion";
import BasicBreadcrumbs from "../../common/BasicBreadcrumbs";

const ProjectsOverviewRequest = () => {
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <BasicBreadcrumbs currentPage="Overview" showBackButton={true} />

      <Grid container spacing={1}>
        <Grid item xs={12} lg={8}>
          <PendingProjectPopup />
        </Grid>
        <Grid item xs={12} lg={4}>
          <MembersAccordion pending={true} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectsOverviewRequest;
