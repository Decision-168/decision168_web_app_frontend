// ListSection.js
import React, { lazy, memo } from "react";
import { Box, Grid } from "@mui/material";
const GoalsAndStrategiesTable = lazy(() => import("./GoalsAndStrategiesTable"));

const ListSection = ({
  handleGoalOpen,
  handlePendingGoalOpen,
  value,
  AllGoalData,
}) => {
  const tableData = {
    all: [
      { title: "Created Goals", data: AllGoalData?.createData },
      { title: "Accepted Goals", data: AllGoalData?.acceptedData },
      { title: "Pending Requests", data: AllGoalData?.pendingRequest },
      { title: "More Info Requests", data: AllGoalData?.moreInfoRequest },
    ],
    "created-goals": [{ title: "Created Goals", data: AllGoalData.createData }],
    "accepted-goals": [
      { title: "Accepted Goals", data: AllGoalData.acceptedData },
    ],
    "pending-requests": [
      { title: "Pending Requests", data: AllGoalData.pendingRequest },
    ],
    "more-info-requests": [
      { title: "More Info Requests", data: AllGoalData.moreInfoRequest },
    ],
  };

  const tablesToRender = tableData[value] || [];

  return (
    <Box sx={{ flexGrow: 1 }} mb={2} mt={2}>
      <Grid container spacing={4}>
        {tablesToRender?.map((table, index) => {
          return (
            <Grid item xs={12} lg={12} key={index}>
              <GoalsAndStrategiesTable
                title={table?.title}
                handleOpen={handleGoalOpen}
                handlePendingGoalOpen={handlePendingGoalOpen}
                data={table?.data}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default memo(ListSection);
