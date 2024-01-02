import React from "react";
import { Typography, Box, Button, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
const PageNotFound = () => {
  const isLoggedIn = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");

  const redirectFn = () => {
    if (userType === "Admin") {
      if (isLoggedIn) {
        return "/super-admin/dashboard";
      } else {
        return "/super-admin/";
      }
    } else if (userType === "User") {
      if (isLoggedIn) {
        return "/dashboard";
      } else {
        return "/";
      }
    }
  };

  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h1" sx={{ fontWeight: "bold", mb: 4 }}>
        404
      </Typography>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Page not found
      </Typography>
      <Button
        component={Link}
        to={redirectFn()}
        variant="contained"
        sx={{
          px: 6,
          background: theme.palette.primary.dark,
          "&:hover": {
            backgroundColor: theme.palette.secondary.dark,
          },
        }}
      >
        Go back to Home
      </Button>
    </Box>
  );
};
export default PageNotFound;
