import React, { Fragment, memo, useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, Grid, IconButton,Tooltip,Typography } from "@mui/material";
import { Add, VisibilityOutlined } from "@mui/icons-material";
import KPIChildAccordion from "./KPIChildAccordion";
import ViewKpiPopup from "../../../subComponents/ViewKpiPopup";
import CustomDialog from "../../../../common/CustomDialog";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../../redux/action/modalSlice";
import ReduxDialog from "../../../../common/ReduxDialog";
import CreateProject from "../../../../project/Dialogs/CreateProject";
import LinearProgressWithLabel from "../../../../common/LinearProgressWithLabel";
import { getStrategyAllProjectsList } from "../../../../../api/modules/goalkpiModule";

const KPIAccordion = ({kpi}) => {
  
  const sid = kpi.sid;  

  const [kpiProdetails, setkpiProdetails] = useState([]);
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await getStrategyAllProjectsList(sid); 
        setkpiProdetails(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllData();
  }, [sid]);

  const [inputFields, setInputFields] = useState([]);

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
              {kpi.sname}
            </Typography>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container p={1} sx={{ borderBottom: "1px solid #f5f5f5" }}>
            <Grid item xs={7} md={7} lg={7} textAlign={"left"}>
              <Typography sx={{ fontSize: 12 }}>
              {kpi?.sdes ? kpi?.sdes : "No Description!"}
              </Typography>
            </Grid>
            <Grid xs={4} alignSelf={"center"}>
              <LinearProgressWithLabel value={kpi.kpi_progress} />
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
          {kpiProdetails.map((item, index) => {
            return (
              <Fragment key={index}>
                <KPIChildAccordion project={item}/>
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
        modalTitle={kpi.sname}
        redirectPath={`/kpi-overview/${sid}`}
        showModalButton={true}
        modalSize="md"
      >
        <ViewKpiPopup kpi_id={sid}/>
      </CustomDialog>
      <ReduxDialog
        value="create-project"
        modalTitle="Create New Project"
        showModalButton={false}
        modalSize="md"
      >
        <CreateProject flag="add" gid={kpi?.gid} sid={kpi?.sid} passPID={0}/>
      </ReduxDialog>
    </>
  );
};
export default memo(KPIAccordion);
