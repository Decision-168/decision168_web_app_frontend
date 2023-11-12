import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import TaskProgressList from "./TaskProgressList";

const tasks = [
  {
    name: "Alim Mohammad",
    profileImage: null,
    status: "Done: 3 Total: 5",
    progress: 60,
  },
  {
    name: "Uzma Karjikar",
    profileImage: null,
    status: "Done: 3 Total: 6",
    progress: 50,
  },
];
const subTasks = [
  {
    name: "Jameel Syed",
    profileImage: null,
    status: "Done: 2 Total: 10",
    progress: 40,
  },
  {
    name: "Afrin Syed",
    profileImage: null,
    status: "Done: 4 Total: 5",
    progress: 80,
  },
];
const TaskContainer = () => {
  return (
    <Box sx={{ flexGrow: 1, width: "100%", background: "white", p: 2 }} mb={2}>
      <Grid container>
        <Grid item xs={12} lg={12} my={1}>
          <Typography sx={{ fontSize: 15, fontWeight: "600" }}>
            Project Tasks Assigned
          </Typography>
        </Grid>
        <Grid item xs={12} lg={12} my={1}>
          <Typography sx={{ fontSize: 15, color: "#212934" }}>
            Tasks:
          </Typography>
        </Grid>
        {tasks.map((item, index) => {
          return (
            <Grid item xs={12} lg={12} my={1} key={index}>
              <TaskProgressList item={item} />
            </Grid>
          );
        })}

        <Grid item xs={12} lg={12} my={1}>
          <Typography sx={{ fontSize: 15, color: "#212934" }}>
            Subtasks:
          </Typography>
        </Grid>

        {subTasks.map((item, index) => {
          return (
            <Grid item xs={12} lg={12} my={1} key={index}>
              <TaskProgressList item={item} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default TaskContainer;
