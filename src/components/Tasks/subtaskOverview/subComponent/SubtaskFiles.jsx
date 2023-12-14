import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import SubtaskFilesList from "./SubtaskFilesList";

// const files = [
//   {
//     fileName: "subtask1.docx",
//     type: "file",
//   },
//   {
//     fileName: "subtask1.docx",
//     type: "file",
//   },
// ];

export default function SubtaskFiles({ styles, files }) {
  // const DemoFiles = "file1,file2,file3";
  const filesArray = files?.split(",").filter(Boolean);

  return (
    <Paper elevation={0} sx={{ p: 2, mt: 2 }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography sx={styles.label}>Subtasks Files:</Typography>
          {filesArray && filesArray.length > 0 ? (
            filesArray?.map((item, index) => (
              <React.Fragment key={index}>
                <SubtaskFilesList item={item}/>
              </React.Fragment>
            ))
          ) : (
            <Typography sx={styles.labelText}>No Subtask Files!</Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}
