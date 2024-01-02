import { Typography, Box, Button, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
const SAPageNotFound = () => {
  const isLoggedIn = localStorage.getItem("token");
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
        to={isLoggedIn ? "/super-admin/dashboard" : "/super-admin/"}
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
export default SAPageNotFound;
