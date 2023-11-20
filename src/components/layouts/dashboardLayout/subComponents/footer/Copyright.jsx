import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";
import { Box, Grid, useMediaQuery } from "@mui/material";

export default function Copyright() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md")); // Adjust breakpoint as needed

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: "whitesmoke",
        color: theme.palette.primary.contrastText,
      }}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography component="div" variant="caption" display="block" gutterBottom textAlign={isSmallScreen ? "center" : "start"} px={3}>
            © Copyright 2013 - {new Date().getFullYear()} | <Link href="https://www.decision168.com/">DECISION 168, Inc</Link> | <Link href="https://www.decision168.com/cookie-policy/">Cookies Policy</Link> | <Link href="https://www.decision168.com/privacy-policy/">Privacy Policy</Link> | <Link href="https://www.decision168.com/terms-conditions/">Terms & Conditions</Link>
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography component="div" variant="caption" display="block" gutterBottom textAlign={isSmallScreen ? "center" : "end"} px={3}>
            All Rights Reserved | <Link href="https://www.z2squared.com/">Powered by z2 Squared </Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
