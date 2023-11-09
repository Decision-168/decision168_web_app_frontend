import { Box, Typography } from "@mui/material";
import React from "react";

export default function SmallList({ label, value }) {
  return (
    <Box>
      <Typography
        component="p"
        sx={{
          color: "#343a40",
          fontWeight: "600",
          fontSize: "12px",
        }}
        textAlign={"start"}>
        {label} :
      </Typography>
      <Typography
        component="p"
        sx={{
          color: "#343a40",
          fontWeight: "300",
          fontSize: "12px",
        }}
        textAlign={"start"}>
        {value}
      </Typography>
    </Box>
  );
}
