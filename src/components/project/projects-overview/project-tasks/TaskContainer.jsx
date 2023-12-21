import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TaskProgressList from "./TaskProgressList";
import { getTaskAssignees } from "../../../../api/modules/ProjectModule";

const TaskContainer = ({pid}) => {
  const [taskData, setTaskData] = useState([]);
  const [subtaskData, setSubtaskData] = useState([]);
  const fetchTaskData = async () => {
    try {
      const response = await getTaskAssignees(pid);
      setTaskData(response.projectTaskAssigneeDetail);
      setSubtaskData(response.projectSubtaskAssigneeDetail);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchTaskData();
  }, [pid]);

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
        {taskData.map((item, index) => {
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

        {subtaskData.map((item, index) => {
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
