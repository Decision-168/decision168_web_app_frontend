import { Box, Button, Grid, Typography } from "@mui/material";
import React, { memo } from "react";
import { BusinessCenter, CalendarMonth, CheckCircleOutline, Person } from "@mui/icons-material";
import GridList from "./GridList";
const PendingPopup = ({}) => {
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
        <Grid item xs={6} md={6} lg={6} alignSelf={"center"}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "row",
            }}
          >
            <CheckCircleOutline
              sx={{ color: "#008E00", mr: 1, fontSize: 40 }}
            />
            <Typography
              sx={{
                color: "#343a40",
                fontWeight: "900",
                fontSize: "16px",
              }}
              textAlign={"start"}
            >
              GOAL: Nov Goal
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={6} lg={6} alignSelf={"center"}>
          <Button variant="contained" size="small" sx={{ mr: 1 }}>
            Accept Request
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{ background: "#383838", color: "#fff" }}
          >
            Request More Info
          </Button>
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
            No Description!
          </Typography>
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <GridList
            icon={<CalendarMonth sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Start Date"}
            info={"6 Nov, 2023"}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <GridList
            icon={<CalendarMonth sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"End Date"}
            info={"31 Dec, 2023"}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <GridList
            icon={
              <BusinessCenter sx={{ color: "#c7df19", fontSize: "14px" }} />
            }
            title={"Department"}
            info={"Research & Development"}
          />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <GridList
            icon={<Person sx={{ color: "#c7df19", fontSize: "14px" }} />}
            title={"Created By"}
            info={"Uzma Karjikar"}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default memo(PendingPopup);
