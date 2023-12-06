import { Avatar, Box, Grid, Typography, useTheme } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { stringAvatar } from "../../../helpers/stringAvatar";
import { BusinessCenter, CalendarMonth, Person } from "@mui/icons-material";
import ProgressBar from "../subComponents/ProgressBar";
import { getDepartmentData, getGoalData, getGoalKPIData, getUserData } from "../../../api/modules/FileCabinetModule";
const GoalPopup = ({ nodes, regId, portfolioId }) => {
  const [goalData, setGoalData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [kpiData, setKpiData] = useState([]);

  // Goal Data ----------------------------------------------
  const fetchGoalData = async () => {
    try {
      const response = await getGoalData(nodes?.table_id);
      setGoalData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGoalData();
  }, [nodes]);

  const goalStartDate = new Date(goalData.gstart_date);
  const formattedGoalStartDate = `${goalStartDate.getDate()} ${goalStartDate.toLocaleString('default', { month: 'short' })}, ${goalStartDate.getFullYear()}`;

  const goalEndDate = new Date(goalData.gend_date);
  const formattedGoalEndDate = `${goalEndDate.getDate()} ${goalEndDate.toLocaleString('default', { month: 'short' })}, ${goalEndDate.getFullYear()}`;

  // Department Data ----------------------------------------------
  const fetchDepartmentData = async () => {
    try {
      const response = await getDepartmentData(goalData?.gdept);
      setDepartmentData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDepartmentData();
  }, [goalData]);

  const departmentName = departmentData?.department;

  // Creater (User) Data ----------------------------------------------
  const fetchUserData = async () => {
    try {
      const response = await getUserData(goalData?.gcreated_by);
      setUserData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [goalData]);

  const userName = `${userData?.first_name} ${userData?.last_name}`;

  // Goal Wise KPI data ----------------------------------------------
  const fetchKPIData = async () => {
    try {
      const response = await getGoalKPIData(goalData?.gid,goalData?.gdept,portfolioId);
      setKpiData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchKPIData();
  }, [goalData]);

  // --------------------------End -----------------------//

  const theme = useTheme();
  // const kpiData = [1, 2];
  const CommonList = ({ icon, title, info }) => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "start",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          {icon}
          <Typography sx={{ fontSize: 14, color: "#212934", ml: 1 }}>
            {title}
          </Typography>
        </Box>

        <Typography sx={{ fontSize: 13, color: "#74788d" }}>{info}</Typography>
      </Box>
    );
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
        background: "white",
        p: 2,
        borderRadius: 1,
      }}
      mb={2}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "row",
            }}
          >
            <Avatar
              sx={{ bgcolor: theme.palette.primary.main, mr: 1 }}
              aria-label="goal"
            >
              {...stringAvatar(nodes.name)}
            </Avatar>
            <Typography
              sx={{
                color: "#343a40",
                fontWeight: "900",
                fontSize: "16px",
              }}
              textAlign={"start"}
            >
              GOAL: {nodes.name}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            sx={{ fontSize: 14, color: "#212934", textAlign: "start" }}
          >
            Progress :
          </Typography>
          <ProgressBar />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            sx={{ fontSize: 14, color: "#212934", textAlign: "start" }}
          >
            Description :
          </Typography>
          <Typography
            sx={{
              color: "#74788d",
              whiteSpace: "pre-wrap",
              textAlign: "start",
              p: 1,
              fontSize: 13,
            }}
          >
            {nodes.description}
          </Typography>
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <CommonList
            icon={<CalendarMonth sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Start Date"}
            info={formattedGoalStartDate}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <CommonList
            icon={<CalendarMonth sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"End Date"}
            info={formattedGoalEndDate}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <CommonList
            icon={
              <BusinessCenter sx={{ color: "#c7df19", fontSize: "14px" }} />
            }
            title={"Department"}
            info={departmentName}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <CommonList
            icon={<Person sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Created By"}
            info={userName}
          />
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <Typography
            sx={{
              color: "#495057",
              fontSize: 15,
              fontWeight: "600",
              ml: 0.5,
              textAlign: "left",
            }}
          >
            KPIs
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          {kpiData.map((item, index) => {
            return (
              <Grid
                container
                key={index}
                p={1}
                sx={{ borderBottom: "1px solid #f5f5f5" }}
              >
                <Grid item xs={7} md={7} lg={7} textAlign={"left"}>
                  <Typography
                    sx={{
                      fontSize: 13,
                      display: "inline",
                      fontWeight: "700",
                      textAlign: "left",
                    }}
                  >
                    KPI:
                    <Typography
                      sx={{
                        fontSize: 13,
                        mx: 1,

                        display: "inline",
                      }}
                    >
                      {item.sname}
                    </Typography>
                  </Typography>
                </Grid>
                <Grid xs={5} alignSelf={"center"}>
                  <ProgressBar />
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(GoalPopup);
