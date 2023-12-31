import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import PendingProjectPopup from "../portfolio-projects-list/PendingProjectPopup";
import MembersAccordion from "../../GoalsAndStrategies/goals-overview/subComponents/MembersAccordion";
import BasicBreadcrumbs from "../../common/BasicBreadcrumbs";
import { getUserData } from "../../../api/modules/FileCabinetModule";
import {
  getProjectDetail,
  notificationsClear,
} from "../../../api/modules/ProjectModule";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";

const ProjectsOverviewRequest = () => {
  const { pid } = useParams();
  const [projectData, setProjectData] = useState([]);
  const [userData, setUserData] = useState([]);

  const user = useSelector(selectUserDetails);
  const userID = user?.reg_id;

  const fetchProjectData = async () => {
    try {
      const response = await getProjectDetail(pid);
      setProjectData(response);
    } catch (error) {}
  };

  const fetchNotifications = async () => {
    try {
      const response = await notificationsClear(pid, userID);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjectData();
    fetchNotifications();
  }, [pid]);
  const pDetail = projectData?.project;

  // Creater (User) Data ----------------------------------------------
  const fetchUserData = async () => {
    try {
      const response = await getUserData(pDetail?.pcreated_by);
      setUserData(response);
    } catch (error) {}
  };

  useEffect(() => {
    fetchUserData();
  }, [projectData]);

  const userName = `${userData?.first_name} ${userData?.last_name}`;
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <BasicBreadcrumbs currentPage="Overview" showBackButton={true} />

      <Grid container spacing={1}>
        <Grid item xs={12} lg={8}>
          <PendingProjectPopup pid={pid} refreshData={fetchProjectData} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <MembersAccordion pid={pid} pending={true} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectsOverviewRequest;
