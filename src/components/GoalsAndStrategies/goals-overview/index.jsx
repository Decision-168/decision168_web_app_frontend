import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import {
  checkPortfolioMemberActive,
  getGoalMemberDetailbyGID,
  getViewHistoryDateGoal,
} from "../../../api/modules/goalkpiModule";

const GoalsOverview = () => {
  const { gid } = useParams();

  //get user id
  const user = useSelector(selectUserDetails);
  const id = user?.reg_id;
  const email = user?.email_address;
  //get user id

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

  const [allHist, setallHist] = useState([]);
  const [getName, setName] = useState([]);

  useEffect(() => {
    const fetchAllHistoryData = async () => {
      try {
        const hresponse = await getViewHistoryDateGoal(gid);
        setName(hresponse.goal_detail);
        setallHist(hresponse.history_dates);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllHistoryData();
  }, []);

  const theme = useTheme();
  const navigate = useNavigate();
  const [inputFields, setInputFields] = useState([]);

  const handleAddClick = () => {
    setInputFields([...inputFields, { KPI: "", Description: "" }]);
  };

  return (
    displayData === true && (
      <Box sx={{ flexGrow: 1 }} mb={2}>
        <Grid container spacing={1}>
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
                  onClick={() => navigate("/portfolio-goals")}
                >
                  Back
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} lg={8}>
            <Grid container>
              <Grid item xs={12} lg={12}>
                <ViewGoalsPopup goalID={gid} id={id} />
              </Grid>
              <Grid item xs={12} lg={12}>
                <KPISection goalID={gid} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container>
              <Grid item xs={12} lg={12}>
                <MembersAccordion goalID={gid} />
              </Grid>
              <Grid item xs={12} lg={12}>
                <RecentHistory id={gid} type={"goal"}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <ReduxDialog
          value="create-goals"
          modalTitle="Edit Goal"
          showModalButton={false}
          modalSize="md"
        >
          <Goal individual={true} updetail={setName}/>
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
            goalID={gid}
          />
        </ReduxDialog>

        <ReduxDialog
          value="view-all-history"
          modalTitle="HISTORY"
          showModalButton={false}
          modalSize="md"
        >
          <OverallHistory
            allHist={allHist}
            name={getName.gname}
            type={"Goal"}
            id={getName.gid}
          />
        </ReduxDialog>

        <ConfirmationDialog value={"fileItGoal"} />
        <ConfirmationDialog value={"deleteGoal"} />
        <ReduxDialog
          value="duplicate-goal"
          modalTitle="Copy Goal"
          showModalButton={false}
          modalSize="sm"
        >
          <DuplicateDialog goalData = {getName} />
        </ReduxDialog>
      </Box>
    )
  );
};

export default memo(GoalsOverview);
