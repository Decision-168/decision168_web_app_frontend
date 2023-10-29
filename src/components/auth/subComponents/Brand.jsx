import React from "react";
import decision168 from "../../../assets/images/decision-168.png";
import { Box } from "@mui/material";

export default function Brand() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <img src={decision168} alt="Decision-168-logo" style={{ width: "55%" }} />
    </Box>
  );
}
