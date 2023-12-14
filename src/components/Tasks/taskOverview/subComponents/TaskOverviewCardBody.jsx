import { Grid, Typography } from "@mui/material";
import React from "react";
import TaskInfo from "./TaskInfo";

export default function TaskOverviewCardBody({ styles, task }) {
  return (
    <Grid container>
      <Grid item xs={12}>
        {task?.tcode && (
          <>
            <Typography sx={styles.label}>Task Code:</Typography>
            <Typography sx={styles.labelText}>{task?.tcode}</Typography>
          </>
        )}
      </Grid>

      <Grid item xs={12}>
        {task?.tdes && (
          <>
            <Typography sx={styles.label}>Task Description :</Typography>
            <Typography sx={styles.labelText}>{task?.tdes}</Typography>
          </>
        )}
      </Grid>

      <Grid item xs={12}>
        {task?.tnote && (
          <>
            <Typography sx={styles.label}>Task Notes:</Typography>
            <Typography sx={styles.labelText}>{task?.tnote}</Typography>
          </>
        )}
      </Grid>

      <TaskInfo styles={styles} info={task} />
    </Grid>
  );
}
