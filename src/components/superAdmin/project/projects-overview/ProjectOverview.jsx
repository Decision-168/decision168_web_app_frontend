import React from "react";
import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ViewProjectPopup from "../../GoalsAndStrategies/subComponents/ViewProjectPopup";
import MembersAccordion from "../../GoalsAndStrategies/goals-overview/subComponents/MembersAccordion";
import RecentHistory from "../../GoalsAndStrategies/subComponents/history-section/RecentHistory";
import TaskContainer from "./project-tasks/TaskContainer";
import LinkContainer from "./project-links/LinkContainer";
import FileContainer from "./project-files/FileContainer";
import CommentSection from "./comment-section";
const ProjectOverview = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "row",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: theme.palette.secondary.dark,
                textTransform: "uppercase",
                fontWeight: "600",
                fontSize: "16px",
                mx: 1,
              }}
            >
              OVERVIEW
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Button
                variant="contained"
                startIcon={<ArrowBack />}
                size="small"
                sx={{ background: "#383838", color: "#fff" }}
                onClick={() => navigate("/portfolio-projects-list")}
              >
                Back
              </Button>
              <Button
                variant="contained"
                startIcon={<ArrowBack />}
                size="small"
                sx={{ background: "#383838", color: "#fff", mx: 1 }}
                onClick={() => navigate("/goal-overview")}
              >
                Go TO Goal
              </Button>
              <Button
                variant="contained"
                startIcon={<ArrowBack />}
                size="small"
                sx={{ background: "#383838", color: "#fff" }}
                onClick={() => navigate("/kpi-overview")}
              >
                Go TO KPI
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} lg={8}>
          <Grid container>
            <Grid item xs={12} lg={12}>
              <ViewProjectPopup />
            </Grid>
            <Grid item xs={12} lg={12}>
              <TaskContainer />
            </Grid>
            <Grid item xs={12} lg={12}>
              <LinkContainer />
            </Grid>
            <Grid item xs={12} lg={12}>
              <FileContainer />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container>
            <Grid item xs={12} lg={12}>
              <MembersAccordion />
            </Grid>
            <Grid item xs={12} lg={12}>
              <CommentSection />
            </Grid>
            <Grid item xs={12} lg={12}>
              <RecentHistory />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectOverview;
