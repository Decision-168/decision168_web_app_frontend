import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import logo from "../../../assets/images/logo.png";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { LoginStyles } from "../login/styles";
import { useTheme } from "@mui/material/styles";
import Carousel from "./Carousel";

export default function BackImage() {
  const theme = useTheme();
  const styles = LoginStyles();
  return (
    <Box sx={styles.backGroundImage} p={4} color="white">
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
        <img src={logo} alt="logo" style={{ width: "10%" }} />
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item xs zeroMinWidth>
            <Typography noWrap component="h1" variant="h2" textAlign="center" sx={{ fontWeight: "bold" }}>
              Visualize.
              <Box component="span" sx={{ color: theme.palette.primary.main }}>
                Plan
              </Box>
              .Implement… <br />
              Repeat!
            </Typography>
          </Grid>
        </Grid>

        <Typography component="p" variant="body1" textAlign="center">
          &quot; THE DECISIONS WE MAKE TODAY, SHAPE THE US OF TOMORROW &quot;
        </Typography>
        <Typography component="p" variant="h5" textAlign="center">
          <FormatQuoteIcon sx={{ rotate: "180deg", color: theme.palette.primary.main, width: "40px", height: "40px" }} />
          Let’s get you unstuck!
        </Typography>

        <Box sx={{ width: "100%", height: "280px", backgroundColor: "transparent", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Carousel />
        </Box>
      </Stack>
    </Box>
  );
}
