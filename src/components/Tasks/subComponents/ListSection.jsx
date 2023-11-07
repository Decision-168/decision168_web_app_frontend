import { Box, Grid } from "@mui/material";
import React from "react";
import TaskTable from "./TaskTable";

const ListSection = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container mt={2} sx={{ textAlign: "center" }}>
        <Grid item xs={12}>
          <TaskTable />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ListSection;
