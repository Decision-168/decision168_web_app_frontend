import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ViewKpiPopup from "../subComponents/ViewKpiPopup";
import ProjectSection from "./project-section/ProjectSection";
// import Quote from "./quote-section/Quote";
import RecentHistory from "../subComponents/history-section/RecentHistory";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import {
  checkPortfolioMemberActive,
  getViewHistoryDateStrategy,
} from "../../../api/modules/goalkpiModule";
import Quote from "../../dashboard/subComponents/Quote";
const KPIOverview = () => {
  const { sid } = useParams();

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
          setdisplayData(true);
        } else {
          setdisplayData(false);
        }
      } catch (error) {
        if (error.response?.status === 400) {
          navigate("/portfolio-goals");
        }

        toast.error(`Portfolio Owner Inactive You!`);
        setdisplayData(false);
        // Handle error, maybe show an error message
      }
    };

    checkMemberToDisplay();
  }, [user_email, storedPorfolioId]);

  const [getKPIName, setKPIName] = useState([]);

  useEffect(() => {
    const fetchKPIAllHistoryData = async () => {
      try {
        const hresponse = await getViewHistoryDateStrategy(sid);
        setKPIName(hresponse.KpiDetail);
      } catch (error) {}
    };

    fetchKPIAllHistoryData();
  }, [sid]);

  const theme = useTheme();
  const navigate = useNavigate();

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
                  onClick={() => navigate(`/goal-overview/${getKPIName.gid}`)}
                >
                  Back
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} lg={8}>
            <Grid container>
              <Grid item xs={12} lg={12}>
                <ViewKpiPopup kpi_id={sid} />
              </Grid>
              <Grid item xs={12} lg={12}>
                <ProjectSection kpi_id={sid} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container>
              <Grid item xs={12} lg={12}>
                <Quote />
              </Grid>
              <Grid item xs={12} lg={12}>
                <RecentHistory id={sid} type={"kpi"} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    )
  );
};

export default KPIOverview;
