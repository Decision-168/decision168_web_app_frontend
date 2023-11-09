import { Box, Grid } from "@mui/material";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import CustomSearchField from "../../../subComponents/CustomSearchField";
import CustomCard from "./CustomCard";
import {
  acceptedData,
  createData,
  moreInfoRequest,
  pendingRequest,
} from "./data";

const tableData = {
  all: [...createData, ...acceptedData, ...pendingRequest, ...moreInfoRequest],
  "created-goals": [...createData],
  "accepted-goals": [...acceptedData],
  "pending-requests": [...pendingRequest],
  "more-info-requests": [...moreInfoRequest],
};

const GridSection = ({ handleGoalOpen, value }) => {
  const tablesToRender = tableData[value] || [];
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/goal-overview");
  };

  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <Grid container>
        <Grid item xs={12} lg={9}></Grid>
        <Grid item xs={12} lg={3}>
          <CustomSearchField />
        </Grid>
      </Grid>
      <Grid container mt={2} spacing={2}>
        {tablesToRender.map((item, index) => {
          return (
            <Grid item xs={12} lg={3} key={index}>
              <CustomCard
                value={item.type}
                item={item}
                handleClick={handleRedirect}
                handleOpen={handleGoalOpen}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default memo(GridSection);
