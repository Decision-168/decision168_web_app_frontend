import { Avatar, Box, Button, Grid, Paper } from "@mui/material";
import { stringAvatar } from "../../../helpers/stringAvatar";
import { useTheme } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Client from "../../common/Client";
import CardFeatures from "../../common/CardFeatures";
import CoverImage from "../../common/CoverImage";
import { Link } from "react-router-dom";
import PersonalInfo from "./PersonalInfo";

const items = [
  {
    count: 1,
    label: "Portfolio",
  },
  {
    count: 8,
    label: "Projects",
  },
  {
    count: 0,
    label: "Planned Content",
  },
  {
    count: 1,
    label: "Tasks",
  },
];

export default function ViewProfileDialogContent() {
  const theme = useTheme();

  return (
    <Paper elevation={0} sx={{ height: "80vh" }}>
      <Grid container>
        <Grid item xs={12}>
          <CoverImage />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Box px={4} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "start", marginTop: "-50px" }}>
            <Avatar {...stringAvatar("Arshad Khan")} sx={{ width: "100px", height: "100px", backgroundColor: theme.palette.primary.main, border: "5px solid white" }} />
            <Client clientName="Arshad Khan" clientPosition="Project Manager" />
          </Box>
        </Grid>

        <Grid item xs={12} sm={8} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }}>
          <CardFeatures items={items} />

          <Grid container>
            <Grid item xs={12} md={4} p={2} textAlign="left">
              <Link to="/update-profile">
                <Button variant="contained" endIcon={<ArrowForwardIcon />} size="small">
                  Update Profile
                </Button>
              </Link>
            </Grid>
            <Grid item xs={12} md={4} p={2} textAlign="left">
              <Link to="/">
                <Button variant="contained" endIcon={<ArrowForwardIcon />} size="small">
                  Change Password
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container mt={2}>
        <Grid item xs={12}>
          <PersonalInfo />
        </Grid>
      </Grid>
    </Paper>
  );
}