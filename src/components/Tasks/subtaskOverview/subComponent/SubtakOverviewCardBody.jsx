import { Grid, Typography } from "@mui/material";
import React from "react";
import TaskInfo from "../../subComponents/TaskInfo";

export default function SubtakOverviewCardBody({ styles }) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography sx={styles.label}>Subtask Code:</Typography>
        <Typography sx={styles.labelText}>AC-2821</Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography sx={styles.label}>Subtask Description :</Typography>
        <Typography sx={styles.labelText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo minima adipisci quia placeat repellendus iste.</Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography sx={styles.label}>Subtask Notes:</Typography>
        <Typography sx={styles.labelText}>Lorem ipsum dolor sit amet.</Typography>
      </Grid>

      <TaskInfo styles={styles} />
    </Grid>
  );
}
