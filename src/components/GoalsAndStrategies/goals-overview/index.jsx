import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ViewGoalsPopup from "../subComponents/ViewGoalsPopup";
import ReduxDialog from "../../common/ReduxDialog";
import MembersAccordion from "./subComponents/MembersAccordion";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import DuplicateDialog from "../subComponents/DuplicateDialog";
import KPISection from "./Kpi";
import RecentHistory from "../subComponents/history-section/RecentHistory";
import OverallHistory from "../subComponents/history-section/OverallHistory";
import KPIs from "../portfolio-goals/create-goals/subComponents/KPIs";
import Goal from "../portfolio-goals/create-goals/subComponents/Goal";
import BasicBreadcrumbs from "../../common/BasicBreadcrumbs";

const GoalsOverview = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [inputFields, setInputFields] = useState([]);

  const handleAddClick = () => {
    setInputFields([...inputFields, { KPI: "", Description: "" }]);
  };
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <BasicBreadcrumbs currentPage="Overview" showBackButton={true} />

      <Grid container spacing={1}>
        <Grid item xs={12} lg={8}>
          <Grid container>
            <Grid item xs={12} lg={12}>
              <ViewGoalsPopup />
            </Grid>
            <Grid item xs={12} lg={12}>
              <KPISection />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container>
            <Grid item xs={12} lg={12}>
              <MembersAccordion />
            </Grid>
            <Grid item xs={12} lg={12}>
              <RecentHistory />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ReduxDialog value="create-goals" modalTitle="Edit Goal" showModalButton={false} modalSize="md">
        <Goal individual={true} />
      </ReduxDialog>
      <ReduxDialog value="create-kpis" modalTitle="Add KPIs" showModalButton={false} modalSize="sm">
        <KPIs individual={true} inputFields={inputFields} setInputFields={setInputFields} handleAddClick={handleAddClick} />
      </ReduxDialog>

      <ReduxDialog value="view-all-history" modalTitle="HISTORY" showModalButton={false} modalSize="md">
        <OverallHistory />
      </ReduxDialog>
      
      <ConfirmationDialog value={"fileItGoal"} />
      <ConfirmationDialog value={"deleteGoal"} />
      <ReduxDialog value="duplicate-goal" modalTitle="Copy Goal" showModalButton={false} modalSize="sm">
        <DuplicateDialog />
      </ReduxDialog>
    </Box>
  );
};

export default GoalsOverview;
