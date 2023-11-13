import React, { memo } from "react";
import { Box, LinearProgress } from "@mui/material";
import { LinearProgressWithLabel } from "../GoalsAndStrategies/subComponents/style-functions";

const LinearWithValueLabel = ({ value }) => {

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={value} />
    </Box>
  );
};
export default memo(LinearWithValueLabel);
