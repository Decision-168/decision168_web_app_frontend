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
    { title: "Created Projects", data: createData },
    { title: "Accepted Projects", data: acceptedData },
    { title: "Pending Requests", data: pendingRequest },
    { title: "More Info Requests", data: moreInfoRequest },
  ],
  "goal-projects": [
    { title: "Created Projects", data: createData },
    { title: "Accepted Projects", data: acceptedData },
    { title: "Pending Requests", data: pendingRequest },
    { title: "More Info Requests", data: moreInfoRequest },
  ],
};

const ProjectListView = ({ handleOpen, value }) => {
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
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default memo(ProjectListView);
