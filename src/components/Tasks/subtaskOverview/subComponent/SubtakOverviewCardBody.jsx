import { Grid, Typography } from "@mui/material";
import React from "react";
import SubTaskInfo from "./SubTaskInfo";

export default function SubtakOverviewCardBody({ styles, subtask }) {
  return (
    <Grid container>
      <Grid item xs={12}>
        {subtask?.stcode && (
          <>
            <Typography sx={styles.label}>SubTask Code:</Typography>
            <Typography sx={styles.labelText}>{subtask?.stcode}</Typography>
          </>
        )}
      </Grid>

      <Grid item xs={12}>
        {subtask?.stdes && (
          <>
            <Typography sx={styles.label}>SubTask Description :</Typography>
            <Typography sx={styles.labelText}>{subtask?.stdes}</Typography>
          </>
        )}
      </Grid>

      <Grid item xs={12}>
        {subtask?.stnote && (
          <>
            <Typography sx={styles.label}>SubTask Notes:</Typography>
            <Typography sx={styles.labelText}>{subtask?.stnote}</Typography>
          </>
        )}
      </Grid>

      <SubTaskInfo styles={styles} info={subtask} />
    </Grid>
  );
}
