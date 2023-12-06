import { Box, Grid } from "@mui/material";
import React from "react";
import PendingPopup from "../subComponents/PendingPopup";
import MembersAccordion from "../goals-overview/subComponents/MembersAccordion";
import BasicBreadcrumbs from "../../common/BasicBreadcrumbs";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";

const GoalOverviewRequest = () => {
  //get user id
  const user = useSelector(selectUserDetails);
  const id = user?.reg_id;
  //get user id
  
  const { gid } = useParams();
  
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <BasicBreadcrumbs currentPage="Overview" showBackButton={true} />

      <Grid container spacing={1}>
        <Grid item xs={12} lg={8}>
          <PendingPopup goalID={gid} id={id} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <MembersAccordion goalID={gid} pending={true} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default GoalOverviewRequest;
