import {Grid } from "@mui/material";
import React from "react";
import TaskTable from "./TaskTable";

const ListSection = ({ rows, setRows, fetchData, loading }) => {
  return (
    <Grid container mt={2}>
      <Grid item xs={12}>
        {loading ? <loader /> : <TaskTable rows={rows} setRows={setRows} fetchData={fetchData} />}
      </Grid>
    </Grid>
  );
};

export default ListSection;
