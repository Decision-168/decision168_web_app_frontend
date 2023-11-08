import { Box, Button, Grid, Typography } from "@mui/material";
import React, { Fragment } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import CustomSearchField from "../../subComponents/CustomSearchField";
import ProjectAccordion from "./ProjectAccordion";
import { Add } from "@mui/icons-material";
const ProjectSection = () => {
  const data = [1, 2];
  return (
    <PerfectScrollbar>
      <Box
        sx={{
          width: "100%",
          background: "white",
          p: 2,
          borderRadius: 1,
        }}
        mb={2}
      >
        <Grid container>
          <Grid item xs={8} alignSelf={"center"}>
            <Typography
              sx={{
                color: "#495057",
                fontSize: 15,
                fontWeight: "600",
                ml: 0.5,
              }}
            >
              Projects
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <CustomSearchField />
          </Grid>
          <Grid item xs={12} mt={2}>
            {data.map((item, index) => {
              return (
                <Fragment key={index}>
                  <ProjectAccordion />
                </Fragment>
              );
            })}
          </Grid>
          <Box mt={1} textAlign={"start"}>
            <Button variant="outlined" size="small" startIcon={<Add />}>
              Add Project
            </Button>
          </Box>
        </Grid>
      </Box>
    </PerfectScrollbar>
  );
};

export default ProjectSection;
