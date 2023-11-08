import React, { memo } from "react";
import { Box, Typography } from "@mui/material";
import { ArrowForwardIosSharp, ArrowRightAlt } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../style-functions";

const RecentList = ({}) => {
  return (
    <Accordion>
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography sx={{ fontSize: 14, fontWeight: "600", color: "#212934" }}>
          Mon, March 06, 2023
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              background: "white",
              border: "1px solid #212934",
              borderRadius: "50%",
              width: 24,
              height: 16,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ArrowForwardIosSharp sx={{ fontSize: 8, color: "#212934" }} />
          </Box>
          <Typography sx={{ fontSize: 13, color: "#212934", mx: 0.5 }}>
            00:58
          </Typography>
          <ArrowRightAlt sx={{ fontSize: 20, color: "#c7df19" }} />
          <Typography sx={{ fontSize: 13, color: "#212934", mx: 0.5 }}>
            Uzma Karjikar Assigned Uzma Testing As A Goal Manager
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(RecentList);
