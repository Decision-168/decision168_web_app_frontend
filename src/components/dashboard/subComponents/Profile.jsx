import { Avatar, Box, Button, Grid, Paper, Typography, useMediaQuery } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { stringAvatar } from "../../../helpers/stringAvatar";
import CoverImage from "../../../assets/images/cover-image.png";
import { useTheme } from "@mui/material/styles";
import { DashboardStyle } from "../styles";
import Chips from "./Chips";

export default function Profile() {
  const styles = DashboardStyle();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Adjust breakpoint as needed

  return (
    <Paper sx={{ minHeight: isSmallScreen ? "400px" : "350px" }}>
      <Box
        sx={{
          position: "relative",
          height: isSmallScreen ? "150px" : "200px",
          width: "100%",
          border: "1px solid gray",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "3px",
          marginBottom: isSmallScreen ? "80px" : "130px", // Adjust margin for small screens
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

        <Grid container sx={{ position: "absolute", left: "0%", top: "75%" }}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: "5px" }}>
              <Avatar {...stringAvatar("Arshad Khan")} sx={{ width: "100px", height: "100px", backgroundColor: theme.palette.primary.main, border: "5px solid white" }} />
              <Typography variant="h6">Arshad Khan</Typography>
              <Button variant="outlined" startIcon={<VisibilityIcon />}>
                <Typography noWrap>view profile</Typography>
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8} sx={{ marginTop: isSmallScreen ? "20px" : "auto" }}>
            {/* Adjust margin for small screens */}
            <Chips />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
