import React, { memo } from "react";
import { Box, useTheme } from "@mui/material";
import { ThumbUp } from "@mui/icons-material";

const Ribbon = ({ styles }) => {
  const theme = useTheme();
  return (
    <Box sx={styles.ribbonContainer}>
      <Box sx={styles.ribbon}>
        MOST POPULAR <ThumbUp style={styles.ThumbUpIcon} />
      </Box>
      <Box sx={styles.ribbonTail} />
    </Box>
  );
};
export default memo(Ribbon);
