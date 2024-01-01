import React from "react";
import { Box, Typography } from "@mui/material";
import { AuthStyles } from "../styles";

export default function Ribbon() {
  const styles = AuthStyles();
  return (
    <Box sx={styles.ribbon}>
      <Typography component="h1" variant="h6" color="white" textAlign="left">
        BETA VERSION
      </Typography>
    </Box>
  );
}
