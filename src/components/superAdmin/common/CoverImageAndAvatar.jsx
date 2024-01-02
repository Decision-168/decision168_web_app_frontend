import { Avatar, Box, Button, Grid, Stack, Typography, useMediaQuery, Paper } from "@mui/material";
import { stringAvatar } from "../../helpers/stringAvatar";
import CoverImage from "../../assets/images/cover-image.png";
import { useTheme } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Client from "./Client";
import CardFeatures from "./CardFeatures";

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

export default function CoverImageAndAvatar() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper elevation={0}>
      <Grid container>
        <Grid item xs={12}>
          <Box
            sx={{
              height: isSmallScreen ? "150px" : "200px",
              width: "100%",
              border: "1px solid gray",
              borderRadius: "3px",
              overflow: "hidden",
            }}>
            <img
              src={CoverImage}
              alt="cover-image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "50% 35%",
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Box px={4} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "start", marginTop: "-50px" }}>
            <Avatar {...stringAvatar("Arshad Khan")} sx={{ width: "100px", height: "100px", backgroundColor: theme.palette.primary.main, border: "5px solid white" }} />
            <Client clientName="Arshad Khan" clientPosition="Project Manager" />
          </Box>
        </Grid>

        <Grid item xs={12} sm={8} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }}>
          <CardFeatures items={items}/>

          <Grid container>
            <Grid item xs={12} sm={6} p={2} textAlign="left">
              <Button variant="contained" endIcon={<ArrowForwardIcon />} size="small">
                View Profile
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
