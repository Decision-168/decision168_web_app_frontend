import { Box, Grid } from "@mui/material";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import CustomCard from "./CustomCard";

const GridSection = ({
  handleGoalOpen,
  handlePendingGoalOpen,
  value,
  AllGoalData,
}) => {
  const tableData = {
    all: [
      ...AllGoalData?.createData,
      ...AllGoalData?.acceptedData,
      ...AllGoalData?.pendingRequest,
      ...AllGoalData?.moreInfoRequest,
    ],
    "created-goals": [...AllGoalData?.createData],
    "accepted-goals": [...AllGoalData?.acceptedData],
    "pending-requests": [...AllGoalData?.pendingRequest],
    "more-info-requests": [...AllGoalData?.moreInfoRequest],
  };

  const tablesToRender = tableData[value] || [];

  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <Grid container mt={2} spacing={2}>
        {tablesToRender?.map((item, index) => {
          return (
            <Grid item xs={12} lg={3} key={index}>
              <CustomCard
                value={item?.type}
                item={item}
                handleOpen={handleGoalOpen}
                handlePendingGoalOpen={handlePendingGoalOpen}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default memo(GridSection);
