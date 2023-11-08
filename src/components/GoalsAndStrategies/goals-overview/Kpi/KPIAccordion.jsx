import React, { Fragment, memo, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Grid, IconButton } from "@mui/material";
import { Add, VisibilityOutlined } from "@mui/icons-material";
import { Box } from "@mui/system";
import KPIChildAccordion from "./KPIChildAccordion";
import ViewKpiPopup from "../../subComponents/ViewKpiPopup";
import CustomDialog from "../../../common/CustomDialog";
import ProgressBar from "../../subComponents/ProgressBar";

const KPIAccordion = ({}) => {
  const data = [1, 2];
  const [openKPI, setOpenKPI] = useState(false);

  const handleKPIClose = () => {
    setOpenKPI(false);
  };
  const handleKPIOpen = () => {
    setOpenKPI(true);
  };
  return (
    <>
      <Accordion elevation={0} sx={{ border: "1px solid #f3f3f3" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ border: "1px solid #f3f3f3" }}
        >
          <Typography
            sx={{ fontSize: 13, display: "inline", fontWeight: "700" }}
          >
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
          <Grid container p={1} sx={{ borderBottom: "1px solid #f5f5f5" }}>
            <Grid item xs={7} md={7} lg={7} textAlign={"left"}>
              <Typography sx={{ fontSize: 12 }}>
                Development of D168 Platform. Development is a process that
                creates growth, progress, positive change or the addition of
                physical, economic, environmental, soc...
              </Typography>
            </Grid>
            <Grid xs={4} alignSelf={"center"}>
              <ProgressBar />
            </Grid>
            <Grid xs={1} alignSelf={"center"}>
              <IconButton
                aria-label="delete"
                size="small"
                onClick={handleKPIOpen}
              >
                <VisibilityOutlined fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>
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
          </Box>
        </AccordionDetails>
      </Accordion>
      <CustomDialog
        handleClose={handleKPIClose}
        open={openKPI}
        modalTitle="ABC Strategy 3"
        redirectPath={"/kpi-overview"}
        showModalButton={true}
        modalSize="md"
      >
        <ViewKpiPopup />
      </CustomDialog>
    </>
  );
};
export default memo(KPIAccordion);
