import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Ribbon() {
  const theme = useTheme();
  return (
    <Box>
      <Box
        sx={{
          width: 0,
          height: 0,
          backgroundColor: "#a3bd53",
          position: "absolute",
          top: "80px",
          borderStyle: "solid",
          borderWidth: "10px 15px 0px 0px",
          borderRightColor: "transparent",
          left: "-15px",
          transform: [{ rotate: "180deg" }],
        }}
      />
      <Box
        sx={{
          width: "55%",
          height: "40px",
          backgroundColor: theme.palette.primary.main,
          position: "absolute",
          top: "90px",
          left: "-15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h6" color="white" textAlign="left">
          BETA VERSION
        </Typography>
      </Box>
    </Box>
  );
}
