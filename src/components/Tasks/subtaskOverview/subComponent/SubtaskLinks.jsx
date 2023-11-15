import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import TaskLinksList from "./SubtaskLinksList";

const links = [
  {
    link: "http://localhost:5173/subtasks-overview",
    LinkComment: "Subtask link1",
    type: "link",
  },
  {
    link: "http://localhost:5173/subtasks-overview",
    LinkComment: "Subtask link2",
    type: "link",
  },
];

export default function SubtaskLinks({ styles }) {
  return (
    <Paper elevation={0} sx={{ p: 2, mt: 2 }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography sx={styles.label}>Subtask Links:</Typography>

          {links.length > 0 ? (
            links.map((item, index) => (
              <React.Fragment key={index}>
                <TaskLinksList item={item} />
              </React.Fragment>
            ))
          ) : (
            <Typography sx={styles.labelText}>No Subtask Links!</Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}
