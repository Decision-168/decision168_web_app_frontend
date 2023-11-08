import React from "react";
import Box from "@mui/material/Box";

export default function Dot({ color, size }) {
    
  const dotStyle = {
    width: size,
    height: size,
    borderRadius: "50%", // Makes it a circle
    backgroundColor: color,
    display: "inline-block",
  };

  return <Box style={dotStyle}></Box>;
}
