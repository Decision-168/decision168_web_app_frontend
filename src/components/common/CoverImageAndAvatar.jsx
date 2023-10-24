import { Avatar, Box, Grid, Typography, useMediaQuery } from "@mui/material";
import { stringAvatar } from "../../helpers/stringAvatar";
import CoverImage from "../../assets/images/cover-image.png";
import { useTheme } from "@mui/material/styles";

export default function CoverImageAndAvatar({ clientName, clientPosition }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
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
          marginBottom: isSmallScreen ? "80px" : "110px",
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

        <Grid  container sx={{ position: "absolute", left: "0%", top: "75%" }}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: "5px" }}>
              <Avatar {...stringAvatar("Arshad Khan")} sx={{ width: "100px", height: "100px", backgroundColor: theme.palette.primary.main, border: "5px solid white" }} />
              <Typography component="div" variant="h6">
                {clientName}
              </Typography>
              <Typography component="p" variant="caption" color={theme.palette.secondary.main} display="block" gutterBottom>
                {clientPosition}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
