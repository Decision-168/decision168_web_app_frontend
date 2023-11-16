import React, { memo } from "react";
import { Box, Grid } from "@mui/material";
import {
  acceptedData,
  createData,
  moreInfoRequest,
  pendingRequest,
} from "./project-data";
import ProjectListViewTable from "./ProjectListViewTable";

const tableData = {
  all: [
    { title: "Created Projects", data: createData },
    { title: "Accepted Projects", data: acceptedData },
    { title: "Pending Requests", data: pendingRequest },
    { title: "More Info Requests", data: moreInfoRequest },
  ],
  created: [{ title: "Created Projects", data: createData }],
  accepted: [{ title: "Accepted Projects", data: acceptedData }],
  pending: [{ title: "Pending Requests", data: pendingRequest }],
  "more-info-requests": [
    { title: "More Info Requests", data: moreInfoRequest },
  ],
  "regular-projects": [
    {
      title: "Created Projects",
      data: createData.filter((i) => i.projectType === 0),
    },
    {
      title: "Accepted Projects",
      data: acceptedData.filter((i) => i.projectType === 0),
    },
    {
      title: "Pending Requests",
      data: pendingRequest.filter((i) => i.projectType === 0),
    },
    {
      title: "More Info Requests",
      data: moreInfoRequest.filter((i) => i.projectType === 0),
    },
  ],
  "goal-projects": [
    {
      title: "Created Projects",
      data: createData.filter((i) => i.projectType === 1),
    },
    {
      title: "Accepted Projects",
      data: acceptedData.filter((i) => i.projectType === 1),
    },
    {
      title: "Pending Requests",
      data: pendingRequest.filter((i) => i.projectType === 1),
    },
    {
      title: "More Info Requests",
      data: moreInfoRequest.filter((i) => i.projectType === 1),
    },
  ],
};

const ProjectListView = ({ handleOpen, value,handlePendingOpen }) => {
  const tablesToRender = tableData[value] || [];
  return (
    <Box sx={{ flexGrow: 1 }} mb={2} mt={2}>
      <Grid container spacing={4}>
        {tablesToRender.map((table, index) => (
          <Grid item xs={12} lg={12} key={index}>
            <ProjectListViewTable
              title={table.title}
              handleOpen={handleOpen}
              data={table.data}
              handlePendingOpen={handlePendingOpen}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default memo(ProjectListView);
