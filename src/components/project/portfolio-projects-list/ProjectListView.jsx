import React, { memo } from "react";
import { Box, Grid } from "@mui/material";
import ProjectListViewTable from "./ProjectListViewTable";

const ProjectListView = ({ handleOpen, value, handlePendingOpen, projectData }) => {

  const tableData = {
    all: [
      { title: "Created Projects", data: projectData.projectRegularList },
      { title: "Accepted Projects", data: projectData.projectAcceptedList },
      { title: "Pending Requests", data: projectData.projectPendingList },
      { title: "More Info Requests", data: projectData.projectReadMoreList },
    ],
    created: [{ title: "Created Projects", data: projectData.projectRegularList }],
    accepted: [{ title: "Accepted Projects", data: projectData.projectAcceptedList }],
    pending: [{ title: "Pending Requests", data: projectData.projectPendingList }],
    "more-info-requests": [
      { title: "More Info Requests", data: projectData.projectReadMoreList },
    ],
    "regular-projects": [
      {
        title: "Created Projects",
        data: projectData.projectRegularList?.filter((i) => i.projectType === 0),
      },
      {
        title: "Accepted Projects",
        data: projectData.projectAcceptedList?.filter((i) => i.projectType === 0),
      },
      {
        title: "Pending Requests",
        data: projectData.projectPendingList?.filter((i) => i.projectType === 0),
      },
      {
        title: "More Info Requests",
        data: projectData.projectReadMoreList?.filter((i) => i.projectType === 0),
      },
    ],
    "goal-projects": [
      {
        title: "Created Projects",
        data: projectData.projectRegularList?.filter((i) => i.projectType === 1),
      },
      {
        title: "Accepted Projects",
        data: projectData.projectAcceptedList?.filter((i) => i.projectType === 1),
      },
      {
        title: "Pending Requests",
        data: projectData.projectPendingList?.filter((i) => i.projectType === 1),
      },
      {
        title: "More Info Requests",
        data: projectData.projectReadMoreList?.filter((i) => i.projectType === 1),
      },
    ],
  };


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
