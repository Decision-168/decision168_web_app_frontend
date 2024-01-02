import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Header({ title, text }) {
  const theme = useTheme();
  return (
    <Box textAlign="left" my={2}>
      <Typography component="h1" variant="h6" color={theme.palette.primary.main}>
        {title}
      </Typography>
      <Typography component="p" variant="caption">
        {text}
      </Typography>
    </Box>
  );
}
