import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Quote from "./subComponents/Quote";
import OtherFeatures from "./subComponents/OtherFeatures";
import { useTheme } from "@mui/material/styles";
import DashboardProfileCard from "./subComponents/DashboardProfileCard";

export default function Dashboard() {
  const theme = useTheme();

  return (
    <>
      <Box sx={{ flexGrow: 1 }} mb={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={8}>
            <DashboardProfileCard />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Quote />
          </Grid>
        </Grid>
      </Box>
      <OtherFeatures />
    </>
  );
}
