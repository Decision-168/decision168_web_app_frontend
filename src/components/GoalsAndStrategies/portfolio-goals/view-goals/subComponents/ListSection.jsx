// ListSection.js
import React, { lazy, memo, useMemo } from "react";
import { Box, Grid } from "@mui/material";
const CustomTable = lazy(() => import("./CustomTable"));
const tableData = {
  all: [
    { title: "Created Goals" },
    { title: "Accepted Goals" },
    { title: "Pending Requests" },
    { title: "More Info Requests" },
  ],
  "created-goals": [{ title: "Created Goals" }],
  "accepted-goals": [{ title: "Accepted Goals" }],
  "pending-requests": [{ title: "Pending Requests" }],
  "more-info-requests": [{ title: "More Info Requests" }],
};

const ListSection = ({ handleGoalOpen, value }) => {
  const tablesToRender = tableData[value] || [];
  const data = useMemo(
    () => [
      {
        goals: {
          name: "ABC Goal",
          description:
            "Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.",
        },
        progress: "26%",
        startDate: "2023-01-19",
        endDate: "2023-04-30",
      },
      {
        goals: {
          name: "Test",
          description:
            "Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.",
        },
        progress: "76%",
        startDate: "2023-01-19",
        endDate: "2023-04-30",
      },
      {
        goals: {
          name: "PQR",
          description:
            "Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.",
        },
        progress: "56%",
        startDate: "2023-01-19",
        endDate: "2023-04-30",
      },
      {
        goals: {
          name: "OCT Goal",
          description:
            "Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.",
        },
        progress: "72%",
        startDate: "2023-01-19",
        endDate: "2023-04-30",
      },
      {
        goals: {
          name: "G & K",
          description:
            "Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.",
        },
        progress: "32%",
        startDate: "2023-01-19",
        endDate: "2023-04-30",
      },
    ],
    []
  );
  return (
    <Box sx={{ flexGrow: 1 }} mb={2} mt={2}>
      <Grid container spacing={4}>
        {tablesToRender.map((table, index) => (
          <Grid item xs={12} lg={12} key={index}>
            <CustomTable
              title={table.title}
              handleOpen={handleGoalOpen}
              data={data}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default memo(ListSection);
