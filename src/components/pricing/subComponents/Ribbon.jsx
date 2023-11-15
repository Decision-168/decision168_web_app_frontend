import React, { memo } from "react";
import { Box } from "@mui/material";

const Ribbon = ({ styles }) => {
  return (
    <Box sx={styles.ribbonContainer}>
      <Box sx={styles.ribbon}>SPECIAL OFFER!</Box>
      <Box sx={styles.ribbonTail} />
    </Box>
  );
};
export default memo(Ribbon);
