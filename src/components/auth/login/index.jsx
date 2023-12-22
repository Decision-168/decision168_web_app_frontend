import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Ribbon from "../subComponents/Ribbon";
import Brand from "../subComponents/Brand";
import Header from "../subComponents/Header";
import Form from "./Form";
import Copyright from "../subComponents/Copyright";
import BackImage from "../subComponents/BackImage";
import { useTheme } from "@mui/material/styles";
import { Hidden, Stack } from "@mui/material";
import Navigation from "../subComponents/Navigation";

export default function Login() {
  const theme = useTheme();

  return (
    <Grid container component="main" sx={{ maxHeight: "100vh", minHeight:"100vh", maxWidth:"100vw", boxSizing:"border-box" }}>
      <Grid item xs={12} sm={12} md={8} lg={9} xl={9}>
        <BackImage />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={4}
        lg={3}
        xl={3}
        component={Paper}
        elevation={6}
        square
        bgcolor={theme.palette.secondary.main}
        sx={{ position: "relative"}}
      >
        <Hidden mdDown>
          <Ribbon />
        </Hidden>

        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          color="white"
          p={4}
          sx={{ height: "100%" }}
        >
          <Box>
            {/* Decision-168 logo */}
            <Box mb={10}>
              <Brand />
            </Box>

            {/* Welcome and text */}
            <Header
              title=" Welcome Back!"
              text="Sign in to continue with Decision 168"
            />

            {/* Form */}
            <Form />

            {/* Social Media platforms */}
            {/* <Box mt={2}>
              <SocialMedia title="Sign in With" />
            </Box> */}
          </Box>
          {/* Navigation */}
          <Navigation
            question="Don't have an account?"
            linkLabel="Sign Up Now"
            path="/register"
          />
          {/* Copyright */}
          <Copyright />
        </Stack>
      </Grid>
    </Grid>
  );
}
