import * as React from "react";
import { Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import BasicBreadcrumbs from "../common/BasicBreadcrumbs";
import ProfileCard from "./subComponents/ProfileCard";
import ViewCard from "./subComponents/ViewCard";

export default function UpdateProfile() {
  const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <BasicBreadcrumbs currentPage="update" />
      <Grid container spacing={2}>
        <Grid item xs={12} lg={9}>
          <ProfileCard />
        </Grid>

        <Grid item xs={12} lg={3}>
          <ViewCard />
        </Grid>
      </Grid>
    </Box>
  );
}
