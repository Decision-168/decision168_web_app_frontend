import React, { useEffect, useState } from "react";
import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ViewProjectPopup from "../../GoalsAndStrategies/subComponents/ViewProjectPopup";
import RecentHistory from "../../GoalsAndStrategies/subComponents/history-section/RecentHistory";
import TaskContainer from "./project-tasks/TaskContainer";
import LinkContainer from "./project-links/LinkContainer";
import FileContainer from "./project-files/FileContainer";
import CommentSection from "./comment-section";
import { getUserData } from "../../../api/modules/FileCabinetModule";
import { getProjectDetail } from "../../../api/modules/ProjectModule";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import MembersAccordion from "../subComponents/MembersAccordion";
const ProjectOverview = () => {
  const { pid } = useParams();
  const [projectData, setProjectData] = useState([]);
  const [userData, setUserData] = useState([]);

  const user = useSelector(selectUserDetails);
  const userID = user?.reg_id;

  const fetchProjectData = async () => {
    try {
      const response = await getProjectDetail(pid);
      setProjectData(response);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchProjectData();
  }, [pid]);
  const pDetail = projectData?.project;
  const link_comments = pDetail?.plink_comment;

  // Creater (User) Data ----------------------------------------------
  const fetchUserData = async () => {
    try {
      const response = await getUserData(pDetail?.pcreated_by);
      setUserData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [projectData]);

  const userName = `${userData?.first_name} ${userData?.last_name}`;

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
              { (pDetail?.gid != 0) ?
                (<Button
                  variant="contained"
                  startIcon={<ArrowBack />}
                  size="small"
                  sx={{ background: "#383838", color: "#fff", mx: 1 }}
                  onClick={() => navigate("/goal-overview")}
                >
                  Go To Goal
                </Button>) : <></>
              }
              { (pDetail?.sid != 0) ?
                (<Button
                  variant="contained"
                  startIcon={<ArrowBack />}
                  size="small"
                  sx={{ background: "#383838", color: "#fff" }}
                  onClick={() => navigate("/kpi-overview")}
                >
                  Go TO KPI
                </Button>) : <></>
              }              
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} lg={8}>
          <Grid container>
            <Grid item xs={12} lg={12}>
              <ViewProjectPopup pid={pid} refreshData={fetchProjectData}/>
            </Grid>
            <Grid item xs={12} lg={12}>
              <TaskContainer pid={pid}/>
            </Grid>
            <Grid item xs={12} lg={12}>
              <LinkContainer pid={pid} />
            </Grid>
            <Grid item xs={12} lg={12}>
              <FileContainer pid={pid} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container>
            <Grid item xs={12} lg={12}>
              <MembersAccordion pid={pid} />
            </Grid>
            <Grid item xs={12} lg={12}>
              <CommentSection projectId={pid} taskId={"0"} subtaskId={"0"}/>
            </Grid>
            <Grid item xs={12} lg={12}>
              <RecentHistory id={pid} type={"project"}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectOverview;
