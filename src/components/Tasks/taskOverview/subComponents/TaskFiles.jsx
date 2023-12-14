import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import TaskFilesList from "./TaskFilesList";

// const files = [
//   {
//     fileName: "task1.docx",
//     type: "file",
//   },
//   {
//     fileName: "task2.docx",
//     type: "file",
//   },
// ];

export default function TaskFiles({ styles, files }) {
  // const DemoFiles = "file1,file2,file3";
  const filesArray = files?.split(",").filter(Boolean);

  return (
    <Paper elevation={0} sx={{ p: 2, mt: 2 }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography sx={styles.label}>Tasks Files:</Typography>
          {filesArray && filesArray.length > 0 ? (
            filesArray?.map((item, index) => (
              <React.Fragment key={index}>
                <TaskFilesList item={item} />
              </React.Fragment>
            ))
          ) : (
            <Typography sx={styles.labelText}>No Task Files!</Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}
