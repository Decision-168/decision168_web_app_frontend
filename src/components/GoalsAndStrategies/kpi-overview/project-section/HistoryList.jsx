import React, { memo } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { ArrowRightAlt } from "@mui/icons-material";
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  "&:before": {
    display: "none",
    height: "0px",
  },
  borderLeft:'5px dotted #f5f5f5',

}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <Box
        sx={{
          background: "#c7df19",
          borderRadius: "50%",
          width: 16,
          height: 16,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          animation: "slideRightToLeft 1s ease-in-out", 
          "@keyframes slideRightToLeft": {
            from: {
              transform: "translateX(100%)",
            },
            to: {
              transform: "translateX(0)",
            },
          },
        }}
      >
        <ArrowForwardIosSharpIcon sx={{ fontSize: 8, color: "white" }} />
      </Box>
    }
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
  marginLeft: "-16px",
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
}));

const HistoryList = ({}) => {
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
              width: 14,
              height: 14,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ArrowForwardIosSharpIcon sx={{ fontSize: 8, color: "#212934" }} />
          </Box>
          <Typography
            sx={{ fontSize: 14, color: "#212934", mx: 1 }}
          >
            00:58:10
          </Typography>
          <ArrowRightAlt sx={{ fontSize: 20, color: "#c7df19" }} />
          <Typography
            sx={{ fontSize: 14, color: "#212934", mx: 1 }}
          >
            Uzma Karjikar
          </Typography>
          <ArrowRightAlt sx={{ fontSize: 20, color: "#c7df19" }} />
          <Typography
            sx={{ fontSize: 14, color: "#212934", mx: 1 }}
          >
            Uzma Karjikar Assigned Uzma Testing As A Goal Manager
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(HistoryList);
