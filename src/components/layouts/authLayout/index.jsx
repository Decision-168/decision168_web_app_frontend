import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import { AuthLayoutStyles } from "./styles";
import Ribbon from "../../auth/subComponents/Ribbon";

export default function AuthLayout({ children }) {
  const theme = useTheme();
  const styles = AuthLayoutStyles();

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid item xs={false} sm={4} md={7} lg={8} xl={9} sx={styles.backGroundImage} />
      <Grid item xs={12} sm={8} md={5} lg={4} xl={3} component={Paper} elevation={6} square bgcolor={theme.palette.secondary.main} sx={{ position: "relative" }}>
        <Ribbon />
        <Box
          sx={{
            m: 4,
            display: "flex",
            flexDirection: "column",
            color: "white",
          }}>
          {/* Render your form and data below  */}
          <Box>{children}</Box>
        </Box>
      </Grid>
    </Grid>
  );
}
