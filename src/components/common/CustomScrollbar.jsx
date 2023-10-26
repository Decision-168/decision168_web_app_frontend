import React from "react";
import Box from "@mui/material/Box";

export default function CustomScrollbar({ children }) {
  return (
    <Box
      sx={{
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "primary.main", // Change this to your desired color
          //   background: "#B9B8B9",
          borderRadius: "6px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "primary.dark", // Change this to your desired hover color
        },
        "&::-webkit-scrollbar-track": {
          background: "background.paper", // Change this to your desired background color
        },
      }}>
      {children}
    </Box>
  );
}
