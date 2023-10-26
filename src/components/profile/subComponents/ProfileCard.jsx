import { Avatar, Box, Button, Grid, Paper } from "@mui/material";
import { stringAvatar } from "../../../helpers/stringAvatar";
import { useTheme } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Client from "../../common/Client";
import CardFeatures from "../../common/CardFeatures";
import CoverImage from "../../common/CoverImage";
import { Link } from "react-router-dom";

export default function ProfileCard() {
  const theme = useTheme();

  return (
    <Paper elevation={0}>
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
          <CardFeatures />

          <Grid container>
            <Grid item xs={12} sm={6} p={2} textAlign="left">
              <Link to="/update-profile">
                <Button variant="contained" endIcon={<ArrowForwardIcon />} size="small">
                  Update Profile
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
