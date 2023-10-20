import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Ribbon() {
  const theme = useTheme();
  return (
    <Box sx={{ width: "55%", height: "40px", backgroundColor: theme.palette.primary.main, position: "absolute", top: "90px", left: "-5%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Typography component="h1" variant="h6" color="white" textAlign="left">
        BETA VERSION
      </Typography>
    </Box>
  );
}
