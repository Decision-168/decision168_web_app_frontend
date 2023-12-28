import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Brand from "../subComponents/Brand";
import Header from "../subComponents/Header";
import SocialMedia from "../subComponents/SocialMedia";
import Form from "./Form";
import Copyright from "../subComponents/Copyright";
import Navigation from "../subComponents/Navigation";
import BackImage from "../subComponents/BackImage";
import { useTheme } from "@mui/material/styles";
import { Stack } from "@mui/material";
export default function Register() {
  const theme = useTheme();

  return (
    <Grid container component="main" sx={{ maxHeight: "100vh", minHeight:"100vh", maxWidth:"100vw", boxSizing:"border-box" }}>
      <Grid item xs={12} sm={12} md={8} lg={9} xl={9} elevation={0} square bgcolor={theme.palette.secondary.main}>
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
        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="left"
          color="white"
          p={3}
          sx={{ height: "100%" }}
        >
  
            {/* Decision-168 logo */}
            <Box mb={2}>
              <Brand />
            </Box>

            <Box sx={{m:0.3}}>
            {/* Welcome and text */}
            <Header
              title="Register account"
              text="Get your free Decision168 account now."
            />

            {/* Form */}
            <Box my={0}>
              <Form />
            </Box>
            </Box>

            {/* Social Media platforms */}
            {/* <Box mt={2}>
              <SocialMedia title="Sign up using" />
            </Box> */}
      
          {/* Navigation */}
          <Navigation
            question="Already have an account?"
            linkLabel="Login"
            path="/"
          />
          {/* Copyright */}
          <Copyright />
        </Stack>
      </Grid>
    </Grid>
  );
}
