import React, { Fragment, memo, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, Grid, IconButton,Tooltip,Typography } from "@mui/material";
import { Add, VisibilityOutlined } from "@mui/icons-material";
import KPIChildAccordion from "./KPIChildAccordion";
import ViewKpiPopup from "../../../subComponents/ViewKpiPopup";
import CustomDialog from "../../../../common/CustomDialog";
import ProgressBar from "../../../subComponents/ProgressBar";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../../redux/action/modalSlice";
import ReduxDialog from "../../../../common/ReduxDialog";
import CreateProject from "../../../../project/Dialogs/CreateProject";

const KPIAccordion = ({}) => {
  const data = [1, 2];
  const [openKPI, setOpenKPI] = useState(false);

  const handleKPIClose = () => {
    setOpenKPI(false);
  };
  const handleKPIOpen = () => {
    setOpenKPI(true);
  };
  const dispatch = useDispatch()
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
              <Tooltip title="Preview KPI" placement="top">
                <IconButton
                  aria-label="preview"
                  size="small"
                  onClick={handleKPIOpen}
                >
                  <VisibilityOutlined fontSize="small" />
                </IconButton>
              </Tooltip>
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
            <Button
              variant="outlined"
              size="small"
              startIcon={<Add />}
              onClick={() => dispatch(openModal("create-project"))}
            >
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
      <ReduxDialog
        value="create-project"
        modalTitle="Create New Project"
        showModalButton={false}
        modalSize="md"
      >
        <CreateProject flag="add" />
      </ReduxDialog>
    </>
  );
};
export default memo(KPIAccordion);
