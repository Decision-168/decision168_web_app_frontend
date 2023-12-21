import React, { memo } from "react";
import { Box, Grid } from "@mui/material";
import ProjectListViewTable from "./ProjectListViewTable";

const ProjectListView = ({ handleOpen, handlePendingOpen, projectData }) => {
  return (
    <Box sx={{ flexGrow: 1 }} mb={2} mt={2}>
      <Grid container spacing={4}>
        {projectData.map((table, index) => (
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
