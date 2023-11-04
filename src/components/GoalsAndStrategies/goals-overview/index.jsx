import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ViewGoalsPopup from '../view-goals/subComponents/ViewGoalsPopup';
import ReduxDialog from '../../common/ReduxDialog';
import Goal from '../create-goals/subComponents/Goal';
import KPIs from '../create-goals/subComponents/KPIs';
import MembersAccordion from './subComponents/MembersAccordion';
import AddMemberDialog from './subComponents/AddMemberDialog';

const GoalsOverview = () => {
  const theme= useTheme()
  const navigate = useNavigate()
    const [inputFields, setInputFields] = useState([]);

    const handleAddClick = () => {
      setInputFields([...inputFields, { KPI: "", Description: "" }]);
    };
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <Grid container spacing={1}>
        <Grid item xs={12} lg={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Typography
              component="h6"
              variant="subtitle2"
              sx={{
                color: theme.palette.secondary.dark,
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              OVERVIEW
            </Typography>
            <Button
              variant="contained"
              startIcon={<ArrowBack />}
              size="small"
              sx={{ background: "#383838", color: "#fff", ml: 1 }}
              onClick={() => navigate("/portfolio-goals")}
            >
              Back
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} lg={8}>
          <ViewGoalsPopup />
        </Grid>
        <Grid item xs={12} lg={4}>
          <MembersAccordion />
        </Grid>
      </Grid>
      <ReduxDialog
        value="create-goals"
        modalTitle="Edit Goal"
        showModalButton={false}
        modalSize="md"
      >
        <Goal individual={true} />
      </ReduxDialog>
      <ReduxDialog
        value="create-kpis"
        modalTitle="Add KPIs"
        showModalButton={false}
        modalSize="sm"
      >
        <KPIs
          individual={true}
          inputFields={inputFields}
          setInputFields={setInputFields}
          handleAddClick={handleAddClick}
        />
      </ReduxDialog>
      <ReduxDialog
        value="add-team-members"
        modalTitle="Add Team Members"
        showModalButton={false}
        modalSize="sm"
      >
        <AddMemberDialog />
      </ReduxDialog>
    </Box>
  );
}

export default GoalsOverview