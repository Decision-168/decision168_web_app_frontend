import { Box, Grid } from "@mui/material";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./ProjectCard";

const ProjectGridView = ({ handleOpen, value, handlePendingOpen, projectData }) => {
  const createData = projectData.projectRegularList;
  const acceptedData = projectData.projectAcceptedList;
  const pendingRequest = projectData.projectPendingList;
  const moreInfoRequest = projectData.projectReadMoreList;

  const tableData = {
    all: [...createData, ...acceptedData, ...pendingRequest, ...moreInfoRequest],
    created: [...createData],
    accepted: [...acceptedData],
    "pending-requests": [...pendingRequest],
    "more-info-requests": [...moreInfoRequest],
    "regular-projects": [
      ...createData?.filter((i) => i.projectType === 0),
      ...acceptedData?.filter((i) => i.projectType === 0),
      ...pendingRequest?.filter((i) => i.projectType === 0),
      ...moreInfoRequest?.filter((i) => i.projectType === 0),
    ],
    "goal-projects": [
      ...createData?.filter((i) => i.projectType === 1),
      ...acceptedData?.filter((i) => i.projectType === 1),
      ...pendingRequest?.filter((i) => i.projectType === 1),
      ...moreInfoRequest?.filter((i) => i.projectType === 1),
    ],
  };
  const tablesToRender = tableData[value] || [];
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <Grid container mt={2} spacing={2}>
        {tablesToRender.map((item, index) => {
          return (
            <Grid item xs={12} lg={3} key={index}>
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
