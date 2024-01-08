import { Box } from "@mui/material";
import React, { memo } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const ScrollableContainer = ({ children, maxHeight }) => {


  return (
    <PerfectScrollbar>
      <Box sx={{ maxHeight: maxHeight || "200px"}}>{children}</Box>
    </PerfectScrollbar>
  );
};

export default memo(ScrollableContainer);
