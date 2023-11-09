import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ViewKpiPopup from "../subComponents/ViewKpiPopup";
import ProjectSection from "./project-section/ProjectSection";
import Quote from "./quote-section/Quote";
import RecentHistory from "../subComponents/history-section/RecentHistory";
const KPIOverview = () => {
  const theme = useTheme();
  const navigate = useNavigate();
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
              onClick={() => navigate("/goal-overview")}
            >
              Back
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Grid container>
            <Grid item xs={12} lg={12}>
               <ViewKpiPopup/>
            </Grid>
            <Grid item xs={12} lg={12}>
              <ProjectSection/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container>
            <Grid item xs={12} lg={12}>
              <Quote />
            </Grid>
            <Grid item xs={12} lg={12}>
             <RecentHistory/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default KPIOverview;
