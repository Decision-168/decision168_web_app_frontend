import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import TaskLinksList from "./TaskLinksList";

// const links = [
//   {
//     link: "http://localhost:5173/tasks-overview",
//     LinkComment: "Task link1",
//     type: "link",
//   },
//   {
//     link: "http://localhost:5173/tasks-overview",
//     LinkComment: "Task link2",
//     type: "link",
//   },
// ];

export default function TaskLinks({ styles, links, LinkComments }) {

  // const Demolinks = "link1,link2,link3";
  // const DemoLinkComments = "comment1,comment2,comment3";

  const linkArray = links?.split(',').filter(Boolean);
  const commentArray = LinkComments?.split(',').filter(Boolean);

  // Assuming both arrays have the same length
  const arrayOfObjects = linkArray?.map((link, index) => ({
    link: link,
    comment: commentArray[index]
  }));



  return (
    <Paper elevation={0} sx={{ p: 2, mt: 2 }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography sx={styles.label}>Tasks Links:</Typography>
          {arrayOfObjects && arrayOfObjects.length > 0 ? (
            arrayOfObjects.map((item, index) => (
              <React.Fragment key={index}>
                <TaskLinksList item={item} />
              </React.Fragment>
            ))
          ) : (
            <Typography sx={styles.labelText}>No Task Links!</Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}
