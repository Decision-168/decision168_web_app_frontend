import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Brand from "../subComponents/Brand";
import Header from "../subComponents/Header";
import Form from "./Form";
import Navigation from "../subComponents/Navigation";
import Copyright from "../subComponents/Copyright";
import BackImage from "../subComponents/BackImage";
import { useTheme } from "@mui/material/styles";
import { Stack } from "@mui/material";

export default function ChangePassword() {
  const theme = useTheme();

  return (
    <Grid container component="main" sx={{ maxHeight: "100vh", minHeight:"100vh", maxWidth:"100vw", boxSizing:"border-box" }}>
      <Grid item xs={12} sm={12} md={9} lg={9} xl={9} elevation={0} square bgcolor={theme.palette.secondary.main}>
        <BackImage />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={3}
        lg={3}
        xl={3}
        component={Paper}
        elevation={6}
        square
        bgcolor={theme.palette.secondary.main}
        sx={{ position: "relative" }}
      >
        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          color="white"
          p={3}
          sx={{ height: "100%" }}
        >
          <Box color="white">
            {/* Decision-168 logo */}
            <Box mb={10}>
              <Brand />
            </Box>


            <Box sx={{m:0.3}}>
            {/* Welcome and text */}
            <Header
              title="Change Password"
              text="Change-Password with Decision 168."
            />

            {/* Form */}
            <Box my={1}>
              <Form />
            </Box>
            </Box>
          </Box>

          {/* Copyright */}
          <Copyright />
        </Stack>
      </Grid>
    </Grid>
  );
}
