import React, { memo } from "react";
import { Box } from "@mui/material";
import { ThumbUp } from "@mui/icons-material";

const Ribbon = ({ styles }) => {
  return (
    <Box sx={styles.ribbonContainer}>
      <Box sx={styles.ribbon}>
        MOST POPULAR <ThumbUp style={styles.ThumbUpIcon} />
      </Box>
    </Box>
  );
};
export default memo(Ribbon);
