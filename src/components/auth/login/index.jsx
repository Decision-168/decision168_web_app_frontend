import React, { useEffect, useState } from "react";
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
import { Hidden, Stack, Typography } from "@mui/material";
import Navigation from "../subComponents/Navigation";
import { Navigate } from "react-router-dom";
import { getUser } from "../../../api/modules/authModule";

export default function Login() {
  const theme = useTheme();
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/dashboard" />;
  }

  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await getUser();
      setData(response);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Grid
      container
      component="main"
      sx={{
        maxHeight: "100vh",
        minHeight: "100vh",
        maxWidth: "100vw",
        boxSizing: "border-box",
      }}
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={8}
        lg={9}
        xl={9}
        component={Paper}
        elevation={0}
        square
        bgcolor={theme.palette.secondary.main}
      >
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
        sx={{ position: "relative" }}
      >
        <Hidden mdDown>
          <Ribbon />
        </Hidden>

        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="left"
          color="white"
          p={3}
          sx={{ height: "100%" }}
        >
          {/* Decision-168 logo */}
          <Box mb={10}>
            <Brand />
          </Box>

          <Box sx={{ m: 0.3 }}>
            {/* Welcome and text */}
            <Header
              title=" Welcome Back!"
              text="Sign in to continue with Decision 168"
            />

            {/* Form */}
            <Form />
            {data.map((item, index) => {
              return (
                <Box key={index}>
                  <Typography>{item.name}</Typography>
                  <Typography>{item.email}</Typography>
                </Box>
              );
            })}
          </Box>

          {/* Social Media platforms */}
          {/* <Box mt={2}>
              <SocialMedia title="Sign in With" />
            </Box> */}

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
