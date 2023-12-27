import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ViewGoalsPopup from "../subComponents/ViewGoalsPopup";
import MembersAccordion from "./subComponents/MembersAccordion";
import KPISection from "./Kpi";
import RecentHistory from "../subComponents/history-section/RecentHistory";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import {
  checkPortfolioMemberActive,
  getGoalMemberDetailbyGID,
  getViewHistoryDateGoal,
} from "../../../api/modules/goalkpiModule";

const GoalsOverview = () => {
  const { gid } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const [inputFields, setInputFields] = useState([{ sname: "", sdes: "" }]);

  //get user id
  const user = useSelector(selectUserDetails);
  const user_id = user?.reg_id;
  const user_email = user?.email_address;
  //get user id

  const storedPorfolioId = JSON.parse(localStorage.getItem("portfolioId"));

  const [displayData, setdisplayData] = useState(false);

  useEffect(() => {
    const checkMemberToDisplay = async () => {
      try {
        const response = await checkPortfolioMemberActive(
          user_email,
          storedPorfolioId
        );
        if (response) {
          const response2 = await getGoalMemberDetailbyGID(user_id, gid);
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

        toast.error(`Portfolio Owner Inactive You!`);
        setdisplayData(false);
      }
    };

    checkMemberToDisplay();
  }, [user_email, storedPorfolioId]);

  const [allHist, setallHist] = useState([]);
  const [getName, setName] = useState([]);

  useEffect(() => {
    const fetchAllHistoryData = async () => {
      try {
        const hresponse = await getViewHistoryDateGoal(gid);
        setName(hresponse.goal_detail);
        setallHist(hresponse.history_dates);
      } catch (error) {}
    };

    fetchAllHistoryData();
  }, [gid]);

  //Check Button Visibility
  const [AccdisplayBtns, setAccdisplayBtns] = useState("no");

  useEffect(() => {
    const DisplayAccordionActions = async () => {
      try {
        if (getName.gcreated_by == user_id) {
          setAccdisplayBtns("all");
        } else if (
          getName.get_portfolio_createdby_id == user_id ||
          getName.gmanager == user_id
        ) {
          setAccdisplayBtns("some");
        } else {
          setAccdisplayBtns("no");
        }
      } catch (error) {
        setAccdisplayBtns("no");
      }
    };

    DisplayAccordionActions();
  }, [getName, user_id]);

  //Check Button Visibility

  const handleAddClick = () => {
    setInputFields([...inputFields, { sname: "", sdes: "" }]);
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
                <ViewGoalsPopup goalID={gid} id={user_id} />
              </Grid>
              <Grid item xs={12} lg={12}>
                <KPISection goalID={gid} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container>
              <Grid item xs={12} lg={12}>
                <MembersAccordion goalID={gid} displayBtns={AccdisplayBtns} />
              </Grid>
              <Grid item xs={12} lg={12}>
                <RecentHistory id={gid} type={"goal"} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    )
  );
};

export default memo(GoalsOverview);
