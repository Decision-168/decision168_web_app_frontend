import * as React from "react";
import { Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import BasicBreadcrumbs from "../common/BasicBreadcrumbs";
import ProfileCard from "../profile/subComponents/ProfileCard";
import PersonalInfo from "./subComponents/PersonalInfo";

export default function Profile() {
  const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <BasicBreadcrumbs currentPage="profile" />
      <Grid container>
        <Grid item xs={12} lg={9}>
          <ProfileCard />
        </Grid>
      </Grid>

      <Grid container mt={2}>
        <Grid item xs={12} lg={9}>
          <PersonalInfo />
        </Grid>
      </Grid>
    </Box>
  );
}
