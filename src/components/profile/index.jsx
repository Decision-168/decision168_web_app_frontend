import { Box, Grid } from "@mui/material";
import BasicBreadcrumbs from "../common/BasicBreadcrumbs";
import ProfileCard from "../profile/subComponents/ProfileCard";
import PersonalInfo from "./subComponents/PersonalInfo";

export default function Profile() {
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <BasicBreadcrumbs currentPage="profile" showBackButton={false} />
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
