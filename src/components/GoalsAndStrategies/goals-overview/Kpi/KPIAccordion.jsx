import React, { Fragment, memo } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, IconButton } from "@mui/material";
import { Add, VisibilityOutlined } from "@mui/icons-material";
import { Box } from "@mui/system";
import KPIChildAccordion from "./KPIChildAccordion";

const KPIAccordion = ({}) => {
      const data = [1, 2];
  return (
    <Accordion elevation={0} sx={{ border: "1px solid #f3f3f3" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{ border: "1px solid #f3f3f3" }}
      >
        <Typography sx={{ fontSize: 13, display: "inline", fontWeight: "700" }}>
          KPI:
          <Typography
            sx={{
              fontSize: 13,
              mx: 1,

              display: "inline",
            }}
          >
            ABC Strategy 3
          </Typography>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Typography sx={{ fontSize: 12 }}>No Description!</Typography>
          <IconButton aria-label="delete" size="small">
            <VisibilityOutlined fontSize="small" />
          </IconButton>
        </Box>
        {data.map((item, index) => {
          return (
            <Fragment key={index}>
              <KPIChildAccordion />
            </Fragment>
          );
        })}
        <Box mt={1} textAlign={"start"}>
          <Button variant="outlined" size="small" startIcon={<Add />}>
            Add Project
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{ mx: 1 }}
            startIcon={<Add />}
          >
            Create Content
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
export default memo(KPIAccordion);
