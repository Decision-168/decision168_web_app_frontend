import React from "react";
import { Box, Grid, Paper } from "@mui/material";
import BasicBreadcrumbs from "../../common/BasicBreadcrumbs";
import CreateEditTaskForm from "./CreateEditTaskForm";

export default function CreateTask() {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <BasicBreadcrumbs currentPage="Create" showBackButton={true} />

      <Paper elevation={0}>
        <Grid container p={2}>
          <Grid item xs={12}>
            <CreateEditTaskForm editMode={false} />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
