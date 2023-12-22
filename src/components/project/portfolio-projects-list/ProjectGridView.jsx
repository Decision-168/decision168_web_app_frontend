import { Box, Grid } from "@mui/material";
import React, { memo } from "react";
import ProjectCard from "./ProjectCard";

const ProjectGridView = ({ handleOpen, handlePendingOpen, filterData }) => {
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <Grid container mt={2} spacing={2}>
        {filterData.map((item, index) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <ProjectCard
                value={item.type}
                item={item}
                handleOpen={handleOpen}
                handlePendingOpen={handlePendingOpen}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default memo(ProjectGridView);
