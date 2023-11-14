import { Avatar, Box, Grid, Typography, useTheme } from "@mui/material";
import React, { memo } from "react";
import { stringAvatar } from "../../../helpers/stringAvatar";
import { BusinessCenter, CalendarMonth, Person } from "@mui/icons-material";
import ProgressBar from "../subComponents/ProgressBar";
const GoalPopup = ({ nodes }) => {
  const theme = useTheme();
  const kpiData = [1, 2];
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
            MANAGEMENT, ACCOUNTABILITY, & PRODUCTIVITY Use this platform to
            reclaim time, gain brand exposure, and to focus on what’s important
            for you to build an innovative business and manage your personal or
            professional life – or both. The DECISION 168 team is on a mission
            to Empower Small Businesses, Entrepreneurs, and Individuals. Through
            the relationships and experience of our network, we will make a
            difference together. Our goal is to help people across the world
            perform and function at their highest levels and utilize their
            unique talents, so that they may make an impact within their
            communities and beyond.
          </Typography>
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <CommonList
            icon={<CalendarMonth sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Start Date"}
            info={"6 Nov, 2023"}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <CommonList
            icon={<CalendarMonth sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"End Date"}
            info={"31 Dec, 2023"}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <CommonList
            icon={
              <BusinessCenter sx={{ color: "#c7df19", fontSize: "14px" }} />
            }
            title={"Department"}
            info={"Research & Development"}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <CommonList
            icon={<Person sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Created By"}
            info={"Uzma Karjikar"}
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
                      ABC Strategy 3
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
