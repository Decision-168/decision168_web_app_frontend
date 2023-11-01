import { Box, Button, Grid } from "@mui/material";
import React from "react";
import BasicBreadcrumbs from "../../common/BasicBreadcrumbs";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router";
import HorizontalLinearStepper from "./subComponents/Stepper";

const CreateGoalIndex = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={1}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <BasicBreadcrumbs currentPage="GOALS" />
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
          <Grid item xs={12} lg={12}>
          <HorizontalLinearStepper/>
          </Grid>
      </Grid>
    </Box>
  );
};

export default CreateGoalIndex;
