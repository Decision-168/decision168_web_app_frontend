import React, { memo, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid, IconButton } from "@mui/material";
import { AssignmentTurnedInOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Box } from "@mui/system";
import ProgressBar from "../../subComponents/ProgressBar";
import ViewProjectPopup from "../../subComponents/ViewProjectPopup";
import CustomDialog from "../../../common/CustomDialog";

const KPIChildAccordion = ({}) => {
    const [openProject, setOpenProject] = useState(false);

    const handleProjectClose = () => {
      setOpenProject(false);
    };
    const handleProjectOpen = () => {
      setOpenProject(true);
    };
  return (
    <Accordion elevation={0} sx={{ border: "1px solid #f3f3f3" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{ bgcolor: "#f3f3f3" }}
      >
        <Typography sx={{ fontSize: 13, display: "inline", fontWeight: "700" }}>
          PROJECT:
          <Typography
            sx={{
              fontSize: 13,
              mx: 1,

              display: "inline",
            }}
          >
            Dashboard Module
          </Typography>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid
          container
          p={1}
          spacing={1}
          sx={{ borderBottom: "1px solid #f5f5f5" }}
        >
          <Grid item xs={7} textAlign={"left"}>
            <Typography sx={{ fontSize: 12 }}>
              Dashboards provide users from all different businesses the ability
              to monitor performance, crea...
            </Typography>
          </Grid>
          <Grid xs={3} alignSelf={"center"}>
            <ProgressBar />
          </Grid>
          <Grid
            xs={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <IconButton aria-label="view" size="small">
              <AssignmentTurnedInOutlined fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="view"
              size="small"
              onClick={handleProjectOpen}
            >
              <VisibilityOutlined fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      </AccordionDetails>
      <CustomDialog
        handleClose={handleProjectClose}
        open={openProject}
        modalTitle="Dashboard Module"
        // redirectPath={"/kpi-overview"}
        showModalButton={true}
        modalSize="md"
      >
        <ViewProjectPopup />
      </CustomDialog>
    </Accordion>
  );
};
export default memo(KPIChildAccordion);
