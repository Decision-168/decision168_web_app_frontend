import { Box, Grid } from "@mui/material";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import {
  acceptedData,
  createData,
  moreInfoRequest,
  pendingRequest,
} from "./project-data";
import ProjectCard from "./ProjectCard";

const tableData = {
  all: [...createData, ...acceptedData, ...pendingRequest, ...moreInfoRequest],
  created: [...createData],
  accepted: [...acceptedData],
  "pending-requests": [...pendingRequest],
  "more-info-requests": [...moreInfoRequest],
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

const ProjectGridView = ({ handleOpen, value }) => {
  const tablesToRender = tableData[value] || [];
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/goal-overview");
  };

  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <Grid container mt={2} spacing={2}>
        {tablesToRender.map((item, index) => {
          return (
            <Grid item xs={12} lg={3} key={index}>
              <ProjectCard
                value={item.type}
                item={item}
                handleClick={handleRedirect}
                handleOpen={handleOpen}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default memo(ProjectGridView);
