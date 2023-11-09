import React from "react";
import { Box, Grid, Paper } from "@mui/material";
import BasicBreadcrumbs from "../../common/BasicBreadcrumbs";
import CreateTaskForm from "./CreateTaskForm";
import CustomSelect from "../../common/CustomSelect";
import { useLocation } from "react-router-dom";

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
            <CreateTaskForm />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
