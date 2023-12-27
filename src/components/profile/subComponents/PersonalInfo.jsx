import { Box, Paper, Typography, Grid, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { useSelector } from "react-redux";
import moment from "moment";
import SocialMedia from "../../common/SocialMedia";

export default function PersonalInfo() {
  const theme = useTheme();
  const user = useSelector(selectUserDetails);
  const fullName = `${user?.first_name} ${user?.middle_name} ${user?.last_name} `;
  return (
    <Paper elevation={0}>
      <Box p={2}>
        <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.dark, fontWeight: "700" }} textAlign="left">
          Personal Information
        </Typography>

        <Grid container mt={2}>
          <Grid xs={12} item>
            <Grid container p={1} borderBottom={1} borderColor={theme.palette.secondary.light} color={theme.palette.secondary.main}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" textAlign="left">
                  Full Name :
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="caption" display="block" gutterBottom textAlign="left">
                  {fullName}
                </Typography>
              </Grid>
            </Grid>

            <Grid container p={1} borderBottom={1} borderColor={theme.palette.secondary.light} color={theme.palette.secondary.main}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" textAlign="left">
                  E-mail Address :
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="caption" display="block" gutterBottom textAlign="left">
                  {user?.email_address}
                </Typography>
              </Grid>
            </Grid>

            <Grid container p={1} borderBottom={1} borderColor={theme.palette.secondary.light} color={theme.palette.secondary.main}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" textAlign="left">
                  Gender :
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="caption" display="block" gutterBottom textAlign="left">
                  {user?.gender}
                </Typography>
              </Grid>
            </Grid>

            <Grid container p={1} borderBottom={1} borderColor={theme.palette.secondary.light} color={theme.palette.secondary.main}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" textAlign="left">
                  Date of Birth :
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="caption" display="block" gutterBottom textAlign="left">
                  {moment(user?.dob).format("Do MMMM, YYYY ")}
                </Typography>
              </Grid>
            </Grid>

            <Grid container p={1} borderBottom={1} borderColor={theme.palette.secondary.light} color={theme.palette.secondary.main}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" textAlign="left">
                  Social Media Link(s) :
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Stack direction="row" justifyContent="start" alignItems="center" spacing={1}>
                  <SocialMedia links={user?.social_media} icons={user?.social_media_icon} />
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
