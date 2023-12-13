import { Box, Grid } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import PendingPopup from "../subComponents/PendingPopup";
import MembersAccordion from "../goals-overview/subComponents/MembersAccordion";
import BasicBreadcrumbs from "../../common/BasicBreadcrumbs";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import {
  checkPortfolioMemberActive,
  getGoalMemberDetailbyGID,
} from "../../../api/modules/goalkpiModule";

const GoalOverviewRequest = () => {
  //get user id
  const user = useSelector(selectUserDetails);
  const id = user?.reg_id;
  const email = user?.email_address;
  //get user id

  const { gid } = useParams();

  const [displayData, setdisplayData] = useState(false);

  useEffect(() => {
    const checkMemberToDisplay = async () => {
      try {
        const response = await checkPortfolioMemberActive(
          "uzmakarjikar@gmail.com",
          "2"
        ); //useremail,portid
        if (response) {
          const response2 = await getGoalMemberDetailbyGID("1", gid); //userid
          if (response2) {
            setdisplayData(true);
          } else {
            setdisplayData(false);
          }
        } else {
          setdisplayData(false);
        }
      } catch (error) {
        if (error.response?.status === 400) {
          navigate("/portfolio-goals");
        }
        console.error(error);
        toast.error(`Portfolio Owner Inactive You!`);
        setdisplayData(false);
        // Handle error, maybe show an error message
      }
    };

    checkMemberToDisplay();
  }, []);

  return (
    displayData === true && (
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
    )
  );
};

export default memo(GoalOverviewRequest);
