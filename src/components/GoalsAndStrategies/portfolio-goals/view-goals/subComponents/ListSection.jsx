// ListSection.js
import React, { lazy, memo, useMemo } from "react";
import { Box, Grid } from "@mui/material";
import {
  acceptedData,
  createData,
  moreInfoRequest,
  pendingRequest,
} from "./data";
const GoalsAndStrategiesTable = lazy(() => import("./GoalsAndStrategiesTable"));

const tableData = {
  all: [
    { title: "Created Goals", data: createData },
    { title: "Accepted Goals", data: acceptedData },
    { title: "Pending Requests", data: pendingRequest },
    { title: "More Info Requests", data: moreInfoRequest },
  ],
  "created-goals": [{ title: "Created Goals", data: createData }],
  "accepted-goals": [{ title: "Accepted Goals", data: acceptedData }],
  "pending-requests": [{ title: "Pending Requests", data: pendingRequest }],
  "more-info-requests": [
    { title: "More Info Requests", data: moreInfoRequest },
  ],
};

const ListSection = ({ handleGoalOpen, handlePendingGoalOpen, value }) => {
  const tablesToRender = tableData[value] || [];
  return (
    <Box sx={{ flexGrow: 1 }} mb={2} mt={2}>
      <Grid container spacing={4}>
        {tablesToRender.map((table, index) => (
          <Grid item xs={12} lg={12} key={index}>
            <GoalsAndStrategiesTable
              title={table.title}
              handleOpen={handleGoalOpen}
              handlePendingGoalOpen={handlePendingGoalOpen}
              data={table.data}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default memo(ListSection);
