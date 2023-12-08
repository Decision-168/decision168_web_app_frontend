import { Box, Grid } from "@mui/material";
import React from "react";
import TaskTable from "./TaskTable";

const ListSection = () => {
  return (
    <Grid container mt={2}>
      <Grid item xs={12}>
        <TaskTable />
      </Grid>
    </Grid>
  );
};

export default ListSection;
